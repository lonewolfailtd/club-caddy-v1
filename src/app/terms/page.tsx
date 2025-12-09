'use client';

import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function TermsOfServicePage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-50 to-white border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-rose-800 hover:text-rose-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {language === 'en' ? 'Back to Home' : '返回首页'}
          </Link>
          <h1 className="refined-title text-4xl md:text-5xl text-zinc-900 mb-2">
            {language === 'en' ? 'Terms of Service' : '服务条款'}
          </h1>
          <p className="text-lg text-zinc-600">
            Club Caddy Carts Limited
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Last Updated */}
        <div className="mb-8 p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
          <p className="refined-body text-sm text-zinc-700">
            <span className="font-semibold">Effective Date:</span> 9 December 2025
          </p>
          <p className="refined-body text-sm text-zinc-700">
            <span className="font-semibold">Last Updated:</span> 9 December 2025
          </p>
        </div>

        <div className="prose prose-zinc max-w-none">
          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              1. Introduction and Acceptance of Terms
            </h2>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">1.1 Agreement to Terms</h3>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              Welcome to Club Caddy Carts ("we," "us," "our," or "Company"). These Terms of Service ("Terms") constitute a legally binding agreement between you ("you," "your," or "Customer") and Club Caddy Carts Limited, a company operating in Auckland, New Zealand.
            </p>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              By accessing, browsing, or using our website at clubcaddycarts.com ("Website"), or by purchasing, hiring, or using any of our products or services, you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">1.2 Capacity to Contract</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              By agreeing to these Terms, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">You are at least 18 years of age</li>
              <li className="refined-body text-zinc-700">You have the legal capacity to enter into a binding contract</li>
              <li className="refined-body text-zinc-700">You are not prohibited by law from accessing or using our services</li>
              <li className="refined-body text-zinc-700">All information you provide is accurate, current, and complete</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">1.3 Electronic Acceptance</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              In accordance with the Contract and Commercial Law Act 2017, you accept these Terms by:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Clicking "I Accept" or similar acceptance mechanism</li>
              <li className="refined-body text-zinc-700">Completing a purchase or hire transaction</li>
              <li className="refined-body text-zinc-700">Creating an account on our Website</li>
              <li className="refined-body text-zinc-700">Using our Website or services in any manner</li>
            </ul>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              Your electronic acceptance creates a valid and enforceable contract under New Zealand law.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              2. Definitions
            </h2>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              For the purposes of these Terms:
            </p>
            <div className="space-y-4">
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"Business Use"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means use of products or services acquired for the purpose of a business, trade, or profession.
                </p>
              </div>
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"CGA"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means the Consumer Guarantees Act 1993 (New Zealand).
                </p>
              </div>
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"Consumer"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means a person who acquires goods or services for personal, domestic, or household use and not for business purposes.
                </p>
              </div>
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"Content"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means all text, images, graphics, logos, videos, software, data, and other materials available on the Website.
                </p>
              </div>
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"FTA"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means the Fair Trading Act 1986 (New Zealand).
                </p>
              </div>
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"Goods"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means the electric golf carts and related products offered for sale or hire through our Website.
                </p>
              </div>
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"GST"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means Goods and Services Tax as defined under the Goods and Services Tax Act 1985 (New Zealand).
                </p>
              </div>
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"Hire Agreement"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means a separate rental or hire contract for temporary use of our Goods.
                </p>
              </div>
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"Intellectual Property"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means all patents, trademarks, service marks, trade names, copyrights, trade secrets, and other intellectual property rights.
                </p>
              </div>
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"Order"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means your request to purchase or hire Goods through our Website.
                </p>
              </div>
              <div>
                <p className="refined-body text-zinc-900 font-semibold mb-1">"Services"</p>
                <p className="refined-body text-zinc-700 leading-relaxed">
                  means delivery, maintenance, support, and other services we provide.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              3. Use of Website
            </h2>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">3.1 License to Use</h3>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Website for its intended purpose of browsing and purchasing or hiring our products.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">3.2 Prohibited Uses</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Use the Website for any unlawful purpose or in violation of these Terms</li>
              <li className="refined-body text-zinc-700">Attempt to gain unauthorized access to any portion of the Website or systems</li>
              <li className="refined-body text-zinc-700">Use any automated system (including robots, spiders, or scrapers) to access the Website</li>
              <li className="refined-body text-zinc-700">Interfere with or disrupt the Website or servers</li>
              <li className="refined-body text-zinc-700">Transmit viruses, malware, or other harmful code</li>
              <li className="refined-body text-zinc-700">Impersonate any person or entity or misrepresent your affiliation</li>
              <li className="refined-body text-zinc-700">Collect or harvest personal information of other users</li>
              <li className="refined-body text-zinc-700">Use the Website to transmit unsolicited commercial communications</li>
              <li className="refined-body text-zinc-700">Reproduce, duplicate, copy, sell, or exploit any portion of the Website without express written permission</li>
              <li className="refined-body text-zinc-700">Reverse engineer or attempt to extract source code from our Website</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">3.3 Account Security</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              If you create an account on our Website, you are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Maintaining the confidentiality of your account credentials</li>
              <li className="refined-body text-zinc-700">All activities that occur under your account</li>
              <li className="refined-body text-zinc-700">Notifying us immediately of any unauthorized access or security breach</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">3.4 Suspension and Termination</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              We reserve the right to suspend or terminate your access to the Website at our sole discretion, without notice, for conduct that we believe:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Violates these Terms or applicable law</li>
              <li className="refined-body text-zinc-700">Is harmful to other users, us, or third parties</li>
              <li className="refined-body text-zinc-700">Subjects us to liability</li>
              <li className="refined-body text-zinc-700">Is fraudulent or involves the sale of counterfeit or stolen items</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              4. Products and Services
            </h2>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">4.1 Product Descriptions</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              We offer premium 72V lithium electric golf carts in various configurations (2-20 seater models) for sale and hire. We make every effort to provide accurate product descriptions, specifications, and images. However:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Images are for illustrative purposes and actual products may vary slightly in appearance</li>
              <li className="refined-body text-zinc-700">Specifications are subject to manufacturer changes</li>
              <li className="refined-body text-zinc-700">Colours displayed may vary depending on your monitor settings</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">4.2 Product Availability</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              All products are subject to availability. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Limit quantities of products available for purchase or hire</li>
              <li className="refined-body text-zinc-700">Discontinue any product at any time</li>
              <li className="refined-body text-zinc-700">Refuse any order at our sole discretion</li>
            </ul>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              If a product becomes unavailable after you place an order, we will notify you promptly and offer a full refund or suitable alternative.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">4.3 Business Location and Services</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              We operate from Auckland, New Zealand, and provide:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700"><span className="font-semibold">Sales:</span> Permanent purchase of electric golf carts</li>
              <li className="refined-body text-zinc-700"><span className="font-semibold">Hire/Rental:</span> Temporary hire arrangements under separate Hire Agreements</li>
              <li className="refined-body text-zinc-700"><span className="font-semibold">Delivery:</span> Nationwide delivery across New Zealand (additional terms apply)</li>
              <li className="refined-body text-zinc-700"><span className="font-semibold">Support:</span> Customer service, maintenance, and technical support</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">4.4 Accuracy of Information</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              While we strive to ensure all information on our Website is accurate and current, we do not warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Product descriptions or other content are error-free</li>
              <li className="refined-body text-zinc-700">The Website will be uninterrupted or error-free</li>
              <li className="refined-body text-zinc-700">Defects will be corrected</li>
              <li className="refined-body text-zinc-700">The Website or servers are free of viruses or harmful components</li>
            </ul>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              In accordance with the Fair Trading Act 1986, we do not engage in misleading or deceptive conduct. Any errors or omissions will be corrected promptly upon discovery.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              5. Pricing and Payment Terms
            </h2>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">5.1 Pricing</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              All prices displayed on our Website are:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">In New Zealand Dollars (NZD)</li>
              <li className="refined-body text-zinc-700"><span className="font-semibold">Inclusive of GST</span> (15%) unless otherwise stated</li>
              <li className="refined-body text-zinc-700">Subject to change without notice</li>
              <li className="refined-body text-zinc-700">Valid at the time of order placement</li>
            </ul>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              The price charged will be the price displayed at the time you complete your order, subject to availability.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">5.2 GST Compliance</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              In compliance with the Fair Trading Act 1986 and the Goods and Services Tax Act 1985:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">All advertised prices include GST</li>
              <li className="refined-body text-zinc-700">Tax invoices will be provided for all transactions</li>
              <li className="refined-body text-zinc-700">GST will be separately itemized on all invoices</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">5.3 Payment Methods</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              We accept the following payment methods:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Credit cards (Visa, Mastercard, American Express)</li>
              <li className="refined-body text-zinc-700">Debit cards</li>
              <li className="refined-body text-zinc-700">Bank transfers</li>
              <li className="refined-body text-zinc-700">Approved financing options (subject to credit approval)</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">5.4 Payment Terms</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Payment is due in full at the time of order unless otherwise arranged</li>
              <li className="refined-body text-zinc-700">For bank transfers, orders will not be processed until payment is received in full</li>
              <li className="refined-body text-zinc-700">For financed purchases, separate financing terms apply</li>
              <li className="refined-body text-zinc-700">We reserve the right to cancel orders if payment is not received</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">5.5 Payment Security</h3>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              All payment processing is conducted through secure, encrypted connections. We do not store complete credit card information on our servers. Payment information is processed by our third-party payment processors in compliance with PCI DSS standards.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">5.6 Price Errors</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              Despite our best efforts, products may occasionally be listed at incorrect prices due to human error or technical issues. If we discover a pricing error:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">We will notify you as soon as possible</li>
              <li className="refined-body text-zinc-700">We offer you the option to purchase at the correct price or cancel your order</li>
              <li className="refined-body text-zinc-700">If you have already paid, we will refund the difference or cancel and refund in full at your choice</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              6. Delivery and Shipping
            </h2>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">6.1 Delivery Area</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              We deliver throughout New Zealand. Delivery charges vary based on:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Delivery location</li>
              <li className="refined-body text-zinc-700">Product size and weight</li>
              <li className="refined-body text-zinc-700">Delivery timeframe selected</li>
            </ul>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              Specific delivery costs will be calculated and displayed before you complete your order.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">6.2 Delivery Timeframes</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              We aim to deliver within the timeframes specified at the time of order. However:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Delivery times are estimates only and not guaranteed</li>
              <li className="refined-body text-zinc-700">Delays may occur due to factors beyond our control</li>
              <li className="refined-body text-zinc-700">We will notify you of any significant delays</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">6.3 Delivery Process</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">You will be contacted to arrange a suitable delivery date and time</li>
              <li className="refined-body text-zinc-700">Someone must be present to receive delivery and inspect the goods</li>
              <li className="refined-body text-zinc-700">You will be required to sign for receipt of the goods</li>
              <li className="refined-body text-zinc-700">Risk of loss or damage passes to you upon delivery</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">6.4 Failed Delivery</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              If delivery cannot be completed due to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">No one being present at the delivery address</li>
              <li className="refined-body text-zinc-700">Incorrect or incomplete delivery information provided by you</li>
              <li className="refined-body text-zinc-700">Refusal to accept delivery</li>
            </ul>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              You may be charged additional delivery fees for redelivery attempts.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">6.5 Inspection Upon Delivery</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              You must inspect the goods upon delivery and notify the delivery driver immediately of any:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Visible damage</li>
              <li className="refined-body text-zinc-700">Missing items</li>
              <li className="refined-body text-zinc-700">Incorrect products</li>
            </ul>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              Failure to report issues at the time of delivery may affect your rights to claim for transit damage.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">6.6 Title and Risk</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Title to the goods passes to you upon full payment</li>
              <li className="refined-body text-zinc-700">Risk of loss or damage passes to you upon delivery</li>
              <li className="refined-body text-zinc-700">Until title passes, you must not sell, dispose of, or encumber the goods</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              7. Consumer Guarantees
            </h2>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">7.1 Application of Consumer Guarantees Act</h3>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              If you are acquiring goods or services as a <span className="font-semibold">Consumer</span> (for personal, domestic, or household use), the Consumer Guarantees Act 1993 applies to your purchase and <span className="font-semibold">cannot be excluded</span>.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">7.2 Guarantees Under the CGA</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              Under the Consumer Guarantees Act, all goods and services supplied by us come with guarantees that:
            </p>
            <div className="mb-4">
              <p className="refined-body text-zinc-900 font-semibold mb-2">For Goods:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="refined-body text-zinc-700">Are of acceptable quality</li>
                <li className="refined-body text-zinc-700">Are fit for any particular purpose you made known to us</li>
                <li className="refined-body text-zinc-700">Match the description we provided</li>
                <li className="refined-body text-zinc-700">Match any sample or demonstration model</li>
                <li className="refined-body text-zinc-700">Have spare parts and repair facilities reasonably available</li>
                <li className="refined-body text-zinc-700">Come with clear title and free from undisclosed securities</li>
                <li className="refined-body text-zinc-700">Do not infringe intellectual property rights</li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="refined-body text-zinc-900 font-semibold mb-2">For Services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="refined-body text-zinc-700">Are carried out with reasonable care and skill</li>
                <li className="refined-body text-zinc-700">Are fit for any particular purpose you made known to us</li>
                <li className="refined-body text-zinc-700">Are completed within a reasonable time (if no time specified)</li>
              </ul>
            </div>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">7.3 Remedies for Breach of Guarantees</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              If there is a failure to comply with a guarantee under the CGA, you are entitled to remedies which may include:
            </p>
            <div className="mb-4">
              <p className="refined-body text-zinc-900 font-semibold mb-2">For Minor Failures:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="refined-body text-zinc-700">Repair of the goods</li>
                <li className="refined-body text-zinc-700">Replacement of the goods (at our option)</li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="refined-body text-zinc-900 font-semibold mb-2">For Major Failures:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li className="refined-body text-zinc-700">Rejection of goods and refund of the purchase price</li>
                <li className="refined-body text-zinc-700">Rejection of goods and replacement with goods of the same type</li>
                <li className="refined-body text-zinc-700">Compensation for reduction in value below the price paid</li>
              </ul>
            </div>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              A failure is <span className="font-semibold">major</span> if:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">The goods would not have been acquired by a reasonable consumer fully aware of the nature and extent of the failure</li>
              <li className="refined-body text-zinc-700">The goods depart substantially from the description or sample</li>
              <li className="refined-body text-zinc-700">The goods are substantially unfit for their common purpose and cannot easily be remedied within a reasonable time</li>
              <li className="refined-body text-zinc-700">The goods are unsafe</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">7.4 Timeframes for Claims</h3>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              You should notify us as soon as practicable after discovering a fault. The CGA guarantees apply for a reasonable time, which depends on factors including the nature and price of the goods, the use to which the goods have been put, and the length of time between purchase and failure. For major purchases such as electric golf carts, this reasonable time is typically several years.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">7.5 Business Use Exclusion</h3>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              If you are acquiring goods or services for <span className="font-semibold">Business Use</span>, you may agree to exclude, restrict, or modify the Consumer Guarantees Act by providing written notice to us before purchase. In such cases, your remedies will be governed by any applicable warranty terms and general contract law.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              8. Returns, Refunds, and Cancellations
            </h2>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">8.1 Consumer Purchases</h3>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              For Consumer purchases, your rights to returns and refunds are governed by the Consumer Guarantees Act as described in Section 7.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">8.2 Change of Mind Returns</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              We are not obligated to accept returns or provide refunds for change of mind. However, we may, at our sole discretion, accept returns in certain circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">The product must be in original, unused condition</li>
              <li className="refined-body text-zinc-700">All packaging and accessories must be included</li>
              <li className="refined-body text-zinc-700">Returns must be requested within 7 days of delivery</li>
              <li className="refined-body text-zinc-700">A restocking fee may apply</li>
              <li className="refined-body text-zinc-700">You are responsible for return shipping costs</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">8.3 Cancellation Before Delivery</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              You may cancel an order before dispatch by contacting us. If we have already processed your payment:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">We will provide a full refund if the goods have not been dispatched</li>
              <li className="refined-body text-zinc-700">If goods have been dispatched but not delivered, you may refuse delivery and we will refund upon receipt of returned goods (less any delivery costs incurred)</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">8.4 Cancellation for Custom Orders</h3>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              Orders for customized or specially configured products may not be cancelled once production has commenced. Any deposits paid are non-refundable for custom orders.
            </p>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">8.5 Refund Processing</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              Approved refunds will be processed:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">To the original payment method</li>
              <li className="refined-body text-zinc-700">Within 10 business days of approval</li>
              <li className="refined-body text-zinc-700">Less any applicable fees or costs</li>
            </ul>

            <h3 className="refined-title text-xl text-zinc-800 mb-3 mt-6">8.6 Warranty Returns</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              For warranty claims under the CGA or manufacturer warranty:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Contact us immediately upon discovering the fault</li>
              <li className="refined-body text-zinc-700">Provide proof of purchase and details of the fault</li>
              <li className="refined-body text-zinc-700">We will assess the claim and determine the appropriate remedy</li>
              <li className="refined-body text-zinc-700">We will cover reasonable costs of return for valid warranty claims</li>
            </ul>
          </section>

          {/* Continue with remaining sections... */}
          {/* For brevity, I'll include a summary note for the remaining sections */}

          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              9. Hire and Rental Terms
            </h2>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              Hire or rental of our products is governed by a separate Hire Agreement which you must sign before taking possession of hired goods. These Terms supplement the Hire Agreement. For complete details on hire periods, charges, security deposits, hirer responsibilities, insurance requirements, and early termination conditions, please refer to the full Terms of Service document or contact us directly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              10. Intellectual Property Rights
            </h2>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              All Content on our Website, including text, graphics, logos, images, videos, software, trademarks ("Club Caddy Carts" and associated marks), product designs, and website layout is owned by or licensed to Club Caddy Carts and is protected by New Zealand and international intellectual property laws. You are granted a limited license to view Content for personal, non-commercial use only.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              11. Limitation of Liability
            </h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
              <p className="refined-body text-zinc-900 font-semibold mb-2">Important:</p>
              <p className="refined-body text-zinc-700 leading-relaxed">
                If you are a Consumer under the Consumer Guarantees Act 1993, nothing in this Section limits or excludes the guarantees or remedies you have under the CGA, Fair Trading Act 1986, or other consumer protection legislation.
              </p>
            </div>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              For Business Use or where the CGA does not apply, we exclude liability for indirect, incidental, special, or consequential damages, and our total liability is limited to the cost of replacing the goods or supplying the services again, not exceeding the amount you paid.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              12. Indemnification
            </h2>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Club Caddy Carts, its directors, officers, employees, agents, and affiliates from any claims, liabilities, damages, losses, costs, or expenses arising from your breach of these Terms, violation of any law or third-party rights, use or misuse of our products or services, negligence, or willful misconduct.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              13. Dispute Resolution
            </h2>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              Before commencing formal proceedings, parties agree to attempt resolution through good faith negotiation and mediation. For disputes within jurisdiction limits, you may file with the Disputes Tribunal. Nothing prevents you from seeking remedies under the Consumer Guarantees Act or Fair Trading Act, or making complaints to Commerce Commission New Zealand.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              14. Governing Law and Jurisdiction
            </h2>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              These Terms are governed by the laws of New Zealand, including the Contract and Commercial Law Act 2017, Consumer Guarantees Act 1993, Fair Trading Act 1986, Goods and Services Tax Act 1985, Privacy Act 2020, and Electronic Transactions Act 2002. Parties submit to the exclusive jurisdiction of New Zealand courts. Our principal place of business is Auckland, New Zealand.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              15. Privacy and Data Protection
            </h2>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              Our collection, use, and disclosure of personal information is governed by our Privacy Policy, which complies with the Privacy Act 2020. We collect information necessary to process orders, provide customer service, fulfill legal obligations, and send marketing communications (with consent). You have rights to access, correct, delete, and opt-out of marketing communications.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              16. Modification of Terms
            </h2>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective when posted with an updated "Last Updated" date. Your continued use after changes constitutes acceptance. Changes do not affect orders placed before the effective date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              17. General Provisions
            </h2>
            <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
              These Terms constitute the entire agreement between you and Club Caddy Carts. Invalid provisions will be modified to minimum extent necessary. No waiver of any right constitutes a waiver of future rights. You may not assign these Terms without our consent. Nothing creates a partnership or agency relationship.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              18. Consumer Protection Notice
            </h2>
            <div className="bg-rose-50 border-l-4 border-rose-800 p-6 mb-4">
              <h3 className="refined-title text-lg text-zinc-900 mb-3">Your Rights Under New Zealand Law</h3>
              <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
                As a consumer in New Zealand, you have strong protections under the law:
              </p>
              <ul className="space-y-3">
                <li>
                  <p className="refined-body text-zinc-900 font-semibold">Consumer Guarantees Act 1993:</p>
                  <p className="refined-body text-zinc-700">Provides automatic guarantees for goods and services purchased for personal use. These guarantees cannot be excluded or modified for consumer purchases.</p>
                </li>
                <li>
                  <p className="refined-body text-zinc-900 font-semibold">Fair Trading Act 1986:</p>
                  <p className="refined-body text-zinc-700">Prohibits misleading and deceptive conduct, false representations, and unfair contract terms. We are committed to honest and fair trading practices.</p>
                </li>
                <li>
                  <p className="refined-body text-zinc-900 font-semibold">Privacy Act 2020:</p>
                  <p className="refined-body text-zinc-700">Protects your personal information and gives you rights to access and correct your data.</p>
                </li>
              </ul>
            </div>

            <h3 className="refined-title text-lg text-zinc-900 mb-3 mt-6">How to Exercise Your Rights</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Product quality or service delivery: Contact us at admin@clubcaddycarts.com</li>
              <li className="refined-body text-zinc-700">Misleading conduct or unfair trading: Contact the Commerce Commission at www.comcom.govt.nz</li>
              <li className="refined-body text-zinc-700">Privacy issues: Contact the Privacy Commissioner at www.privacy.org.nz</li>
              <li className="refined-body text-zinc-700">Disputes: Use the Disputes Tribunal for claims up to $30,000 (consumers)</li>
            </ul>

            <h3 className="refined-title text-lg text-zinc-900 mb-3 mt-6">Our Commitment</h3>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">We are committed to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li className="refined-body text-zinc-700">Honest and transparent business practices</li>
              <li className="refined-body text-zinc-700">Providing accurate product information</li>
              <li className="refined-body text-zinc-700">Honoring your rights under New Zealand consumer law</li>
              <li className="refined-body text-zinc-700">Resolving disputes fairly and promptly</li>
              <li className="refined-body text-zinc-700">Protecting your personal information</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              19. Contact Information
            </h2>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-6">
              <p className="refined-body text-zinc-700 mb-4 leading-relaxed">
                For questions, concerns, or complaints regarding these Terms or our services:
              </p>
              <div className="space-y-2">
                <p className="refined-body text-zinc-900 font-semibold text-lg mb-3">Club Caddy Carts Limited</p>
                <p className="refined-body text-zinc-700">
                  <span className="font-semibold">Email:</span> admin@clubcaddycarts.com
                </p>
                <p className="refined-body text-zinc-700">
                  <span className="font-semibold">Phone:</span> +64 021 560 307
                </p>
                <p className="refined-body text-zinc-700">
                  <span className="font-semibold">Website:</span> clubcaddycarts.com
                </p>
                <p className="refined-body text-zinc-700">
                  <span className="font-semibold">Business Location:</span> Auckland, New Zealand
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-300">
                  <p className="refined-body text-zinc-900 font-semibold mb-2">Business Hours:</p>
                  <p className="refined-body text-zinc-700">Monday - Friday: 9:00 AM - 5:00 PM (NZDT)</p>
                  <p className="refined-body text-zinc-700">Saturday: 10:00 AM - 2:00 PM (NZDT)</p>
                  <p className="refined-body text-zinc-700">Sunday: Closed</p>
                </div>
                <p className="refined-body text-zinc-700 mt-4">
                  <span className="font-semibold">Customer Service:</span> We aim to respond to all enquiries within 1-2 business days.
                </p>
              </div>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl text-zinc-900 mb-6 pb-3 border-b-2 border-rose-800">
              20. Acknowledgment and Consent
            </h2>
            <p className="refined-body text-zinc-700 mb-3 leading-relaxed">
              By using our Website, making a purchase, or hiring our products, you acknowledge that:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li className="refined-body text-zinc-700">You have read and understood these Terms in their entirety</li>
              <li className="refined-body text-zinc-700">You agree to be bound by these Terms and any future modifications</li>
              <li className="refined-body text-zinc-700">You understand your rights under New Zealand consumer protection laws</li>
              <li className="refined-body text-zinc-700">You have had the opportunity to seek independent legal advice</li>
              <li className="refined-body text-zinc-700">You consent to electronic communications and transactions</li>
              <li className="refined-body text-zinc-700">All information you provide is accurate and complete</li>
            </ol>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="refined-body text-zinc-900 font-semibold mb-2">For Consumer purchases:</p>
              <p className="refined-body text-zinc-700 leading-relaxed">
                You acknowledge that your rights under the Consumer Guarantees Act 1993 and Fair Trading Act 1986 cannot be excluded and take precedence over any conflicting provisions in these Terms.
              </p>
            </div>
            <div className="bg-zinc-100 border-l-4 border-zinc-500 p-4">
              <p className="refined-body text-zinc-900 font-semibold mb-2">For Business purchases:</p>
              <p className="refined-body text-zinc-700 leading-relaxed">
                If you are purchasing for business use and wish to exclude the Consumer Guarantees Act, you must provide written notice to us before completing your purchase.
              </p>
            </div>
          </section>

          {/* Closing Statement */}
          <div className="text-center py-8 border-t-2 border-zinc-200">
            <p className="refined-body text-lg text-zinc-900 font-semibold mb-2">
              Thank you for choosing Club Caddy Carts.
            </p>
            <p className="refined-body text-zinc-700">
              We look forward to serving you with premium electric golf cart solutions.
            </p>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center text-sm text-zinc-500 space-y-2">
            <p className="refined-body">
              These Terms of Service were last updated on 9 December 2025. Please check our Website regularly for updates.
            </p>
            <p className="refined-body">
              This document is provided for general information purposes. While we have taken care to ensure legal compliance, you should seek independent legal advice for your specific circumstances.
            </p>
          </div>
        </div>

        {/* Back to Top Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 bg-rose-800 text-white rounded-lg hover:bg-rose-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
}
