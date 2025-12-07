'use client'

import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface FormData {
  fullName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
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

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    region: '',
    country: 'New Zealand',
    specialInstructions: '',
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})

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
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    if (!formData.addressLine1.trim()) {
      errors.addressLine1 = 'Address is required'
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required'
    }

    if (!formData.postalCode.trim()) {
      errors.postalCode = 'Postal code is required'
    }

    if (!formData.region.trim()) {
      errors.region = 'Region/State is required'
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
      // In production, this would send the order to your backend/API
      // For now, we'll simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Show success message
      alert(
        `Order Confirmed!\n\n` +
        `Thank you ${formData.fullName}!\n\n` +
        `Order Details:\n` +
        `Items: ${cart.totalItems}\n` +
        `Total: ${formatPrice(cart.subtotal)}\n\n` +
        `A confirmation email will be sent to ${formData.email}\n\n` +
        `Estimated delivery: 6 weeks\n` +
        `We'll contact you at ${formData.phone} to arrange delivery.`
      )

      // Clear cart and redirect
      clearCart()
      router.push('/')
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
            <h1 className="text-4xl font-bold text-luxury-onyx sm:text-5xl">
              Secure Checkout
            </h1>
            <p className="mt-4 text-lg text-gray-600">
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
                  <h2 className="text-2xl font-bold text-luxury-onyx mb-6">
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="fullName" className="text-luxury-onyx">
                        Full Name <span className="text-error">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`mt-2 ${formErrors.fullName ? 'border-error' : ''}`}
                        placeholder="John Smith"
                      />
                      {formErrors.fullName && (
                        <p className="mt-1 text-sm text-error">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <Label htmlFor="email" className="text-luxury-onyx">
                          Email Address <span className="text-error">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`mt-2 ${formErrors.email ? 'border-error' : ''}`}
                          placeholder="john@example.com"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-error">{formErrors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <Label htmlFor="phone" className="text-luxury-onyx">
                          Phone Number <span className="text-error">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`mt-2 ${formErrors.phone ? 'border-error' : ''}`}
                          placeholder="+64 21 123 4567"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-error">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address Card */}
                <div className="luxury-card p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-luxury-onyx mb-6">
                    Shipping Address
                  </h2>

                  <div className="space-y-6">
                    {/* Address Line 1 */}
                    <div>
                      <Label htmlFor="addressLine1" className="text-luxury-onyx">
                        Address Line 1 <span className="text-error">*</span>
                      </Label>
                      <Input
                        id="addressLine1"
                        type="text"
                        required
                        value={formData.addressLine1}
                        onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                        className={`mt-2 ${formErrors.addressLine1 ? 'border-error' : ''}`}
                        placeholder="123 Main Street"
                      />
                      {formErrors.addressLine1 && (
                        <p className="mt-1 text-sm text-error">{formErrors.addressLine1}</p>
                      )}
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <Label htmlFor="addressLine2" className="text-luxury-onyx">
                        Address Line 2 <span className="text-gray-400">(Optional)</span>
                      </Label>
                      <Input
                        id="addressLine2"
                        type="text"
                        value={formData.addressLine2}
                        onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                        className="mt-2"
                        placeholder="Apartment, suite, etc."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* City */}
                      <div>
                        <Label htmlFor="city" className="text-luxury-onyx">
                          City <span className="text-error">*</span>
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={`mt-2 ${formErrors.city ? 'border-error' : ''}`}
                          placeholder="Auckland"
                        />
                        {formErrors.city && (
                          <p className="mt-1 text-sm text-error">{formErrors.city}</p>
                        )}
                      </div>

                      {/* Postal Code */}
                      <div>
                        <Label htmlFor="postalCode" className="text-luxury-onyx">
                          Postal Code <span className="text-error">*</span>
                        </Label>
                        <Input
                          id="postalCode"
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          className={`mt-2 ${formErrors.postalCode ? 'border-error' : ''}`}
                          placeholder="1010"
                        />
                        {formErrors.postalCode && (
                          <p className="mt-1 text-sm text-error">{formErrors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Region/State */}
                      <div>
                        <Label htmlFor="region" className="text-luxury-onyx">
                          Region/State <span className="text-error">*</span>
                        </Label>
                        <Input
                          id="region"
                          type="text"
                          required
                          value={formData.region}
                          onChange={(e) => handleInputChange('region', e.target.value)}
                          className={`mt-2 ${formErrors.region ? 'border-error' : ''}`}
                          placeholder="Auckland"
                        />
                        {formErrors.region && (
                          <p className="mt-1 text-sm text-error">{formErrors.region}</p>
                        )}
                      </div>

                      {/* Country */}
                      <div>
                        <Label htmlFor="country" className="text-luxury-onyx">
                          Country
                        </Label>
                        <Input
                          id="country"
                          type="text"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="mt-2 bg-gray-50"
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div>
                      <Label htmlFor="specialInstructions" className="text-luxury-onyx">
                        Special Instructions <span className="text-gray-400">(Optional)</span>
                      </Label>
                      <Textarea
                        id="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                        className="mt-2"
                        rows={4}
                        placeholder="Any special delivery instructions or customization requests..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-luxury w-full py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing Order...' : 'Place Order'}
                </button>

                {/* Security Notice */}
                <div className="glass rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">
                    <svg className="inline-block w-5 h-5 mr-2 text-luxury-gold" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
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
                <h2 className="text-2xl font-bold text-luxury-onyx mb-6">
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
                          <h3 className="text-sm font-semibold text-luxury-onyx truncate">
                            {item.productName}
                          </h3>
                          {item.variantName && (
                            <p className="text-xs text-gray-500 mt-1">{item.variantName}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>

                          {/* Addons */}
                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {item.selectedAddons.map((addon) => (
                                <p key={addon.id} className="text-xs text-gray-600">
                                  + {addon.name} ({formatPrice(addon.price)})
                                </p>
                              ))}
                            </div>
                          )}

                          <p className="text-sm font-bold text-luxury-gold mt-2">
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
                    <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                    <span className="font-semibold text-luxury-onyx">
                      {formatPrice(cart.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-luxury-onyx">
                      Contact for quote
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-bold pt-3 border-t-2 border-gray-200">
                    <span className="text-luxury-onyx">Total</span>
                    <span className="text-gradient-luxury">
                      {formatPrice(cart.subtotal)}
                    </span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 space-y-3 rounded-lg bg-gradient-to-br from-luxury-gold/10 to-transparent p-4 border border-luxury-gold/20">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-700">
                      Delivery in approximately 6 weeks
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-700">
                      $1,000 deposit available
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-700">
                      Email confirmation included
                    </p>
                  </div>
                </div>

                {/* Contact Support */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Need assistance?</p>
                  <a
                    href="tel:+64021560307"
                    className="text-sm font-semibold text-luxury-gold hover:text-luxury-gold-dark transition-colors"
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
              className="inline-flex items-center text-luxury-gold hover:text-luxury-gold-dark font-semibold transition-colors"
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
