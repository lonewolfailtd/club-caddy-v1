'use client'

import { createClient } from '@/lib/supabase/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import AddToCartButton from '@/components/products/AddToCartButton'
import ProductGallery from '@/components/products/ProductGallery'
import { useState, useEffect } from 'react'

type Props = {
  params: Promise<{ slug: string }>
}

// Bilingual translations
const translations = {
  en: {
    backToProducts: 'Back to All Products',
    requestQuote: 'Request a Quote',
    overview: 'Overview',
    keyFeatures: 'Key Features',
    technicalSpecs: 'Technical Specifications',
    customizeCart: 'Customise Your Cart',
    customizeDescription: 'Enhance your golf cart with premium add-ons and accessories.',
    readyToOrder: 'Ready to Book?',
    contactUs: 'Contact us today for rentals, quotes or to discuss your requirements.',
    depositInfo: 'Flexible rental periods: Hourly, Daily, or Weekly',
    standardPackage: 'Standard Package',
    premiumPackage: 'Premium Package',
    ultimatePackage: 'Ultimate Package',
    startingFrom: 'Rental from',
  },
  zh: {
    backToProducts: '返回所有产品',
    requestQuote: '申请报价',
    overview: '产品概述',
    keyFeatures: '主要特点',
    technicalSpecs: '技术规格',
    customizeCart: '定制您的球车',
    customizeDescription: '使用高级附加组件和配件增强您的高尔夫球车。',
    readyToOrder: '准备预订？',
    contactUs: '立即联系我们了解租赁、报价或讨论您的需求。',
    depositInfo: '灵活的租赁期限：按小时、按天或按周',
    standardPackage: '标准套餐',
    premiumPackage: '高级套餐',
    ultimatePackage: '旗舰套餐',
    startingFrom: '租赁起价',
  },
}

export default function ProductPage({ params }: Props) {
  const { language } = useLanguage()
  const [product, setProduct] = useState<any>(null)
  const [addons, setAddons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { slug } = await params
      const supabase = createClient()

      const { data: productData, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error || !productData) {
        notFound()
      }

      setProduct(productData)

      // Fetch add-ons
      const { data: addonsData } = await supabase
        .from('addons')
        .select('*')
        .eq('in_stock', true)
        .order('price', { ascending: true })

      setAddons(addonsData || [])
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

  // Updated tier gradients for Refined Elegance theme
  const tierColors = {
    standard: 'from-zinc-400 via-zinc-300 to-zinc-400', // Soft zinc tones
    premium: 'from-rose-800 via-rose-900 to-rose-800', // Rose-800 burgundy gradient
    ultimate: 'from-zinc-400 via-rose-800 to-zinc-400', // Warm zinc with rose accents
  }

  const tierLabels = {
    standard: t.standardPackage,
    premium: t.premiumPackage,
    ultimate: t.ultimatePackage,
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${tierColors[product.tier as keyof typeof tierColors]}`}>
        {/* Reduced opacity hexagon pattern for subtlety */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1.2'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-1 text-sm font-semibold uppercase tracking-wider text-white border border-white/20">
                {tierLabels[product.tier as keyof typeof tierLabels]}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              {product.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90 font-light">
              {product.short_description}
            </p>
            <div className="mt-8 text-5xl font-bold text-white">
              {t.startingFrom} {formatPrice(Number(product.base_price))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Image Gallery */}
          {product.images && Array.isArray(product.images) && product.images.length > 0 && (
            <div className="mb-16">
              <ProductGallery images={product.images} productName={product.name} />
            </div>
          )}

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left Column - Description */}
            <div className="bg-white p-8 border border-zinc-200 rounded-sm">
              <h2 className="text-3xl font-bold text-zinc-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.overview}
              </h2>
              <div className="w-12 h-px bg-rose-800 my-6"></div>
              <p className="text-lg leading-8 text-zinc-600 font-light">
                {product.description}
              </p>

              {/* Features */}
              {product.features && Array.isArray(product.features) && product.features.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-zinc-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t.keyFeatures}
                  </h3>
                  <div className="mt-6 space-y-4">
                    {product.features.map((feature: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-rose-800">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-zinc-900">{feature.title}</h4>
                          <p className="mt-1 text-zinc-600 font-light">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Specifications */}
            <div>
              <div className="sticky top-8 bg-zinc-900 rounded-sm p-8 border border-zinc-800">
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t.technicalSpecs}
                </h3>
                <div className="w-12 h-px bg-rose-800 my-6"></div>

                {product.specifications && (
                  <div className="mt-8 space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-zinc-700 pb-4">
                        <span className="font-medium capitalize text-zinc-300">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="font-semibold text-white">{value as string}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="mt-8 space-y-4">
                  {/* Purchase Option */}
                  <AddToCartButton product={product} />

                  <Link
                    href={`/quote?product=${product.slug}`}
                    className="block w-full rounded-sm px-8 py-3 text-center text-sm font-semibold text-white border-2 border-zinc-700 hover:border-rose-800 hover:bg-rose-900/20 transition-all uppercase tracking-wider"
                  >
                    {t.requestQuote}
                  </Link>
                  <Link
                    href="/products"
                    className="block w-full rounded-sm px-8 py-3 text-center text-sm font-semibold text-zinc-400 hover:text-white transition-all uppercase tracking-wider"
                  >
                    ← {t.backToProducts}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Add-ons Section */}
          {addons && addons.length > 0 && (
            <div className="mt-24">
              <div className="text-center">
                <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
                <h2 className="text-3xl font-bold text-zinc-900 sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t.customizeCart}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 font-light">
                  {t.customizeDescription}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {addons.map((addon: any) => (
                  <div
                    key={addon.id}
                    className="bg-white border border-zinc-200 hover:border-zinc-400 transition-all p-6 rounded-sm"
                  >
                    <h4 className="text-lg font-semibold text-zinc-900">{addon.name}</h4>
                    <p className="mt-2 text-sm text-zinc-600 font-light">{addon.description}</p>
                    <div className="mt-4 text-2xl font-bold text-rose-900">
                      {formatPrice(Number(addon.price))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden bg-zinc-900">
        {/* Subtle hexagon pattern */}
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
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t.readyToOrder}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300 font-light">
              {t.contactUs}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a
                href="tel:+64021560307"
                className="w-full sm:w-auto px-8 py-3 bg-rose-800 text-white font-medium text-sm uppercase tracking-wider hover:bg-rose-900 transition-all rounded-sm shadow-lg hover:shadow-xl"
              >
                +64 021 560 307
              </a>
              <a
                href="mailto:admin@clubcaddycarts.com"
                className="w-full sm:w-auto px-8 py-3 border-2 border-zinc-700 text-white font-medium text-sm uppercase tracking-wider hover:border-rose-800 hover:bg-rose-900/20 transition-all rounded-sm"
              >
                admin@clubcaddycarts.com
              </a>
            </div>
            <p className="mt-8 text-sm text-zinc-400">
              {t.depositInfo}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
