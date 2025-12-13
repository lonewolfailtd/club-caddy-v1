import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Use service role key to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DEPOSIT_PERCENTAGE = 20; // 20% deposit
const MIN_DEPOSIT = 100000; // $1,000 minimum deposit in cents (only for orders >= $5,000)

export async function POST(request: NextRequest) {
  try {
    // Check if user is logged in
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          cookie: cookieStore.toString()
        }
      }
    });

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || null;

    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryMethod,
      shippingAddress,
      specialInstructions,
      items,
      subtotal,
      deliveryCost,
      totalAmount
    } = await request.json();

    // Calculate deposit: 20% of total (including delivery), or $1,000 minimum
    // But never more than the total order amount
    let depositAmount = Math.round(totalAmount * (DEPOSIT_PERCENTAGE / 100));

    // Apply $1,000 minimum only if order is >= $5,000
    if (totalAmount >= 500000) { // $5,000 in cents
      depositAmount = Math.max(depositAmount, MIN_DEPOSIT);
    }

    // Ensure deposit never exceeds total (for small orders)
    depositAmount = Math.min(depositAmount, totalAmount);

    const balanceDue = totalAmount - depositAmount;

    // Create order in database using admin client
    const supabaseForInsert = supabaseAdmin;

    const { data: order, error: orderError } = await supabaseForInsert
      .from('orders')
      .insert({
        user_id: userId, // Link to user account if logged in
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        delivery_method: deliveryMethod,
        shipping_address: shippingAddress,
        special_instructions: specialInstructions,
        items: items,
        subtotal: subtotal / 100, // Convert cents to dollars for database
        delivery_cost: deliveryCost / 100,
        deposit_amount: depositAmount / 100,
        deposit_percentage: DEPOSIT_PERCENTAGE,
        balance_due: balanceDue / 100,
        total_amount: totalAmount / 100,
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
