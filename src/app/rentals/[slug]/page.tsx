'use client'

import { createClient } from '@/lib/supabase/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import ProductGallery from '@/components/products/ProductGallery'
import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

// Bilingual translations
const translations = {
  en: {
    backToRentals: 'Back to Rental Options',
    rentalPricing: 'Rental Pricing',
    overview: 'Overview',
    keyFeatures: 'Key Features',
    technicalSpecs: 'Technical Specifications',
    bookNow: 'Book This Cart',
    perfectFor: 'Perfect For',
    rentalBenefits: 'Rental Benefits',
    bulkDiscount: 'Bulk Discount Available',
    bulkDiscountDesc: 'Save up to 20% when renting 15+ carts',
    flexiblePeriods: 'Flexible Rental Periods',
    flexiblePeriodsDesc: 'Choose hourly, daily, or weekly rates',
    deliveryAvailable: 'Delivery Available',
    deliveryAvailableDesc: 'We deliver throughout Auckland',
    support: '24/7 Support',
    supportDesc: 'Assistance during your rental period',
    readyToBook: 'Ready to Book?',
    contactUs: 'Select your dates and complete your booking in minutes.',
    rentalInfo: 'Flexible hourly, daily, and weekly rental periods available',
  },
  zh: {
    backToRentals: '返回租赁选项',
    rentalPricing: '租赁价格',
    overview: '产品概述',
    keyFeatures: '主要特点',
    technicalSpecs: '技术规格',
    bookNow: '预订此车',
    perfectFor: '适用于',
    rentalBenefits: '租赁优势',
    bulkDiscount: '批量折扣',
    bulkDiscountDesc: '租赁15+辆车可节省高达20%',
    flexiblePeriods: '灵活的租赁期限',
    flexiblePeriodsDesc: '选择按小时、按天或按周租赁',
    deliveryAvailable: '提供送货',
    deliveryAvailableDesc: '我们在奥克兰全境送货',
    support: '24/7支持',
    supportDesc: '租赁期间提供协助',
    readyToBook: '准备预订？',
    contactUs: '选择日期并在几分钟内完成预订。',
    rentalInfo: '提供灵活的按小时、按天和按周租赁期限',
  },
}

export default function RentalProductPage({ params }: Props) {
  const { language } = useLanguage()
  const [product, setProduct] = useState<any>(null)
  const [rentalPricing, setRentalPricing] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { slug } = await params
      const supabase = createClient()

      const { data: productData, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('rental_enabled', true)
        .single()

      if (error || !productData) {
        notFound()
      }

      setProduct(productData)

      // Fetch rental pricing
      const { data: pricingData } = await supabase
        .from('rental_pricing')
        .select('*')
        .eq('product_id', productData.id)
        .eq('active', true)
        .single()

      setRentalPricing(pricingData)
      setLoading(false)
    }

    fetchData()
  }, [params])

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-zinc-900">Loading...</div>
      </div>
    )
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');
        .refined-title { font-family: 'Playfair Display', serif; }
        .refined-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-900">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <Link
            href="/hire"
            className="inline-flex items-center gap-2 refined-body text-sm text-zinc-400 hover:text-white transition-colors mb-8"
          >
            ← {t.backToRentals}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 mb-6 border border-zinc-700 bg-zinc-800">
                <span className="refined-body text-xs text-zinc-400 uppercase tracking-[0.15em]">
                  Available for Rental
                </span>
              </div>

              <h1 className="refined-title text-5xl font-bold text-white mb-6 leading-tight">
                {product.name}
              </h1>

              <p className="refined-body text-xl text-zinc-300 mb-8 font-light leading-relaxed">
                {product.short_description}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {rentalPricing?.hourly_rate && (
                  <div className="bg-zinc-800 border border-zinc-700 px-6 py-4">
                    <div className="refined-body text-xs text-zinc-500 uppercase tracking-wider mb-1">Hourly</div>
                    <div className="refined-title text-2xl font-bold text-white">${rentalPricing.hourly_rate}/hr</div>
                  </div>
                )}
                {rentalPricing?.daily_rate && (
                  <div className="bg-zinc-800 border border-zinc-700 px-6 py-4">
                    <div className="refined-body text-xs text-zinc-500 uppercase tracking-wider mb-1">Daily</div>
                    <div className="refined-title text-2xl font-bold text-white">${rentalPricing.daily_rate}/day</div>
                  </div>
                )}
                {rentalPricing?.weekly_rate && (
                  <div className="bg-zinc-800 border border-zinc-700 px-6 py-4">
                    <div className="refined-body text-xs text-zinc-500 uppercase tracking-wider mb-1">Weekly</div>
                    <div className="refined-title text-2xl font-bold text-white">${rentalPricing.weekly_rate}/week</div>
                  </div>
                )}
              </div>

              <Link
                href={`/booking/${product.slug}`}
                className="inline-block w-full sm:w-auto px-10 py-4 text-center text-sm font-semibold refined-body bg-rose-800 text-white hover:bg-rose-900 transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-xl"
              >
                {t.bookNow}
              </Link>

              <p className="refined-body text-sm text-zinc-500 mt-4">
                {t.rentalInfo}
              </p>
            </div>

            {/* Placeholder for image - you can add ProductGallery here */}
            <div className="relative aspect-[4/3] bg-zinc-800 border border-zinc-700 overflow-hidden">
              {product.images && Array.isArray(product.images) && product.images.length > 0 && (
                <ProductGallery images={product.images} productName={product.name} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Rental Benefits */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="refined-title text-3xl font-bold text-zinc-900 mb-12 text-center">
            {t.rentalBenefits}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-50 border border-zinc-200 p-6 text-center">
              <div className="w-12 h-12 bg-rose-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="refined-body text-base font-semibold text-zinc-900 mb-2">{t.bulkDiscount}</h3>
              <p className="refined-body text-sm text-zinc-600 font-light">{t.bulkDiscountDesc}</p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-6 text-center">
              <div className="w-12 h-12 bg-rose-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="refined-body text-base font-semibold text-zinc-900 mb-2">{t.flexiblePeriods}</h3>
              <p className="refined-body text-sm text-zinc-600 font-light">{t.flexiblePeriodsDesc}</p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-6 text-center">
              <div className="w-12 h-12 bg-rose-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="refined-body text-base font-semibold text-zinc-900 mb-2">{t.deliveryAvailable}</h3>
              <p className="refined-body text-sm text-zinc-600 font-light">{t.deliveryAvailableDesc}</p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-6 text-center">
              <div className="w-12 h-12 bg-rose-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="refined-body text-base font-semibold text-zinc-900 mb-2">{t.support}</h3>
              <p className="refined-body text-sm text-zinc-600 font-light">{t.supportDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left Column - Description */}
            <div className="bg-white p-8 border border-zinc-200">
              <h2 className="refined-title text-3xl font-bold text-zinc-900">{t.overview}</h2>
              <div className="w-12 h-px bg-rose-800 my-6"></div>
              <p className="refined-body text-lg leading-8 text-zinc-600 font-light">
                {product.description}
              </p>

              {/* Features */}
              {product.features && Array.isArray(product.features) && product.features.length > 0 && (
                <div className="mt-12">
                  <h3 className="refined-title text-2xl font-bold text-zinc-900">{t.keyFeatures}</h3>
                  <div className="mt-6 space-y-4">
                    {product.features.map((feature: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-rose-800">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="refined-body font-semibold text-zinc-900">{feature.title}</h4>
                          <p className="refined-body mt-1 text-zinc-600 font-light">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Specifications */}
            <div>
              <div className="sticky top-8 bg-zinc-900 p-8 border border-zinc-800">
                <h3 className="refined-title text-2xl font-bold text-white">{t.technicalSpecs}</h3>
                <div className="w-12 h-px bg-rose-800 my-6"></div>

                {product.specifications && (
                  <div className="mt-8 space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-zinc-700 pb-4">
                        <span className="refined-body font-medium capitalize text-zinc-300">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="refined-body font-semibold text-white">{value as string}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <Link
                    href={`/booking/${product.slug}`}
                    className="block w-full px-8 py-4 text-center text-sm font-semibold refined-body bg-rose-800 text-white hover:bg-rose-900 transition-all uppercase tracking-wider shadow-lg"
                  >
                    {t.bookNow}
                  </Link>
                </div>
              </div>
            </div>
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
          <div className="mx-auto max-w-2xl text-center">
            <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
            <h2 className="refined-title text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t.readyToBook}
            </h2>
            <p className="refined-body mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300 font-light">
              {t.contactUs}
            </p>
            <div className="mt-10">
              <Link
                href={`/booking/${product.slug}`}
                className="inline-block px-10 py-4 text-base font-semibold refined-body bg-rose-800 text-white hover:bg-rose-900 transition-all uppercase tracking-wider shadow-lg hover:shadow-xl"
              >
                {t.bookNow}
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-zinc-300">
              <a href="tel:+64021560307" className="refined-body text-sm hover:text-white transition-colors">
                +64 021 560 307
              </a>
              <span className="text-zinc-700">|</span>
              <a href="mailto:admin@clubcaddycarts.com" className="refined-body text-sm hover:text-white transition-colors">
                admin@clubcaddycarts.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
