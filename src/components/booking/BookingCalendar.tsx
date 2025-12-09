'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { RentalType, DateRange } from '@/types/booking.types';

interface BookingCalendarProps {
  productId: string;
  onDateChange: (startDate: Date | null, endDate: Date | null, rentalType: RentalType) => void;
  onPriceChange: (price: number, duration: number, rentalType: RentalType) => void;
  rentalPricing: {
    hourly_rate: number | null;
    hourly_minimum_hours: number;
    daily_rate: number | null;
    weekly_rate: number | null;
  };
  blockedDates?: Date[];
}

export default function BookingCalendar({
  productId,
  onDateChange,
  onPriceChange,
  rentalPricing,
  blockedDates = [],
}: BookingCalendarProps) {
  const [rentalType, setRentalType] = useState<RentalType>('daily');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('13:00');
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState<string>('');

  // Calculate price based on rental type and duration
  const calculatePrice = (type: RentalType, start: Date | null, end: Date | null): number => {
    if (!start || !end) return 0;

    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    let price = 0;
    let duration = 0;

    switch (type) {
      case 'hourly':
        duration = Math.ceil(diffHours);
        if (duration < rentalPricing.hourly_minimum_hours) {
          duration = rentalPricing.hourly_minimum_hours;
        }
        price = (rentalPricing.hourly_rate || 0) * duration;
        break;

      case 'daily':
        duration = Math.ceil(diffDays);
        price = (rentalPricing.daily_rate || 0) * duration;
        break;

      case 'weekly':
        const weeks = Math.ceil(diffDays / 7);
        duration = weeks;
        price = (rentalPricing.weekly_rate || 0) * weeks;
        break;

      case 'custom':
        duration = Math.ceil(diffDays);
        price = (rentalPricing.daily_rate || 0) * duration;
        break;
    }

    return price;
  };

  // Handle rental type change
  const handleRentalTypeChange = (type: RentalType) => {
    setRentalType(type);

    // Reset dates when changing rental type
    if (startDate && endDate) {
      const price = calculatePrice(type, startDate, endDate);
      const duration = type === 'hourly'
        ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60))
        : Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

      onPriceChange(price, duration, type);
      onDateChange(startDate, endDate, type);
    }
  };

  // Handle date/time changes
  useEffect(() => {
    if (startDate && (rentalType === 'hourly' ? endTime : endDate)) {
      let finalStartDate = startDate;
      let finalEndDate: Date;

      if (rentalType === 'hourly') {
        // Combine date and time for hourly rentals
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);

        finalStartDate = new Date(startDate);
        finalStartDate.setHours(startHour, startMin, 0, 0);

        finalEndDate = new Date(startDate);
        finalEndDate.setHours(endHour, endMin, 0, 0);

        // Ensure minimum hours
        const diffHours = (finalEndDate.getTime() - finalStartDate.getTime()) / (1000 * 60 * 60);
        if (diffHours < rentalPricing.hourly_minimum_hours) {
          finalEndDate = new Date(finalStartDate);
          finalEndDate.setHours(finalStartDate.getHours() + rentalPricing.hourly_minimum_hours);
          setEndTime(
            `${String(finalEndDate.getHours()).padStart(2, '0')}:${String(finalEndDate.getMinutes()).padStart(2, '0')}`
          );
        }
      } else {
        finalEndDate = endDate || new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
      }

      const price = calculatePrice(rentalType, finalStartDate, finalEndDate);
      const duration = rentalType === 'hourly'
        ? Math.ceil((finalEndDate.getTime() - finalStartDate.getTime()) / (1000 * 60 * 60))
        : Math.ceil((finalEndDate.getTime() - finalStartDate.getTime()) / (1000 * 60 * 60 * 24));

      onPriceChange(price, duration, rentalType);
      onDateChange(finalStartDate, finalEndDate, rentalType);
    }
  }, [startDate, endDate, startTime, endTime, rentalType]);

  // Check if date is blocked
  const isDateBlocked = (date: Date): boolean => {
    return blockedDates.some(
      (blocked) =>
        blocked.toDateString() === date.toDateString()
    );
  };

  // Get today's date (minimum selectable date)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-zinc-900/50 border-zinc-800">
        <div className="space-y-6">
          {/* Rental Type Selection */}
          <div>
            <Label className="text-zinc-400 mb-3 block">Select Rental Period</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {rentalPricing.hourly_rate && (
                <button
                  onClick={() => handleRentalTypeChange('hourly')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    rentalType === 'hourly'
                      ? 'border-rose-800 bg-rose-900/20'
                      : 'border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  <Clock className="w-5 h-5 mb-2 mx-auto" />
                  <div className="text-sm font-medium">Hourly</div>
                  <div className="text-xs text-zinc-400">Min {rentalPricing.hourly_minimum_hours}hrs</div>
                </button>
              )}

              {rentalPricing.daily_rate && (
                <button
                  onClick={() => handleRentalTypeChange('daily')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    rentalType === 'daily'
                      ? 'border-rose-800 bg-rose-900/20'
                      : 'border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  <Calendar className="w-5 h-5 mb-2 mx-auto" />
                  <div className="text-sm font-medium">Daily</div>
                  <div className="text-xs text-zinc-400">${rentalPricing.daily_rate}/day</div>
                </button>
              )}

              {rentalPricing.weekly_rate && (
                <button
                  onClick={() => handleRentalTypeChange('weekly')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    rentalType === 'weekly'
                      ? 'border-rose-800 bg-rose-900/20'
                      : 'border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  <Calendar className="w-5 h-5 mb-2 mx-auto" />
                  <div className="text-sm font-medium">Weekly</div>
                  <div className="text-xs text-zinc-400">${rentalPricing.weekly_rate}/week</div>
                </button>
              )}

              <button
                onClick={() => handleRentalTypeChange('custom')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  rentalType === 'custom'
                    ? 'border-rose-800 bg-rose-900/20'
                    : 'border-zinc-700 hover:border-zinc-600'
                }`}
              >
                <Calendar className="w-5 h-5 mb-2 mx-auto" />
                <div className="text-sm font-medium">Custom</div>
                <div className="text-xs text-zinc-400">Any range</div>
              </button>
            </div>
          </div>

          {/* Date Selection */}
          {rentalType === 'hourly' ? (
            <div className="space-y-4">
              <div>
                <Label className="text-zinc-400 mb-2 block">Select Date</Label>
                <input
                  type="date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                  min={today.toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-400 mb-2 block">Start Time</Label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <Label className="text-zinc-400 mb-2 block">End Time</Label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-800"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-400 mb-2 block">Start Date</Label>
                <input
                  type="date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                  min={today.toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-800"
                />
              </div>

              <div>
                <Label className="text-zinc-400 mb-2 block">End Date</Label>
                <input
                  type="date"
                  value={endDate ? endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                  min={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : today.toISOString().split('T')[0]}
                  disabled={!startDate}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-800 disabled:opacity-50"
                />
              </div>
            </div>
          )}

          {/* Availability Message */}
          {availabilityMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-lg ${
                availabilityMessage.includes('available')
                  ? 'bg-green-900/20 border border-green-800 text-green-400'
                  : 'bg-red-900/20 border border-red-800 text-red-400'
              }`}
            >
              {availabilityMessage}
            </motion.div>
          )}

          {/* Price Display */}
          {startDate && (rentalType === 'hourly' ? endTime : endDate) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-rose-900/20 border border-rose-800 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Estimated Price</span>
                <span className="text-2xl font-bold text-white">
                  ${calculatePrice(rentalType, startDate, rentalType === 'hourly' ? (() => {
                    const [h, m] = endTime.split(':').map(Number);
                    const d = new Date(startDate);
                    d.setHours(h, m, 0, 0);
                    return d;
                  })() : endDate).toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                {rentalType === 'hourly' && (() => {
                  const [sh, sm] = startTime.split(':').map(Number);
                  const [eh, em] = endTime.split(':').map(Number);
                  const start = new Date(startDate);
                  start.setHours(sh, sm, 0, 0);
                  const end = new Date(startDate);
                  end.setHours(eh, em, 0, 0);
                  const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
                  return `${hours} hours × $${rentalPricing.hourly_rate}/hour`;
                })()}
                {rentalType === 'daily' && endDate && `${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days × $${rentalPricing.daily_rate}/day`}
                {rentalType === 'weekly' && endDate && `${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks × $${rentalPricing.weekly_rate}/week`}
                {rentalType === 'custom' && endDate && `${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days × $${rentalPricing.daily_rate}/day`}
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
