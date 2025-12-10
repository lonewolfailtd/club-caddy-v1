import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Shield, Database, Cookie, Bell, Users, Lock, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Club Caddy Carts - Your Privacy Rights',
  description: 'Club Caddy Carts Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with the New Zealand Privacy Act 2020.',
  openGraph: {
    title: 'Privacy Policy | Club Caddy Carts',
    description: 'Learn how Club Caddy Carts protects your privacy and personal information in compliance with NZ Privacy Act 2020.',
    url: 'https://clubcaddycarts.com/privacy',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-rose-50/20">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm sticky top-20 z-10">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rose-800 hover:text-rose-900 transition-colors refined-body font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-800 to-rose-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-12 h-12" />
            <h1 className="refined-title text-4xl md:text-5xl font-bold">
              Privacy Policy
            </h1>
          </div>
          <p className="refined-body text-rose-100 text-lg mb-2">
            Club Caddy Carts Limited
          </p>
          <p className="refined-body text-rose-200">
            Last Updated: 10 December 2025
          </p>
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <p className="refined-body text-sm text-white/90">
              This Privacy Policy complies with the New Zealand Privacy Act 2020 and explains how we collect, use, store, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="refined-body prose prose-zinc max-w-none">

          {/* Quick Navigation */}
          <div className="bg-white border border-zinc-200 rounded-lg p-6 mb-12 shadow-sm">
            <h2 className="refined-title text-xl font-semibold text-rose-800 mb-4">Quick Navigation</h2>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <a href="#introduction" className="text-rose-800 hover:text-rose-900 hover:underline">1. Introduction</a>
              <a href="#information-collected" className="text-rose-800 hover:text-rose-900 hover:underline">2. Information We Collect</a>
              <a href="#how-we-use" className="text-rose-800 hover:text-rose-900 hover:underline">3. How We Use Your Information</a>
              <a href="#data-storage" className="text-rose-800 hover:text-rose-900 hover:underline">4. Data Storage & Security</a>
              <a href="#cookies" className="text-rose-800 hover:text-rose-900 hover:underline">5. Cookies & Analytics</a>
              <a href="#email" className="text-rose-800 hover:text-rose-900 hover:underline">6. Email Communications</a>
              <a href="#your-rights" className="text-rose-800 hover:text-rose-900 hover:underline">7. Your Privacy Rights</a>
              <a href="#contact" className="text-rose-800 hover:text-rose-900 hover:underline">8. Contact Us</a>
            </div>
          </div>

          {/* 1. Introduction */}
          <section id="introduction" className="mb-12 scroll-mt-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-rose-800" />
              </div>
              <h2 className="refined-title text-3xl font-bold text-rose-800">
                1. Introduction
              </h2>
            </div>

            <p className="text-zinc-700 leading-relaxed mb-4">
              Welcome to Club Caddy Carts. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, disclose, and protect your personal information in accordance with the <strong>New Zealand Privacy Act 2020</strong>.
            </p>

            <div className="bg-rose-50 border-l-4 border-rose-800 p-6 my-6 rounded-r-lg">
              <h3 className="refined-title text-lg font-semibold text-rose-800 mb-3">Our Contact Details</h3>
              <div className="space-y-2 text-zinc-700">
                <p><strong>Business Name:</strong> Club Caddy Carts Limited</p>
                <p><strong>Location:</strong> Auckland, New Zealand</p>
                <p><strong>Email:</strong> admin@clubcaddycarts.com</p>
                <p><strong>Phone:</strong> +64 021 560 307</p>
                <p><strong>Website:</strong> clubcaddycarts.com</p>
              </div>
            </div>

            <p className="text-zinc-700 leading-relaxed">
              By using our website, purchasing our products, or engaging with our services, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your personal information as described herein.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section id="information-collected" className="mb-12 scroll-mt-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-rose-800" />
              </div>
              <h2 className="refined-title text-3xl font-bold text-rose-800">
                2. Information We Collect
              </h2>
            </div>

            <p className="text-zinc-700 leading-relaxed mb-6">
              We collect various types of personal information to provide you with our products and services, improve your customer experience, and fulfill our legal obligations.
            </p>

            <div className="space-y-6">
              <div className="bg-white border border-zinc-200 rounded-lg p-6">
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-4">2.1 Personal Information</h3>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-800 mt-1">•</span>
                    <span><strong>Name:</strong> First name and surname</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-800 mt-1">•</span>
                    <span><strong>Contact Information:</strong> Email address, phone number, postal address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-800 mt-1">•</span>
                    <span><strong>Business Information:</strong> Company name (if purchasing as a business)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 rounded-lg p-6">
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-4">2.2 Quote & Booking Information</h3>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-800 mt-1">•</span>
                    <span><strong>Quote Requests:</strong> Product preferences, requirements, and specifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-800 mt-1">•</span>
                    <span><strong>Booking Details:</strong> Event information, rental dates, delivery locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-800 mt-1">•</span>
                    <span><strong>Communication Records:</strong> Emails, messages, and customer service interactions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 rounded-lg p-6">
                <h3 className="refined-title text-xl font-semibold text-rose-800 mb-4">2.3 Technical Information</h3>
                <ul className="space-y-2 text-zinc-700">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-800 mt-1">•</span>
                    <span><strong>Device Information:</strong> IP address, browser type, operating system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-800 mt-1">•</span>
                    <span><strong>Usage Data:</strong> Pages visited, time spent on site, navigation patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-800 mt-1">•</span>
                    <span><strong>Cookies:</strong> Small data files stored on your device (see Section 5)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. How We Use Your Information */}
          <section id="how-we-use" className="mb-12 scroll-mt-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-rose-800" />
              </div>
              <h2 className="refined-title text-3xl font-bold text-rose-800">
                3. How We Use Your Information
              </h2>
            </div>

            <p className="text-zinc-700 leading-relaxed mb-6">
              We collect and use your personal information for specific, legitimate business purposes in accordance with the Privacy Act 2020:
            </p>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-rose-50 to-white border-l-4 border-rose-800 p-5 rounded-r-lg">
                <h3 className="font-semibold text-rose-800 mb-2">Order Processing & Fulfillment</h3>
                <p className="text-zinc-700 text-sm">Processing quotes, bookings, and purchase orders; arranging delivery; providing customer support</p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-white border-l-4 border-rose-800 p-5 rounded-r-lg">
                <h3 className="font-semibold text-rose-800 mb-2">Customer Communication</h3>
                <p className="text-zinc-700 text-sm">Responding to inquiries, sending booking confirmations, providing product information and updates</p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-white border-l-4 border-rose-800 p-5 rounded-r-lg">
                <h3 className="font-semibold text-rose-800 mb-2">Marketing Communications (with consent)</h3>
                <p className="text-zinc-700 text-sm">Sending newsletters, promotional offers, and product announcements via email</p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-white border-l-4 border-rose-800 p-5 rounded-r-lg">
                <h3 className="font-semibold text-rose-800 mb-2">Website Improvement & Analytics</h3>
                <p className="text-zinc-700 text-sm">Analyzing website usage to improve functionality, design, and user experience</p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-white border-l-4 border-rose-800 p-5 rounded-r-lg">
                <h3 className="font-semibold text-rose-800 mb-2">Legal Compliance</h3>
                <p className="text-zinc-700 text-sm">Complying with New Zealand laws, maintaining records for tax and accounting purposes</p>
              </div>
            </div>
          </section>

          {/* 4. Data Storage & Security */}
          <section id="data-storage" className="mb-12 scroll-mt-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-rose-800" />
              </div>
              <h2 className="refined-title text-3xl font-bold text-rose-800">
                4. Data Storage & Security (Supabase)
              </h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="refined-title text-lg font-semibold text-blue-900 mb-3">Database Platform</h3>
              <p className="text-zinc-700 mb-3">
                We use <strong>Supabase</strong>, a secure and reliable cloud database platform, to store your personal information. Supabase provides:
              </p>
              <ul className="space-y-2 text-zinc-700">
                <li className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Encryption:</strong> All data is encrypted both in transit (SSL/TLS) and at rest</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Access Controls:</strong> Row-level security policies ensure your data is protected</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Regular Backups:</strong> Automated backups to prevent data loss</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Infrastructure:</strong> Hosted on secure cloud infrastructure with industry-standard security measures</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-zinc-200 rounded-lg p-6">
              <h3 className="refined-title text-lg font-semibold text-rose-800 mb-4">Data Location</h3>
              <p className="text-zinc-700 mb-3">
                Your data may be stored on servers located outside New Zealand. We ensure that:
              </p>
              <ul className="space-y-2 text-zinc-700 text-sm">
                <li>• All data transfers comply with the Privacy Act 2020</li>
                <li>• Service providers maintain comparable privacy protections</li>
                <li>• Appropriate safeguards are in place for international data transfers</li>
              </ul>
            </div>

            <div className="bg-white border border-zinc-200 rounded-lg p-6 mt-6">
              <h3 className="refined-title text-lg font-semibold text-rose-800 mb-4">Data Retention</h3>
              <p className="text-zinc-700 mb-3">We retain your personal information for as long as necessary to:</p>
              <ul className="space-y-2 text-zinc-700 text-sm">
                <li>• Provide our services and fulfill our contractual obligations</li>
                <li>• Comply with legal and tax requirements (typically 7 years)</li>
                <li>• Resolve disputes and enforce our agreements</li>
              </ul>
              <p className="text-zinc-700 text-sm mt-3">
                You can request deletion of your data at any time, subject to our legal obligations to retain certain records.
              </p>
            </div>
          </section>

          {/* 5. Cookies & Analytics */}
          <section id="cookies" className="mb-12 scroll-mt-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <Cookie className="w-5 h-5 text-rose-800" />
              </div>
              <h2 className="refined-title text-3xl font-bold text-rose-800">
                5. Cookies & Analytics
              </h2>
            </div>

            <div className="bg-white border border-zinc-200 rounded-lg p-6 mb-6">
              <h3 className="refined-title text-lg font-semibold text-rose-800 mb-4">What Are Cookies?</h3>
              <p className="text-zinc-700">
                Cookies are small text files stored on your device when you visit our website. They help us remember your preferences, analyze website traffic, and improve your browsing experience.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-zinc-50 to-white border border-zinc-200 rounded-lg p-5">
                <h4 className="font-semibold text-zinc-900 mb-2">Essential Cookies</h4>
                <p className="text-zinc-700 text-sm mb-2">Required for the website to function properly (e.g., shopping cart, authentication)</p>
                <p className="text-xs text-zinc-500">Cannot be disabled</p>
              </div>

              <div className="bg-gradient-to-r from-zinc-50 to-white border border-zinc-200 rounded-lg p-5">
                <h4 className="font-semibold text-zinc-900 mb-2">Analytics Cookies</h4>
                <p className="text-zinc-700 text-sm mb-2">Help us understand how visitors use our website (Google Analytics, Vercel Analytics)</p>
                <p className="text-xs text-zinc-500">Can be disabled in your browser settings</p>
              </div>

              <div className="bg-gradient-to-r from-zinc-50 to-white border border-zinc-200 rounded-lg p-5">
                <h4 className="font-semibold text-zinc-900 mb-2">Functional Cookies</h4>
                <p className="text-zinc-700 text-sm mb-2">Remember your preferences (language, currency, layout)</p>
                <p className="text-xs text-zinc-500">Can be disabled (may affect user experience)</p>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 mt-6 rounded-r-lg">
              <h4 className="font-semibold text-amber-900 mb-2">Managing Cookies</h4>
              <p className="text-zinc-700 text-sm mb-3">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="space-y-1 text-zinc-700 text-sm">
                <li>• View and delete cookies</li>
                <li>• Block all cookies or third-party cookies</li>
                <li>• Receive notifications when cookies are set</li>
              </ul>
              <p className="text-zinc-600 text-sm mt-3 italic">
                Note: Disabling cookies may affect website functionality and your ability to use certain features.
              </p>
            </div>
          </section>

          {/* 6. Email Communications */}
          <section id="email" className="mb-12 scroll-mt-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-rose-800" />
              </div>
              <h2 className="refined-title text-3xl font-bold text-rose-800">
                6. Email Communications (Resend)
              </h2>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
              <h3 className="refined-title text-lg font-semibold text-purple-900 mb-3">Email Service Provider</h3>
              <p className="text-zinc-700 mb-3">
                We use <strong>Resend</strong>, a secure email delivery platform, to send you:
              </p>
              <ul className="space-y-2 text-zinc-700">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span><strong>Transactional Emails:</strong> Quote confirmations, booking confirmations, order updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span><strong>Service Emails:</strong> Password resets, account notifications, customer support responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span><strong>Marketing Emails:</strong> Newsletters, promotional offers, product announcements (with your consent)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-zinc-200 rounded-lg p-6">
              <h3 className="refined-title text-lg font-semibold text-rose-800 mb-4">Your Email Preferences</h3>
              <div className="space-y-3 text-zinc-700">
                <p className="text-sm">
                  <strong>Transactional Emails:</strong> These are essential for our service and cannot be opted out of (e.g., booking confirmations).
                </p>
                <p className="text-sm">
                  <strong>Marketing Emails:</strong> You can unsubscribe at any time by:
                </p>
                <ul className="space-y-1 text-sm ml-4">
                  <li>• Clicking the "unsubscribe" link in any marketing email</li>
                  <li>• Contacting us at admin@clubcaddycarts.com</li>
                  <li>• Updating your preferences in your account settings</li>
                </ul>
                <p className="text-xs text-zinc-600 mt-4 italic">
                  We will process your opt-out request within 5 working days and comply with the Unsolicited Electronic Messages Act 2007.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Your Privacy Rights */}
          <section id="your-rights" className="mb-12 scroll-mt-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-rose-800" />
              </div>
              <h2 className="refined-title text-3xl font-bold text-rose-800">
                7. Your Privacy Rights
              </h2>
            </div>

            <p className="text-zinc-700 leading-relaxed mb-6">
              Under the New Zealand Privacy Act 2020, you have the following rights regarding your personal information:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-rose-200 rounded-lg p-6 hover:border-rose-400 transition-colors">
                <h3 className="refined-title text-lg font-semibold text-rose-800 mb-3">Right to Access</h3>
                <p className="text-zinc-700 text-sm">
                  Request a copy of the personal information we hold about you
                </p>
              </div>

              <div className="bg-white border-2 border-rose-200 rounded-lg p-6 hover:border-rose-400 transition-colors">
                <h3 className="refined-title text-lg font-semibold text-rose-800 mb-3">Right to Correction</h3>
                <p className="text-zinc-700 text-sm">
                  Request correction of inaccurate or incomplete information
                </p>
              </div>

              <div className="bg-white border-2 border-rose-200 rounded-lg p-6 hover:border-rose-400 transition-colors">
                <h3 className="refined-title text-lg font-semibold text-rose-800 mb-3">Right to Deletion</h3>
                <p className="text-zinc-700 text-sm">
                  Request deletion of your personal information (subject to legal obligations)
                </p>
              </div>

              <div className="bg-white border-2 border-rose-200 rounded-lg p-6 hover:border-rose-400 transition-colors">
                <h3 className="refined-title text-lg font-semibold text-rose-800 mb-3">Right to Opt-Out</h3>
                <p className="text-zinc-700 text-sm">
                  Withdraw consent for marketing communications at any time
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-6 mt-6">
              <h3 className="refined-title text-lg font-semibold text-rose-800 mb-3">How to Exercise Your Rights</h3>
              <p className="text-zinc-700 mb-3">To exercise any of these rights, please contact us:</p>
              <ul className="space-y-2 text-zinc-700 text-sm">
                <li>• Email: admin@clubcaddycarts.com</li>
                <li>• Phone: +64 021 560 307</li>
              </ul>
              <p className="text-zinc-600 text-sm mt-4">
                We will respond to your request within 20 working days as required by the Privacy Act 2020.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 mt-6 rounded-r-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Right to Complain</h4>
              <p className="text-zinc-700 text-sm mb-3">
                If you believe we have breached the Privacy Act 2020, you can complain to:
              </p>
              <div className="text-zinc-700 text-sm space-y-1">
                <p className="font-semibold text-blue-900">Office of the Privacy Commissioner</p>
                <p>Website: privacy.org.nz</p>
                <p>Phone: 0800 803 909</p>
                <p>Email: enquiries@privacy.org.nz</p>
              </div>
            </div>
          </section>

          {/* 8. Contact Us */}
          <section id="contact" className="mb-12 scroll-mt-32">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-rose-800" />
              </div>
              <h2 className="refined-title text-3xl font-bold text-rose-800">
                8. Contact Us
              </h2>
            </div>

            <div className="bg-gradient-to-br from-rose-800 to-rose-900 text-white rounded-xl p-8 shadow-lg">
              <h3 className="refined-title text-2xl font-semibold mb-6">Privacy Officer - Club Caddy Carts</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a href="mailto:admin@clubcaddycarts.com" className="text-rose-100 hover:text-white underline">
                        admin@clubcaddycarts.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <a href="tel:+64021560307" className="text-rose-100 hover:text-white underline">
                        +64 021 560 307
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Business Hours</p>
                    <p className="text-rose-100 text-sm">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-rose-100 text-sm">Saturday: 10:00 AM - 2:00 PM</p>
                    <p className="text-rose-100 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-rose-700">
                <p className="text-rose-100 text-sm">
                  We aim to respond to all privacy inquiries within 2 business days and provide a substantive response within 20 working days as required by law.
                </p>
              </div>
            </div>
          </section>

          {/* Additional Sections */}
          <section className="mb-12">
            <h2 className="refined-title text-2xl font-bold text-rose-800 mb-6">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-zinc-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or business operations. When we make material changes, we will:
            </p>
            <ul className="space-y-2 text-zinc-700 ml-6">
              <li>• Update the "Last Updated" date at the top of this page</li>
              <li>• Post a prominent notice on our website</li>
              <li>• Send an email notification to registered customers (for significant changes)</li>
            </ul>
            <p className="text-zinc-700 leading-relaxed mt-4">
              Your continued use of our services after changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="refined-title text-2xl font-bold text-rose-800 mb-6">
              10. Third-Party Links
            </h2>
            <p className="text-zinc-700 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
            </p>
          </section>

          {/* Final Note */}
          <div className="bg-gradient-to-r from-rose-50 via-white to-rose-50 border-2 border-rose-200 rounded-xl p-8 text-center">
            <Shield className="w-16 h-16 text-rose-800 mx-auto mb-4" />
            <h3 className="refined-title text-2xl font-bold text-rose-800 mb-3">
              Your Trust Matters to Us
            </h3>
            <p className="text-zinc-700 leading-relaxed max-w-2xl mx-auto">
              At Club Caddy Carts, we are committed to protecting your privacy and maintaining the highest standards of data security. If you have any questions or concerns about how we handle your personal information, please don't hesitate to contact us.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rose-800 hover:text-rose-900 transition-colors refined-body font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <p className="text-zinc-500 text-sm mt-4">
            Club Caddy Carts Limited | Auckland, New Zealand
          </p>
        </div>
      </footer>
    </div>
  );
}
