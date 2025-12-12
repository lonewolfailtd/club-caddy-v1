'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, Calendar, MapPin, Package, Mail, Phone, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import AccountCreationPrompt from '@/components/auth/AccountCreationPrompt';

interface Booking {
  id: string;
  booking_number: string;
  status: string;
  payment_status: string;
  rental_type: string;
  start_date: string;
  end_date: string;
  quantity: number;
  total_amount: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: any;
  pickup_location: string;
  special_requests: string;
  duration_hours: number;
  duration_days: number;
  products: {
    name: string;
    tier: string;
    images: string[];
  };
}

export default function BookingConfirmationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = params.id as string;
  const isSuccess = searchParams.get('success') === 'true';
  const isCancelled = searchParams.get('cancelled') === 'true';

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const supabase = createClient();

        const { data, error } = await (supabase
          .from('bookings') as any)
          .select(`
            *,
            products (
              name,
              tier,
              images
            )
          `)
          .eq('id', bookingId)
          .single();

        if (error || !data) {
          setError('Booking not found');
          return;
        }

        setBooking(data);
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking');
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-800" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg border-2 border-zinc-200 shadow-lg text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Booking Not Found</h2>
          <p className="text-zinc-600 mb-6">{error}</p>
          <Link href="/hire">
            <Button className="bg-rose-800 hover:bg-rose-900 text-white px-6 py-2 rounded-sm">
              Back to Rentals
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
  };

  const getDurationDisplay = () => {
    if (booking.rental_type === 'hourly') {
      return `${booking.duration_hours} hour${booking.duration_hours > 1 ? 's' : ''}`;
    }
    return `${booking.duration_days} day${booking.duration_days > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');
        .refined-title { font-family: 'Playfair Display', serif; }
        .refined-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Success/Cancelled Message */}
        {isSuccess && booking.payment_status === 'paid' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-2 border-green-600 rounded-lg p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="refined-title text-2xl font-bold text-green-900 mb-2">
                  Payment Successful!
                </h2>
                <p className="refined-body text-green-800">
                  Your booking has been confirmed. A confirmation email has been sent to{' '}
                  <strong>{booking.customer_email}</strong>.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {isCancelled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border-2 border-amber-600 rounded-lg p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="refined-title text-2xl font-bold text-amber-900 mb-2">
                  Payment Cancelled
                </h2>
                <p className="refined-body text-amber-800">
                  Your payment was cancelled. Your booking is still pending. You can complete
                  payment by clicking the button below.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border-2 border-zinc-200 shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-rose-800 text-white p-8">
            <h1 className="refined-title text-3xl font-bold mb-2">Booking Confirmation</h1>
            <p className="refined-body text-rose-100">
              Booking #{booking.booking_number}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-sm">
              <span className="refined-body text-sm">
                Status: <strong className="uppercase">{booking.status}</strong>
              </span>
              <span className="text-white/40">•</span>
              <span className="refined-body text-sm">
                Payment: <strong className="uppercase">{booking.payment_status}</strong>
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Product Info */}
            <div className="flex gap-6">
              {booking.products.images[0] && (
                <img
                  src={booking.products.images[0]}
                  alt={booking.products.name}
                  className="w-32 h-32 object-cover rounded-sm border-2 border-zinc-200"
                />
              )}
              <div className="flex-1">
                <h3 className="refined-title text-2xl font-bold text-zinc-900 mb-2">
                  {booking.products.name}
                </h3>
                <p className="refined-body text-lg text-zinc-600">
                  {booking.products.tier} Edition
                </p>
                <div className="mt-4">
                  <span className="refined-body text-sm text-zinc-500 uppercase tracking-wider">
                    Rental Period
                  </span>
                  <p className="refined-body text-zinc-900 font-medium mt-1">
                    {formatDate(booking.start_date)}
                  </p>
                  <p className="refined-body text-zinc-900 font-medium">
                    to {formatDate(booking.end_date)}
                  </p>
                  <p className="refined-body text-sm text-zinc-600 mt-1">
                    {getDurationDisplay()} • {booking.rental_type} rental
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-zinc-200" />

            {/* Booking Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="refined-title text-lg font-semibold text-zinc-900">
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-rose-800 mt-0.5" />
                    <div>
                      <p className="refined-body text-sm text-zinc-500">Email</p>
                      <p className="refined-body text-zinc-900">{booking.customer_email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-rose-800 mt-0.5" />
                    <div>
                      <p className="refined-body text-sm text-zinc-500">Phone</p>
                      <p className="refined-body text-zinc-900">{booking.customer_phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="refined-title text-lg font-semibold text-zinc-900">
                  Rental Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-rose-800 mt-0.5" />
                    <div>
                      <p className="refined-body text-sm text-zinc-500">Quantity</p>
                      <p className="refined-body text-zinc-900">
                        {booking.quantity} cart{booking.quantity > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-rose-800 mt-0.5" />
                    <div>
                      <p className="refined-body text-sm text-zinc-500">
                        {booking.delivery_address ? 'Delivery Address' : 'Pickup Location'}
                      </p>
                      <p className="refined-body text-zinc-900">
                        {booking.delivery_address
                          ? `${booking.delivery_address.addressLine1}, ${booking.delivery_address.city} ${booking.delivery_address.postalCode}`
                          : booking.pickup_location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {booking.special_requests && (
              <>
                <div className="h-px bg-zinc-200" />
                <div>
                  <h4 className="refined-title text-lg font-semibold text-zinc-900 mb-2">
                    Special Requests
                  </h4>
                  <p className="refined-body text-zinc-700">{booking.special_requests}</p>
                </div>
              </>
            )}

            <div className="h-px bg-zinc-200" />

            {/* Total */}
            <div className="bg-zinc-50 rounded-sm p-6 border-2 border-zinc-200">
              <div className="flex justify-between items-center">
                <span className="refined-title text-xl font-semibold text-zinc-900">
                  Total Amount
                </span>
                <span className="refined-title text-3xl font-bold text-rose-900">
                  ${booking.total_amount.toFixed(2)}
                </span>
              </div>
              <p className="refined-body text-sm text-zinc-600 mt-2">
                Includes GST (15%)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Link href="/hire" className="flex-1">
                <Button className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-2 border-zinc-300 px-6 py-3 rounded-sm refined-body font-semibold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Rentals
                </Button>
              </Link>

              {booking.payment_status === 'pending' && (
                <Button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/stripe/create-checkout-session', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ bookingId: booking.id }),
                      });

                      const { url } = await response.json();
                      window.location.href = url;
                    } catch (error) {
                      console.error('Payment error:', error);
                    }
                  }}
                  className="flex-1 bg-rose-800 hover:bg-rose-900 text-white px-6 py-3 rounded-sm refined-body font-semibold"
                >
                  Complete Payment
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Account Creation Prompt - Only show on successful payment */}
        {isSuccess && booking.payment_status === 'paid' && (
          <AccountCreationPrompt
            customerName={booking.customer_name}
            customerEmail={booking.customer_email}
            customerPhone={booking.customer_phone}
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
