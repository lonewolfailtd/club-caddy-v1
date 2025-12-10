'use client'

import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | Club Caddy Carts',
  description: 'Terms and conditions for Club Caddy Carts - Premium electric golf cart sales and hire services in Auckland, New Zealand.',
}

export default function TermsOfServicePage() {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: December 10, 2025',
      backHome: 'Back to Home',
    },
    zh: {
      title: '服务条款',
      lastUpdated: '最后更新：2025年12月10日',
      backHome: '返回首页',
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rose-800 hover:text-rose-900 transition-colors refined-body font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backHome}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="refined-title text-4xl md:text-5xl font-bold text-rose-800 mb-4">
            {t.title}
          </h1>
          <p className="refined-body text-zinc-600 text-lg">
            Club Caddy Carts
          </p>
          <p className="refined-body text-zinc-500 mt-2">
            {t.lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="refined-body prose prose-zinc max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              1. Introduction and Agreement
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-4">
              Welcome to Club Caddy Carts. These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer," "you," or "your") and Club Caddy Carts ("we," "us," "our," or "Company"), a New Zealand-based business specializing in the sales and hire of premium electric golf carts.
            </p>
            <p className="text-zinc-700 leading-relaxed mb-4">
              By accessing our website (clubcaddycarts.com), purchasing our products, hiring our equipment, or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <Link href="/privacy" className="text-rose-800 underline hover:text-rose-900">Privacy Policy</Link>.
            </p>

            <div className="bg-zinc-50 border-l-4 border-rose-800 p-6 my-6">
              <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">Our Contact Details:</h3>
              <ul className="space-y-2 text-zinc-700">
                <li><strong>Business Name:</strong> Club Caddy Carts</li>
                <li><strong>Location:</strong> Auckland, New Zealand</li>
                <li><strong>Website:</strong> clubcaddycarts.com</li>
                <li><strong>Email:</strong> admin@clubcaddycarts.com</li>
                <li><strong>Phone:</strong> +64 021 560 307</li>
              </ul>
            </div>

            <p className="text-zinc-700 leading-relaxed mb-4">
              <strong>Important:</strong> If you do not agree with these Terms, you must not use our website or services. Your continued use of our services after any modifications to these Terms constitutes acceptance of those changes.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
              <p className="text-zinc-700">
                <strong>Legal Compliance:</strong> These Terms comply with the New Zealand Consumer Guarantees Act 1993, Fair Trading Act 1986, and other applicable New Zealand consumer protection legislation. Nothing in these Terms limits or excludes any statutory rights you may have under New Zealand law.
              </p>
            </div>
          </section>

          {/* Services We Provide */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              2. Services We Provide
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              Club Caddy Carts offers two primary services:
            </p>

            <div className="space-y-6">
              <div className="bg-zinc-50 p-6 rounded-lg">
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">2.1 Sales of Electric Golf Carts</h3>
                <p className="text-zinc-700 mb-3">We sell premium electric golf carts featuring:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Advanced 72V lithium battery technology</li>
                  <li>Superior range and performance</li>
                  <li>Various models and configurations</li>
                  <li>Premium customization options</li>
                  <li>Comprehensive warranty coverage (detailed in Section 6)</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  <strong>Pricing:</strong> All prices are displayed in New Zealand Dollars (NZD) and include GST unless otherwise stated.
                </p>
              </div>

              <div className="bg-zinc-50 p-6 rounded-lg">
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">2.2 Hire/Rental Services</h3>
                <p className="text-zinc-700 mb-3">We offer flexible hire options for:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Golf events and tournaments</li>
                  <li>Corporate events and functions</li>
                  <li>Private events and occasions</li>
                  <li>Short-term and long-term rentals</li>
                  <li>Commercial and residential use</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  <strong>Hire Terms:</strong> Specific hire agreements will be provided for each rental, detailing duration, rates, insurance requirements, and conditions of use.
                </p>
              </div>
            </div>
          </section>

          {/* Eligibility and Account Requirements */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              3. Eligibility and Account Requirements
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">3.1 Age Requirements</h3>
                <p className="text-zinc-700 mb-3">To purchase or hire from Club Caddy Carts, you must:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                  <li>Have legal capacity to enter into a binding contract</li>
                  <li>Provide accurate and truthful information</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">3.2 Account Creation</h3>
                <p className="text-zinc-700 mb-3">When creating an account, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">3.3 Business Accounts</h3>
                <p className="text-zinc-700">
                  For business purchases, you represent and warrant that you have the authority to bind the business entity to these Terms and that the business has the legal capacity to enter into this agreement.
                </p>
              </div>
            </div>
          </section>

          {/* Orders and Purchases */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              4. Orders and Purchases
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.1 Order Process</h3>
                <p className="text-zinc-700 mb-3">When you place an order:</p>
                <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
                  <li>You submit an offer to purchase the selected products at the stated price</li>
                  <li>We send an order confirmation email acknowledging receipt of your order</li>
                  <li>A binding contract forms when we accept your order (typically upon payment confirmation or shipment)</li>
                  <li>We reserve the right to refuse or cancel any order at our discretion</li>
                </ol>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.2 Pricing</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 mb-4">
                  <li><strong>Currency:</strong> All prices are in New Zealand Dollars (NZD)</li>
                  <li><strong>GST:</strong> Prices include 15% GST unless otherwise stated</li>
                  <li><strong>Accuracy:</strong> We strive for accuracy but errors may occur; we reserve the right to correct pricing errors</li>
                  <li><strong>Changes:</strong> Prices may change without notice; orders are charged at the price displayed at time of purchase</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="text-zinc-700">
                    <strong>Price Error Policy:</strong> If we discover a pricing error after you've placed an order, we will contact you and offer the option to proceed at the correct price or cancel the order for a full refund.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.3 Payment Methods</h3>
                <p className="text-zinc-700 mb-3">We accept the following payment methods:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Credit cards (Visa, Mastercard, American Express)</li>
                  <li>Debit cards</li>
                  <li>Bank transfer/direct deposit</li>
                  <li>PayPal</li>
                  <li>Financing options (subject to approval)</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  <strong>Payment Security:</strong> All payments are processed securely through PCI DSS compliant payment processors. We do not store complete credit card details on our servers.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.4 Order Confirmation and Acceptance</h3>
                <p className="text-zinc-700 mb-3">Order acceptance is subject to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Product availability</li>
                  <li>Payment verification and authorization</li>
                  <li>Delivery address validation</li>
                  <li>Compliance with our terms and policies</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.5 Custom Orders and Specifications</h3>
                <p className="text-zinc-700">
                  For custom or configured carts, specifications will be confirmed in writing before production. Once production begins, changes may not be possible or may incur additional charges. Custom orders may require a deposit (typically 30-50% of total price) and have extended lead times.
                </p>
              </div>
            </div>
          </section>

          {/* Delivery and Collection */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              5. Delivery and Collection
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">5.1 Delivery Options</h3>
                <p className="text-zinc-700 mb-3">We offer:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Standard Delivery:</strong> Within Auckland metro area</li>
                  <li><strong>Regional Delivery:</strong> Throughout New Zealand (additional charges apply)</li>
                  <li><strong>Collection:</strong> Pick-up from our Auckland location by appointment</li>
                  <li><strong>White-Glove Delivery:</strong> Premium delivery with setup and demonstration (available for select purchases)</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">5.2 Delivery Timeframes</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 mb-4">
                  <li><strong>In-Stock Items:</strong> Typically 3-10 business days within Auckland</li>
                  <li><strong>Custom/Special Orders:</strong> 6-12 weeks or as advised</li>
                  <li><strong>Regional Deliveries:</strong> Additional 3-7 business days</li>
                </ul>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                  <p className="text-zinc-700">
                    <strong>Important:</strong> Delivery timeframes are estimates only. While we strive to meet estimated delivery dates, delays may occur due to factors beyond our control (weather, supply chain issues, courier delays, etc.). We are not liable for delays unless caused by our negligence.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">5.3 Delivery Charges</h3>
                <p className="text-zinc-700 mb-3">Delivery costs vary based on:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Delivery location and distance</li>
                  <li>Product size and weight</li>
                  <li>Delivery service level selected</li>
                  <li>Accessibility of delivery address</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  Delivery charges will be clearly displayed during checkout before payment.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">5.4 Delivery Requirements</h3>
                <p className="text-zinc-700 mb-3">You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Providing accurate delivery address and contact information</li>
                  <li>Ensuring someone 18+ is available to accept delivery</li>
                  <li>Providing suitable access for delivery (clear pathways, adequate space)</li>
                  <li>Inspecting goods upon delivery and noting any visible damage</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">5.5 Failed Delivery</h3>
                <p className="text-zinc-700 mb-3">
                  If delivery fails due to your unavailability or incorrect information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>We will attempt to contact you to reschedule</li>
                  <li>Redelivery fees may apply</li>
                  <li>Products may be returned to our warehouse with storage charges</li>
                  <li>Unclaimed orders may be cancelled with restocking fees deducted from refund</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">5.6 Risk and Title</h3>
                <p className="text-zinc-700">
                  <strong>Ownership:</strong> Title to goods passes to you upon full payment.<br />
                  <strong>Risk:</strong> Risk of loss or damage passes to you upon delivery (or collection if you pick up).
                </p>
              </div>
            </div>
          </section>

          {/* Warranty Information */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              6. Warranty Information
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              Club Caddy Carts stands behind the quality of our products. Our warranty coverage varies by product tier and component:
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-lg border-l-4 border-amber-500">
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-4">6.1 Comprehensive Warranty Coverage</h3>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded">
                    <h4 className="font-semibold text-rose-800 mb-2">Premium Tier (5-Year Warranty)</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>Lithium battery system: 5 years</li>
                      <li>Motor and drivetrain: 5 years</li>
                      <li>Frame and chassis: 5 years</li>
                      <li>Electronic components: 3 years</li>
                      <li>Accessories and cosmetics: 2 years</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded">
                    <h4 className="font-semibold text-rose-800 mb-2">Standard Tier (3-Year Warranty)</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>Lithium battery system: 3 years</li>
                      <li>Motor and drivetrain: 3 years</li>
                      <li>Frame and chassis: 3 years</li>
                      <li>Electronic components: 2 years</li>
                      <li>Accessories and cosmetics: 1 year</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded">
                    <h4 className="font-semibold text-rose-800 mb-2">Essential Tier (2-Year Warranty)</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>Lithium battery system: 2 years</li>
                      <li>Motor and drivetrain: 2 years</li>
                      <li>Frame and chassis: 2 years</li>
                      <li>Electronic components: 1 year</li>
                      <li>Accessories and cosmetics: 1 year</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">6.2 Warranty Coverage Details</h3>
                <p className="text-zinc-700 mb-3"><strong>What is Covered:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 mb-4">
                  <li>Defects in materials and workmanship</li>
                  <li>Manufacturing defects</li>
                  <li>Failure of components under normal use</li>
                  <li>Premature wear of parts beyond reasonable expectations</li>
                </ul>

                <p className="text-zinc-700 mb-3"><strong>What is NOT Covered:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Normal wear and tear (tires, brake pads, etc.)</li>
                  <li>Damage from misuse, abuse, or negligence</li>
                  <li>Accidents, collisions, or external impacts</li>
                  <li>Modifications or unauthorized repairs</li>
                  <li>Failure to perform recommended maintenance</li>
                  <li>Environmental damage (corrosion, UV degradation, etc.)</li>
                  <li>Commercial use beyond rated capacity</li>
                  <li>Cosmetic issues that don't affect functionality</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">6.3 Warranty Claims Process</h3>
                <p className="text-zinc-700 mb-3">To make a warranty claim:</p>
                <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
                  <li>Contact us at admin@clubcaddycarts.com with your order number and description of the issue</li>
                  <li>Provide photos/videos of the defect or problem</li>
                  <li>Provide proof of purchase and warranty documentation</li>
                  <li>Allow us to inspect the product (may require return to our facility)</li>
                  <li>We will determine if the issue is covered under warranty</li>
                </ol>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">6.4 Warranty Remedies</h3>
                <p className="text-zinc-700 mb-3">If a warranty claim is valid, we will, at our discretion:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Repair the defective product or component</li>
                  <li>Replace the defective product or component</li>
                  <li>Provide a refund of the purchase price</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  <strong>Warranty Costs:</strong> Warranty repairs/replacements are provided free of charge. However, you may be responsible for transportation costs to/from our service center.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">6.5 Warranty Transfer</h3>
                <p className="text-zinc-700">
                  Warranties are transferable to subsequent owners during the warranty period, provided proper ownership transfer documentation is provided and the product has been properly maintained.
                </p>
              </div>
            </div>
          </section>

          {/* Consumer Guarantees Act */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              7. Consumer Guarantees Act 1993
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              Your rights under the New Zealand Consumer Guarantees Act 1993 (CGA) are in addition to our warranty and cannot be excluded for consumer purchases.
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-6">
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">7.1 Your Statutory Rights</h3>
                <p className="text-zinc-700 mb-3">Under the CGA, products must be:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Acceptable Quality:</strong> Free from defects, safe, durable, and acceptable in appearance and finish</li>
                  <li><strong>Fit for Purpose:</strong> Suitable for any specific purpose you made known to us</li>
                  <li><strong>Match Description:</strong> Match any description given by us or the manufacturer</li>
                  <li><strong>Match Sample:</strong> Match any sample or demonstration model</li>
                  <li><strong>Reasonably Priced:</strong> Spare parts and repair facilities must be reasonably available</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">7.2 Remedies Under CGA</h3>
                <p className="text-zinc-700 mb-3">If a product fails to meet these guarantees, you are entitled to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>For Minor Failures:</strong> Repair or replacement at our option</li>
                  <li><strong>For Major Failures:</strong> Reject the goods for a full refund or replacement, or keep the goods and seek compensation for loss in value</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">7.3 Business Use Exclusion</h3>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                  <p className="text-zinc-700">
                    <strong>Important:</strong> If you acquire goods for business purposes, the Consumer Guarantees Act does not apply. For business purchases, our standard warranty terms apply, and liability is limited as set out in Section 12 of these Terms.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">7.4 Reasonable Time for Remedies</h3>
                <p className="text-zinc-700">
                  Any remedies under the CGA or our warranty must be sought within a reasonable time. What constitutes "reasonable time" depends on factors including the nature of the product, purchase price, and expected lifespan.
                </p>
              </div>
            </div>
          </section>

          {/* Returns and Cancellations */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              8. Returns and Cancellations
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">8.1 Change of Mind Returns</h3>
                <p className="text-zinc-700 mb-3">
                  We offer a 14-day change of mind return policy for standard products, subject to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Product is in original, unused condition with all packaging and accessories</li>
                  <li>Product has not been registered or activated</li>
                  <li>You arrange and pay for return shipping</li>
                  <li>A 15% restocking fee may apply</li>
                  <li>Original delivery charges are non-refundable</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  <strong>Exclusions:</strong> Custom orders, configured products, and clearance items cannot be returned for change of mind.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">8.2 Faulty Product Returns</h3>
                <p className="text-zinc-700 mb-3">
                  For defective products covered by warranty or CGA:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Contact us immediately to report the defect</li>
                  <li>We will arrange collection or provide a return shipping label</li>
                  <li>No restocking fee applies for genuine faults</li>
                  <li>Full refund, repair, or replacement as appropriate</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">8.3 Order Cancellation</h3>
                <p className="text-zinc-700 mb-3"><strong>Before Shipment/Production:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 mb-4">
                  <li>Contact us as soon as possible</li>
                  <li>Cancellation may be possible with minimal or no fees</li>
                  <li>Custom orders may incur cancellation fees if production has started</li>
                </ul>

                <p className="text-zinc-700 mb-3"><strong>After Shipment:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Standard return policy applies</li>
                  <li>You are responsible for return shipping costs</li>
                  <li>Restocking fees may apply</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">8.4 Refund Processing</h3>
                <p className="text-zinc-700 mb-3">Approved refunds will be processed:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>To the original payment method</li>
                  <li>Within 5-10 business days of receiving returned goods or approval</li>
                  <li>After inspection confirms product condition</li>
                  <li>Less any applicable fees (restocking, return shipping, etc.)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Hire/Rental Terms */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              9. Hire/Rental Terms
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.1 Rental Agreement</h3>
                <p className="text-zinc-700 mb-3">
                  Each hire is subject to a separate rental agreement specifying:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Rental period (start and end dates/times)</li>
                  <li>Rental rate and total charges</li>
                  <li>Security deposit requirements</li>
                  <li>Insurance requirements and excess</li>
                  <li>Permitted use and restrictions</li>
                  <li>Condition of equipment at handover</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.2 Security Deposit</h3>
                <p className="text-zinc-700 mb-3">
                  A refundable security deposit is required for all rentals:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Amount varies based on equipment value and rental duration</li>
                  <li>Held via credit card pre-authorization or separate payment</li>
                  <li>Returned within 7 business days if equipment returned in acceptable condition</li>
                  <li>May be used to cover damage, loss, late fees, or cleaning charges</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.3 Hirer Responsibilities</h3>
                <p className="text-zinc-700 mb-3">As the hirer, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Use equipment only for lawful purposes and as intended</li>
                  <li>Operate equipment safely and in accordance with manufacturer guidelines</li>
                  <li>Not sublease or allow unauthorized persons to use the equipment</li>
                  <li>Keep equipment secure and protected from theft or damage</li>
                  <li>Report any damage or malfunction immediately</li>
                  <li>Return equipment clean and in the same condition as received</li>
                  <li>Maintain insurance coverage (or purchase our rental insurance)</li>
                  <li>Pay all rental fees, late fees, and damage charges promptly</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.4 Damage and Loss</h3>
                <p className="text-zinc-700 mb-3">
                  You are liable for any damage to or loss of rented equipment during the rental period:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Minor Damage:</strong> Repair costs deducted from security deposit</li>
                  <li><strong>Major Damage:</strong> Full repair costs or replacement value</li>
                  <li><strong>Theft/Total Loss:</strong> Full replacement value plus loss of rental income</li>
                  <li><strong>Insurance Excess:</strong> If insured, you pay the excess amount (typically $500-$2,000)</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.5 Late Returns</h3>
                <p className="text-zinc-700 mb-3">
                  Equipment must be returned by the agreed return date/time:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Late Fees:</strong> Daily rental rate plus 50% surcharge per day overdue</li>
                  <li><strong>Extensions:</strong> Must be arranged and paid for in advance (subject to availability)</li>
                  <li><strong>Unreturned Equipment:</strong> Failure to return may result in police report and legal action</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.6 Rental Cancellation</h3>
                <p className="text-zinc-700 mb-3">Cancellation fees:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>More than 7 days before rental:</strong> Full refund minus $50 admin fee</li>
                  <li><strong>3-7 days before rental:</strong> 50% refund</li>
                  <li><strong>Less than 3 days before rental:</strong> No refund</li>
                  <li><strong>Early return:</strong> No refund for unused rental days</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              10. Intellectual Property
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">10.1 Our Content and Trademarks</h3>
                <p className="text-zinc-700 mb-3">
                  All content on our website, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Text, graphics, logos, images, and videos</li>
                  <li>Software, code, and functionality</li>
                  <li>Design elements and layout</li>
                  <li>Product descriptions and specifications</li>
                  <li>Trademarks and brand names</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  ...are owned by or licensed to Club Caddy Carts and protected by copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">10.2 Limited License</h3>
                <p className="text-zinc-700">
                  You are granted a limited, non-exclusive, non-transferable license to access and use our website for personal, non-commercial purposes. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">10.3 User Content</h3>
                <p className="text-zinc-700 mb-3">
                  If you submit content (reviews, testimonials, photos, etc.), you grant us:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>A worldwide, royalty-free, perpetual license to use, reproduce, and display your content</li>
                  <li>The right to use your name and likeness in connection with the content</li>
                  <li>The right to edit or remove content at our discretion</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy and Data Protection */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              11. Privacy and Data Protection
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-4">
              We are committed to protecting your privacy and personal information in accordance with the New Zealand Privacy Act 2020.
            </p>
            <p className="text-zinc-700 leading-relaxed mb-4">
              Our collection, use, storage, and disclosure of your personal information is governed by our comprehensive <Link href="/privacy" className="text-rose-800 underline hover:text-rose-900 font-semibold">Privacy Policy</Link>.
            </p>
            <p className="text-zinc-700 leading-relaxed">
              By using our services, you consent to the collection and use of your information as described in our Privacy Policy.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              12. Limitation of Liability
            </h2>

            <div className="space-y-6">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6">
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">12.1 Consumer Purchases</h3>
                <p className="text-zinc-700">
                  <strong>Nothing in these Terms limits or excludes our liability for:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 mt-3">
                  <li>Death or personal injury caused by our negligence</li>
                  <li>Fraud or fraudulent misrepresentation</li>
                  <li>Rights under the Consumer Guarantees Act 1993</li>
                  <li>Any other liability that cannot be excluded under New Zealand law</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">12.2 Business Purchases</h3>
                <p className="text-zinc-700 mb-3">
                  For business purchases (where CGA does not apply), to the maximum extent permitted by law:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Our total liability is limited to the purchase price of the product</li>
                  <li>We exclude liability for indirect, consequential, or special damages</li>
                  <li>We exclude liability for loss of profits, revenue, data, or business opportunities</li>
                  <li>Our warranty obligations are limited to those set out in Section 6</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">12.3 Website Use</h3>
                <p className="text-zinc-700 mb-3">
                  Our website is provided "as is" without warranties of any kind:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>We do not guarantee uninterrupted or error-free access</li>
                  <li>We are not liable for viruses, malware, or security breaches beyond our reasonable control</li>
                  <li>Information on our website is for general guidance only</li>
                  <li>We are not liable for decisions made based on website content</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">12.4 Third-Party Links</h3>
                <p className="text-zinc-700">
                  Our website may contain links to third-party websites. We have no control over and accept no responsibility for the content, privacy policies, or practices of third-party websites.
                </p>
              </div>
            </div>
          </section>

          {/* Indemnification */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              13. Indemnification
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless Club Caddy Carts, its directors, officers, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li>Your breach of these Terms</li>
              <li>Your misuse of products or services</li>
              <li>Your violation of any law or third-party rights</li>
              <li>Your negligence or willful misconduct</li>
              <li>Unauthorized use of rented equipment</li>
            </ul>
          </section>

          {/* Governing Law and Disputes */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              14. Governing Law and Disputes
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">14.1 Governing Law</h3>
                <p className="text-zinc-700">
                  These Terms are governed by and construed in accordance with the laws of New Zealand. The New Zealand courts have exclusive jurisdiction over any disputes arising from these Terms.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">14.2 Dispute Resolution</h3>
                <p className="text-zinc-700 mb-3">
                  If a dispute arises, we encourage you to first contact us to resolve it informally:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
                  <li>Contact us at admin@clubcaddycarts.com with details of the dispute</li>
                  <li>We will acknowledge receipt within 2 business days</li>
                  <li>We will attempt good-faith negotiation for 30 days</li>
                  <li>If unresolved, either party may pursue mediation or legal action</li>
                </ol>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">14.3 Consumer Dispute Resolution</h3>
                <p className="text-zinc-700 mb-3">
                  For consumer disputes, you may also contact:
                </p>
                <div className="bg-zinc-50 p-4 rounded-lg">
                  <p className="font-semibold text-rose-800 mb-2">Disputes Tribunal</p>
                  <p className="text-zinc-700 text-sm mb-1">For claims up to $30,000 (or $20,000 if the other party doesn't consent)</p>
                  <p className="text-zinc-700 text-sm mb-3">Website: disputestribunal.govt.nz</p>

                  <p className="font-semibold text-rose-800 mb-2 mt-4">Commerce Commission</p>
                  <p className="text-zinc-700 text-sm mb-1">For Fair Trading Act or Consumer Guarantees Act complaints</p>
                  <p className="text-zinc-700 text-sm">Website: comcom.govt.nz | Phone: 0800 943 600</p>
                </div>
              </div>
            </div>
          </section>

          {/* General Provisions */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              15. General Provisions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">15.1 Entire Agreement</h3>
                <p className="text-zinc-700">
                  These Terms, together with our Privacy Policy and any specific rental or purchase agreements, constitute the entire agreement between you and Club Caddy Carts and supersede all prior agreements and understandings.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">15.2 Amendments</h3>
                <p className="text-zinc-700 mb-3">
                  We may update these Terms from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our services after changes constitutes acceptance.
                </p>
                <p className="text-zinc-700">
                  For material changes, we will provide notice via email or prominent website notification.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">15.3 Severability</h3>
                <p className="text-zinc-700">
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">15.4 Waiver</h3>
                <p className="text-zinc-700">
                  Our failure to enforce any right or provision of these Terms does not constitute a waiver of that right or provision.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">15.5 Assignment</h3>
                <p className="text-zinc-700">
                  You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms to any successor entity.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">15.6 Force Majeure</h3>
                <p className="text-zinc-700 mb-3">
                  We are not liable for failure to perform our obligations due to circumstances beyond our reasonable control, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Natural disasters, pandemics, or severe weather</li>
                  <li>War, terrorism, or civil unrest</li>
                  <li>Government actions or regulatory changes</li>
                  <li>Labor disputes or strikes</li>
                  <li>Supplier failures or supply chain disruptions</li>
                  <li>Technical failures beyond our control</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">15.7 Notices</h3>
                <p className="text-zinc-700 mb-3">
                  Legal notices should be sent to:
                </p>
                <div className="bg-zinc-50 p-4 rounded-lg">
                  <p className="text-zinc-700"><strong>Email:</strong> admin@clubcaddycarts.com</p>
                  <p className="text-zinc-700"><strong>Address:</strong> Club Caddy Carts, Auckland, New Zealand</p>
                </div>
                <p className="text-zinc-700 mt-4">
                  Notices to you will be sent to the email address or physical address associated with your account.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              16. Contact Information
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us:
            </p>

            <div className="bg-zinc-50 border-l-4 border-rose-800 p-6">
              <h3 className="refined-title text-xl font-semibold text-rose-800 mb-4">Club Caddy Carts</h3>
              <div className="space-y-2 text-zinc-700">
                <p><strong>Location:</strong> Auckland, New Zealand</p>
                <p><strong>Email:</strong> <a href="mailto:admin@clubcaddycarts.com" className="text-rose-800 underline hover:text-rose-900">admin@clubcaddycarts.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+64021560307" className="text-rose-800 underline hover:text-rose-900">+64 021 560 307</a></p>
                <p><strong>Website:</strong> <a href="https://clubcaddycarts.com" className="text-rose-800 underline hover:text-rose-900">clubcaddycarts.com</a></p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200">
                <p className="text-zinc-600"><strong>Business Hours:</strong></p>
                <p className="text-zinc-600 text-sm">Monday - Friday: 9:00 AM - 5:00 PM NZST</p>
                <p className="text-zinc-600 text-sm">Saturday: 10:00 AM - 2:00 PM NZST</p>
                <p className="text-zinc-600 text-sm">Sunday: Closed</p>
              </div>
            </div>

            <p className="text-zinc-700 leading-relaxed mt-6">
              We aim to respond to all inquiries within 1-2 business days.
            </p>
          </section>

          {/* Acknowledgment */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              17. Acknowledgment and Acceptance
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-4">
              By using our website, purchasing products, or hiring equipment from Club Caddy Carts, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700 mb-6">
              <li>You have read and understood these Terms of Service in their entirety</li>
              <li>You agree to be bound by these Terms and our Privacy Policy</li>
              <li>You meet the eligibility requirements (age, capacity, etc.)</li>
              <li>The information you provide is accurate and complete</li>
              <li>You understand your rights and obligations under New Zealand law</li>
              <li>You have had the opportunity to seek independent legal advice if desired</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-6">
              <p className="text-zinc-700 leading-relaxed mb-4">
                <strong>Consumer Rights Protected:</strong> These Terms are designed to comply with New Zealand consumer protection laws. Your statutory rights under the Consumer Guarantees Act 1993, Fair Trading Act 1986, and other applicable legislation are not affected by these Terms.
              </p>
              <p className="text-zinc-700 leading-relaxed">
                We are committed to fair dealing, transparency, and providing you with premium products and exceptional service.
              </p>
            </div>

            <p className="refined-title text-xl text-rose-800 font-semibold mt-6">
              Thank you for choosing Club Caddy Carts.
            </p>
          </section>

          {/* Footer Section */}
          <section className="border-t border-zinc-200 pt-8 mt-12">
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="refined-title text-xl font-semibold text-rose-800 mb-4">Club Caddy Carts</h3>
              <div className="space-y-1 text-zinc-700">
                <p>Premium Electric Golf Cart Sales & Hire</p>
                <p>Auckland, New Zealand</p>
                <p>Email: admin@clubcaddycarts.com</p>
                <p>Phone: +64 021 560 307</p>
                <p>Website: clubcaddycarts.com</p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200">
                <p className="text-zinc-600 text-sm"><strong>Last Updated:</strong> December 10, 2025</p>
                <p className="text-zinc-600 text-sm"><strong>Version:</strong> 1.0</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500">
              <p className="text-zinc-700 text-sm italic">
                This Terms of Service document is a legally binding agreement. By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms. For questions or concerns, please contact us at admin@clubcaddycarts.com.
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/privacy"
                className="text-rose-800 hover:text-rose-900 underline font-semibold refined-body"
              >
                View Our Privacy Policy
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rose-800 hover:text-rose-900 transition-colors refined-body font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backHome}
          </Link>
        </div>
      </footer>
    </div>
  )
}
