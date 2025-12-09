import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe/client';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import type { CreateCheckoutSessionRequest, CreateCheckoutSessionResponse } from '@/types/booking.types';

const sessionSchema = z.object({
  bookingId: z.string().uuid('Invalid booking ID'),
});

/**
 * POST /api/stripe/create-checkout-session
 * Create a Stripe checkout session for a booking
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateCheckoutSessionRequest = await request.json();

    // Validate request
    const validationResult = sessionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { bookingId } = validationResult.data;

    const supabase = await createClient();

    // Get booking details with product information
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
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

    // Prepare line items
    const lineItems: any[] = [
      {
        price_data: {
          currency: 'nzd',
          product_data: {
            name: `${booking.products.name} - ${booking.products.tier} Edition`,
            description: `${booking.quantity}x cart(s) • ${booking.rental_type} rental • ${durationText}\n${rentalPeriodText}`,
            images: booking.products.images?.[0] ? [booking.products.images[0]] : [],
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
      billing_address_collection: 'auto',
      phone_number_collection: {
        enabled: true,
      },
      custom_text: {
        submit: {
          message: 'Your booking will be confirmed once payment is processed.',
        },
      },
    });

    // Update booking with Stripe session ID
    const { error: updateError } = await supabase
      .from('bookings')
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
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
