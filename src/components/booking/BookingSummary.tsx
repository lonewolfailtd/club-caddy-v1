'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Package, DollarSign, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { RentalType, BookingAddon } from '@/types/booking.types';
import { format } from 'date-fns';

interface BookingSummaryProps {
  product: {
    name: string;
    tier: string;
    images: string[];
  };
  rentalType: RentalType;
  startDate: Date | null;
  endDate: Date | null;
  duration: number;
  quantity: number;
  unitPrice: number;
  selectedAddons: BookingAddon[];
  deliveryAddress?: {
    addressLine1: string;
    city: string;
    postalCode: string;
  } | null;
  pickupLocation?: string | null;
  taxRate?: number;
}

export default function BookingSummary({
  product,
  rentalType,
  startDate,
  endDate,
  duration,
  quantity,
  unitPrice,
  selectedAddons,
  deliveryAddress,
  pickupLocation,
  taxRate = 0.15, // 15% GST (New Zealand)
}: BookingSummaryProps) {
  // Calculate pricing
  const baseTotal = unitPrice * quantity;
  const addonsTotal = selectedAddons.reduce(
    (sum, addon) => sum + addon.price * (addon.quantity || 1),
    0
  );
  const subtotal = baseTotal + addonsTotal;
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  // Format dates
  const formatDate = (date: Date | null) => {
    if (!date) return 'Not selected';
    return format(date, 'MMM dd, yyyy');
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return 'Not selected';
    return format(date, 'MMM dd, yyyy h:mm a');
  };

  // Get duration display
  const getDurationDisplay = () => {
    if (rentalType === 'hourly') {
      return `${duration} hour${duration > 1 ? 's' : ''}`;
    } else if (rentalType === 'weekly') {
      return `${duration} week${duration > 1 ? 's' : ''}`;
    } else {
      return `${duration} day${duration > 1 ? 's' : ''}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-4"
    >
      <Card className="p-6 bg-zinc-900/50 border-zinc-800">
        <h3 className="text-xl font-bold text-white mb-6">Booking Summary</h3>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex gap-4">
            {product.images[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-white">{product.name}</h4>
              <p className="text-sm text-zinc-400">{product.tier} Edition</p>
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Rental Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-rose-500 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-zinc-400">Rental Period</div>
                <div className="text-white font-medium">
                  {rentalType === 'hourly' ? formatDateTime(startDate) : formatDate(startDate)}
                </div>
                <div className="text-white font-medium">
                  to {rentalType === 'hourly' ? formatDateTime(endDate) : formatDate(endDate)}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-rose-500 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-zinc-400">Duration</div>
                <div className="text-white font-medium">
                  {getDurationDisplay()} ({rentalType} rental)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-rose-500 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-zinc-400">Quantity</div>
                <div className="text-white font-medium">
                  {quantity} golf cart{quantity > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {(deliveryAddress || pickupLocation) && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-500 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm text-zinc-400">
                    {deliveryAddress ? 'Delivery Address' : 'Pickup Location'}
                  </div>
                  <div className="text-white font-medium">
                    {deliveryAddress
                      ? `${deliveryAddress.addressLine1}, ${deliveryAddress.city} ${deliveryAddress.postalCode}`
                      : pickupLocation}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Pricing Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">
                Base rental ({quantity} × ${unitPrice.toFixed(2)})
              </span>
              <span className="text-white font-medium">
                ${baseTotal.toFixed(2)}
              </span>
            </div>

            {selectedAddons.length > 0 && (
              <>
                <div className="text-sm font-medium text-zinc-300 mt-4 mb-2">Add-ons</div>
                {selectedAddons.map((addon, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">
                      {addon.name} {addon.quantity && addon.quantity > 1 ? `(×${addon.quantity})` : ''}
                    </span>
                    <span className="text-white">
                      ${(addon.price * (addon.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </>
            )}

            <div className="h-px bg-zinc-700" />

            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Subtotal</span>
              <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-zinc-400">GST ({(taxRate * 100).toFixed(0)}%)</span>
              <span className="text-white font-medium">${taxAmount.toFixed(2)}</span>
            </div>

            <div className="h-px bg-zinc-700" />

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-white">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Payment Terms */}
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-zinc-500 leading-relaxed">
                <p className="mb-2">
                  <strong className="text-zinc-400">Payment Terms:</strong> Full payment is required upfront to secure your booking.
                </p>
                <p className="mb-2">
                  <strong className="text-zinc-400">Cancellation Policy:</strong> Free cancellation up to 48 hours before your rental start time. Cancellations within 48 hours are subject to a 50% fee.
                </p>
                <p>
                  <strong className="text-zinc-400">Security Deposit:</strong> A refundable security deposit may be required at pickup, depending on your rental duration.
                </p>
              </div>
            </div>
          </div>

          {/* Secure Payment Badge */}
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm font-medium text-green-400">
                  Secure Payment via Stripe
                </div>
                <div className="text-xs text-green-500 mt-0.5">
                  Your payment information is encrypted and secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
