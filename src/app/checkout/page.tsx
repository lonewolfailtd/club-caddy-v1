'use client'

import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import AddressAutocomplete, { type AddressComponents } from '@/components/maps/AddressAutocomplete'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface FormData {
  fullName: string
  email: string
  phone: string
  deliveryMethod: 'delivery' | 'pickup'
  addressLine1: string
  city: string
  postalCode: string
  region: string
  country: string
  specialInstructions: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  addressLine1?: string
  city?: string
  postalCode?: string
  region?: string
}

const DELIVERY_COST = 25000 // $250 delivery fee in cents

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    deliveryMethod: 'delivery',
    addressLine1: '',
    city: '',
    postalCode: '',
    region: '',
    country: 'New Zealand',
    specialInstructions: '',
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  // Calculate total including delivery (convert cart.subtotal from dollars to cents)
  const cartSubtotalInCents = cart.subtotal * 100
  const deliveryCost = formData.deliveryMethod === 'delivery' ? DELIVERY_COST : 0
  const totalAmount = cartSubtotalInCents + deliveryCost

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart')
    }
  }, [cart.items.length, router])

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else {
      // Remove all non-digit characters for validation
      const digitsOnly = formData.phone.replace(/\D/g, '')
      if (digitsOnly.length < 9 || digitsOnly.length > 11) {
        errors.phone = 'Phone number must be 9-11 digits'
      }
    }

    // Only validate address if delivery is selected
    if (formData.deliveryMethod === 'delivery') {
      if (!formData.addressLine1.trim()) {
        errors.addressLine1 = 'Address is required for delivery'
      }

      if (!formData.city.trim()) {
        errors.city = 'City is required for delivery'
      }

      if (!formData.postalCode.trim()) {
        errors.postalCode = 'Postal code is required for delivery'
      }

      if (!formData.region.trim()) {
        errors.region = 'Region/State is required for delivery'
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Calculate cart items for API
      const items = cart.items.map(item => ({
        productName: item.productName,
        variantName: item.variantName,
        quantity: item.quantity,
        basePrice: item.basePrice,
        selectedAddons: item.selectedAddons,
        imageUrl: item.imageUrl,
        total: (item.basePrice + (item.selectedAddons?.reduce((sum, addon) => sum + addon.price, 0) || 0)) * item.quantity
      }))

      // Create deposit checkout session
      const response = await fetch('/api/orders/create-deposit-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          deliveryMethod: formData.deliveryMethod,
          shippingAddress: formData.deliveryMethod === 'delivery' ? {
            addressLine1: formData.addressLine1,
            city: formData.city,
            postalCode: formData.postalCode,
            region: formData.region,
            country: formData.country,
          } : null,
          specialInstructions: formData.specialInstructions,
          items,
          subtotal: cartSubtotalInCents, // in cents
          deliveryCost, // in cents
          totalAmount, // in cents
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url, orderId } = await response.json()

      // Store customer data for account creation prompt (on success page)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('purchaseCustomerData', JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          orderId,
          timestamp: Date.now()
        }))
      }

      // Clear cart and redirect to Stripe checkout
      clearCart()
      window.location.href = url
    } catch (error) {
      alert('There was an error processing your order. Please try again.')
      console.error('Order error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't render the form if cart is empty (will redirect)
  if (cart.items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-luxury-pearl">
      {/* Hexagon Pattern Background */}
      <div className="absolute inset-0 bg-hexagon opacity-5 pointer-events-none" />

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="refined-title text-4xl font-bold text-zinc-900 sm:text-5xl">
              Secure Checkout
            </h1>
            <p className="refined-body mt-4 text-lg text-zinc-600">
              Complete your order for premium Club Caddy golf carts
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Shipping/Billing Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information Card */}
                <div className="luxury-card p-6 sm:p-8">
                  <h2 className="refined-title text-2xl font-bold text-zinc-900 mb-6">
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="fullName" className="refined-body text-zinc-900">
                        Full Name <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`mt-2 ${formErrors.fullName ? 'border-red-600' : ''}`}
                        placeholder="Name"
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <Label htmlFor="email" className="refined-body text-zinc-900">
                          Email Address <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`mt-2 ${formErrors.email ? 'border-red-600' : ''}`}
                          placeholder="Email"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <Label htmlFor="phone" className="refined-body text-zinc-900">
                          Phone Number <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`mt-2 ${formErrors.phone ? 'border-red-600' : ''}`}
                          placeholder="Phone number"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Method Card */}
                <div className="luxury-card p-6 sm:p-8">
                  <h2 className="refined-title text-2xl font-bold text-zinc-900 mb-6">
                    Delivery Method
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Delivery Option */}
                    <button
                      type="button"
                      onClick={() => handleInputChange('deliveryMethod', 'delivery')}
                      className={`relative p-6 rounded-lg border-2 transition-all ${
                        formData.deliveryMethod === 'delivery'
                          ? 'border-rose-800 bg-rose-50'
                          : 'border-zinc-200 bg-white hover:border-rose-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.deliveryMethod === 'delivery'
                            ? 'border-rose-800 bg-rose-800'
                            : 'border-zinc-300'
                        }`}>
                          {formData.deliveryMethod === 'delivery' && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="refined-body font-semibold text-zinc-900">
                              Home Delivery
                            </h3>
                            <span className="refined-body text-sm font-bold text-rose-800">
                              {formatPrice(DELIVERY_COST / 100)}
                            </span>
                          </div>
                          <p className="refined-body text-sm text-zinc-600">
                            We'll deliver your golf cart to your address across New Zealand
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Pickup Option */}
                    <button
                      type="button"
                      onClick={() => handleInputChange('deliveryMethod', 'pickup')}
                      className={`relative p-6 rounded-lg border-2 transition-all ${
                        formData.deliveryMethod === 'pickup'
                          ? 'border-rose-800 bg-rose-50'
                          : 'border-zinc-200 bg-white hover:border-rose-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.deliveryMethod === 'pickup'
                            ? 'border-rose-800 bg-rose-800'
                            : 'border-zinc-300'
                        }`}>
                          {formData.deliveryMethod === 'pickup' && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="refined-body font-semibold text-zinc-900">
                              Pickup
                            </h3>
                            <span className="refined-body text-sm font-bold text-green-700">
                              Free
                            </span>
                          </div>
                          <p className="refined-body text-sm text-zinc-600">
                            Collect from our location with your own transport
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {formData.deliveryMethod === 'pickup' && (
                    <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="refined-body text-sm text-blue-900">
                        <strong>Pickup Location:</strong> We'll contact you to arrange a convenient pickup time at our location.
                      </p>
                    </div>
                  )}
                </div>

                {/* Shipping Address Card - Only show if delivery selected */}
                {formData.deliveryMethod === 'delivery' && (
                  <div className="luxury-card p-6 sm:p-8">
                    <h2 className="refined-title text-2xl font-bold text-zinc-900 mb-6">
                      Delivery Address
                    </h2>

                  <div className="space-y-6">
                    {/* Google Places Address Autocomplete */}
                    <AddressAutocomplete
                      onAddressSelect={(address: AddressComponents) => {
                        setFormData(prev => ({
                          ...prev,
                          addressLine1: address.addressLine1,
                          city: address.city,
                          postalCode: address.postalCode,
                          region: address.city, // Use city as region for NZ
                          country: address.country || 'New Zealand',
                        }));
                        // Clear address errors
                        setFormErrors(prev => ({
                          ...prev,
                          addressLine1: undefined,
                          city: undefined,
                          postalCode: undefined,
                          region: undefined,
                        }));
                      }}
                      onManualInput={(value: string) => {
                        // Preserve manually typed values even if not selected from dropdown
                        setFormData(prev => ({
                          ...prev,
                          addressLine1: value,
                        }));
                      }}
                      initialValue={formData.addressLine1}
                      error={formErrors.addressLine1}
                      label="Shipping Address"
                      placeholder="Start typing your address..."
                      required={true}
                    />

                    {/* Show selected address details */}
                    {formData.addressLine1 && (
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm">
                        <p className="refined-body text-xs text-gray-500 uppercase tracking-wider mb-2">Selected Shipping Address</p>
                        <p className="refined-body text-sm text-zinc-900 font-medium">
                          {formData.addressLine1}
                        </p>
                        <p className="refined-body text-sm text-zinc-700">
                          {formData.city} {formData.postalCode}
                        </p>
                        <p className="refined-body text-sm text-zinc-600">
                          {formData.country}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                )}

                {/* Special Instructions Card - Available for both delivery and pickup */}
                <div className="luxury-card p-6 sm:p-8">
                  <h2 className="refined-title text-2xl font-bold text-zinc-900 mb-6">
                    Special Instructions
                  </h2>
                  <div>
                    <Label htmlFor="specialInstructions" className="refined-body text-zinc-900">
                      Additional Notes <span className="text-gray-400">(Optional)</span>
                    </Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                      className="mt-2"
                      rows={4}
                      placeholder="Any customization requests or special notes..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-lg font-bold bg-rose-800 hover:bg-rose-900 text-white rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing Order...' : 'Place Order'}
                </button>

                {/* Security Notice */}
                <div className="glass rounded-lg p-4 text-center">
                  <p className="refined-body text-sm text-zinc-600">
                    <svg className="inline-block w-5 h-5 mr-2 text-rose-800" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    Your information is secure and encrypted
                  </p>
                </div>
              </form>
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:col-span-1">
              <div className="luxury-card p-6 sm:p-8 sticky top-24">
                <h2 className="refined-title text-2xl font-bold text-zinc-900 mb-6">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto scrollbar-luxury">
                  {cart.items.map((item) => {
                    const addonsTotal = item.selectedAddons?.reduce((sum, addon) => sum + addon.price, 0) || 0
                    const itemTotal = (item.basePrice + addonsTotal) * item.quantity

                    return (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                        {/* Product Image */}
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-3.75m-9-3.75h.008v.008H12v-.008zM12 15h.008v.008H12V15z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="refined-body text-sm font-semibold text-zinc-900 truncate">
                            {item.productName}
                          </h3>
                          {item.variantName && (
                            <p className="refined-body text-xs text-gray-500 mt-1">{item.variantName}</p>
                          )}
                          <p className="refined-body text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>

                          {/* Addons */}
                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {item.selectedAddons.map((addon) => (
                                <p key={addon.id} className="refined-body text-xs text-gray-600">
                                  + {addon.name} ({formatPrice(addon.price)})
                                </p>
                              ))}
                            </div>
                          )}

                          <p className="refined-body text-sm font-bold text-rose-800 mt-2">
                            {formatPrice(itemTotal)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Summary Totals */}
                <div className="space-y-3 pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="refined-body text-zinc-600">Subtotal ({cart.totalItems} items)</span>
                    <span className="refined-body font-semibold text-zinc-900">
                      {formatPrice(cart.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="refined-body text-zinc-600">Delivery</span>
                    <span className={`refined-body font-semibold ${deliveryCost === 0 ? 'text-green-700' : 'text-zinc-900'}`}>
                      {deliveryCost === 0 ? 'Free (Pickup)' : formatPrice(deliveryCost / 100)}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-bold pt-3 border-t-2 border-gray-200">
                    <span className="refined-title text-zinc-900">Total</span>
                    <span className="refined-title text-rose-900">
                      {formatPrice(totalAmount / 100)}
                    </span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 space-y-3 rounded-lg bg-gradient-to-br from-rose-50 to-transparent p-4 border border-rose-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-rose-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="refined-body text-sm text-zinc-700">
                      Delivery in approximately 6 weeks
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-rose-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="refined-body text-sm text-zinc-700">
                      $1,000 deposit available
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-rose-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="refined-body text-sm text-zinc-700">
                      Email confirmation included
                    </p>
                  </div>
                </div>

                {/* Contact Support */}
                <div className="mt-6 text-center">
                  <p className="refined-body text-sm text-zinc-600 mb-2">Need assistance?</p>
                  <a
                    href="tel:+64021560307"
                    className="refined-body text-sm font-semibold text-rose-800 hover:text-rose-900 transition-colors"
                  >
                    +64-021-560-307
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Cart Link */}
          <div className="mt-8 text-center">
            <Link
              href="/cart"
              className="refined-body inline-flex items-center text-rose-800 hover:text-rose-900 font-semibold transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Return to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
