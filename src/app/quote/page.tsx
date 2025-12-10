'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'

const translations = {
  en: {
    title: 'Request a Custom Quote',
    subtitle: 'Tell us about your perfect golf cart and we\'ll provide a detailed quote',
    contactInfo: 'Contact Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    businessName: 'Business Name (Optional)',
    email: 'Email Address',
    phone: 'Phone Number',
    productDetails: 'Product & Customization',
    interestedProduct: 'Interested Product',
    selectProduct: 'Select a product...',
    quantity: 'Quantity',
    colorPreferences: 'Color Preferences',
    bodyColor: 'Body Color',
    seatColor: 'Seat Material & Color',
    customizations: 'Customization Options',
    liftKit: 'Lift Kit',
    noLift: 'No Lift Kit',
    twoInch: '2" Lift Kit',
    fourInch: '4" Lift Kit',
    sixInch: '6" Lift Kit',
    wheelUpgrade: 'Wheel & Tire Upgrade',
    standard: 'Standard',
    allTerrain: 'All-Terrain Tires',
    chromewheels: 'Chrome Wheels Package',
    premiumWheels: 'Premium Wheels & Tires',
    lighting: 'Lighting Options',
    standardLights: 'Standard Lighting',
    ledHeadlights: 'LED Headlights',
    ledUnderglow: 'LED Underglow Kit',
    fullLedPackage: 'Full LED Package',
    batteryType: 'Battery Type',
    leadAcid: 'Lead-Acid (Standard)',
    lithium: 'Lithium-Ion (Upgrade)',
    accessories: 'Additional Accessories',
    cupHolders: 'Cup Holders',
    storageBox: 'Rear Storage Box',
    windshield: 'Windshield',
    enclosure: 'Weather Enclosure',
    soundSystem: 'Bluetooth Sound System',
    gpsHolder: 'GPS/Phone Holder',
    cooler: 'Built-in Cooler',
    usageInfo: 'Usage Information',
    primaryUse: 'Primary Use',
    personalGolf: 'Personal Golf Use',
    golfCourse: 'Golf Course Fleet',
    residential: 'Residential Community',
    commercial: 'Commercial/Business',
    events: 'Events & Hospitality',
    budgetTimeline: 'Budget & Timeline',
    budgetRange: 'Budget Range',
    selectBudget: 'Select budget range...',
    under10k: 'Under $10,000',
    range10to15: '$10,000 - $15,000',
    range15to20: '$15,000 - $20,000',
    range20to30: '$20,000 - $30,000',
    over30k: 'Over $30,000',
    purchaseTimeline: 'Purchase Timeline',
    selectTimeline: 'Select timeline...',
    immediate: 'Immediate (Within 1 month)',
    oneToThree: '1-3 months',
    threeToSix: '3-6 months',
    flexible: 'Flexible / Just browsing',
    additionalInfo: 'Additional Information',
    specialRequests: 'Special Requests or Modifications',
    specialRequestsPlaceholder: 'Please describe any special modifications, custom features, or specific requirements...',
    howDidYouHear: 'How did you hear about us?',
    selectSource: 'Select...',
    google: 'Google Search',
    socialMedia: 'Social Media',
    referral: 'Referral',
    golfCourseRef: 'Golf Course',
    other: 'Other',
    consent: 'I agree to be contacted regarding this quote',
    submitQuote: 'Submit Quote Request',
    submitting: 'Submitting...',
    backToProducts: 'Back to Products',
    successTitle: 'Quote Request Submitted!',
    successMessage: 'Thank you for your interest. We\'ll review your requirements and get back to you within 24 hours with a detailed quote.',
    errorTitle: 'Submission Error',
    errorMessage: 'There was an error submitting your quote request. Please try again or contact us directly.',
    required: '* Required field',
  },
  zh: {
    title: '申请定制报价',
    subtitle: '告诉我们您理想的高尔夫球车，我们将提供详细报价',
    contactInfo: '联系信息',
    firstName: '名字',
    lastName: '姓氏',
    businessName: '公司名称（可选）',
    email: '电子邮件',
    phone: '电话号码',
    productDetails: '产品和定制',
    interestedProduct: '感兴趣的产品',
    selectProduct: '选择产品...',
    quantity: '数量',
    colorPreferences: '颜色偏好',
    bodyColor: '车身颜色',
    seatColor: '座椅材料和颜色',
    customizations: '定制选项',
    liftKit: '升降套件',
    noLift: '无升降套件',
    twoInch: '2英寸升降套件',
    fourInch: '4英寸升降套件',
    sixInch: '6英寸升降套件',
    wheelUpgrade: '轮胎升级',
    standard: '标准',
    allTerrain: '全地形轮胎',
    chromewheels: '镀铬轮毂套装',
    premiumWheels: '高级轮毂和轮胎',
    lighting: '照明选项',
    standardLights: '标准照明',
    ledHeadlights: 'LED大灯',
    ledUnderglow: 'LED底盘灯',
    fullLedPackage: '全LED套装',
    batteryType: '电池类型',
    leadAcid: '铅酸（标准）',
    lithium: '锂离子（升级）',
    accessories: '附加配件',
    cupHolders: '杯架',
    storageBox: '后部储物箱',
    windshield: '挡风玻璃',
    enclosure: '天气罩',
    soundSystem: '蓝牙音响系统',
    gpsHolder: 'GPS/手机支架',
    cooler: '内置冷藏箱',
    usageInfo: '使用信息',
    primaryUse: '主要用途',
    personalGolf: '个人高尔夫使用',
    golfCourse: '高尔夫球场车队',
    residential: '住宅社区',
    commercial: '商业/企业',
    events: '活动和招待',
    budgetTimeline: '预算和时间',
    budgetRange: '预算范围',
    selectBudget: '选择预算范围...',
    under10k: '低于 $10,000',
    range10to15: '$10,000 - $15,000',
    range15to20: '$15,000 - $20,000',
    range20to30: '$20,000 - $30,000',
    over30k: '超过 $30,000',
    purchaseTimeline: '购买时间',
    selectTimeline: '选择时间...',
    immediate: '立即（1个月内）',
    oneToThree: '1-3个月',
    threeToSix: '3-6个月',
    flexible: '灵活/只是浏览',
    additionalInfo: '附加信息',
    specialRequests: '特殊要求或修改',
    specialRequestsPlaceholder: '请描述任何特殊修改、定制功能或具体要求...',
    howDidYouHear: '您如何得知我们？',
    selectSource: '选择...',
    google: '谷歌搜索',
    socialMedia: '社交媒体',
    referral: '推荐',
    golfCourseRef: '高尔夫球场',
    other: '其他',
    consent: '我同意就此报价与我联系',
    submitQuote: '提交报价申请',
    submitting: '提交中...',
    backToProducts: '返回产品',
    successTitle: '报价申请已提交！',
    successMessage: '感谢您的关注。我们将审核您的要求，并在24小时内向您提供详细报价。',
    errorTitle: '提交错误',
    errorMessage: '提交报价申请时出错。请重试或直接与我们联系。',
    required: '* 必填字段',
  },
}

function QuotePageContent() {
  const { language } = useLanguage()
  const t = translations[language]
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('product')

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    phone: '',
    productId: '',
    quantity: '1',
    bodyColor: '',
    seatColor: '',
    liftKit: 'none',
    wheelUpgrade: 'standard',
    lighting: 'standard',
    batteryType: 'lead-acid',
    accessories: [] as string[],
    primaryUse: '',
    budgetRange: '',
    purchaseTimeline: '',
    specialRequests: '',
    hearAboutUs: '',
    consent: false,
  })

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient()
        const { data, error } = await (supabase
          .from('products') as any)
          .select('id, name, slug, base_price')
          .eq('in_stock', true)
          .order('base_price', { ascending: true })

        if (error) {
          console.error('Error fetching products:', error)
          setLoading(false)
          return
        }

        if (data) {
          setProducts(data)

          // Pre-select product if coming from product page
          if (productSlug) {
            const product = data.find((p: any) => p.slug === productSlug)
            if (product) {
              setFormData(prev => ({ ...prev, productId: product.id }))
            }
          }
        }
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch products:', err)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [productSlug])

  // Auto-scroll to top when success or error message is shown
  useEffect(() => {
    if (submitted || error) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [submitted, error])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)

    try {
      // Submit quote request via API (which sends emails)
      const response = await fetch('/api/enquiries/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          businessName: formData.businessName || null,
          email: formData.email,
          phone: formData.phone,
          productId: formData.productId || null,
          quantity: parseInt(formData.quantity),
          bodyColor: formData.bodyColor,
          seatColor: formData.seatColor,
          liftKit: formData.liftKit,
          wheelUpgrade: formData.wheelUpgrade,
          lighting: formData.lighting,
          batteryType: formData.batteryType,
          accessories: formData.accessories,
          primaryUse: formData.primaryUse,
          budgetRange: formData.budgetRange,
          purchaseTimeline: formData.purchaseTimeline,
          specialRequests: formData.specialRequests,
          hearAboutUs: formData.hearAboutUs,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit quote')
      }

      console.log('Quote submitted successfully:', result)
      setSubmitted(true)

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        phone: '',
        productId: '',
        quantity: '1',
        bodyColor: '',
        seatColor: '',
        liftKit: 'none',
        wheelUpgrade: 'standard',
        lighting: 'standard',
        batteryType: 'lead-acid',
        accessories: [],
        primaryUse: '',
        budgetRange: '',
        purchaseTimeline: '',
        specialRequests: '',
        hearAboutUs: '',
        consent: false,
      })
    } catch (err) {
      console.error('Quote submission error:', err)
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCheckboxChange = (accessory: string) => {
    setFormData(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter(a => a !== accessory)
        : [...prev.accessories, accessory],
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-zinc-900">Loading...</div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-zinc-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t.successTitle}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 font-light">
            {t.successMessage}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 bg-rose-800 text-white font-medium text-sm uppercase tracking-wider hover:bg-rose-900 transition-all rounded-sm"
            >
              {t.backToProducts}
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 border-2 border-zinc-300 text-zinc-700 font-medium text-sm uppercase tracking-wider hover:border-zinc-400 transition-all rounded-sm"
            >
              Submit Another Quote
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
            <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-zinc-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t.errorTitle}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 font-light">
            {t.errorMessage}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setError(false)}
              className="px-8 py-3 bg-rose-800 text-white font-medium text-sm uppercase tracking-wider hover:bg-rose-900 transition-all rounded-sm"
            >
              Try Again
            </button>
            <a
              href="tel:+64021560307"
              className="px-8 py-3 border-2 border-zinc-300 text-zinc-700 font-medium text-sm uppercase tracking-wider hover:border-zinc-400 transition-all rounded-sm"
            >
              Call Us Instead
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden bg-zinc-900">
        {/* Background Image */}
        <div className="relative w-full">
          <img
            src="/images/hero-golf-cart.jpg"
            alt="Club Caddy Golf Cart"
            className="w-full h-auto object-cover"
          />

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />

          <div className="absolute inset-0 z-10 mx-auto max-w-7xl px-6 flex flex-col items-center justify-center text-center">
            <div className="bg-black/40 backdrop-blur-sm px-8 py-6 rounded-lg">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl drop-shadow-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white font-light drop-shadow-lg">
                {t.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Contact Information */}
            <div className="bg-white p-8 border border-zinc-200 rounded-sm">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.contactInfo}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.firstName} <span className="text-rose-800">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.lastName} <span className="text-rose-800">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.businessName}
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.email} <span className="text-rose-800">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.phone} <span className="text-rose-800">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white p-8 border border-zinc-200 rounded-sm">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.productDetails}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.interestedProduct}
                  </label>
                  <select
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  >
                    <option value="">{t.selectProduct}</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - ${product.base_price}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.quantity} <span className="text-rose-800">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>
              </div>
            </div>

            {/* Color Preferences */}
            <div className="bg-white p-8 border border-zinc-200 rounded-sm">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.colorPreferences}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.bodyColor}
                  </label>
                  <input
                    type="text"
                    value={formData.bodyColor}
                    onChange={(e) => setFormData({ ...formData, bodyColor: e.target.value })}
                    placeholder="e.g., Midnight Blue, Pearl White, Forest Green"
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.seatColor}
                  </label>
                  <input
                    type="text"
                    value={formData.seatColor}
                    onChange={(e) => setFormData({ ...formData, seatColor: e.target.value })}
                    placeholder="e.g., Black Leather, Tan Vinyl"
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="bg-white p-8 border border-zinc-200 rounded-sm">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.customizations}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.liftKit}
                  </label>
                  <select
                    value={formData.liftKit}
                    onChange={(e) => setFormData({ ...formData, liftKit: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  >
                    <option value="none">{t.noLift}</option>
                    <option value="2inch">{t.twoInch}</option>
                    <option value="4inch">{t.fourInch}</option>
                    <option value="6inch">{t.sixInch}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.wheelUpgrade}
                  </label>
                  <select
                    value={formData.wheelUpgrade}
                    onChange={(e) => setFormData({ ...formData, wheelUpgrade: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  >
                    <option value="standard">{t.standard}</option>
                    <option value="all-terrain">{t.allTerrain}</option>
                    <option value="chrome">{t.chromewheels}</option>
                    <option value="premium">{t.premiumWheels}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.lighting}
                  </label>
                  <select
                    value={formData.lighting}
                    onChange={(e) => setFormData({ ...formData, lighting: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  >
                    <option value="standard">{t.standardLights}</option>
                    <option value="led-headlights">{t.ledHeadlights}</option>
                    <option value="led-underglow">{t.ledUnderglow}</option>
                    <option value="full-led">{t.fullLedPackage}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.batteryType}
                  </label>
                  <select
                    value={formData.batteryType}
                    onChange={(e) => setFormData({ ...formData, batteryType: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  >
                    <option value="lead-acid">{t.leadAcid}</option>
                    <option value="lithium">{t.lithium}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Accessories */}
            <div className="bg-white p-8 border border-zinc-200 rounded-sm">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.accessories}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { value: 'cup-holders', label: t.cupHolders },
                  { value: 'storage-box', label: t.storageBox },
                  { value: 'windshield', label: t.windshield },
                  { value: 'enclosure', label: t.enclosure },
                  { value: 'sound-system', label: t.soundSystem },
                  { value: 'gps-holder', label: t.gpsHolder },
                  { value: 'cooler', label: t.cooler },
                ].map((accessory) => (
                  <label key={accessory.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.accessories.includes(accessory.value)}
                      onChange={() => handleCheckboxChange(accessory.value)}
                      className="h-5 w-5 rounded border-zinc-300 text-rose-800 focus:ring-rose-800"
                    />
                    <span className="text-zinc-700">{accessory.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Usage Information */}
            <div className="bg-white p-8 border border-zinc-200 rounded-sm">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.usageInfo}
              </h2>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  {t.primaryUse}
                </label>
                <select
                  value={formData.primaryUse}
                  onChange={(e) => setFormData({ ...formData, primaryUse: e.target.value })}
                  className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                >
                  <option value="">{t.selectSource}</option>
                  <option value="personal-golf">{t.personalGolf}</option>
                  <option value="golf-course">{t.golfCourse}</option>
                  <option value="residential">{t.residential}</option>
                  <option value="commercial">{t.commercial}</option>
                  <option value="events">{t.events}</option>
                </select>
              </div>
            </div>

            {/* Budget & Timeline */}
            <div className="bg-white p-8 border border-zinc-200 rounded-sm">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.budgetTimeline}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.budgetRange}
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  >
                    <option value="">{t.selectBudget}</option>
                    <option value="under-10k">{t.under10k}</option>
                    <option value="10-15k">{t.range10to15}</option>
                    <option value="15-20k">{t.range15to20}</option>
                    <option value="20-30k">{t.range20to30}</option>
                    <option value="over-30k">{t.over30k}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.purchaseTimeline}
                  </label>
                  <select
                    value={formData.purchaseTimeline}
                    onChange={(e) => setFormData({ ...formData, purchaseTimeline: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  >
                    <option value="">{t.selectTimeline}</option>
                    <option value="immediate">{t.immediate}</option>
                    <option value="1-3-months">{t.oneToThree}</option>
                    <option value="3-6-months">{t.threeToSix}</option>
                    <option value="flexible">{t.flexible}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white p-8 border border-zinc-200 rounded-sm">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t.additionalInfo}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.specialRequests}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder={t.specialRequestsPlaceholder}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    {t.howDidYouHear}
                  </label>
                  <select
                    value={formData.hearAboutUs}
                    onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
                    className="w-full rounded-sm border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-rose-800 focus:outline-none focus:ring-1 focus:ring-rose-800"
                  >
                    <option value="">{t.selectSource}</option>
                    <option value="google">{t.google}</option>
                    <option value="social-media">{t.socialMedia}</option>
                    <option value="referral">{t.referral}</option>
                    <option value="golf-course">{t.golfCourseRef}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="h-5 w-5 rounded border-zinc-300 text-rose-800 focus:ring-rose-800"
                    />
                    <span className="text-zinc-700">
                      {t.consent} <span className="text-rose-800">*</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-8 py-4 bg-rose-800 text-white font-medium text-sm uppercase tracking-wider hover:bg-rose-900 transition-all rounded-sm disabled:bg-zinc-400 disabled:cursor-not-allowed"
              >
                {submitting ? t.submitting : t.submitQuote}
              </button>
              <Link
                href="/products"
                className="flex-1 px-8 py-4 text-center border-2 border-zinc-300 text-zinc-700 font-medium text-sm uppercase tracking-wider hover:border-zinc-400 transition-all rounded-sm"
              >
                {t.backToProducts}
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

// Wrap in Suspense to handle useSearchParams
export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-zinc-900">Loading...</div>
      </div>
    }>
      <QuotePageContent />
    </Suspense>
  )
}
