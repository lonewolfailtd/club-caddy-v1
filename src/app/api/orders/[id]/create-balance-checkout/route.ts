import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Use service role key to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch the order
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Validate order status
    if (order.payment_status === 'paid') {
      return NextResponse.json(
        { error: 'Order is already fully paid' },
        { status: 400 }
      );
    }

    if (order.payment_status !== 'invoice_sent' && order.payment_status !== 'deposit_paid') {
      return NextResponse.json(
        { error: 'Cannot process balance payment at this stage' },
        { status: 400 }
      );
    }

    // Convert balance due to cents
    const balanceAmountCents = Math.round(order.balance_due * 100);

    // Create Stripe checkout session for balance
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: order.customer_email,
      billing_address_collection: 'auto',

      line_items: [
        {
          price_data: {
            currency: 'nzd',
            product_data: {
              name: `Balance Payment - Order #${order.order_number}`,
              description: `Final payment for your golf cart order. Your cart is ready for delivery!`,
            },
            unit_amount: balanceAmountCents,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}/pay-balance?cancelled=true`,

      metadata: {
        order_id: order.id,
        order_number: order.order_number,
        payment_type: 'balance',
        customer_email: order.customer_email,
        balance_amount: balanceAmountCents.toString(),
      },
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });

  } catch (error: any) {
    console.error('Balance checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
