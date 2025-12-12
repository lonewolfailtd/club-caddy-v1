import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendOrderBalanceInvoice } from '@/lib/email/services/email-service';

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

    if (order.payment_status !== 'deposit_paid') {
      return NextResponse.json(
        { error: 'Deposit must be paid before sending balance invoice' },
        { status: 400 }
      );
    }

    // Update order status to invoice_sent
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        payment_status: 'invoice_sent',
        order_status: 'ready',
        balance_invoice_sent_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) {
      console.error('Failed to update order status:', updateError);
      return NextResponse.json(
        { error: 'Failed to update order status' },
        { status: 500 }
      );
    }

    // Send balance invoice email
    const emailResult = await sendOrderBalanceInvoice(order);

    if (!emailResult.success) {
      console.error('Failed to send balance invoice email:', emailResult.error);
      // Revert status change
      await supabaseAdmin
        .from('orders')
        .update({
          payment_status: 'deposit_paid',
          order_status: 'processing',
          balance_invoice_sent_at: null,
        })
        .eq('id', id);

      return NextResponse.json(
        { error: 'Failed to send invoice email' },
        { status: 500 }
      );
    }

    console.log(`Balance invoice sent successfully for order ${order.order_number}`);

    return NextResponse.json({
      success: true,
      message: `Balance invoice sent to ${order.customer_email}`,
      orderNumber: order.order_number,
    });

  } catch (error: any) {
    console.error('Send balance invoice error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send balance invoice' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
