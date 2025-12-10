import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import type {
  CreateBookingInput,
  CreateBookingResponse,
  RentalPricing,
} from '@/types/booking.types';

// Validation schemas
const addressSchema = z.object({
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
});

const addonSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number().min(0),
  quantity: z.number().int().min(1).optional(),
});

const bookingSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  quantity: z.number().int().min(1).max(20, 'Quantity must be between 1 and 20'),
  rentalType: z.enum(['hourly', 'daily', 'weekly', 'custom']),
  startDate: z.string().datetime('Invalid start date format'),
  endDate: z.string().datetime('Invalid end date format'),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 characters'),
  selectedAddons: z.array(addonSchema).optional(),
  deliveryAddress: addressSchema.optional(),
  pickupLocation: z.string().optional(),
  specialRequests: z.string().optional(),
});

/**
 * Calculate pricing based on rental type and duration
 */
function calculatePricing(
  pricing: RentalPricing,
  rentalType: string,
  durationHours: number,
  durationDays: number,
  quantity: number
): { baseRate: number; error?: string } {
  let baseRate = 0;

  switch (rentalType) {
    case 'hourly':
      if (!pricing.hourly_rate) {
        return { baseRate: 0, error: 'Hourly rate not configured for this product' };
      }
      const minHours = pricing.hourly_minimum_hours || 2;
      baseRate = pricing.hourly_rate * Math.max(durationHours, minHours);
      break;

    case 'daily':
      if (!pricing.daily_rate) {
        return { baseRate: 0, error: 'Daily rate not configured for this product' };
      }
      baseRate = pricing.daily_rate * durationDays;
      break;

    case 'weekly':
      if (!pricing.weekly_rate) {
        return { baseRate: 0, error: 'Weekly rate not configured for this product' };
      }
      const weeks = Math.ceil(durationDays / 7);
      baseRate = pricing.weekly_rate * weeks;
      break;

    case 'custom':
      // Custom pricing logic - use best rate
      if (durationDays >= 28 && pricing.monthly_rate) {
        baseRate = pricing.monthly_rate;
      } else if (durationDays >= 7 && pricing.weekly_rate) {
        const weeks = Math.ceil(durationDays / 7);
        baseRate = pricing.weekly_rate * weeks;
      } else if (pricing.daily_rate) {
        baseRate = pricing.daily_rate * durationDays;
      } else {
        return { baseRate: 0, error: 'No pricing configured for this duration' };
      }
      break;

    default:
      return { baseRate: 0, error: 'Invalid rental type' };
  }

  return { baseRate: baseRate * quantity };
}

/**
 * POST /api/bookings/create
 * Create a new booking reservation
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateBookingInput = await request.json();

    // Validate request body
    const validationResult = bookingSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid booking data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const bookingData = validationResult.data;

    // Validate date range
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);

    if (end <= start) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Calculate duration
    const durationMs = end.getTime() - start.getTime();
    const durationHours = Math.ceil(durationMs / (1000 * 60 * 60));
    const durationDays = Math.ceil(durationHours / 24);

    // Create Supabase client
    const supabase = await createClient();

    // Check availability first
    const { data: isAvailable, error: availError } = await (supabase as any).rpc('check_availability', {
      p_product_id: bookingData.productId,
      p_start_date: bookingData.startDate,
      p_end_date: bookingData.endDate,
      p_quantity: bookingData.quantity,
    });

    if (availError) {
      console.error('Availability check error:', availError);
      return NextResponse.json(
        { error: 'Failed to check availability' },
        { status: 500 }
      );
    }

    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Selected carts are not available for the requested dates' },
        { status: 409 }
      );
    }

    // Get rental pricing
    const { data: pricing, error: pricingError } = await supabase
      .from('rental_pricing')
      .select('*')
      .eq('product_id', bookingData.productId)
      .eq('active', true)
      .single<RentalPricing>();

    if (pricingError || !pricing) {
      console.error('Pricing error:', pricingError);
      return NextResponse.json(
        { error: 'Rental pricing not configured for this product' },
        { status: 404 }
      );
    }

    // Calculate pricing
    const { baseRate, error: pricingCalcError } = calculatePricing(
      pricing,
      bookingData.rentalType,
      durationHours,
      durationDays,
      bookingData.quantity
    );

    if (pricingCalcError) {
      return NextResponse.json({ error: pricingCalcError }, { status: 400 });
    }

    // Calculate addon total
    const addonTotal =
      bookingData.selectedAddons?.reduce((sum, addon) => {
        const addonQuantity = addon.quantity || 1;
        return sum + addon.price * addonQuantity;
      }, 0) || 0;

    // Calculate totals
    const subtotal = baseRate + addonTotal;
    // NZ GST is 15% on all rental services
    const taxAmount = Math.round(subtotal * 0.15 * 100) / 100; // Round to 2 decimal places
    const totalAmount = subtotal + taxAmount;

    // Get authenticated user if logged in
    const { data: { user } } = await supabase.auth.getUser();

    // Generate booking number
    const { data: bookingNumber, error: bookingNumError } = await supabase.rpc(
      'generate_booking_number'
    );

    if (bookingNumError || !bookingNumber) {
      console.error('Booking number generation error:', bookingNumError);
      return NextResponse.json(
        { error: 'Failed to generate booking number' },
        { status: 500 }
      );
    }

    // Create booking
    const { data: booking, error: bookingError } = await (supabase
      .from('bookings') as any)
      .insert({
        booking_number: bookingNumber,
        user_id: user?.id || null,
        customer_name: bookingData.customerName,
        customer_email: bookingData.customerEmail,
        customer_phone: bookingData.customerPhone,
        product_id: bookingData.productId,
        quantity: bookingData.quantity,
        rental_type: bookingData.rentalType,
        start_date: bookingData.startDate,
        end_date: bookingData.endDate,
        duration_hours: durationHours,
        duration_days: durationDays,
        base_rate: baseRate,
        addon_total: addonTotal,
        subtotal: subtotal,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        selected_addons: bookingData.selectedAddons || [],
        delivery_address: bookingData.deliveryAddress || null,
        pickup_location: bookingData.pickupLocation || null,
        special_requests: bookingData.specialRequests || null,
        status: 'pending',
        payment_status: 'pending',
      })
      .select()
      .single();

    if (bookingError) {
      console.error('Booking creation error:', bookingError);
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    return NextResponse.json<CreateBookingResponse>(
      {
        booking,
        message: 'Booking created successfully. Proceed to payment.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking API error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
