import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import type { CheckAvailabilityRequest, CheckAvailabilityResponse } from '@/types/booking.types';

// Validation schema
const availabilitySchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  startDate: z.string().datetime('Invalid start date format'),
  endDate: z.string().datetime('Invalid end date format'),
  quantity: z.number().int().min(1).max(20, 'Quantity must be between 1 and 20'),
});

/**
 * POST /api/bookings/check-availability
 * Check if carts are available for a given date range
 */
export async function POST(request: NextRequest) {
  try {
    const body: CheckAvailabilityRequest = await request.json();

    // Validate request body
    const validationResult = availabilitySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json<CheckAvailabilityResponse>(
        {
          available: false,
          error: validationResult.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const { productId, startDate, endDate, quantity } = validationResult.data;

    // Validate date range
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return NextResponse.json<CheckAvailabilityResponse>(
        { available: false, error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    // Call the check_availability database function
    const { data, error } = await supabase.rpc('check_availability', {
      p_product_id: productId,
      p_start_date: startDate,
      p_end_date: endDate,
      p_quantity: quantity,
    });

    if (error) {
      console.error('Availability check error:', error);
      return NextResponse.json<CheckAvailabilityResponse>(
        { available: false, error: 'Failed to check availability' },
        { status: 500 }
      );
    }

    return NextResponse.json<CheckAvailabilityResponse>({
      available: data as boolean,
    });
  } catch (error) {
    console.error('Availability API error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json<CheckAvailabilityResponse>(
        { available: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json<CheckAvailabilityResponse>(
      { available: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
