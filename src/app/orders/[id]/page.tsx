'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, Package, Mail, Phone, Loader2, AlertCircle, ArrowLeft, CreditCard, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import AccountCreationModal from '@/components/auth/AccountCreationModal';
import { useAuth } from '@/context/AuthContext';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: any;
  special_instructions: string;
  items: any[];
  subtotal: number;
  deposit_amount: number;
  balance_due: number;
  total_amount: number;
  payment_status: string;
  order_status: string;
  deposit_paid_at: string;
  created_at: string;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params.id as string;
  const isSuccess = searchParams.get('success') === 'true';
  const { user } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAccountModal, setShowAccountModal] = useState(false);

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

  // Show account creation modal on successful payment (if not logged in)
  useEffect(() => {
    if (isSuccess && !user && !loading && order) {
      // Small delay to let the page load first
      const timer = setTimeout(() => {
        setShowAccountModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, user, loading, order]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-800" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg border-2 border-zinc-200 shadow-lg text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Order Not Found</h2>
          <p className="text-zinc-600 mb-6">{error}</p>
          <Link href="/products">
            <Button className="bg-rose-800 hover:bg-rose-900 text-white px-6 py-2 rounded-sm">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const depositPaid = order.payment_status !== 'pending';
  const fullyPaid = order.payment_status === 'paid';

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      <div className="absolute inset-0 hexagon-pattern-minimal opacity-[0.02]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Success Banner */}
        {isSuccess && depositPaid && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="refined-title text-xl font-bold text-green-900 mb-1">
                  Deposit Payment Successful!
                </h3>
                <p className="refined-body text-green-800">
                  Your ${order.deposit_amount.toFixed(2)} NZD deposit has been received. We'll start preparing your order right away!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border-2 border-zinc-200 shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-800 to-orange-700 p-6 text-white">
            <h1 className="refined-title text-3xl font-bold mb-2">
              Order #{order.order_number}
            </h1>
            <p className="refined-body text-rose-100">
              Placed on {format(new Date(order.created_at), 'MMMM d, yyyy')}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Payment Status */}
            <div className={`rounded-lg p-4 border-2 ${
              fullyPaid
                ? 'bg-green-50 border-green-200'
                : depositPaid
                ? 'bg-blue-50 border-blue-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-start gap-3">
                <CreditCard className={`w-5 h-5 mt-0.5 ${
                  fullyPaid ? 'text-green-600' : depositPaid ? 'text-blue-600' : 'text-yellow-600'
                }`} />
                <div className="flex-1">
                  <h4 className="refined-title font-semibold text-sm mb-1">Payment Status</h4>
                  {fullyPaid ? (
                    <p className="refined-body text-sm text-green-800">
                      ✅ Fully paid - Ready for delivery
                    </p>
                  ) : depositPaid ? (
                    <>
                      <p className="refined-body text-sm text-blue-800 mb-2">
                        ✅ Deposit paid (${order.deposit_amount.toFixed(2)} NZD)
                      </p>
                      <p className="refined-body text-sm text-blue-700">
                        Balance remaining: <strong>${order.balance_due.toFixed(2)} NZD</strong>
                      </p>
                      <p className="refined-body text-xs text-blue-600 mt-2">
                        We'll send you an invoice for the balance when your cart is ready (approximately 6 weeks)
                      </p>
                    </>
                  ) : (
                    <p className="refined-body text-sm text-yellow-800">
                      Pending deposit payment
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-200">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-rose-600 mt-0.5" />
                <div>
                  <h4 className="refined-title font-semibold text-sm mb-1">Order Status</h4>
                  <p className="refined-body text-sm text-zinc-700 capitalize">
                    {order.order_status.replace('_', ' ')}
                  </p>
                  {order.order_status === 'processing' && (
                    <p className="refined-body text-xs text-zinc-600 mt-1">
                      Your cart is being prepared. Estimated delivery: 6 weeks
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="h-px bg-zinc-200" />

            {/* Order Items */}
            <div>
              <h4 className="refined-title text-lg font-semibold text-zinc-900 mb-4">
                Order Items
              </h4>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4 p-4 bg-zinc-50 rounded-sm border border-zinc-200">
                    <div className="flex-1">
                      <h5 className="refined-body font-semibold text-zinc-900">{item.productName}</h5>
                      {item.variantName && (
                        <p className="refined-body text-sm text-zinc-600">{item.variantName}</p>
                      )}
                      <p className="refined-body text-sm text-zinc-600">Quantity: {item.quantity}</p>
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <div className="mt-2">
                          {item.selectedAddons.map((addon: any, i: number) => (
                            <p key={i} className="refined-body text-xs text-zinc-600">+ {addon.name}</p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="refined-body font-bold text-rose-800">
                        ${(item.total / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-zinc-200" />

            {/* Customer & Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="refined-title text-lg font-semibold text-zinc-900 mb-4">
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-rose-800 mt-0.5" />
                    <div>
                      <p className="refined-body text-sm text-zinc-500">Email</p>
                      <p className="refined-body text-zinc-900">{order.customer_email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-rose-800 mt-0.5" />
                    <div>
                      <p className="refined-body text-sm text-zinc-500">Phone</p>
                      <p className="refined-body text-zinc-900">{order.customer_phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="refined-title text-lg font-semibold text-zinc-900 mb-4">
                  Shipping Address
                </h4>
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-rose-800 mt-0.5" />
                  <div>
                    <p className="refined-body text-zinc-900">
                      {order.shipping_address.addressLine1}
                    </p>
                    {order.shipping_address.addressLine2 && (
                      <p className="refined-body text-zinc-900">
                        {order.shipping_address.addressLine2}
                      </p>
                    )}
                    <p className="refined-body text-zinc-900">
                      {order.shipping_address.city} {order.shipping_address.postalCode}
                    </p>
                    <p className="refined-body text-zinc-900">
                      {order.shipping_address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {order.special_instructions && (
              <>
                <div className="h-px bg-zinc-200" />
                <div>
                  <h4 className="refined-title text-lg font-semibold text-zinc-900 mb-2">
                    Special Instructions
                  </h4>
                  <p className="refined-body text-zinc-700">{order.special_instructions}</p>
                </div>
              </>
            )}

            <div className="h-px bg-zinc-200" />

            {/* Total */}
            <div className="bg-zinc-50 rounded-sm p-6 border-2 border-zinc-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="refined-body text-zinc-600">Subtotal</span>
                  <span className="refined-body text-zinc-900">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span className="refined-body font-semibold">Deposit Paid</span>
                  <span className="refined-body font-semibold">-${order.deposit_amount.toFixed(2)}</span>
                </div>
                <div className="h-px bg-zinc-300 my-2" />
                <div className="flex justify-between items-center">
                  <span className="refined-title text-xl font-semibold text-zinc-900">
                    Balance Due
                  </span>
                  <span className="refined-title text-3xl font-bold text-rose-900">
                    ${order.balance_due.toFixed(2)}
                  </span>
                </div>
                <p className="refined-body text-xs text-zinc-600 mt-2">
                  {depositPaid
                    ? "You'll receive an invoice for the balance when your cart is ready"
                    : "Complete your deposit payment to begin processing"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Link href="/products" className="flex-1">
                <Button className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-2 border-zinc-300 px-6 py-3 rounded-sm refined-body font-semibold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Account Creation Modal - Only show on successful payment if not logged in */}
        {order && (
          <AccountCreationModal
            isOpen={showAccountModal}
            onClose={() => setShowAccountModal(false)}
            customerName={order.customer_name}
            customerEmail={order.customer_email}
            customerPhone={order.customer_phone}
          />
        )}

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="refined-body text-zinc-600">
            Need help? Contact us at{' '}
            <a href="mailto:admin@clubcaddycarts.com" className="text-rose-800 hover:underline">
              admin@clubcaddycarts.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
