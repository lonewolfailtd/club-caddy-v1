'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
// Import all email templates
import { WelcomeEmail } from '@/lib/email/templates/auth/welcome'
import { PasswordResetEmail } from '@/lib/email/templates/auth/password-reset'
import { EmailVerificationEmail } from '@/lib/email/templates/auth/email-verification'
import { PasswordChangedEmail } from '@/lib/email/templates/auth/password-changed'
import { OrderConfirmationEmail } from '@/lib/email/templates/orders/order-confirmation'
import { OrderShippedEmail } from '@/lib/email/templates/orders/order-shipped'

// Sample data for each template
const emailTemplates = [
  {
    category: 'Authentication',
    templates: [
      {
        name: 'Welcome Email',
        component: <WelcomeEmail name="John Smith" email="customer@example.com" />,
      },
      {
        name: 'Password Reset',
        component: (
          <PasswordResetEmail
            name="John Smith"
            resetLink="https://clubcaddycarts.com/reset-password?token=example123"
            expiryMinutes={60}
          />
        ),
      },
      {
        name: 'Email Verification',
        component: (
          <EmailVerificationEmail
            name="John Smith"
            verificationLink="https://clubcaddycarts.com/verify-email?token=example123"
          />
        ),
      },
      {
        name: 'Password Changed',
        component: <PasswordChangedEmail name="John Smith" changeDate={new Date()} />,
      },
    ],
  },
  {
    category: 'Orders',
    templates: [
      {
        name: 'Order Confirmation',
        component: (
          <OrderConfirmationEmail
            name="John Smith"
            orderNumber="CC-2025-001"
            orderDate={new Date()}
            items={[
              {
                name: 'Ultimate Golf Cart 72V',
                quantity: 1,
                price: 18500,
                customizations: [
                  '4" Lift Kit',
                  'Premium Wheels & Tyres',
                  'Full LED Package',
                  'Lithium-Ion Battery',
                  'Bluetooth Sound System',
                ],
              },
            ]}
            subtotal={18500}
            tax={2775}
            depositAmount={1000}
            totalAmount={21275}
            estimatedDelivery="6 weeks"
            trackingUrl="https://clubcaddycarts.com/orders/CC-2025-001"
          />
        ),
      },
      {
        name: 'Order Shipped',
        component: (
          <OrderShippedEmail
            name="John Smith"
            orderNumber="CC-2025-001"
            trackingNumber="NZ123456789"
            trackingUrl="https://tracking.example.com/NZ123456789"
            carrier="NZ Post"
            estimatedDeliveryDate="15 December 2025"
            shippingAddress={{
              street: '123 Golf Road',
              city: 'Auckland',
              postcode: '1010',
              country: 'New Zealand',
            }}
          />
        ),
      },
    ],
  },
]

export default function EmailPreviewPage() {
  const [selectedCategory, setSelectedCategory] = useState(emailTemplates[0].category)
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const currentCategory = emailTemplates.find((cat) => cat.category === selectedCategory)
  const currentTemplate = currentCategory?.templates[selectedTemplate]

  useEffect(() => {
    if (iframeRef.current && currentTemplate) {
      const iframe = iframeRef.current
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

      if (iframeDoc) {
        // Import ReactDOMServer dynamically and render
        import('react-dom/server').then(({ renderToStaticMarkup }) => {
          const html = `<!DOCTYPE html>${renderToStaticMarkup(currentTemplate.component)}`
          iframeDoc.open()
          iframeDoc.write(html)
          iframeDoc.close()
        })
      }
    }
  }, [currentTemplate])

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-zinc-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Email Template Preview
            </h1>
            <Link
              href="/"
              className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded hover:bg-zinc-800 transition"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg border border-zinc-200 p-4 sticky top-24">
              <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">
                Categories
              </h2>
              <div className="space-y-1">
                {emailTemplates.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => {
                      setSelectedCategory(category.category)
                      setSelectedTemplate(0)
                    }}
                    className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition ${
                      selectedCategory === category.category
                        ? 'bg-rose-800 text-white'
                        : 'text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>

              {currentCategory && (
                <>
                  <div className="h-px bg-zinc-200 my-4" />
                  <h2 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">
                    Templates
                  </h2>
                  <div className="space-y-1">
                    {currentCategory.templates.map((template, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTemplate(idx)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                          selectedTemplate === idx
                            ? 'bg-zinc-900 text-white'
                            : 'text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Preview Area */}
          <div className="col-span-9">
            <div className="bg-white rounded-lg border border-zinc-200 p-6">
              <div className="mb-6 pb-6 border-b border-zinc-200">
                <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {currentTemplate?.name}
                </h2>
                <p className="text-sm text-zinc-600 mt-1">
                  Category: <span className="font-medium">{selectedCategory}</span>
                </p>
              </div>

              {/* Email Preview */}
              <div className="border border-zinc-300 rounded overflow-hidden">
                <div className="bg-zinc-50 px-4 py-2 border-b border-zinc-300">
                  <div className="text-xs text-zinc-600">
                    <strong>From:</strong> admin@clubcaddycarts.com
                  </div>
                  <div className="text-xs text-zinc-600 mt-1">
                    <strong>To:</strong> customer@example.com
                  </div>
                </div>
                <div className="bg-white">
                  <iframe
                    ref={iframeRef}
                    style={{
                      width: '100%',
                      minHeight: '800px',
                      border: 'none',
                    }}
                    title="Email Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
