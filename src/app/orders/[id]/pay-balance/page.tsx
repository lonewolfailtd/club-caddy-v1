'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, CreditCard, Package, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  deposit_amount: number;
  balance_due: number;
  total_amount: number;
  payment_status: string;
  order_status: string;
  items: any[];
  shipping_address: any;
  created_at: string;
}

export default function PayBalancePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params.id as string;
  const isCancelled = searchParams.get('cancelled') === 'true';

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (error || !data) {
          setError('Order not found');
          return;
        }

        // Check if already paid
        if (data.payment_status === 'paid') {
          setError('This order has already been paid in full');
          return;
        }

        // Check if deposit has been paid
        if (data.payment_status !== 'invoice_sent' && data.payment_status !== 'deposit_paid') {
          setError('This order is not ready for balance payment');
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  const handlePayBalance = async () => {
    if (!order) return;

    setProcessing(true);

    try {
      const response = await fetch(`/api/orders/${orderId}/create-balance-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Payment error:', error);
      setError('Failed to start payment process. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-800" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg border-2 border-zinc-200 shadow-lg text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-900 mb-2">{error}</h2>
          <Link href={`/orders/${orderId}`}>
            <Button className="mt-4 bg-rose-800 hover:bg-rose-900 text-white px-6 py-2 rounded-sm">
              View Order
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      <div className="absolute inset-0 hexagon-pattern-minimal opacity-[0.02]" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Cancelled Banner */}
        {isCancelled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4"
          >
            <p className="refined-body text-yellow-800 text-center">
              Payment was cancelled. You can try again below.
            </p>
          </motion.div>
        )}

        {/* Payment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border-2 border-zinc-200 shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-800 to-orange-700 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-8 h-8" />
              <h1 className="refined-title text-3xl font-bold">
                Your Cart is Ready!
              </h1>
            </div>
            <p className="refined-body text-rose-100">
              Order #{order.order_number}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Welcome Message */}
            <div className="text-center">
              <p className="refined-body text-lg text-zinc-700">
                Great news, {order.customer_name}! Your custom golf cart has been prepared and is ready for delivery.
              </p>
              <p className="refined-body text-zinc-600 mt-2">
                Please complete the final payment to schedule your delivery.
              </p>
            </div>

            {/* Payment Summary */}
            <div className="bg-gradient-to-br from-zinc-50 to-white rounded-lg p-6 border-2 border-zinc-200">
              <h3 className="refined-title text-lg font-semibold text-zinc-900 mb-4">
                Payment Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between refined-body">
                  <span className="text-zinc-600">Total Order Amount:</span>
                  <span className="text-zinc-900 font-semibold">
                    ${order.total_amount.toFixed(2)} NZD
                  </span>
                </div>

                <div className="flex justify-between refined-body text-green-700">
                  <span className="font-semibold">Deposit Paid:</span>
                  <span className="font-semibold">
                    -${order.deposit_amount.toFixed(2)} NZD ✓
                  </span>
                </div>

                <div className="h-px bg-zinc-300 my-2" />

                <div className="flex justify-between items-center">
                  <span className="refined-title text-xl font-bold text-zinc-900">
                    Balance Due Today:
                  </span>
                  <span className="refined-title text-3xl font-bold text-rose-900">
                    ${order.balance_due.toFixed(2)} NZD
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="refined-title text-md font-semibold text-zinc-900 mb-3">
                What You're Getting
              </h4>
              <div className="space-y-2">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-zinc-50 rounded-sm border border-zinc-200">
                    <div>
                      <p className="refined-body font-semibold text-zinc-900">{item.productName}</p>
                      {item.variantName && (
                        <p className="refined-body text-sm text-zinc-600">{item.variantName}</p>
                      )}
                      <p className="refined-body text-xs text-zinc-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h4 className="refined-title text-md font-semibold text-zinc-900 mb-3">
                Delivery Address
              </h4>
              <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-sm border border-zinc-200">
                <Package className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                <div className="refined-body text-sm text-zinc-700">
                  <p>{order.shipping_address.addressLine1}</p>
                  {order.shipping_address.addressLine2 && (
                    <p>{order.shipping_address.addressLine2}</p>
                  )}
                  <p>
                    {order.shipping_address.city} {order.shipping_address.postalCode}
                  </p>
                  <p>{order.shipping_address.country}</p>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="pt-4">
              <Button
                onClick={handlePayBalance}
                disabled={processing}
                className="w-full bg-rose-800 hover:bg-rose-900 text-white px-8 py-4 rounded-sm refined-body font-bold text-lg flex items-center justify-center gap-3"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay ${order.balance_due.toFixed(2)} NZD Now
                  </>
                )}
              </Button>

              <p className="refined-body text-xs text-zinc-500 text-center mt-3">
                Secure payment powered by Stripe
              </p>
            </div>

            {/* What Happens Next */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="refined-body font-semibold text-blue-900 mb-2">
                What Happens After Payment?
              </h4>
              <ul className="refined-body text-sm text-blue-800 space-y-1">
                <li>✓ Immediate payment confirmation</li>
                <li>✓ Our team contacts you within 24 hours</li>
                <li>✓ Schedule convenient delivery time</li>
                <li>✓ Professional delivery & setup included</li>
              </ul>
            </div>

            {/* Back Link */}
            <div className="text-center pt-4">
              <Link href={`/orders/${orderId}`} className="refined-body text-rose-800 hover:underline inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Order Details
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="refined-body text-zinc-600">
            Questions? Contact us at{' '}
            <a href="mailto:admin@clubcaddycarts.com" className="text-rose-800 hover:underline">
              admin@clubcaddycarts.com
            </a>{' '}
            or call{' '}
            <a href="tel:+64021560307" className="text-rose-800 hover:underline">
              +64 021 560 307
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
