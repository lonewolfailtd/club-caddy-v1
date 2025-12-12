'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import BookingCalendar from '@/components/booking/BookingCalendar';
import CartQuantitySelector from '@/components/booking/CartQuantitySelector';
import BookingSummary from '@/components/booking/BookingSummary';
import AddressAutocomplete, { type AddressComponents } from '@/components/maps/AddressAutocomplete';
import type {
  RentalType,
  BookingAddon,
  DeliveryAddress,
  BookingFormData,
  CheckAvailabilityRequest,
  CheckAvailabilityResponse,
  CreateBookingInput,
} from '@/types/booking.types';

interface Product {
  id: string;
  name: string;
  slug: string;
  tier: string;
  images: string[];
  base_price: number;
  rental_enabled: boolean;
}

interface RentalPricing {
  hourly_rate: number | null;
  hourly_minimum_hours: number;
  daily_rate: number | null;
  weekly_rate: number | null;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.productSlug as string;

  // Data state
  const [product, setProduct] = useState<Product | null>(null);
  const [rentalPricing, setRentalPricing] = useState<RentalPricing | null>(null);
  const [addons, setAddons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState<BookingFormData>({
    rentalType: 'daily',
    startDate: null,
    endDate: null,
    quantity: 1,
    selectedAddons: [],
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    needsDelivery: false,
    deliveryAddress: undefined,
    pickupLocation: '',
    specialRequests: '',
  });

  // Pricing state
  const [unitPrice, setUnitPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Fetch product and pricing data
  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();

        // Fetch product
        const { data: productData, error: productError } = await (supabase
          .from('products') as any)
          .select('*')
          .eq('slug', slug)
          .eq('rental_enabled', true)
          .single();

        if (productError || !productData) {
          router.push('/products');
          return;
        }

        setProduct(productData);

        // Fetch rental pricing
        const { data: pricingData, error: pricingError } = await (supabase
          .from('rental_pricing') as any)
          .select('*')
          .eq('product_id', productData.id)
          .eq('active', true)
          .single();

        if (pricingError || !pricingData) {
          setError('Rental pricing not available for this product');
          return;
        }

        setRentalPricing(pricingData);

        // Fetch addons
        const { data: addonsData } = await supabase
          .from('addons')
          .select('*')
          .eq('in_stock', true)
          .order('price', { ascending: true });

        setAddons(addonsData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load booking information');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug, router]);

  // Check availability
  const checkAvailability = async (quantity: number): Promise<boolean> => {
    if (!product || !formData.startDate || !formData.endDate) return false;

    try {
      const response = await fetch('/api/bookings/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          startDate: formData.startDate.toISOString(),
          endDate: formData.endDate.toISOString(),
          quantity,
        } as CheckAvailabilityRequest),
      });

      const data: CheckAvailabilityResponse = await response.json();
      return data.available;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setError(null);
    setValidationErrors({});

    // Validate form
    const errors: Record<string, string> = {};

    // Date validation
    if (!formData.startDate) errors.startDate = 'Please select a start date';
    if (!formData.endDate) errors.endDate = 'Please select an end date';

    // Name validation
    if (!formData.customerName.trim()) {
      errors.customerName = 'Name is required';
    }

    // Email validation
    if (!formData.customerEmail.trim()) {
      errors.customerEmail = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.customerEmail)) {
        errors.customerEmail = 'Please enter a valid email address';
      }
    }

    // Phone number validation (9, 10, or 11 digits)
    if (!formData.customerPhone.trim()) {
      errors.customerPhone = 'Phone number is required';
    } else {
      // Remove all non-digit characters for validation
      const digitsOnly = formData.customerPhone.replace(/\D/g, '');
      if (digitsOnly.length < 9 || digitsOnly.length > 11) {
        errors.customerPhone = 'Phone number must be 9-11 digits';
      }
    }

    if (formData.needsDelivery && !formData.deliveryAddress?.addressLine1) {
      errors.deliveryAddress = 'Delivery address is required';
    }

    if (!formData.needsDelivery && !formData.pickupLocation) {
      errors.pickupLocation = 'Pickup location is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (!product || !formData.startDate || !formData.endDate) {
      setError('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create booking
      const bookingInput: CreateBookingInput = {
        productId: product.id,
        quantity: formData.quantity,
        rentalType: formData.rentalType,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        selectedAddons: formData.selectedAddons,
        deliveryAddress: formData.needsDelivery ? formData.deliveryAddress : undefined,
        pickupLocation: !formData.needsDelivery ? formData.pickupLocation : undefined,
        specialRequests: formData.specialRequests || undefined,
      };

      const createResponse = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingInput),
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const { booking } = await createResponse.json();

      // Create Stripe checkout session
      const checkoutResponse = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: booking.id }),
      });

      if (!checkoutResponse.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await checkoutResponse.json();

      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (err) {
      console.error('Booking error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create booking');
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    );
  }

  // Error state
  if (error && !product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <Card className="p-8 bg-zinc-900/50 border-zinc-800 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Booking Unavailable</h2>
          <p className="text-zinc-400 mb-6">{error}</p>
          <Link href="/products">
            <Button className="bg-rose-800 hover:bg-rose-900">Back to Products</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!product || !rentalPricing) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');
        .refined-title { font-family: 'Playfair Display', serif; }
        .refined-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="container mx-auto px-4 py-8">
          <Link
            href={`/products/${slug}`}
            className="inline-flex items-center gap-2 refined-body text-sm text-zinc-600 hover:text-rose-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {product.name}
          </Link>
          <div className="w-12 h-px bg-rose-800 mt-6 mb-4"></div>
          <h1 className="refined-title text-4xl font-bold text-zinc-900 mt-4">
            Reserve Your {product.name}
          </h1>
          <p className="refined-body text-lg text-zinc-600 mt-3 font-light">
            Complete your rental reservation in a few simple steps
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Dates & Rental Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <h2 className="refined-title text-2xl font-bold text-zinc-900">1. Select Dates & Rental Type</h2>
                <p className="refined-body text-zinc-600 mt-1 font-light">Choose your rental period</p>
              </div>
              <BookingCalendar
                productId={product.id}
                rentalPricing={rentalPricing}
                onDateChange={(start, end, type) => {
                  setFormData({ ...formData, startDate: start, endDate: end, rentalType: type });
                }}
                onPriceChange={(price, dur, type) => {
                  setUnitPrice(price);
                  setDuration(dur);
                }}
              />
            </motion.div>

            {/* Step 2: Quantity */}
            {formData.startDate && formData.endDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="mb-6">
                  <h2 className="refined-title text-2xl font-bold text-zinc-900">2. Select Quantity</h2>
                  <p className="refined-body text-zinc-600 mt-1 font-light">How many golf carts do you need?</p>
                </div>
                <CartQuantitySelector
                  productId={product.id}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  quantity={formData.quantity}
                  onQuantityChange={(qty) => setFormData({ ...formData, quantity: qty })}
                  unitPrice={unitPrice}
                  checkAvailability={checkAvailability}
                />
              </motion.div>
            )}

            {/* Step 3: Customer Information */}
            {formData.startDate && formData.endDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-8 bg-white border-2 border-zinc-200 shadow-sm">
                  <div className="mb-6">
                    <h2 className="refined-title text-2xl font-bold text-zinc-900">3. Your Information</h2>
                    <p className="refined-body text-zinc-600 mt-1 font-light">We'll use this to confirm your reservation</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="refined-body text-sm font-medium text-zinc-700 mb-2 block">Full Name *</Label>
                      <Input
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="refined-body bg-white border-2 border-zinc-200 text-zinc-900 focus:border-rose-800 focus:ring-0"
                        placeholder="Name"
                      />
                      {validationErrors.customerName && (
                        <p className="refined-body text-red-600 text-sm mt-1">{validationErrors.customerName}</p>
                      )}
                    </div>

                    <div>
                      <Label className="refined-body text-sm font-medium text-zinc-700 mb-2 block">Email Address *</Label>
                      <Input
                        type="email"
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        className="refined-body bg-white border-2 border-zinc-200 text-zinc-900 focus:border-rose-800 focus:ring-0"
                        placeholder="Email"
                      />
                      {validationErrors.customerEmail && (
                        <p className="refined-body text-red-600 text-sm mt-1">{validationErrors.customerEmail}</p>
                      )}
                    </div>

                    <div>
                      <Label className="refined-body text-sm font-medium text-zinc-700 mb-2 block">Phone Number *</Label>
                      <Input
                        type="tel"
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        className="refined-body bg-white border-2 border-zinc-200 text-zinc-900 focus:border-rose-800 focus:ring-0"
                        placeholder="Phone number"
                      />
                      {validationErrors.customerPhone && (
                        <p className="refined-body text-red-600 text-sm mt-1">{validationErrors.customerPhone}</p>
                      )}
                    </div>

                    <div>
                      <Label className="refined-body text-sm font-medium text-zinc-700 mb-3 block">Delivery or Pickup?</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setFormData({ ...formData, needsDelivery: false })}
                          className={`p-6 border-2 transition-all duration-300 ${
                            !formData.needsDelivery
                              ? 'border-rose-800 bg-rose-50'
                              : 'border-zinc-200 hover:border-zinc-400 bg-white'
                          }`}
                        >
                          <div className="refined-body text-sm font-semibold text-zinc-900">Pickup</div>
                          <div className="refined-body text-xs text-zinc-500 mt-1">I'll collect the cart</div>
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, needsDelivery: true })}
                          className={`p-6 border-2 transition-all duration-300 ${
                            formData.needsDelivery
                              ? 'border-rose-800 bg-rose-50'
                              : 'border-zinc-200 hover:border-zinc-400 bg-white'
                          }`}
                        >
                          <div className="refined-body text-sm font-semibold text-zinc-900">Delivery</div>
                          <div className="refined-body text-xs text-zinc-500 mt-1">Deliver to my address</div>
                        </button>
                      </div>
                    </div>

                    {formData.needsDelivery ? (
                      <div className="space-y-4">
                        <AddressAutocomplete
                          onAddressSelect={(address: AddressComponents) => {
                            setFormData(prev => ({
                              ...prev,
                              deliveryAddress: {
                                addressLine1: address.addressLine1,
                                city: address.city,
                                postalCode: address.postalCode,
                                country: address.country || 'New Zealand',
                              },
                            }));
                          }}
                          onManualInput={(value: string) => {
                            // Preserve manually typed values even if not selected from dropdown
                            setFormData(prev => ({
                              ...prev,
                              deliveryAddress: {
                                addressLine1: value,
                                city: prev.deliveryAddress?.city || '',
                                postalCode: prev.deliveryAddress?.postalCode || '',
                                country: prev.deliveryAddress?.country || 'New Zealand',
                              },
                            }));
                          }}
                          initialValue={formData.deliveryAddress?.addressLine1 || ''}
                          error={validationErrors.deliveryAddress}
                          label="Delivery Address"
                          placeholder="Start typing your address..."
                          required={true}
                        />

                        {/* Show selected address details */}
                        {formData.deliveryAddress?.addressLine1 && (
                          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm">
                            <p className="refined-body text-xs text-zinc-500 uppercase tracking-wider mb-2">Selected Address</p>
                            <p className="refined-body text-sm text-zinc-900 font-medium">
                              {formData.deliveryAddress.addressLine1}
                            </p>
                            <p className="refined-body text-sm text-zinc-700">
                              {formData.deliveryAddress.city} {formData.deliveryAddress.postalCode}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <AddressAutocomplete
                          onAddressSelect={(address: AddressComponents) => {
                            // Use formatted address or construct from components
                            const fullAddress = address.formattedAddress ||
                              `${address.addressLine1}, ${address.city} ${address.postalCode}`;
                            setFormData(prev => ({
                              ...prev,
                              pickupLocation: fullAddress,
                            }));
                          }}
                          onManualInput={(value: string) => {
                            // Preserve manually typed pickup location
                            setFormData(prev => ({
                              ...prev,
                              pickupLocation: value,
                            }));
                          }}
                          initialValue={formData.pickupLocation || ''}
                          error={validationErrors.pickupLocation}
                          label="Pickup Location"
                          placeholder="Start typing your pickup address..."
                          required={true}
                        />

                        {/* Show selected pickup location */}
                        {formData.pickupLocation && (
                          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm">
                            <p className="refined-body text-xs text-zinc-500 uppercase tracking-wider mb-2">Selected Pickup Location</p>
                            <p className="refined-body text-sm text-zinc-900 font-medium">
                              {formData.pickupLocation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div>
                      <Label className="refined-body text-sm font-medium text-zinc-700 mb-2 block">Special Requests (Optional)</Label>
                      <Textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        className="refined-body bg-white border-2 border-zinc-200 text-zinc-900 focus:border-rose-800 focus:ring-0"
                        placeholder="Any special requirements or notes..."
                        rows={4}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Submit Button */}
            {formData.startDate && formData.endDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {error && (
                  <div className="mb-4 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400">{error}</p>
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg bg-rose-800 hover:bg-rose-900 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Right Column - Booking Summary */}
          {formData.startDate && formData.endDate && (
            <div className="lg:col-span-1">
              <BookingSummary
                product={product}
                rentalType={formData.rentalType}
                startDate={formData.startDate}
                endDate={formData.endDate}
                duration={duration}
                quantity={formData.quantity}
                unitPrice={unitPrice}
                selectedAddons={formData.selectedAddons}
                deliveryAddress={formData.needsDelivery ? formData.deliveryAddress : null}
                pickupLocation={!formData.needsDelivery ? formData.pickupLocation : null}
                needsDelivery={formData.needsDelivery}
                deliveryFee={50}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
