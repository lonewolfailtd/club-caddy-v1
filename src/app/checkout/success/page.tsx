'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  const router = useRouter()
  const [orderNumber, setOrderNumber] = useState('')
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Generate order number
    const timestamp = Date.now()
    setOrderNumber(`CC-${timestamp}`)

    // Clear cart on page load
    clearCart()

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [clearCart])

  const handleDownloadReceipt = () => {
    alert('Receipt download functionality will be implemented soon.')
  }

  return (
    <div className="min-h-screen bg-luxury-pearl py-16 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="confetti-container fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#E5E4E2' : '#0EA5E9',
              }}
            />
          ))}
        </div>
      )}

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        {/* Success Icon and Message */}
        <div className="text-center">
          {/* Success Checkmark */}
          <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl mb-8 animate-scale-in border-4 border-luxury-gold">
            <svg
              className="w-20 h-20 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-5xl font-bold text-luxury-onyx mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your order
          </p>
          <p className="text-lg text-luxury-gold font-semibold">
            Order Number: {orderNumber}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="mt-12 glass rounded-2xl p-8 shadow-2xl bg-white/80 backdrop-blur-lg border-2 border-luxury-gold/20">
          {/* Thank You Message */}
          <div className="text-center mb-8 pb-8 border-b border-luxury-platinum">
            <p className="text-lg text-gray-700">
              We appreciate your business! Your order has been received and we're excited to get your premium golf cart to you.
            </p>
          </div>

          {/* What Happens Next Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-luxury-onyx mb-6 text-center">
              What Happens Next
            </h2>

            <div className="space-y-6">
              {/* Timeline Item 1 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-luxury-gold to-yellow-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-luxury-onyx mb-1">
                    Email Confirmation Sent
                  </h3>
                  <p className="text-gray-600">
                    Check your inbox for order confirmation and receipt
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-luxury-gold to-yellow-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-luxury-onyx mb-1">
                    Team Will Contact You Within 24 Hours
                  </h3>
                  <p className="text-gray-600">
                    Our team will reach out to confirm your order details and answer any questions
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-luxury-gold to-yellow-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-luxury-onyx mb-1">
                    Final Quote Provided
                  </h3>
                  <p className="text-gray-600">
                    Receive your detailed quote with all specifications and customizations
                  </p>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-luxury-gold to-yellow-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-luxury-onyx mb-1">
                    Delivery in Approximately 6 Weeks
                  </h3>
                  <p className="text-gray-600">
                    Your custom golf cart will be delivered and set up at your location
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Receipt Button */}
          <div className="mt-8 pt-8 border-t border-luxury-platinum text-center">
            <button
              onClick={handleDownloadReceipt}
              className="inline-flex items-center gap-2 bg-white border-2 border-luxury-gold text-luxury-onyx font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-luxury-gold hover:text-white transition-all duration-300 hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Receipt
            </button>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/products"
            className="btn-luxury text-center py-4 flex items-center justify-center gap-2 hover:gap-3 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            View Products
          </Link>

          <Link
            href="/"
            className="bg-luxury-platinum text-luxury-onyx font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-center flex items-center justify-center gap-2 hover:gap-3"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go to Homepage
          </Link>

          <a
            href="mailto:admin@clubcaddycarts.com"
            className="bg-white border-2 border-luxury-gold text-luxury-onyx font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-luxury-gold hover:text-white text-center flex items-center justify-center gap-2 hover:gap-3"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Contact Us
          </a>
        </div>

        {/* Social Media Sharing (Optional) */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Share your excitement!</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Just ordered a premium golf cart from Club Caddy Carts! 🏌️⛳&url=${window.location.origin}`, '_blank')}
              className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}`, '_blank')}
              className="w-12 h-12 rounded-full bg-[#4267B2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}`, '_blank')}
              className="w-12 h-12 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Confetti Styles */}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: fall 4s linear infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
