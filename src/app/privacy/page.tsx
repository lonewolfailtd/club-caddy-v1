'use client'

import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: December 9, 2025',
      backHome: 'Back to Home',
    },
    zh: {
      title: '隐私政策',
      lastUpdated: '最后更新：2025年12月9日',
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
              1. Introduction
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-4">
              Welcome to Club Caddy Carts ("we," "our," "us," or "Club Caddy Carts"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, disclose, and protect your personal information in accordance with the New Zealand Privacy Act 2020.
            </p>
            <p className="text-zinc-700 leading-relaxed mb-4">
              Club Caddy Carts is an e-commerce business based in Auckland, New Zealand, specializing in the sales and hire of premium electric golf carts. We take our privacy obligations seriously and are committed to being transparent about how we handle your personal information.
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
              By using our website, purchasing our products, or engaging with our services, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your personal information as described herein.
            </p>
            <p className="text-zinc-700 leading-relaxed">
              This Privacy Policy applies to all personal information collected through our website, mobile applications (if applicable), email communications, phone calls, and any other interactions you have with Club Caddy Carts.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              2. Information We Collect
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              We collect various types of personal information to provide you with our products and services, improve your customer experience, and fulfill our legal obligations. The information we collect includes:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">2.1 Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Name:</strong> First name and surname</li>
                  <li><strong>Contact Information:</strong> Email address, phone number, postal address</li>
                  <li><strong>Delivery Address:</strong> Physical address for product delivery (may differ from billing address)</li>
                  <li><strong>Account Information:</strong> Username, password (encrypted), and account preferences</li>
                  <li><strong>Date of Birth:</strong> When required for age verification or promotional purposes</li>
                  <li><strong>Business Information:</strong> Company name, ABN/NZBN (if purchasing as a business)</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">2.2 Financial Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Payment Details:</strong> Credit card information, debit card information, bank account details</li>
                  <li><strong>Billing Address:</strong> Address associated with your payment method</li>
                  <li><strong>Transaction History:</strong> Records of purchases, hire agreements, and payment transactions</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                  <p className="text-zinc-700">
                    <strong>Please Note:</strong> We do not store complete credit card details on our servers. Payment information is processed securely through our third-party payment processors (including Stripe, PayPal, and other secure payment gateways) that comply with Payment Card Industry Data Security Standards (PCI DSS).
                  </p>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">2.3 Order and Service Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Purchase History:</strong> Records of products purchased or hired</li>
                  <li><strong>Order Details:</strong> Product specifications, quantities, prices, delivery preferences</li>
                  <li><strong>Hire Agreements:</strong> Terms of hire, duration, equipment details</li>
                  <li><strong>Communication Records:</strong> Emails, phone calls, live chat transcripts, and customer service interactions</li>
                  <li><strong>Feedback and Reviews:</strong> Product reviews, testimonials, and survey responses</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">2.4 Technical and Usage Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Device Information:</strong> IP address, browser type and version, operating system, device type</li>
                  <li><strong>Cookies and Tracking Data:</strong> Information collected through cookies, web beacons, and similar technologies</li>
                  <li><strong>Website Usage Data:</strong> Pages visited, time spent on pages, navigation paths, click-through data</li>
                  <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                  <li><strong>Referral Source:</strong> How you found our website (search engines, social media, direct link, etc.)</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">2.5 Marketing and Communication Preferences</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Newsletter Subscriptions:</strong> Email preferences for marketing communications</li>
                  <li><strong>Communication Preferences:</strong> Preferred methods and frequency of contact</li>
                  <li><strong>Marketing Consent:</strong> Records of consent for marketing communications</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">2.6 Information from Third Parties</h3>
                <p className="text-zinc-700 mb-3">We may receive information about you from third-party sources, including:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Social Media Platforms:</strong> If you interact with us on social media or use social login features</li>
                  <li><strong>Business Partners:</strong> Information shared by delivery partners, payment processors, or marketing partners</li>
                  <li><strong>Publicly Available Sources:</strong> Information that is publicly accessible online</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Collect Information */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              3. How We Collect Information
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              We collect personal information through various channels and methods, ensuring transparency and compliance with the Privacy Act 2020.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">3.1 Direct Collection</h3>
                <p className="text-zinc-700 mb-3">Most information is collected directly from you when you:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Create an account on our website</li>
                  <li>Make a purchase or hire equipment</li>
                  <li>Subscribe to our newsletter or marketing communications</li>
                  <li>Contact our customer service team</li>
                  <li>Complete surveys, questionnaires, or feedback forms</li>
                  <li>Participate in promotions, competitions, or events</li>
                  <li>Interact with us via phone, email, or live chat</li>
                  <li>Visit our physical location (if applicable)</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">3.2 Automatic Collection</h3>
                <p className="text-zinc-700 mb-3">Some information is collected automatically when you use our website through:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Cookies and Similar Technologies:</strong> See Section 9 for detailed cookie information</li>
                  <li><strong>Web Analytics Tools:</strong> Google Analytics and similar services</li>
                  <li><strong>Server Logs:</strong> Automatically recorded technical information about your visit</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">3.3 Third-Party Collection</h3>
                <p className="text-zinc-700 mb-3">We may collect information about you from:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Payment Processors:</strong> Transaction confirmation and fraud prevention data</li>
                  <li><strong>Delivery Partners:</strong> Delivery status and confirmation information</li>
                  <li><strong>Social Media Platforms:</strong> When you interact with our social media pages or use social login</li>
                  <li><strong>Credit Reporting Agencies:</strong> When required for credit checks on hire agreements</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">3.4 Manner of Collection</h3>
                <p className="text-zinc-700 mb-3">We ensure that personal information is collected:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Lawfully:</strong> In compliance with the Privacy Act 2020</li>
                  <li><strong>Fairly:</strong> Without being intrusive or unreasonably interfering with your privacy</li>
                  <li><strong>Transparently:</strong> With your knowledge and, where required, your consent</li>
                  <li><strong>With Notification:</strong> We inform you at the point of collection about why we need the information and how it will be used</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  If we collect information from someone other than you, we will take reasonable steps to notify you, unless an exception under the Privacy Act 2020 applies.
                </p>
              </div>
            </div>
          </section>

          {/* Why We Collect Information */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              4. Why We Collect Information (Purpose of Collection)
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              We collect and use your personal information for specific, legitimate business purposes in accordance with IPP 1 and IPP 10 of the Privacy Act 2020. These purposes include:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.1 Order Processing and Fulfillment</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Processing your purchases and hire agreements</li>
                  <li>Arranging delivery and logistics</li>
                  <li>Managing returns, exchanges, and refunds</li>
                  <li>Providing customer support and resolving issues</li>
                  <li>Maintaining accurate order records</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.2 Customer Service and Communication</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Responding to your inquiries and support requests</li>
                  <li>Providing technical assistance and product information</li>
                  <li>Sending transactional communications (order confirmations, shipping notifications, etc.)</li>
                  <li>Managing warranty claims and after-sales service</li>
                  <li>Conducting customer satisfaction surveys</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.3 Account Management</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Creating and maintaining your customer account</li>
                  <li>Authenticating your identity and preventing unauthorized access</li>
                  <li>Storing your preferences and order history</li>
                  <li>Enabling features like saved addresses and payment methods</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.4 Marketing and Promotional Activities</h3>
                <p className="text-zinc-700 mb-3"><strong>With Your Consent:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 mb-4">
                  <li>Sending marketing emails, newsletters, and promotional offers</li>
                  <li>Providing information about new products, services, and special offers</li>
                  <li>Inviting you to participate in competitions, events, or promotions</li>
                  <li>Personalizing marketing content based on your preferences and purchase history</li>
                </ul>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                  <p className="text-zinc-700">
                    <strong>Right to Withdraw Consent:</strong> You can withdraw consent for marketing communications at any time by clicking the "unsubscribe" link in our emails or contacting us directly.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.5 Website Improvement and Analytics</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Analyzing website usage and user behavior</li>
                  <li>Improving website functionality, design, and user experience</li>
                  <li>Testing new features and services</li>
                  <li>Conducting market research and trend analysis</li>
                  <li>Optimizing our product offerings based on customer preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.6 Security and Fraud Prevention</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Detecting and preventing fraudulent transactions</li>
                  <li>Protecting against unauthorized access and cyber threats</li>
                  <li>Verifying your identity to prevent identity theft</li>
                  <li>Monitoring for suspicious activity</li>
                  <li>Maintaining the security and integrity of our systems</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.7 Legal and Regulatory Compliance</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Complying with New Zealand laws and regulations</li>
                  <li>Responding to legal requests, court orders, and regulatory requirements</li>
                  <li>Enforcing our terms and conditions</li>
                  <li>Resolving disputes and legal claims</li>
                  <li>Maintaining records for tax and accounting purposes</li>
                  <li>Meeting obligations under consumer protection laws</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">4.8 Business Operations</h3>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Managing our supplier and business partner relationships</li>
                  <li>Conducting internal audits and quality control</li>
                  <li>Training staff and improving customer service</li>
                  <li>Business planning and strategic decision-making</li>
                  <li>Merger, acquisition, or sale of business activities</li>
                </ul>
              </div>
            </div>

            <p className="text-zinc-700 leading-relaxed mt-6">
              We will not use your personal information for any purpose that is materially different from those listed above without first obtaining your consent or unless permitted by law.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              5. How We Use Your Information
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              The use of your personal information is governed by the principles of necessity, relevance, and proportionality. We use your information only for the purposes outlined in Section 4, and we ensure that:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">5.1 Accuracy and Relevance (IPP 8)</h3>
                <p className="text-zinc-700 mb-3">
                  Before using your personal information for any decision that significantly affects you, we take reasonable steps to ensure that the information is:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Accurate and up to date</li>
                  <li>Complete and relevant to the purpose</li>
                  <li>Not misleading</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  You can help us maintain accurate records by updating your account information regularly and notifying us of any changes.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">5.2 Automated Decision-Making</h3>
                <p className="text-zinc-700 mb-3">We may use automated systems to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Detect fraudulent transactions</li>
                  <li>Personalize your website experience</li>
                  <li>Recommend products based on your browsing and purchase history</li>
                  <li>Optimize pricing and promotional offers</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  Where automated decision-making significantly affects you, you have the right to request human intervention and review.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">5.3 Data Minimization</h3>
                <p className="text-zinc-700">
                  We only collect and use personal information that is necessary for the specified purposes. We do not collect excessive or irrelevant information.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">5.4 Consent-Based Use</h3>
                <p className="text-zinc-700">
                  For certain uses of your personal information (particularly marketing communications), we rely on your explicit consent. You have the right to withdraw this consent at any time without affecting the lawfulness of processing based on consent before its withdrawal.
                </p>
              </div>
            </div>
          </section>

          {/* Disclosure of Personal Information */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              6. Disclosure of Personal Information
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              We may disclose your personal information to third parties in accordance with IPP 11 of the Privacy Act 2020. We only disclose your information when necessary and ensure that recipients are bound by confidentiality and privacy obligations.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">6.1 Service Providers and Business Partners</h3>
                <p className="text-zinc-700 mb-4">
                  We may disclose your information to trusted third-party service providers who assist us in operating our business, including:
                </p>

                <div className="space-y-4">
                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Payment Processors:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>Stripe, PayPal, and other payment gateways</li>
                      <li><strong>Purpose:</strong> Processing payments securely</li>
                      <li><strong>Location:</strong> May include overseas processors</li>
                      <li><strong>Protection:</strong> PCI DSS compliant, bound by strict confidentiality agreements</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Delivery and Logistics Partners:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>Courier services and freight companies</li>
                      <li><strong>Purpose:</strong> Delivering products to your address</li>
                      <li><strong>Information Shared:</strong> Name, delivery address, phone number, order details</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Technology Service Providers:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>Website hosting services</li>
                      <li>Cloud storage providers</li>
                      <li>Email marketing platforms</li>
                      <li>Customer relationship management (CRM) systems</li>
                      <li>Analytics and data processing services</li>
                      <li><strong>Purpose:</strong> Maintaining and improving our technical infrastructure</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Marketing and Advertising Partners:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>Google Analytics</li>
                      <li>Social media advertising platforms</li>
                      <li>Email marketing services</li>
                      <li><strong>Purpose:</strong> Conducting marketing campaigns and analyzing their effectiveness</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Professional Advisors:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>Lawyers, accountants, auditors, and business consultants</li>
                      <li><strong>Purpose:</strong> Obtaining professional advice and services</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">6.2 Legal and Regulatory Authorities</h3>
                <p className="text-zinc-700 mb-3">We may disclose your information to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 mb-4">
                  <li>New Zealand government agencies (Inland Revenue Department, Ministry of Business, Innovation and Employment, etc.)</li>
                  <li>Law enforcement agencies</li>
                  <li>Courts and tribunals</li>
                  <li>Regulatory bodies</li>
                  <li>Privacy Commissioner</li>
                </ul>
                <p className="text-zinc-700 mb-3"><strong>Circumstances for disclosure:</strong></p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>When required by law or legal process</li>
                  <li>To enforce our terms and conditions</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>To prevent fraud or criminal activity</li>
                  <li>In response to lawful requests from public authorities</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">6.3 Business Transfers</h3>
                <p className="text-zinc-700">
                  In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, your personal information may be transferred to the successor entity. We will notify you of any such change and the choices you may have regarding your personal information.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">6.4 With Your Consent</h3>
                <p className="text-zinc-700">
                  We may disclose your personal information to other third parties with your explicit consent.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">6.5 No Selling of Personal Information</h3>
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="text-zinc-700">
                    <strong>Important:</strong> We do not sell, rent, or trade your personal information to third parties for their marketing purposes. Your trust is paramount to us.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">6.6 Overseas Disclosure</h3>
                <p className="text-zinc-700 mb-3">
                  Some of our service providers may be located outside New Zealand, including in:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 mb-4">
                  <li>Australia</li>
                  <li>United States</li>
                  <li>European Union countries</li>
                  <li>Other jurisdictions where cloud service providers operate</li>
                </ul>
                <p className="text-zinc-700 mb-3">When we disclose information overseas, we:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Ensure the recipient is subject to privacy laws that provide comparable protection to the Privacy Act 2020, or</li>
                  <li>Obtain your consent for the overseas disclosure, or</li>
                  <li>Take reasonable steps to ensure the recipient complies with the Privacy Act 2020 principles</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  You can contact us for more information about the specific overseas recipients of your personal information.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security and Protection */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              7. Data Security and Protection
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information in accordance with IPP 5 of the Privacy Act 2020.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">7.1 Technical Security Measures</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-zinc-800 mb-2">Encryption:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                      <li>SSL/TLS encryption for all data transmitted between your browser and our servers</li>
                      <li>Encryption of sensitive data at rest (stored data)</li>
                      <li>Secure password hashing using industry-standard algorithms</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-zinc-800 mb-2">Access Controls:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                      <li>Role-based access control limiting employee access to personal information</li>
                      <li>Multi-factor authentication for administrative access</li>
                      <li>Regular access reviews and audit logs</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-zinc-800 mb-2">Infrastructure Security:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                      <li>Firewalls and intrusion detection systems</li>
                      <li>Regular security patches and software updates</li>
                      <li>Secure cloud hosting with reputable providers</li>
                      <li>Regular vulnerability scanning and penetration testing</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-zinc-800 mb-2">Payment Security:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                      <li>PCI DSS compliant payment processing</li>
                      <li>Tokenization of payment card information</li>
                      <li>No storage of complete credit card numbers on our servers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">7.2 Organizational Security Measures</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-zinc-800 mb-2">Staff Training:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                      <li>Regular privacy and security training for all employees</li>
                      <li>Confidentiality agreements with staff and contractors</li>
                      <li>Clear policies and procedures for handling personal information</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-zinc-800 mb-2">Data Handling Protocols:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                      <li>Secure disposal of physical and electronic records</li>
                      <li>Clean desk and clear screen policies</li>
                      <li>Secure backup and disaster recovery procedures</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-zinc-800 mb-2">Vendor Management:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                      <li>Due diligence on third-party service providers</li>
                      <li>Contractual obligations requiring appropriate security measures</li>
                      <li>Regular review of vendor security practices</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">7.3 Data Breach Response</h3>
                <p className="text-zinc-700 mb-3">
                  In the event of a privacy breach that causes or is likely to cause serious harm, we will:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 mb-4">
                  <li>Take immediate action to contain and remediate the breach</li>
                  <li>Notify the Privacy Commissioner as soon as practicable (within 72 hours where possible)</li>
                  <li>Notify affected individuals if the breach is likely to cause serious harm</li>
                  <li>Provide information about the nature of the breach and steps being taken</li>
                  <li>Offer support and guidance on protective measures you can take</li>
                </ul>
                <p className="text-zinc-700 mb-3"><strong>What constitutes "serious harm":</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>Significant financial loss</li>
                  <li>Serious harm to reputation</li>
                  <li>Emotional or psychological harm</li>
                  <li>Physical harm or safety risks</li>
                  <li>Identity theft or fraud</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">7.4 Your Role in Security</h3>
                <p className="text-zinc-700 mb-3">You can help protect your personal information by:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Using strong, unique passwords for your account</li>
                  <li>Keeping your password confidential</li>
                  <li>Logging out of your account when using shared devices</li>
                  <li>Being cautious about phishing emails or suspicious communications</li>
                  <li>Keeping your contact information up to date</li>
                  <li>Notifying us immediately if you suspect unauthorized account access</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">7.5 Limitations</h3>
                <p className="text-zinc-700">
                  While we implement robust security measures, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but commit to maintaining commercially reasonable security practices and responding appropriately to any incidents.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention and Disposal */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              8. Data Retention and Disposal
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              In accordance with IPP 9 of the Privacy Act 2020, we do not keep personal information for longer than is necessary for the purposes for which it was collected or as required by law.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">8.1 Retention Periods</h3>
                <div className="space-y-4">
                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Account Information:</h4>
                    <p className="text-zinc-700 text-sm mb-1"><strong>Retention:</strong> While active and for 7 years after account closure</p>
                    <p className="text-zinc-700 text-sm"><strong>Reason:</strong> To maintain customer relationships, provide support, and meet legal obligations</p>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Transaction Records:</h4>
                    <p className="text-zinc-700 text-sm mb-1"><strong>Retention:</strong> 7 years from the date of transaction</p>
                    <p className="text-zinc-700 text-sm"><strong>Reason:</strong> Tax, accounting, and legal compliance requirements under New Zealand law</p>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Marketing Communications:</h4>
                    <p className="text-zinc-700 text-sm mb-1"><strong>Retention:</strong> Until consent withdrawn or 7 years from last interaction, whichever is earlier</p>
                    <p className="text-zinc-700 text-sm"><strong>Reason:</strong> To honor your communication preferences and comply with anti-spam legislation</p>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Website Analytics Data:</h4>
                    <p className="text-zinc-700 text-sm mb-1"><strong>Retention:</strong> 26 months</p>
                    <p className="text-zinc-700 text-sm"><strong>Reason:</strong> Analyzing trends and improving website performance</p>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Customer Service Records:</h4>
                    <p className="text-zinc-700 text-sm mb-1"><strong>Retention:</strong> 3 years from the date of interaction</p>
                    <p className="text-zinc-700 text-sm"><strong>Reason:</strong> Quality assurance, training, and dispute resolution</p>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">CCTV and Security Footage (if applicable):</h4>
                    <p className="text-zinc-700 text-sm mb-1"><strong>Retention:</strong> 30 days unless required for an investigation</p>
                    <p className="text-zinc-700 text-sm"><strong>Reason:</strong> Security and safety purposes</p>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Legal Hold:</h4>
                    <p className="text-zinc-700 text-sm mb-1"><strong>Retention:</strong> Until the matter is resolved</p>
                    <p className="text-zinc-700 text-sm"><strong>Reason:</strong> Legal compliance and evidence preservation</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">8.2 Secure Disposal</h3>
                <p className="text-zinc-700 mb-3">
                  When personal information is no longer needed, we securely dispose of it by:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Permanently deleting electronic records using secure deletion methods</li>
                  <li>Shredding or destroying physical documents</li>
                  <li>Ensuring third-party service providers also securely dispose of information</li>
                  <li>Anonymizing data where it may be retained for statistical or research purposes</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">8.3 Archiving</h3>
                <p className="text-zinc-700">
                  Some information may be archived in secure, offline storage for legal or legitimate business purposes beyond the standard retention periods. Archived information is subject to the same security and confidentiality protections.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              9. Cookies and Tracking Technologies
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content and advertising.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.1 What Are Cookies?</h3>
                <p className="text-zinc-700">
                  Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit a website. They help the website recognize your device on subsequent visits and remember certain information about your preferences and actions.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.2 Types of Cookies We Use</h3>
                <div className="space-y-4">
                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Strictly Necessary Cookies:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li><strong>Purpose:</strong> Essential for the website to function properly</li>
                      <li><strong>Examples:</strong> Shopping cart, secure login, session management</li>
                      <li><strong>Duration:</strong> Session cookies (deleted when you close your browser)</li>
                      <li><strong>Can be disabled:</strong> No (website will not function properly without them)</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Performance and Analytics Cookies:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li><strong>Purpose:</strong> Collect information about how visitors use our website</li>
                      <li><strong>Examples:</strong> Google Analytics, page view tracking, error monitoring</li>
                      <li><strong>Information Collected:</strong> Pages visited, time on site, navigation paths, bounce rates</li>
                      <li><strong>Duration:</strong> Up to 2 years</li>
                      <li><strong>Can be disabled:</strong> Yes</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Functionality Cookies:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li><strong>Purpose:</strong> Remember your preferences and settings</li>
                      <li><strong>Examples:</strong> Language preferences, currency selection, layout preferences</li>
                      <li><strong>Duration:</strong> Up to 1 year</li>
                      <li><strong>Can be disabled:</strong> Yes (may affect user experience)</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Marketing and Advertising Cookies:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li><strong>Purpose:</strong> Deliver relevant advertisements and measure advertising effectiveness</li>
                      <li><strong>Examples:</strong> Google Ads, Facebook Pixel, retargeting cookies</li>
                      <li><strong>Information Collected:</strong> Browsing behavior, ad interactions, conversion data</li>
                      <li><strong>Duration:</strong> Up to 2 years</li>
                      <li><strong>Can be disabled:</strong> Yes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.3 Third-Party Cookies</h3>
                <p className="text-zinc-700 mb-3">
                  We use third-party services that may place cookies on your device:
                </p>
                <ul className="space-y-2 text-zinc-700">
                  <li><strong>Google Analytics:</strong> Website traffic analysis | <a href="https://policies.google.com/privacy" className="text-rose-800 underline">Privacy Policy</a> | <a href="https://tools.google.com/dlpage/gaoptout" className="text-rose-800 underline">Opt-out</a></li>
                  <li><strong>Social Media Platforms:</strong> Facebook, Instagram, LinkedIn (if applicable) - Purpose: Social sharing, social login, advertising</li>
                  <li><strong>Payment Processors:</strong> Stripe, PayPal - Purpose: Secure payment processing, fraud prevention</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.4 Web Beacons and Pixel Tags</h3>
                <p className="text-zinc-700 mb-3">
                  We may use web beacons (small transparent images) in emails and on our website to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>Track email open rates and click-throughs</li>
                  <li>Measure the effectiveness of marketing campaigns</li>
                  <li>Understand user engagement</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.5 Managing Cookies and Your Choices</h3>
                <p className="text-zinc-700 mb-4">
                  <strong>Browser Settings:</strong> You can control and manage cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700 mb-4">
                  <li>View and delete cookies</li>
                  <li>Block all cookies</li>
                  <li>Block third-party cookies only</li>
                  <li>Receive notification when a cookie is set</li>
                </ul>
                <p className="text-zinc-700 mb-3"><strong>How to manage cookies:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700 mb-4">
                  <li><strong>Google Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
                  <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy & Security &gt; Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data</li>
                  <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions</li>
                </ul>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                  <p className="text-zinc-700">
                    <strong>Important:</strong> Disabling cookies may affect the functionality of our website and your ability to use certain features.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.6 Do Not Track Signals</h3>
                <p className="text-zinc-700">
                  Some browsers include a "Do Not Track" (DNT) feature. Currently, there is no industry standard for how websites should respond to DNT signals. Our website does not currently respond to DNT signals, but we provide you with the cookie management options described above.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">9.7 Mobile Device Tracking</h3>
                <p className="text-zinc-700 mb-3">
                  Mobile devices may use Advertising IDs (Apple's IDFA or Google's AAID) for tracking. You can limit ad tracking in your device settings:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li><strong>iOS:</strong> Settings &gt; Privacy &gt; Advertising &gt; Limit Ad Tracking</li>
                  <li><strong>Android:</strong> Settings &gt; Google &gt; Ads &gt; Opt out of Ads Personalization</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Your Privacy Rights */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              10. Your Privacy Rights
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              Under the Privacy Act 2020, you have specific rights regarding your personal information. We are committed to facilitating the exercise of these rights in accordance with IPP 6, IPP 7, and other applicable principles.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">10.1 Right to Access (IPP 6)</h3>
                <p className="text-zinc-700 mb-3">
                  You have the right to request access to the personal information we hold about you. This includes the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700 mb-4">
                  <li>Confirm whether we hold personal information about you</li>
                  <li>Receive a copy of your personal information</li>
                  <li>Understand how your information is being used</li>
                  <li>Know who has received your information</li>
                </ul>
                <p className="text-zinc-700 mb-3"><strong>How to Request Access:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700 mb-4">
                  <li>Submit a written request to admin@clubcaddycarts.com</li>
                  <li>Include sufficient detail to enable us to locate your information</li>
                  <li>Provide proof of identity (to protect against unauthorized access)</li>
                </ul>
                <p className="text-zinc-700 mb-4">
                  <strong>Response Time:</strong> We will respond to your request as soon as reasonably practicable, and no later than 20 working days from the date we receive your request.
                </p>
                <p className="text-zinc-700 mb-4">
                  <strong>Fees:</strong> We do not charge a fee for a standard access request. However, we may charge a reasonable fee if the request requires substantial collation or processing, or if the information is publicly available and you want us to collate it.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">10.2 Right to Correction (IPP 7)</h3>
                <p className="text-zinc-700 mb-3">
                  You have the right to request correction of personal information we hold about you if you believe it is:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700 mb-4">
                  <li>Incorrect</li>
                  <li>Out of date</li>
                  <li>Incomplete</li>
                  <li>Misleading</li>
                </ul>
                <p className="text-zinc-700 mb-3"><strong>How to Request Correction:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>Contact us at admin@clubcaddycarts.com</li>
                  <li>Specify the information you believe is inaccurate</li>
                  <li>Provide evidence of the correct information (if applicable)</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">10.3 Right to Deletion</h3>
                <p className="text-zinc-700 mb-3">
                  You may request deletion of your personal information in certain circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>The information is no longer necessary for the purpose it was collected</li>
                  <li>You withdraw consent (where consent was the basis for processing)</li>
                  <li>The information was unlawfully collected or processed</li>
                  <li>Deletion is required to comply with a legal obligation</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">10.4 Right to Object to Marketing</h3>
                <p className="text-zinc-700 mb-3">
                  You have the right to object to the use of your personal information for direct marketing purposes.
                </p>
                <p className="text-zinc-700 mb-3"><strong>How to Opt-Out:</strong></p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700 mb-4">
                  <li>Click the "unsubscribe" link in any marketing email</li>
                  <li>Contact us at admin@clubcaddycarts.com</li>
                  <li>Update your communication preferences in your account settings</li>
                </ul>
                <p className="text-zinc-700">
                  <strong>Response Time:</strong> We will process your opt-out request within 5 working days.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">10.5 Right to Data Portability</h3>
                <p className="text-zinc-700">
                  Upon request, we can provide your personal information in a structured, commonly used, and machine-readable format (e.g., CSV, JSON) to enable you to transfer your information to another service provider.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">10.6 Right to Complain</h3>
                <p className="text-zinc-700 mb-3">
                  If you believe we have breached the Privacy Act 2020 or not adequately addressed your privacy concerns, you have the right to complain to:
                </p>
                <div className="bg-zinc-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-rose-800 mb-2">Office of the Privacy Commissioner</h4>
                  <ul className="space-y-1 text-zinc-700 text-sm">
                    <li><strong>Website:</strong> privacy.org.nz</li>
                    <li><strong>Phone:</strong> 0800 803 909</li>
                    <li><strong>Email:</strong> enquiries@privacy.org.nz</li>
                    <li><strong>Address:</strong> PO Box 10094, The Terrace, Wellington 6143, New Zealand</li>
                  </ul>
                </div>
                <p className="text-zinc-700 mt-4">
                  We encourage you to contact us first so we can attempt to resolve your concerns directly.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">10.7 How to Exercise Your Rights</h3>
                <p className="text-zinc-700 mb-3">To exercise any of these rights:</p>
                <ol className="list-decimal pl-6 space-y-1 text-zinc-700">
                  <li>Contact us using the details in Section 15</li>
                  <li>Clearly state which right you wish to exercise</li>
                  <li>Provide sufficient information for us to verify your identity</li>
                  <li>Specify the information your request relates to (if applicable)</li>
                </ol>
                <p className="text-zinc-700 mt-4">
                  We will respond to your request in a timely manner and keep you informed of progress.
                </p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              11. Children's Privacy
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              Club Caddy Carts is committed to protecting the privacy of children. Our website and services are not directed at individuals under the age of 18 (or the age of majority in your jurisdiction).
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">11.1 No Knowing Collection from Children</h3>
                <p className="text-zinc-700">
                  We do not knowingly collect personal information from individuals under 18 years of age without parental consent. If you are under 18, you may only use our website and services with the involvement and consent of a parent or legal guardian.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">11.2 Parental Consent</h3>
                <p className="text-zinc-700 mb-3">
                  If we become aware that we have collected personal information from a child under 18 without verifiable parental consent, we will:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>Cease processing the information immediately</li>
                  <li>Delete the information from our systems as soon as reasonably practicable</li>
                  <li>Not use or disclose the information for any purpose</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">11.3 Parental Rights</h3>
                <p className="text-zinc-700 mb-3">Parents or legal guardians have the right to:</p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>Review personal information collected from their child</li>
                  <li>Request correction or deletion of their child's information</li>
                  <li>Refuse further collection or use of their child's information</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">11.4 Reporting</h3>
                <p className="text-zinc-700">
                  If you are a parent or guardian and believe your child has provided us with personal information without your consent, please contact us immediately at admin@clubcaddycarts.com, and we will take appropriate action.
                </p>
              </div>
            </div>
          </section>

          {/* International Data Transfers */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              12. International Data Transfers
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              As outlined in Section 6.6, some of our service providers and business partners are located outside New Zealand, which means your personal information may be transferred to, stored in, or processed in overseas jurisdictions.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">12.1 Safeguards for Overseas Transfers</h3>
                <p className="text-zinc-700 mb-3">When transferring personal information overseas, we ensure that:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>The recipient country has privacy laws substantially similar to the Privacy Act 2020, or</li>
                  <li>The recipient is bound by contractual obligations to protect your information in accordance with the Privacy Act 2020 principles, or</li>
                  <li>You have been informed and have consented to the overseas transfer</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">12.2 Countries Where Information May Be Transferred</h3>
                <p className="text-zinc-700 mb-3">Your personal information may be transferred to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li><strong>Australia:</strong> For cloud hosting and business operations (Australia has comparable privacy laws under the Privacy Act 1988)</li>
                  <li><strong>United States:</strong> For payment processing, cloud services, and software platforms</li>
                  <li><strong>European Union:</strong> For certain service providers and technology platforms</li>
                  <li><strong>Other jurisdictions:</strong> As required by our service providers' infrastructure</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">12.3 Your Rights Regarding Overseas Transfers</h3>
                <p className="text-zinc-700 mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-700">
                  <li>Ask for more information about overseas recipients of your personal information</li>
                  <li>Refuse consent for overseas transfers (where consent is required)</li>
                  <li>Complain if you believe an overseas transfer has not been properly safeguarded</li>
                </ul>
                <p className="text-zinc-700 mt-4">
                  Contact us at admin@clubcaddycarts.com for more information about overseas transfers.
                </p>
              </div>
            </div>
          </section>

          {/* Unique Identifiers */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              13. Unique Identifiers (IPP 12)
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">13.1 Use of Unique Identifiers</h3>
                <p className="text-zinc-700 mb-3">
                  We may assign unique identifiers (such as customer ID numbers or account numbers) to individuals for the purpose of:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>Managing your customer account</li>
                  <li>Tracking orders and transactions</li>
                  <li>Providing customer service</li>
                  <li>Internal record-keeping and administration</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">13.2 Government Agency Identifiers</h3>
                <p className="text-zinc-700 mb-4">
                  We do not adopt government agency identifiers (such as driver's license numbers or IRD numbers) as our own unique identifiers for individuals unless required or authorized by law, or necessary for us to fulfill our functions or activities.
                </p>
                <p className="text-zinc-700">
                  If we request government-issued identification, it is for verification purposes only (such as age verification or identity confirmation for high-value transactions).
                </p>
              </div>
            </div>
          </section>

          {/* Changes to This Privacy Policy */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              14. Changes to This Privacy Policy
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              We may update this Privacy Policy from time to time to reflect changes in our business practices, technology and security measures, legal or regulatory requirements, and customer feedback and best practices.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">14.1 Notification of Changes</h3>
                <p className="text-zinc-700 mb-3">When we make material changes to this Privacy Policy, we will:</p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>Update the "Last Updated" date at the top of this document</li>
                  <li>Post a prominent notice on our website</li>
                  <li>Send an email notification to registered customers (for significant changes)</li>
                  <li>Request your consent if required by law</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">14.2 Your Acceptance</h3>
                <p className="text-zinc-700">
                  Your continued use of our website and services after changes to this Privacy Policy constitutes your acceptance of the updated policy. If you do not agree with the changes, please discontinue use of our website and contact us to close your account (subject to our retention obligations).
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">14.3 Version History</h3>
                <p className="text-zinc-700">
                  We maintain previous versions of our Privacy Policy for reference. You can request access to previous versions by contacting us at admin@clubcaddycarts.com.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Us and Complaints */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              15. Contact Us and Complaints
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-6">
              We are committed to addressing your privacy concerns and inquiries promptly and effectively.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">15.1 Privacy Officer</h3>
                <p className="text-zinc-700 mb-3">For all privacy-related matters, please contact our Privacy Officer:</p>
                <div className="bg-zinc-50 border-l-4 border-rose-800 p-6">
                  <h4 className="font-semibold text-rose-800 mb-3">Club Caddy Carts - Privacy Officer</h4>
                  <ul className="space-y-1 text-zinc-700">
                    <li><strong>Email:</strong> admin@clubcaddycarts.com</li>
                    <li><strong>Phone:</strong> +64 021 560 307</li>
                    <li><strong>Address:</strong> Auckland, New Zealand</li>
                    <li><strong>Website:</strong> clubcaddycarts.com</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">15.2 How to Contact Us</h3>
                <p className="text-zinc-700 mb-3">You can contact us regarding:</p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700 mb-4">
                  <li>Questions about this Privacy Policy</li>
                  <li>Access or correction requests</li>
                  <li>Privacy complaints</li>
                  <li>Opting out of marketing communications</li>
                  <li>General privacy inquiries</li>
                </ul>
                <p className="text-zinc-700">
                  <strong>Response Time:</strong> We aim to acknowledge your inquiry within 2 business days and provide a substantive response within 20 working days.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">15.3 Complaint Procedure</h3>
                <p className="text-zinc-700 mb-4">
                  If you have a privacy complaint, we encourage you to contact us first so we can attempt to resolve the matter directly:
                </p>

                <div className="space-y-4">
                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Step 1: Submit Your Complaint</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>Email admin@clubcaddycarts.com with "Privacy Complaint" in the subject line</li>
                      <li>Provide details of your complaint, including relevant dates and information</li>
                      <li>Include your contact details and preferred resolution</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Step 2: Investigation</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>We will acknowledge receipt of your complaint within 2 business days</li>
                      <li>We will investigate the matter thoroughly and impartially</li>
                      <li>We may request additional information from you</li>
                      <li>We will keep you informed of progress</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-rose-800 mb-2">Step 3: Resolution</h4>
                    <ul className="list-disc pl-6 space-y-1 text-zinc-700 text-sm">
                      <li>We will provide you with a written response within 20 working days</li>
                      <li>Our response will include our findings and proposed resolution</li>
                      <li>If we need more time, we will notify you and provide an expected completion date</li>
                    </ul>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-lg border-l-4 border-rose-800">
                    <h4 className="font-semibold text-rose-800 mb-2">Step 4: If You're Not Satisfied</h4>
                    <p className="text-zinc-700 text-sm mb-2">
                      If you are not satisfied with our response or believe we have not adequately addressed your complaint, you have the right to complain to:
                    </p>
                    <div className="mt-3">
                      <p className="font-semibold text-rose-800 mb-2">Office of the Privacy Commissioner</p>
                      <ul className="space-y-1 text-zinc-700 text-sm">
                        <li><strong>Website:</strong> privacy.org.nz</li>
                        <li><strong>Phone:</strong> 0800 803 909 (New Zealand only)</li>
                        <li><strong>International Phone:</strong> +64 4 474 7590</li>
                        <li><strong>Email:</strong> enquiries@privacy.org.nz</li>
                        <li><strong>Mail:</strong> PO Box 10094, The Terrace, Wellington 6143, New Zealand</li>
                        <li><strong>Physical Address:</strong> Level 8, 109-111 Featherston Street, Wellington</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-700 mt-4">
                  The Privacy Commissioner provides a free, independent dispute resolution service and can investigate privacy complaints under the Privacy Act 2020.
                </p>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              16. Additional Information
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">16.1 Information Matching (IPP 13)</h3>
                <p className="text-zinc-700 mb-3">
                  We do not routinely engage in information matching programs as defined by the Privacy Act 2020. If we do participate in any such programs in the future, we will:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>Only do so where authorized by law</li>
                  <li>Ensure appropriate safeguards are in place</li>
                  <li>Inform affected individuals as required</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">16.2 Biometric Information</h3>
                <p className="text-zinc-700">
                  We do not currently collect or process biometric information (such as fingerprints or facial recognition data). If this changes in the future, we will update this Privacy Policy and seek your explicit consent where required.
                </p>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">16.3 Audio and Video Recording</h3>
                <p className="text-zinc-700 mb-3">If we record phone calls or use CCTV:</p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>You will be notified at the beginning of the call or via signage</li>
                  <li>Recordings are used for security, training, and quality assurance purposes</li>
                  <li>Recordings are retained in accordance with our retention policy (Section 8)</li>
                  <li>You can request access to recordings that contain your personal information</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">16.4 Compliance and Accountability</h3>
                <p className="text-zinc-700 mb-3">Club Caddy Carts is committed to:</p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>Regular privacy audits and compliance reviews</li>
                  <li>Staff training on privacy obligations</li>
                  <li>Continuous improvement of our privacy practices</li>
                  <li>Transparency and accountability in our handling of personal information</li>
                </ul>
              </div>

              <div>
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-3">16.5 Non-Compliance Consequences</h3>
                <p className="text-zinc-700 mb-3">
                  We take our privacy obligations seriously. The Privacy Act 2020 provides for:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-700">
                  <li>Civil penalties of up to $10,000 for interference with privacy</li>
                  <li>Commissioner investigations and compliance orders</li>
                  <li>Potential criminal penalties for serious breaches</li>
                  <li>Reputational damage and loss of customer trust</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Glossary */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              17. Glossary
            </h2>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-rose-800 mb-1">Personal Information:</h4>
                <p className="text-zinc-700">Information about an identifiable individual (any information that can be used to identify you, either alone or in combination with other information).</p>
              </div>

              <div>
                <h4 className="font-semibold text-rose-800 mb-1">Privacy Act 2020:</h4>
                <p className="text-zinc-700">The New Zealand legislation governing the collection, use, storage, and disclosure of personal information.</p>
              </div>

              <div>
                <h4 className="font-semibold text-rose-800 mb-1">Information Privacy Principles (IPPs):</h4>
                <p className="text-zinc-700">The 13 principles set out in the Privacy Act 2020 that govern how agencies collect, store, use, and disclose personal information.</p>
              </div>

              <div>
                <h4 className="font-semibold text-rose-800 mb-1">Privacy Commissioner:</h4>
                <p className="text-zinc-700">The independent officer responsible for promoting and protecting individual privacy under the Privacy Act 2020.</p>
              </div>

              <div>
                <h4 className="font-semibold text-rose-800 mb-1">Cookie:</h4>
                <p className="text-zinc-700">A small text file stored on your device by a website to remember information about your visit.</p>
              </div>

              <div>
                <h4 className="font-semibold text-rose-800 mb-1">Data Breach:</h4>
                <p className="text-zinc-700">An incident where personal information is accessed, disclosed, or lost without authorization.</p>
              </div>

              <div>
                <h4 className="font-semibold text-rose-800 mb-1">Third Party:</h4>
                <p className="text-zinc-700">Any person or organization other than you and Club Caddy Carts.</p>
              </div>

              <div>
                <h4 className="font-semibold text-rose-800 mb-1">Processing:</h4>
                <p className="text-zinc-700">Any operation performed on personal information, including collection, storage, use, disclosure, and deletion.</p>
              </div>

              <div>
                <h4 className="font-semibold text-rose-800 mb-1">Consent:</h4>
                <p className="text-zinc-700">Freely given, specific, informed, and unambiguous indication of your agreement to the processing of your personal information.</p>
              </div>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="mb-12">
            <h2 className="refined-title text-3xl font-bold text-rose-800 mb-6">
              18. Acknowledgment
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-4">
              This Privacy Policy has been prepared in accordance with the New Zealand Privacy Act 2020 and incorporates all 13 Information Privacy Principles. It is designed to be transparent, comprehensive, and accessible to all our customers.
            </p>
            <p className="text-zinc-700 leading-relaxed mb-4">
              We are committed to protecting your privacy and maintaining your trust. If you have any questions or concerns about how we handle your personal information, please do not hesitate to contact us.
            </p>
            <p className="refined-title text-xl text-rose-800 font-semibold">
              Thank you for choosing Club Caddy Carts.
            </p>
          </section>

          {/* Footer Section */}
          <section className="border-t border-zinc-200 pt-8 mt-12">
            <div className="bg-zinc-50 p-6 rounded-lg">
              <h3 className="refined-title text-xl font-semibold text-rose-800 mb-4">Club Caddy Carts</h3>
              <div className="space-y-1 text-zinc-700">
                <p>Auckland, New Zealand</p>
                <p>Email: admin@clubcaddycarts.com</p>
                <p>Phone: +64 021 560 307</p>
                <p>Website: clubcaddycarts.com</p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200">
                <p className="text-zinc-600 text-sm"><strong>Last Updated:</strong> December 9, 2025</p>
                <p className="text-zinc-600 text-sm"><strong>Version:</strong> 1.0</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500">
              <p className="text-zinc-700 text-sm italic">
                This Privacy Policy is a legally binding document. By using our website and services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
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
