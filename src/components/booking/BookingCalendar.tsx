'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

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
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);

        finalStartDate = new Date(startDate);
        finalStartDate.setHours(startHour, startMin, 0, 0);

        finalEndDate = new Date(startDate);
        finalEndDate.setHours(endHour, endMin, 0, 0);

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

  // Calendar utilities
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    selected.setHours(12, 0, 0, 0);

    if (!startDate || (startDate && endDate)) {
      setStartDate(selected);
      setEndDate(null);
      setIsSelectingEnd(true);
    } else if (startDate && !endDate) {
      if (selected > startDate) {
        setEndDate(selected);
        setIsSelectingEnd(false);
      } else {
        setStartDate(selected);
        setEndDate(null);
      }
    }
  };

  const isDateInRange = (day: number) => {
    if (!startDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(12, 0, 0, 0);

    if (endDate) {
      return date >= startDate && date <= endDate;
    }
    return false;
  };

  const isDateSelected = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(12, 0, 0, 0);

    return (startDate && date.toDateString() === startDate.toDateString()) ||
           (endDate && date.toDateString() === endDate.toDateString());
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');
        .refined-title { font-family: 'Playfair Display', serif; }
        .refined-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <Card className="p-8 bg-white border border-zinc-200 shadow-sm">
        <div className="space-y-8">
          {/* Rental Type Selection */}
          <div>
            <h3 className="refined-title text-2xl font-bold text-zinc-900 mb-6">Select Rental Period</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {rentalPricing.hourly_rate && (
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRentalTypeChange('hourly')}
                  className={`p-6 border-2 transition-all duration-300 ${
                    rentalType === 'hourly'
                      ? 'border-rose-800 bg-rose-50'
                      : 'border-zinc-200 hover:border-zinc-400 bg-white'
                  }`}
                >
                  <Clock className={`w-6 h-6 mb-3 mx-auto ${rentalType === 'hourly' ? 'text-rose-800' : 'text-zinc-400'}`} />
                  <div className="refined-body text-sm font-semibold text-zinc-900">Hourly</div>
                  <div className="refined-body text-xs text-zinc-500 mt-1">Min {rentalPricing.hourly_minimum_hours}hrs</div>
                </motion.button>
              )}

              {rentalPricing.daily_rate && (
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRentalTypeChange('daily')}
                  className={`p-6 border-2 transition-all duration-300 ${
                    rentalType === 'daily'
                      ? 'border-rose-800 bg-rose-50'
                      : 'border-zinc-200 hover:border-zinc-400 bg-white'
                  }`}
                >
                  <Calendar className={`w-6 h-6 mb-3 mx-auto ${rentalType === 'daily' ? 'text-rose-800' : 'text-zinc-400'}`} />
                  <div className="refined-body text-sm font-semibold text-zinc-900">Daily</div>
                  <div className="refined-body text-xs text-zinc-500 mt-1">${rentalPricing.daily_rate}/day</div>
                </motion.button>
              )}

              {rentalPricing.weekly_rate && (
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRentalTypeChange('weekly')}
                  className={`p-6 border-2 transition-all duration-300 ${
                    rentalType === 'weekly'
                      ? 'border-rose-800 bg-rose-50'
                      : 'border-zinc-200 hover:border-zinc-400 bg-white'
                  }`}
                >
                  <Calendar className={`w-6 h-6 mb-3 mx-auto ${rentalType === 'weekly' ? 'text-rose-800' : 'text-zinc-400'}`} />
                  <div className="refined-body text-sm font-semibold text-zinc-900">Weekly</div>
                  <div className="refined-body text-xs text-zinc-500 mt-1">${rentalPricing.weekly_rate}/week</div>
                </motion.button>
              )}

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRentalTypeChange('custom')}
                className={`p-6 border-2 transition-all duration-300 ${
                  rentalType === 'custom'
                    ? 'border-rose-800 bg-rose-50'
                    : 'border-zinc-200 hover:border-zinc-400 bg-white'
                }`}
              >
                <Calendar className={`w-6 h-6 mb-3 mx-auto ${rentalType === 'custom' ? 'text-rose-800' : 'text-zinc-400'}`} />
                <div className="refined-body text-sm font-semibold text-zinc-900">Custom</div>
                <div className="refined-body text-xs text-zinc-500 mt-1">Any range</div>
              </motion.button>
            </div>
          </div>

          <div className="w-full h-px bg-zinc-200"></div>

          {/* Calendar or Time Selection */}
          {rentalType === 'hourly' ? (
            <div className="space-y-6">
              <div>
                <Label className="refined-body text-sm font-medium text-zinc-700 mb-3 block">Select Date</Label>
                <input
                  type="date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                  min={today.toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-white border-2 border-zinc-200 text-zinc-900 focus:outline-none focus:border-rose-800 transition-colors refined-body"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="refined-body text-sm font-medium text-zinc-700 mb-3 block">Start Time</Label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-zinc-200 text-zinc-900 focus:outline-none focus:border-rose-800 transition-colors refined-body"
                  />
                </div>

                <div>
                  <Label className="refined-body text-sm font-medium text-zinc-700 mb-3 block">End Time</Label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-zinc-200 text-zinc-900 focus:outline-none focus:border-rose-800 transition-colors refined-body"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Custom Calendar */}
              <div className="bg-zinc-50 border border-zinc-200 p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <motion.button
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-white transition-colors border border-transparent hover:border-zinc-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-zinc-600" />
                  </motion.button>

                  <h4 className="refined-title text-lg font-semibold text-zinc-900">{monthName}</h4>

                  <motion.button
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-white transition-colors border border-transparent hover:border-zinc-200"
                  >
                    <ChevronRight className="w-5 h-5 text-zinc-600" />
                  </motion.button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center">
                      <span className="refined-body text-xs font-medium text-zinc-500 uppercase tracking-wider">{day}</span>
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                  ))}

                  {/* Days of the month */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    date.setHours(12, 0, 0, 0);
                    const isPast = date < today;
                    const isSelected = isDateSelected(day);
                    const inRange = isDateInRange(day);

                    return (
                      <motion.button
                        key={day}
                        whileHover={!isPast ? { scale: 1.05 } : {}}
                        whileTap={!isPast ? { scale: 0.95 } : {}}
                        onClick={() => !isPast && handleDateClick(day)}
                        disabled={isPast}
                        className={`aspect-square flex items-center justify-center refined-body text-sm font-medium transition-all ${
                          isPast
                            ? 'text-zinc-300 cursor-not-allowed'
                            : isSelected
                            ? 'bg-rose-800 text-white border-2 border-rose-800'
                            : inRange
                            ? 'bg-rose-100 text-rose-900 border-2 border-rose-200'
                            : 'text-zinc-700 hover:bg-white hover:border-2 hover:border-zinc-300 border-2 border-transparent'
                        }`}
                      >
                        {day}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Helper Text */}
                {startDate && !endDate && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="refined-body text-xs text-zinc-600 mt-4 text-center"
                  >
                    Select an end date
                  </motion.p>
                )}
              </div>

              {/* Selected Dates Display */}
              {startDate && endDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-zinc-50 border border-zinc-200"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="refined-body text-zinc-500">Start:</span>
                      <span className="refined-body font-semibold text-zinc-900 ml-2">
                        {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="text-zinc-400">→</div>
                    <div>
                      <span className="refined-body text-zinc-500">End:</span>
                      <span className="refined-body font-semibold text-zinc-900 ml-2">
                        {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Price Display */}
          {startDate && (rentalType === 'hourly' ? endTime : endDate) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-zinc-900 border-2 border-zinc-900"
            >
              <div className="flex justify-between items-center">
                <span className="refined-body text-sm uppercase tracking-wider text-zinc-400">Estimated Price</span>
                <span className="refined-title text-3xl font-bold text-white">
                  ${calculatePrice(rentalType, startDate, rentalType === 'hourly' ? (() => {
                    const [h, m] = endTime.split(':').map(Number);
                    const d = new Date(startDate);
                    d.setHours(h, m, 0, 0);
                    return d;
                  })() : endDate).toFixed(2)}
                </span>
              </div>
              <div className="refined-body text-xs text-zinc-500 mt-2">
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
