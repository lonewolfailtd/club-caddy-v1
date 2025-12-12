import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe/client';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import type { CreateCheckoutSessionRequest, CreateCheckoutSessionResponse } from '@/types/booking.types';
import { checkRateLimit, checkoutSessionLimiter, createRateLimitResponse } from '@/lib/security/rate-limit';

const sessionSchema = z.object({
  bookingId: z.string().uuid('Invalid booking ID'),
});

/**
 * POST /api/stripe/create-checkout-session
 * Create a Stripe checkout session for a booking
 */
export async function POST(request: NextRequest) {
  try {
    // Check rate limit (10 checkout sessions per 10 minutes)
    const rateLimitResult = await checkRateLimit(
      request,
      checkoutSessionLimiter
    );

    if (!rateLimitResult.success) {
      return createRateLimitResponse(
        rateLimitResult,
        'Too many payment attempts. Please try again later.'
      );
    }

    const body: CreateCheckoutSessionRequest = await request.json();

    // Validate request
    const validationResult = sessionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { bookingId } = validationResult.data;

    const supabase = await createClient();

    // Get booking details with product information
    const { data: booking, error: bookingError } = await (supabase
      .from('bookings') as any)
      .select(`
        *,
        products (
          name,
          slug,
          images,
          tier
        )
      `)
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      console.error('Booking fetch error:', bookingError);
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if booking is already paid
    if (booking.payment_status === 'paid') {
      return NextResponse.json(
        { error: 'Booking already paid' },
        { status: 400 }
      );
    }

    // Check if booking is cancelled
    if (booking.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Cannot process payment for cancelled booking' },
        { status: 400 }
      );
    }

    // Format rental period for description
    const startDate = new Date(booking.start_date).toLocaleDateString('en-NZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const endDate = new Date(booking.end_date).toLocaleDateString('en-NZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const rentalPeriodText = `${startDate} - ${endDate}`;
    const durationText = booking.rental_type === 'hourly'
      ? `${booking.duration_hours} hours`
      : `${booking.duration_days} ${booking.duration_days === 1 ? 'day' : 'days'}`;

    // Convert relative image path to absolute URL for Stripe
    let productImages: string[] = [];
    if (booking.products.images?.[0]) {
      const imageUrl = booking.products.images[0];
      // If it's a relative path, make it absolute
      if (imageUrl.startsWith('/')) {
        productImages = [`${process.env.NEXT_PUBLIC_SITE_URL}${imageUrl}`];
      } else if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        productImages = [imageUrl];
      }
    }

    // Prepare line items
    const lineItems: any[] = [
      {
        price_data: {
          currency: 'nzd',
          product_data: {
            name: `${booking.products.name} - ${booking.products.tier} Edition`,
            description: `${booking.quantity}x cart(s) • ${booking.rental_type} rental • ${durationText}\n${rentalPeriodText}`,
            images: productImages,
            metadata: {
              productId: booking.product_id,
              tier: booking.products.tier,
            },
          },
          unit_amount: formatAmountForStripe(booking.total_amount),
        },
        quantity: 1,
      },
    ];

    // Pre-fill customer information from booking
    const customerName = booking.customer_name || '';
    const nameParts = customerName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: booking.customer_email,
      client_reference_id: booking.id,
      metadata: {
        bookingId: booking.id,
        bookingNumber: booking.booking_number,
        type: 'rental_booking',
        productId: booking.product_id,
        quantity: booking.quantity.toString(),
        rentalType: booking.rental_type,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/bookings/${booking.id}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/bookings/${booking.id}?cancelled=true`,
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
      // Simplified checkout - only collect payment, no billing/shipping address
      billing_address_collection: 'auto', // Only collect if required by payment method
      // Pre-fill customer data
      customer_creation: 'always',
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Rental booking ${booking.booking_number}`,
          footer: 'Thank you for choosing Club Caddy Carts!',
          metadata: {
            bookingNumber: booking.booking_number,
          },
        },
      },
      custom_text: {
        submit: {
          message: 'Your booking will be confirmed once payment is processed.',
        },
      },
      // Custom branding to match Club Caddy theme
      ui_mode: 'hosted', // Use Stripe's hosted checkout page
      // Note: For full branding customization (logo, colors), configure in Stripe Dashboard > Settings > Branding
      // The primary color (blue #0BA5EC) and accent colors will be applied there
    });

    // Update booking with Stripe session ID
    const { error: updateError } = await (supabase
      .from('bookings') as any)
      .update({
        stripe_session_id: session.id,
        payment_status: 'processing',
      })
      .eq('id', booking.id);

    if (updateError) {
      console.error('Failed to update booking with session ID:', updateError);
      // Don't fail the request - session was created successfully
    }

    return NextResponse.json<CreateCheckoutSessionResponse>({
      sessionId: session.id,
      url: session.url || '',
    });
  } catch (error) {
    console.error('Stripe session creation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
