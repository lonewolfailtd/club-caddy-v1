import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { generateGeneralRentalServiceSchema, generateFAQSchema } from '@/lib/seo/structured-data'
import Script from 'next/script'
import { Check, Users, Trophy, Heart, Building2, Calendar, DollarSign, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Golf Cart Rentals for Events & Work Functions in Auckland | Club Caddy',
  description: 'Premium golf cart rentals for corporate events, competitions, weddings & work functions in Auckland. Affordable multi-cart bookings with flexible hourly, daily & weekly rates. Book online now!',
  keywords: [
    'golf cart rental auckland events',
    'bulk golf cart rental nz',
    'corporate event golf carts',
    'golf cart hire for work functions',
    'golf tournament cart rental',
    'wedding golf cart rental',
    'event golf cart hire auckland',
    'multi cart rental nz',
    'golf cart rental for competitions'
  ],
  openGraph: {
    title: 'Golf Cart Rentals for Events & Work Functions | Auckland',
    description: 'Affordable multi-cart rentals for corporate events, competitions, and work functions. Flexible rates and instant booking.',
    url: 'https://clubcaddycarts.com/events',
    siteName: 'Club Caddy Carts',
    images: [
      {
        url: 'https://clubcaddycarts.com/images/hero-golf-cart.jpg',
        width: 1200,
        height: 630,
        alt: 'Golf Cart Rentals for Events in Auckland'
      }
    ],
    locale: 'en_NZ',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golf Cart Rentals for Events & Work Functions | Auckland',
    description: 'Affordable multi-cart rentals for corporate events, competitions, and work functions',
    images: ['https://clubcaddycarts.com/images/hero-golf-cart.jpg']
  },
  alternates: {
    canonical: 'https://clubcaddycarts.com/events'
  }
}

// FAQ Data
const faqs = [
  {
    question: 'How many golf carts can I rent for my event?',
    answer: 'We offer flexible multi-cart bookings from 1 to 20+ carts depending on availability. For large events requiring more than 10 carts, we recommend booking at least 2 weeks in advance to ensure availability.'
  },
  {
    question: 'What are your rental rates for bulk bookings?',
    answer: 'We offer competitive rates for bulk bookings: 5-9 carts receive 10% discount, 10-14 carts receive 15% discount, and 15+ carts receive 20% discount. Rates vary by rental duration (hourly, daily, weekly).'
  },
  {
    question: 'Do you deliver golf carts to event venues?',
    answer: 'Yes! We offer delivery and pickup services throughout Auckland and surrounding areas. Delivery fees vary based on distance and number of carts. Contact us for a custom quote including delivery.'
  },
  {
    question: 'Can I rent golf carts for just a few hours?',
    answer: 'Absolutely! We offer flexible hourly rentals with a 2-4 hour minimum depending on the cart model. This is perfect for golf tournaments, work functions, and short events.'
  },
  {
    question: 'What types of events are golf carts suitable for?',
    answer: 'Golf carts are perfect for corporate events, golf tournaments, weddings, outdoor festivals, work site transportation, residential community events, and any occasion requiring efficient and eco-friendly transportation.'
  },
  {
    question: 'How far in advance should I book for my event?',
    answer: 'We recommend booking at least 1-2 weeks in advance for standard events, and 3-4 weeks for large corporate events or competitions requiring 10+ carts. Last-minute bookings may be available based on inventory.'
  },
  {
    question: 'Are your golf carts suitable for outdoor terrain?',
    answer: 'Yes! Our premium golf carts feature all-terrain capabilities with powerful 72V lithium batteries, making them perfect for golf courses, parks, outdoor venues, and work sites with varied terrain.'
  },
  {
    question: 'What is included in the rental price?',
    answer: 'Our rental price includes fully charged carts, basic insurance, and 24/7 support during your rental period. Optional add-ons include delivery/pickup, extra batteries, weather enclosures, and custom branding.'
  }
]

export default function EventsPage() {
  // Generate structured data
  const rentalServiceSchema = generateGeneralRentalServiceSchema()
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      {/* Structured Data */}
      <Script
        id="rental-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rentalServiceSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-rose-800 via-rose-900 to-rose-800">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1.2'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white border border-white/20">
                    Event Rentals
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Golf Cart Rentals for Events & Work Functions
                </h1>
                <p className="mt-6 text-xl leading-8 text-white/90 font-light">
                  Affordable multi-cart bookings for corporate events, competitions, weddings, and work functions. Flexible hourly, daily, and weekly rates with instant online booking.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                  <Link href="/rentals">
                    <Button variant="elegant" size="lg" className="w-full sm:w-auto uppercase tracking-wider text-base px-8 py-6">
                      View Rental Carts
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button variant="elegantOutline" size="lg" className="w-full sm:w-auto uppercase tracking-wider text-base px-8 py-6 bg-white/10 backdrop-blur-sm">
                      Get Custom Quote
                    </Button>
                  </Link>
                </div>
                <p className="mt-6 text-sm text-white/70 font-light">
                  Click any cart to see rental pricing and book instantly
                </p>
              </div>

              {/* Right Column - Golf Cart Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] rounded-sm overflow-hidden border-2 border-white/20 shadow-2xl">
                <img
                  src="/images/products/caddy-cart14.jpg"
                  alt="Premium Golf Cart for Events"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us for Events */}
        <section className="py-16 sm:py-24 bg-zinc-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
              <h2 className="text-3xl font-bold text-zinc-900 sm:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Why Choose Club Caddy for Your Event?
              </h2>
              <p className="mt-4 text-lg text-zinc-600 font-light max-w-2xl mx-auto">
                Premium electric golf carts with unbeatable service and competitive pricing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <DollarSign className="w-8 h-8" />,
                  title: 'Affordable Bulk Pricing',
                  description: 'Save up to 20% on multi-cart bookings. The more you rent, the more you save.'
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: 'Instant Online Booking',
                  description: 'Check real-time availability and book instantly with secure payment processing.'
                },
                {
                  icon: <Calendar className="w-8 h-8" />,
                  title: 'Flexible Rental Periods',
                  description: 'Hourly (2hr min), daily, and weekly rates to suit any event duration.'
                },
                {
                  icon: <Check className="w-8 h-8" />,
                  title: '100% Electric & Eco-Friendly',
                  description: 'Advanced 72V lithium technology with zero emissions and quiet operation.'
                }
              ].map((benefit, index) => (
                <div key={index} className="bg-white p-8 border border-zinc-200 rounded-sm hover:border-rose-800 transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-800 text-white mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-3">{benefit.title}</h3>
                  <p className="text-zinc-600 font-light">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
              <h2 className="text-3xl font-bold text-zinc-900 sm:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Perfect for Every Occasion
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Building2 className="w-10 h-10" />,
                  title: 'Corporate Events & Work Functions',
                  description: 'Professional transportation for team building days, corporate retreats, conferences, and workplace events. Make a lasting impression with our premium fleet.',
                  features: ['Team building events', 'Corporate retreats', 'Conference transport', 'Workplace safety tours']
                },
                {
                  icon: <Trophy className="w-10 h-10" />,
                  title: 'Golf Tournaments & Competitions',
                  description: 'Official supplier for golf tournaments and day competitions. Same-day availability with flexible hourly rates perfect for tournament schedules.',
                  features: ['Golf club tournaments', 'Corporate golf days', 'Charity competitions', 'Practice rounds']
                },
                {
                  icon: <Heart className="w-10 h-10" />,
                  title: 'Weddings & Celebrations',
                  description: 'Add elegance to your special day with our beautifully maintained golf carts. Perfect for vineyard weddings, outdoor ceremonies, and large venue events.',
                  features: ['Wedding transport', 'Vineyard events', 'Birthday parties', 'Anniversary celebrations']
                },
                {
                  icon: <Users className="w-10 h-10" />,
                  title: 'Festivals & Outdoor Events',
                  description: 'Efficient transportation for outdoor festivals, agricultural shows, community events, and large public gatherings.',
                  features: ['Music festivals', 'Agricultural shows', 'Community events', 'Sports events']
                },
                {
                  icon: <Building2 className="w-10 h-10" />,
                  title: 'Work Sites & Construction',
                  description: 'Reliable site transportation for construction projects, large properties, and industrial facilities. Durable carts built for tough conditions.',
                  features: ['Construction sites', 'Industrial facilities', 'Large properties', 'Warehouse operations']
                },
                {
                  icon: <Users className="w-10 h-10" />,
                  title: 'Residential Communities',
                  description: 'Perfect for lifestyle villages, retirement communities, and residential developments requiring efficient internal transportation.',
                  features: ['Retirement villages', 'Lifestyle communities', 'Resort complexes', 'Gated communities']
                }
              ].map((eventType, index) => (
                <div key={index} className="bg-zinc-50 p-8 border border-zinc-200 rounded-sm hover:border-rose-800 transition-all">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-800 text-white mb-6">
                    {eventType.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {eventType.title}
                  </h3>
                  <p className="text-zinc-600 font-light mb-6">{eventType.description}</p>
                  <ul className="space-y-2">
                    {eventType.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-zinc-600">
                        <Check className="w-4 h-4 text-rose-800" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bulk Pricing Section */}
        <section className="py-16 sm:py-24 bg-zinc-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
              <h2 className="text-3xl font-bold text-white sm:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Bulk Rental Pricing
              </h2>
              <p className="mt-4 text-lg text-zinc-300 font-light max-w-2xl mx-auto">
                The more carts you rent, the more you save. Perfect for large events and corporate functions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { carts: '1-4 Carts', discount: 'Standard Rate', color: 'border-zinc-700' },
                { carts: '5-9 Carts', discount: '10% Discount', color: 'border-rose-800' },
                { carts: '10-14 Carts', discount: '15% Discount', color: 'border-rose-700' },
                { carts: '15+ Carts', discount: '20% Discount', color: 'border-rose-600' }
              ].map((tier, index) => (
                <div key={index} className={`bg-zinc-800 p-8 border-2 ${tier.color} rounded-sm text-center`}>
                  <div className="text-3xl font-bold text-white mb-2">{tier.carts}</div>
                  <div className="text-xl font-semibold text-rose-400">{tier.discount}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-zinc-800 border border-zinc-700 rounded-sm p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sample Pricing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-zinc-400 text-sm uppercase tracking-wider mb-2">Hourly Rate</div>
                  <div className="text-3xl font-bold text-white">From $50/hr</div>
                  <div className="text-zinc-400 text-sm mt-2">2-4 hour minimum</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-sm uppercase tracking-wider mb-2">Daily Rate</div>
                  <div className="text-3xl font-bold text-white">From $150/day</div>
                  <div className="text-zinc-400 text-sm mt-2">24 hour period</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-sm uppercase tracking-wider mb-2">Weekly Rate</div>
                  <div className="text-3xl font-bold text-white">From $600/week</div>
                  <div className="text-zinc-400 text-sm mt-2">7 day period</div>
                </div>
              </div>
              <p className="text-center text-zinc-400 text-sm mt-8">
                * Prices vary by cart model. Bulk discounts applied automatically. Contact us for custom event quotes.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-24 bg-zinc-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
              <h2 className="text-3xl font-bold text-zinc-900 sm:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                What Our Event Clients Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Rented 12 carts for our corporate golf day. Seamless booking process, competitive pricing, and the carts were in perfect condition. Will definitely use again!",
                  author: "Sarah Mitchell",
                  role: "Events Manager, Tech Corp NZ"
                },
                {
                  quote: "Perfect for our wedding at a vineyard venue. The carts added a touch of elegance and made transportation easy for our 150 guests. Highly recommend!",
                  author: "James & Emma Thompson",
                  role: "Wedding Clients"
                },
                {
                  quote: "We rent carts monthly for our golf tournaments. Club Caddy's reliability and professional service make them our go-to supplier. Excellent value for money.",
                  author: "Michael Rogers",
                  role: "Tournament Director, Auckland Golf Club"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 border border-zinc-200 rounded-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-rose-800" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-600 font-light italic mb-6">"{testimonial.quote}"</p>
                  <div className="border-t border-zinc-200 pt-4">
                    <div className="font-semibold text-zinc-900">{testimonial.author}</div>
                    <div className="text-sm text-zinc-500">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
              <h2 className="text-3xl font-bold text-zinc-900 sm:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-zinc-50 p-8 border border-zinc-200 rounded-sm">
                  <h3 className="text-xl font-bold text-zinc-900 mb-4">{faq.question}</h3>
                  <p className="text-zinc-600 font-light leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-zinc-900">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px'
            }}
          />
          <div className="relative z-10 px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Book Your Event Carts?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300 font-light">
                Check availability, get instant pricing, and book online in minutes. For custom event quotes or large bookings (10+ carts), contact our team directly.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <Link href="/rentals">
                  <Button variant="elegant" size="lg" className="w-full sm:w-auto uppercase tracking-wider text-base px-10 py-6">
                    View Rental Carts
                  </Button>
                </Link>
                <Link href="/quote">
                  <Button variant="elegantOutline" size="lg" className="w-full sm:w-auto uppercase tracking-wider text-base px-10 py-6">
                    Get Custom Quote
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-zinc-400 font-light">
                Select a cart → Choose dates → Enter details → Complete payment
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-300">
                <a href="tel:+64021560307" className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +64 021 560 307
                </a>
                <a href="mailto:admin@clubcaddycarts.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  admin@clubcaddycarts.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
