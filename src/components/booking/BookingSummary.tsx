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
  needsDelivery?: boolean;
  deliveryFee?: number;
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
  needsDelivery = false,
  deliveryFee = 50, // Default delivery fee
  taxRate = 0.15, // 15% GST (New Zealand)
}: BookingSummaryProps) {
  // Calculate pricing
  const baseTotal = unitPrice * quantity;
  const addonsTotal = selectedAddons.reduce(
    (sum, addon) => sum + addon.price * (addon.quantity || 1),
    0
  );
  const deliveryCharge = needsDelivery ? deliveryFee : 0;
  const subtotal = baseTotal + addonsTotal + deliveryCharge;
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
      <Card className="p-8 bg-white border-2 border-zinc-200 shadow-lg">
        <h3 className="refined-title text-2xl font-bold text-zinc-900 mb-6">{product.tier} Golf Cart Package</h3>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex gap-4">
            {product.images[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-sm border-2 border-zinc-200"
              />
            )}
            <div className="flex-1">
              <h4 className="refined-body font-semibold text-zinc-900">{product.name}</h4>
              <p className="refined-body text-sm text-zinc-600">{product.tier} Edition</p>
            </div>
          </div>

          <div className="h-px bg-zinc-200" />

          {/* Rental Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-rose-800 mt-0.5" />
              <div className="flex-1">
                <div className="refined-body text-sm text-zinc-500 uppercase tracking-wider mb-1">Rental Period</div>
                <div className="refined-body text-zinc-900 font-medium">
                  {rentalType === 'hourly' ? formatDateTime(startDate) : formatDate(startDate)}
                </div>
                <div className="refined-body text-zinc-900 font-medium">
                  to {rentalType === 'hourly' ? formatDateTime(endDate) : formatDate(endDate)}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-rose-800 mt-0.5" />
              <div className="flex-1">
                <div className="refined-body text-sm text-zinc-500 uppercase tracking-wider mb-1">Duration</div>
                <div className="refined-body text-zinc-900 font-medium">
                  {getDurationDisplay()} ({rentalType} rental)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-rose-800 mt-0.5" />
              <div className="flex-1">
                <div className="refined-body text-sm text-zinc-500 uppercase tracking-wider mb-1">Quantity</div>
                <div className="refined-body text-zinc-900 font-medium">
                  {quantity} golf cart{quantity > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {(deliveryAddress || pickupLocation) && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-800 mt-0.5" />
                <div className="flex-1">
                  <div className="refined-body text-sm text-zinc-500 uppercase tracking-wider mb-1">
                    {deliveryAddress ? 'Delivery Address' : 'Pickup Location'}
                  </div>
                  <div className="refined-body text-zinc-900 font-medium">
                    {deliveryAddress
                      ? `${deliveryAddress.addressLine1}, ${deliveryAddress.city} ${deliveryAddress.postalCode}`
                      : pickupLocation}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-zinc-200" />

          {/* Pricing Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="refined-body text-zinc-600">
                Base rental ({quantity} × ${unitPrice.toFixed(2)})
              </span>
              <span className="refined-body text-zinc-900 font-medium">
                ${baseTotal.toFixed(2)}
              </span>
            </div>

            {selectedAddons.length > 0 && (
              <>
                <div className="refined-body text-sm font-medium text-zinc-700 mt-4 mb-2">Add-ons</div>
                {selectedAddons.map((addon, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="refined-body text-zinc-600">
                      {addon.name} {addon.quantity && addon.quantity > 1 ? `(×${addon.quantity})` : ''}
                    </span>
                    <span className="refined-body text-zinc-900">
                      ${(addon.price * (addon.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </>
            )}

            {needsDelivery && (
              <div className="flex justify-between items-center">
                <span className="refined-body text-zinc-600">
                  Delivery Fee
                </span>
                <span className="refined-body text-zinc-900 font-medium">
                  ${deliveryCharge.toFixed(2)}
                </span>
              </div>
            )}

            <div className="h-px bg-zinc-200" />

            <div className="flex justify-between items-center">
              <span className="refined-body text-zinc-600">Subtotal</span>
              <span className="refined-body text-zinc-900 font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="refined-body text-zinc-600">GST ({(taxRate * 100).toFixed(0)}%)</span>
              <span className="refined-body text-zinc-900 font-medium">${taxAmount.toFixed(2)}</span>
            </div>

            <div className="h-px bg-zinc-200" />

            <div className="flex justify-between items-center p-6 bg-rose-50 border-2 border-rose-800">
              <span className="refined-title text-lg font-semibold text-zinc-900">Total</span>
              <span className="refined-title text-3xl font-bold text-rose-900">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="h-px bg-zinc-200" />

          {/* Payment Terms */}
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-rose-800 mt-0.5 flex-shrink-0" />
              <div className="refined-body text-xs text-zinc-600 leading-relaxed">
                <p className="mb-2">
                  <strong className="text-zinc-900">Payment Terms:</strong> Full payment is required upfront to secure your booking.
                </p>
                <p className="mb-2">
                  <strong className="text-zinc-900">Cancellation Policy:</strong> Free cancellation up to 48 hours before your rental start time. Cancellations within 48 hours are subject to a 50% fee.
                </p>
                <p>
                  <strong className="text-zinc-900">Security Deposit:</strong> A refundable security deposit may be required at pickup, depending on your rental duration.
                </p>
              </div>
            </div>
          </div>

          {/* Secure Payment Badge */}
          <div className="bg-rose-50 border-2 border-rose-800 rounded-sm p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-rose-800" />
              <div>
                <div className="refined-body text-sm font-semibold text-rose-900">
                  Secure Payment
                </div>
                <div className="refined-body text-xs text-rose-800 mt-0.5">
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
