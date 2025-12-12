import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const DEPOSIT_PERCENTAGE = 20; // 20% deposit
const MIN_DEPOSIT = 100000; // $1,000 minimum deposit in cents

export async function POST(request: NextRequest) {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      specialInstructions,
      items,
      subtotal
    } = await request.json();

    // Calculate deposit (20% or $1,000, whichever is greater)
    const calculatedDeposit = Math.max(
      Math.round(subtotal * (DEPOSIT_PERCENTAGE / 100)),
      MIN_DEPOSIT
    );

    const depositAmount = calculatedDeposit;
    const balanceDue = subtotal - depositAmount;

    // Create order in database
    const supabase = await createClient();

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        shipping_address: shippingAddress,
        special_instructions: specialInstructions,
        items: items,
        subtotal: subtotal / 100, // Convert cents to dollars for database
        deposit_amount: depositAmount / 100,
        deposit_percentage: DEPOSIT_PERCENTAGE,
        balance_due: balanceDue / 100,
        total_amount: subtotal / 100,
        payment_status: 'pending',
        order_status: 'pending',
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Order creation error:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Create Stripe checkout session for deposit
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      billing_address_collection: 'auto',

      line_items: [
        {
          price_data: {
            currency: 'nzd',
            product_data: {
              name: `Deposit Payment - Order #${order.order_number}`,
              description: `${DEPOSIT_PERCENTAGE}% deposit for your golf cart order. Balance of $${(balanceDue / 100).toFixed(2)} NZD due before delivery.`,
            },
            unit_amount: depositAmount,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?cancelled=true`,

      metadata: {
        order_id: order.id,
        order_number: order.order_number,
        payment_type: 'deposit',
        customer_email: customerEmail,
        deposit_amount: depositAmount.toString(),
        balance_due: balanceDue.toString(),
      },
    });

    // Update order with Stripe session ID
    await supabase
      .from('orders')
      .update({
        deposit_payment_intent_id: session.id,
      })
      .eq('id', order.id);

    return NextResponse.json({
      url: session.url,
      orderId: order.id,
      orderNumber: order.order_number,
    });

  } catch (error: any) {
    console.error('Deposit checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
