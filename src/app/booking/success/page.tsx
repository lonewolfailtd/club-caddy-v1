'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Mail, Phone, Loader2, Download, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { BookingWithProduct } from '@/types/booking.types';
import { format } from 'date-fns';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [booking, setBooking] = useState<BookingWithProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooking() {
      if (!sessionId) {
        setError('No booking session found');
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();

        // Fetch booking by Stripe session ID
        const { data, error: fetchError } = await supabase
          .from('bookings')
          .select(`
            *,
            products (
              id,
              name,
              slug,
              tier,
              images,
              base_price
            )
          `)
          .eq('stripe_session_id', sessionId)
          .single();

        if (fetchError || !data) {
          setError('Booking not found');
          return;
        }

        setBooking(data as any);
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-rose-500 mx-auto mb-4" />
          <p className="text-zinc-400">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <Card className="p-8 bg-zinc-900/50 border-zinc-800 text-center max-w-md">
          <h2 className="text-xl font-bold text-white mb-2">Unable to Load Booking</h2>
          <p className="text-zinc-400 mb-6">
            {error || 'We couldn\'t find your booking details. Please check your email for confirmation.'}
          </p>
          <Link href="/">
            <Button className="bg-rose-800 hover:bg-rose-900">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-900/20 border-2 border-green-800 rounded-full mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-400" />
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-3">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-zinc-400">
              Thank you for your booking. We've sent a confirmation email to{' '}
              <span className="text-rose-400">{booking.customer_email}</span>
            </p>
          </div>

          {/* Booking Details Card */}
          <Card className="p-8 bg-zinc-900/50 border-zinc-800 mb-6">
            <div className="space-y-6">
              {/* Booking Number */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <div>
                  <div className="text-sm text-zinc-400 mb-1">Booking Number</div>
                  <div className="text-2xl font-bold text-white">
                    {booking.booking_number}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-zinc-400 mb-1">Total Paid</div>
                  <div className="text-2xl font-bold text-green-400">
                    ${booking.total_amount.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex gap-4 pb-6 border-b border-zinc-800">
                {booking.products.images[0] && (
                  <img
                    src={booking.products.images[0]}
                    alt={booking.products.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {booking.products.name}
                  </h3>
                  <p className="text-zinc-400">{booking.products.tier} Edition</p>
                  <p className="text-zinc-400 mt-2">
                    Quantity: <span className="text-white font-medium">{booking.quantity}</span>
                  </p>
                </div>
              </div>

              {/* Rental Details */}
              <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-zinc-800">
                <div>
                  <div className="flex items-center gap-2 text-zinc-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Rental Period</span>
                  </div>
                  <div className="text-white">
                    <div>{format(new Date(booking.start_date), 'EEEE, MMMM d, yyyy')}</div>
                    <div className="text-sm text-zinc-400">
                      {booking.rental_type === 'hourly'
                        ? format(new Date(booking.start_date), 'h:mm a')
                        : 'All day'}
                    </div>
                    <div className="text-zinc-500 my-1">to</div>
                    <div>{format(new Date(booking.end_date), 'EEEE, MMMM d, yyyy')}</div>
                    <div className="text-sm text-zinc-400">
                      {booking.rental_type === 'hourly'
                        ? format(new Date(booking.end_date), 'h:mm a')
                        : 'End of day'}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-zinc-400 mb-2">Rental Type</div>
                  <div className="text-white capitalize mb-4">
                    {booking.rental_type}
                    {booking.rental_type === 'hourly' && booking.duration_hours && (
                      <span className="text-zinc-400 ml-2">({booking.duration_hours} hours)</span>
                    )}
                    {booking.rental_type !== 'hourly' && booking.duration_days && (
                      <span className="text-zinc-400 ml-2">({booking.duration_days} days)</span>
                    )}
                  </div>

                  <div className="text-sm text-zinc-400 mb-2">
                    {booking.delivery_address ? 'Delivery Address' : 'Pickup Location'}
                  </div>
                  <div className="text-white">
                    {booking.delivery_address
                      ? `${booking.delivery_address.addressLine1}, ${booking.delivery_address.city}`
                      : booking.pickup_location}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div className="text-sm font-medium text-zinc-300 mb-3">Your Contact Information</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Mail className="w-4 h-4" />
                    <span>{booking.customer_email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Phone className="w-4 h-4" />
                    <span>{booking.customer_phone}</span>
                  </div>
                </div>
              </div>

              {booking.special_requests && (
                <div>
                  <div className="text-sm font-medium text-zinc-300 mb-2">Special Requests</div>
                  <div className="text-zinc-400 bg-zinc-800/50 p-3 rounded-lg">
                    {booking.special_requests}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* What's Next */}
          <Card className="p-6 bg-rose-900/10 border-rose-800 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">What happens next?</h3>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  You'll receive a confirmation email with your booking details and receipt
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  We'll send you a reminder 24 hours before your rental starts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  {booking.delivery_address
                    ? 'Your golf carts will be delivered to your specified address'
                    : 'Please arrive at the pickup location on time'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Our team will contact you if we need any additional information
                </span>
              </li>
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1">
              <Button className="w-full h-12 bg-zinc-800 hover:bg-zinc-700 text-white">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
            <Link href="/products" className="flex-1">
              <Button className="w-full h-12 bg-rose-800 hover:bg-rose-900 text-white">
                Browse More Products
              </Button>
            </Link>
          </div>

          {/* Support Information */}
          <div className="mt-8 text-center">
            <p className="text-zinc-400 mb-2">
              Questions about your booking?
            </p>
            <p className="text-zinc-500 text-sm">
              Contact us at{' '}
              <a href="mailto:support@clubcaddy.co.nz" className="text-rose-400 hover:text-rose-300">
                support@clubcaddy.co.nz
              </a>{' '}
              or call{' '}
              <a href="tel:+6421234567" className="text-rose-400 hover:text-rose-300">
                +64 21 234 567
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-rose-500" />
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  );
}
