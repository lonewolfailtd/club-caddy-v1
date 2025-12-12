'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, CheckCircle, Clock, Package, AlertCircle, DollarSign } from 'lucide-react';
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
  created_at: string;
  deposit_paid_at: string | null;
  balance_invoice_sent_at: string | null;
  balance_paid_at: string | null;
}

export default function AdminOrdersPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingInvoice, setSendingInvoice] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchOrders();
    }
  }, [isAdmin]);

  const fetchOrders = async () => {
    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch orders:', error);
        return;
      }

      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvoice = async (orderId: string) => {
    setSendingInvoice(orderId);

    try {
      const response = await fetch(`/api/orders/${orderId}/send-balance-invoice`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to send invoice');
      }

      const result = await response.json();
      alert(`Invoice sent successfully to ${result.message}`);

      // Refresh orders
      await fetchOrders();
    } catch (error) {
      console.error('Send invoice error:', error);
      alert('Failed to send invoice. Please try again.');
    } finally {
      setSendingInvoice(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-800" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      deposit_paid: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle },
      invoice_sent: { bg: 'bg-purple-100', text: 'text-purple-800', icon: Mail },
      paid: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.replace('_', ' ')}
      </span>
    );
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.payment_status === filter;
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="refined-title text-3xl font-bold text-zinc-900">Order Management</h1>
          <p className="refined-body text-zinc-600 mt-2">
            Manage customer orders and send balance invoices
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg border border-zinc-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Orders' },
              { value: 'deposit_paid', label: 'Ready to Invoice' },
              { value: 'invoice_sent', label: 'Invoice Sent' },
              { value: 'paid', label: 'Fully Paid' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === value
                    ? 'bg-rose-800 text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {label}
                {value !== 'all' && (
                  <span className="ml-2 text-xs">
                    ({orders.filter(o => o.payment_status === value).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg border border-zinc-200 p-12 text-center">
            <Package className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <p className="refined-body text-zinc-600">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg border border-zinc-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="refined-title text-lg font-bold text-zinc-900">
                          Order #{order.order_number}
                        </h3>
                        <p className="refined-body text-sm text-zinc-600 mt-1">
                          {order.customer_name} • {order.customer_email}
                        </p>
                        <p className="refined-body text-xs text-zinc-500 mt-1">
                          Placed {format(new Date(order.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {getStatusBadge(order.payment_status)}
                        {getStatusBadge(order.order_status)}
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="grid grid-cols-3 gap-4 bg-zinc-50 rounded-lg p-4">
                      <div>
                        <p className="refined-body text-xs text-zinc-500">Total</p>
                        <p className="refined-body font-semibold text-zinc-900">
                          ${order.total_amount.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="refined-body text-xs text-zinc-500">Deposit</p>
                        <p className="refined-body font-semibold text-green-700">
                          ${order.deposit_amount.toFixed(2)} ✓
                        </p>
                      </div>
                      <div>
                        <p className="refined-body text-xs text-zinc-500">Balance</p>
                        <p className="refined-body font-semibold text-rose-800">
                          ${order.balance_due.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                      {order.deposit_paid_at && (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          Deposit: {format(new Date(order.deposit_paid_at), 'MMM d')}
                        </span>
                      )}
                      {order.balance_invoice_sent_at && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-purple-600" />
                          Invoice: {format(new Date(order.balance_invoice_sent_at), 'MMM d')}
                        </span>
                      )}
                      {order.balance_paid_at && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-green-600" />
                          Paid: {format(new Date(order.balance_paid_at), 'MMM d')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <a
                      href={`/orders/${order.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-zinc-300 hover:bg-zinc-100 text-zinc-700"
                      >
                        View Order
                      </Button>
                    </a>

                    {order.payment_status === 'deposit_paid' && (
                      <Button
                        onClick={() => handleSendInvoice(order.id)}
                        disabled={sendingInvoice === order.id}
                        className="w-full bg-rose-800 hover:bg-rose-900 text-white"
                      >
                        {sendingInvoice === order.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Invoice
                          </>
                        )}
                      </Button>
                    )}

                    {order.payment_status === 'invoice_sent' && (
                      <div className="text-center p-2 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-xs text-purple-800 font-medium">
                          Invoice sent • Awaiting payment
                        </p>
                      </div>
                    )}

                    {order.payment_status === 'paid' && (
                      <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-xs text-green-800 font-medium">
                          ✓ Fully paid • Ready for delivery
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
