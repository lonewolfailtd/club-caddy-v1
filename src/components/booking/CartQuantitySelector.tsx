'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Users, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface CartQuantitySelectorProps {
  productId: string;
  startDate: Date | null;
  endDate: Date | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity?: number;
  unitPrice: number;
  checkAvailability?: (quantity: number) => Promise<boolean>;
}

export default function CartQuantitySelector({
  productId,
  startDate,
  endDate,
  quantity,
  onQuantityChange,
  maxQuantity = 20,
  unitPrice,
  checkAvailability,
}: CartQuantitySelectorProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState<{
    available: boolean;
    message: string;
  } | null>(null);

  // Check availability whenever quantity or dates change
  useEffect(() => {
    if (startDate && endDate && checkAvailability) {
      checkQuantityAvailability(quantity);
    }
  }, [quantity, startDate, endDate]);

  const checkQuantityAvailability = async (qty: number) => {
    if (!checkAvailability || !startDate || !endDate) return;

    setIsChecking(true);
    try {
      const available = await checkAvailability(qty);
      setAvailabilityStatus({
        available,
        message: available
          ? `${qty} cart${qty > 1 ? 's' : ''} available for your selected dates`
          : `Only fewer carts available for your selected dates`,
      });
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailabilityStatus({
        available: false,
        message: 'Unable to check availability. Please try again.',
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      onQuantityChange(value);
    }
  };

  // Get messaging based on quantity
  const getQuantityMessage = () => {
    if (quantity >= 10) {
      return {
        icon: <Users className="w-5 h-5" />,
        text: 'Excellent for large events and tournaments!',
        color: 'text-purple-400',
      };
    } else if (quantity >= 5) {
      return {
        icon: <Users className="w-5 h-5" />,
        text: 'Perfect for corporate events and functions!',
        color: 'text-blue-400',
      };
    } else if (quantity >= 3) {
      return {
        icon: <Users className="w-5 h-5" />,
        text: 'Great for small group events!',
        color: 'text-green-400',
      };
    }
    return null;
  };

  const quantityMessage = getQuantityMessage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-6 bg-zinc-900/50 border-zinc-800">
        <div className="space-y-6">
          {/* Quantity Selector */}
          <div>
            <Label className="text-zinc-400 mb-3 block">Number of Golf Carts</Label>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="h-12 w-12 border-zinc-700 hover:border-rose-800 hover:bg-rose-900/20"
              >
                <Minus className="h-5 w-5" />
              </Button>

              <div className="flex-1 relative">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  min={1}
                  max={maxQuantity}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-rose-800"
                />
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={quantity >= maxQuantity}
                className="h-12 w-12 border-zinc-700 hover:border-rose-800 hover:bg-rose-900/20"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex justify-between items-center mt-2 text-sm text-zinc-500">
              <span>Minimum: 1 cart</span>
              <span>Maximum: {maxQuantity} carts</span>
            </div>
          </div>

          {/* Availability Status */}
          {startDate && endDate && (
            <div>
              {isChecking ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg"
                >
                  <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                  <span className="text-zinc-400">Checking availability...</span>
                </motion.div>
              ) : availabilityStatus ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center gap-2 p-3 rounded-lg border ${
                    availabilityStatus.available
                      ? 'bg-green-900/20 border-green-800'
                      : 'bg-red-900/20 border-red-800'
                  }`}
                >
                  {availabilityStatus.available ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span
                    className={
                      availabilityStatus.available ? 'text-green-400' : 'text-red-400'
                    }
                  >
                    {availabilityStatus.message}
                  </span>
                </motion.div>
              ) : null}
            </div>
          )}

          {/* Quantity Message */}
          {quantityMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg"
            >
              <div className={quantityMessage.color}>{quantityMessage.icon}</div>
              <div>
                <div className={`font-medium ${quantityMessage.color}`}>
                  {quantityMessage.text}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  Contact us for bulk pricing on 10+ carts
                </div>
              </div>
            </motion.div>
          )}

          {/* Price Per Cart Display */}
          <div className="flex justify-between items-center p-4 bg-zinc-800/30 rounded-lg">
            <span className="text-zinc-400">Price per cart</span>
            <span className="text-xl font-bold text-white">
              ${unitPrice.toFixed(2)}
            </span>
          </div>

          {/* Total Price Display */}
          <motion.div
            key={quantity}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="flex justify-between items-center p-4 bg-rose-900/20 border border-rose-800 rounded-lg"
          >
            <div>
              <div className="text-zinc-400 text-sm">Subtotal for {quantity} cart{quantity > 1 ? 's' : ''}</div>
              <div className="text-xs text-zinc-500 mt-1">
                ${unitPrice.toFixed(2)} × {quantity}
              </div>
            </div>
            <span className="text-3xl font-bold text-white">
              ${(unitPrice * quantity).toFixed(2)}
            </span>
          </motion.div>

          {/* Bulk Discount Notice */}
          {quantity >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-amber-900/20 border border-amber-800 rounded-lg"
            >
              <div className="text-sm text-amber-400 font-medium">
                💡 Bulk Rental Discount Available!
              </div>
              <div className="text-xs text-amber-500 mt-1">
                You may be eligible for special pricing on {quantity}+ carts. Our team will review your booking.
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
