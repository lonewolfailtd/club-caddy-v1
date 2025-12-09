import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { createClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';
import {
  sendBookingConfirmationEmail,
  sendBookingConfirmationAdminEmail,
} from '@/lib/email/send';
import type { BookingWithProduct } from '@/types/booking.types';

// Use service role key for webhook handlers to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST /api/stripe/webhooks
 * Handle Stripe webhook events
 *
 * Important: Configure this endpoint in your Stripe Dashboard
 * Webhook Events to listen for:
 * - checkout.session.completed
 * - payment_intent.payment_failed
 * - charge.refunded
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('No Stripe signature found in request');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', errorMessage);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${errorMessage}` },
      { status: 400 }
    );
  }

  console.log(`Received Stripe webhook event: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        // Only process rental booking checkouts
        if (session.metadata?.type === 'rental_booking') {
          console.log(`Processing checkout.session.completed for booking ${session.metadata.bookingId}`);

          const bookingId = session.metadata.bookingId;

          // Update booking payment status
          const { error: updateError } = await supabaseAdmin
            .from('bookings')
            .update({
              payment_status: 'paid',
              status: 'confirmed',
              stripe_payment_intent_id: session.payment_intent as string,
              paid_at: new Date().toISOString(),
            })
            .eq('id', bookingId);

          if (updateError) {
            console.error('Failed to update booking payment status:', updateError);
            // Don't return error - log and continue
          } else {
            console.log(`Booking ${bookingId} marked as paid and confirmed`);

            // Fetch booking details for email
            const { data: booking, error: fetchError } = await supabaseAdmin
              .from('bookings')
              .select(`
                *,
                products (
                  name,
                  slug,
                  tier
                )
              `)
              .eq('id', bookingId)
              .single();

            if (fetchError) {
              console.error('Failed to fetch booking for email:', fetchError);
            } else if (booking) {
              // Send confirmation emails to customer and admin
              console.log(`Sending confirmation emails for booking ${booking.booking_number}`);

              // Type assertion to match BookingWithProduct interface
              const bookingWithProduct = booking as BookingWithProduct;

              // Send customer confirmation email
              const customerEmailResult = await sendBookingConfirmationEmail(bookingWithProduct);

              // Send admin notification email
              const adminEmailResult = await sendBookingConfirmationAdminEmail(bookingWithProduct);

              // Mark confirmation email as sent if successful
              if (customerEmailResult.success) {
                await supabaseAdmin
                  .from('bookings')
                  .update({ confirmation_email_sent: true })
                  .eq('id', bookingId);

                console.log(`Confirmation email sent successfully to ${booking.customer_email}`);
              } else {
                console.error('Failed to send customer confirmation email:', customerEmailResult.error);
              }

              if (adminEmailResult.success) {
                console.log('Admin notification email sent successfully');
              } else {
                console.error('Failed to send admin notification email:', adminEmailResult.error);
              }
            }
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        console.log(`Payment failed for intent: ${paymentIntent.id}`);

        // Update booking to failed status
        const { error: updateError } = await supabaseAdmin
          .from('bookings')
          .update({
            payment_status: 'failed',
          })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        if (updateError) {
          console.error('Failed to update booking payment status to failed:', updateError);
        } else {
          console.log(`Booking marked as payment failed for intent ${paymentIntent.id}`);
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;

        console.log(`Refund processed for charge: ${charge.id}`);

        // Determine refund status
        const isPartialRefund = charge.amount_refunded < charge.amount;
        const refundStatus = isPartialRefund ? 'partially_refunded' : 'refunded';

        // Update booking refund status
        const { error: updateError } = await supabaseAdmin
          .from('bookings')
          .update({
            payment_status: refundStatus,
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
            cancellation_reason: 'Refund processed',
          })
          .eq('stripe_payment_intent_id', charge.payment_intent as string);

        if (updateError) {
          console.error('Failed to update booking refund status:', updateError);
        } else {
          console.log(
            `Booking marked as ${refundStatus} and cancelled for charge ${charge.id}`
          );
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.type === 'rental_booking') {
          console.log(`Checkout session expired for booking ${session.metadata.bookingId}`);

          // Mark payment as failed and release inventory
          const { error: updateError } = await supabaseAdmin
            .from('bookings')
            .update({
              payment_status: 'failed',
              status: 'cancelled',
              cancelled_at: new Date().toISOString(),
              cancellation_reason: 'Payment session expired (30 minutes)',
            })
            .eq('id', session.metadata.bookingId);

          if (updateError) {
            console.error('Failed to update expired booking:', updateError);
          } else {
            console.log(`Booking ${session.metadata.bookingId} cancelled due to session expiry`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Disable body parsing for Stripe webhooks (need raw body for signature verification)
export const runtime = 'edge'; // Optional: Use edge runtime for better performance
