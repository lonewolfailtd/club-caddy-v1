'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HomePage() {
  const { language } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  console.log('HomePage language:', language)

  const translations = {
    en: {
      badge: 'Premium Golf Carts',
      title: 'Premium Electric Golf Carts Auckland',
      subtitle: 'New Zealand\'s Premier Lithium Electric Golf Carts - Sales, Hire & Service Across Auckland',
      exploreBtn: 'Explore Collection',
      contactBtn: 'Contact Us',
      stats: {
        range: { value: '100+', label: 'Kilometer Range', unit: 'km' },
        battery: { value: '72V', label: 'Lithium System', unit: 'v' },
        speed: { value: '50+', label: 'Top Speed', unit: 'km/h' }
      },
      featuresTitle: 'Built for Your Needs',
      featuresSubtitle: 'From 2-seater to 20-seater configurations, we customise electric carts to suit your requirements with premium features and cutting-edge technology.',
      collectionTitle: 'The Collection',
      collectionSubtitle: 'Three tiers of refined excellence',
      products: {
        standard: { name: 'Standard', tier: 'Essential' },
        premium: { name: 'Premium', tier: 'Refined' },
        ultimate: { name: 'Ultimate', tier: 'Prestige' }
      },
      viewDetails: 'View Details',
      featured: 'Featured',
      galleryTitle: 'Crafted for Excellence',
      gallerySubtitle: 'Every detail meticulously designed',
      gallery1: 'Premium Craftsmanship',
      gallery2: 'Luxury Details',
      ctaTitle: 'Ready to Experience Refinement?',
      ctaSubtitle: 'Contact Warren to discuss your custom requirements or schedule a viewing.',
      ctaPhone: 'Call Us',
      ctaEmail: 'Email Us',
      features: [
        {
          title: "10\" Touchscreen Display",
          description: "Intuitive controls with Bluetooth connectivity for music and calls, plus reverse camera integration.",
        },
        {
          title: "Premium Safety Features",
          description: "4-wheel hydraulic disc brakes with automatic braking system, LED headlights, and seat belts.",
        },
        {
          title: "Luxury Amenities",
          description: "4 cup holders, lockable storage, golf ball washer, sand bottles & built-in chilling bin.",
        },
        {
          title: "Customisable Options",
          description: "Multiple colours, battery options (48V/60V/72V), wheel sizes and optional bag canopy or weather enclosure.",
        },
        {
          title: "Eco-Friendly Power",
          description: "Lithium battery with 100km+ range, eco mode (20km/h) and standard mode (35km/h+), fully customisable.",
        },
        {
          title: "Quick Delivery",
          description: "Starting from $9,200 NZD with $1,000 deposit. Delivery in approximately 6 weeks across New Zealand.",
        },
      ]
    },
    zh: {
      badge: '高级高尔夫球车',
      title: '奥克兰高级电动高尔夫球车',
      subtitle: '新西兰领先的锂电高尔夫球车 - 奥克兰地区销售、租赁和服务',
      exploreBtn: '探索系列',
      contactBtn: '联系我们',
      stats: {
        range: { value: '100+', label: '公里续航', unit: '公里' },
        battery: { value: '72V', label: '锂电系统', unit: '伏' },
        speed: { value: '50+', label: '最高速度', unit: '公里/小时' }
      },
      featuresTitle: '专为您的需求而设计',
      featuresSubtitle: '从2座到20座配置，我们定制电动车以满足您的要求，配备高级功能和尖端技术。',
      collectionTitle: '产品系列',
      collectionSubtitle: '三个级别的卓越品质',
      products: {
        standard: { name: '标准版', tier: '基础版' },
        premium: { name: '高级版', tier: '精品版' },
        ultimate: { name: '旗舰版', tier: '尊贵版' }
      },
      viewDetails: '查看详情',
      featured: '精选',
      galleryTitle: '卓越工艺',
      gallerySubtitle: '每个细节都精心设计',
      gallery1: '高级工艺',
      gallery2: '奢华细节',
      ctaTitle: '准备好体验精致了吗？',
      ctaSubtitle: '联系Warren讨论您的定制需求或预约看车。',
      ctaPhone: '致电我们',
      ctaEmail: '发送邮件',
      features: [
        {
          title: "10英寸触摸屏显示",
          description: "直观的控制，支持蓝牙连接音乐和通话，以及倒车摄像头集成。",
        },
        {
          title: "高级安全功能",
          description: "四轮液压盘式制动器，配备自动制动系统、LED大灯和安全带。",
        },
        {
          title: "豪华配置",
          description: "4个杯架、可锁存储、高尔夫球清洗器、沙瓶和内置冷藏箱。",
        },
        {
          title: "可定制选项",
          description: "多种颜色、电池选项（48V/60V/72V）、轮尺寸以及可选的球包顶棚或防风罩。",
        },
        {
          title: "环保动力",
          description: "锂电池，续航超过100公里，环保模式（20km/h）和标准模式（35km/h+），完全可定制。",
        },
        {
          title: "快速交付",
          description: "起价9,200新西兰元，定金1,000元。新西兰境内约6周交付。",
        },
      ]
    }
  }

  const t = translations[language]

  const galleryImages = [
    { image: '/images/products/caddy-cart01.jpg', label: t.gallery1 },
    { image: '/images/products/caddy-cart02.jpg', label: t.gallery2 },
    { image: '/images/products/caddy-cart03.jpg', label: t.gallery1 },
    { image: '/images/products/caddy-cart04.jpg', label: t.gallery2 },
    { image: '/images/products/caddy-cart05.jpg', label: t.gallery1 },
    { image: '/images/products/caddy-cart06.jpg', label: t.gallery2 }
  ]

  // Auto-play slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [galleryImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');

        .refined-title {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.01em;
        }
        .refined-body {
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.01em;
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.15; }
        }
        @keyframes subtle-slide {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes video-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .breathing-hex {
          animation: breathe 5s ease-in-out infinite;
        }
        .slide-in {
          animation: subtle-slide 0.8s ease-out forwards;
        }
        .video-fade-in {
          animation: video-fade 1.5s ease-out forwards;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
        {/* Video Background - Right Side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-white z-10"></div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="video-fade-in absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="/videos/golf-course-hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Hexagon pattern overlay - only on left side with text */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/2 breathing-hex pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23881337' stroke-width='1.2'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        ></div>

        {/* Elegant top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-800/30 to-transparent z-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-4xl text-left lg:text-center mx-auto lg:mx-0">
            <h1 className="slide-in delay-1 refined-title text-7xl md:text-8xl font-bold text-zinc-900 mb-6 leading-[1.1]">
              {t.title}
            </h1>

            <div className="slide-in delay-2 w-16 h-px bg-rose-800 mx-auto mb-8"></div>

            <p className="slide-in delay-3 refined-body text-xl text-zinc-900 mb-12 max-w-2xl mx-auto font-semibold leading-relaxed" style={{ textShadow: '0 1px 3px rgba(255, 255, 255, 0.8)' }}>
              {t.subtitle}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-4 justify-center mb-20"
            >
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="refined-body px-10 py-4 bg-zinc-900 text-white font-medium text-sm uppercase tracking-[0.1em] hover:bg-rose-900 transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl"
              >
                {t.exploreBtn}
              </motion.a>
              <motion.a
                href="mailto:admin@clubcaddycarts.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="refined-body px-10 py-4 border-2 border-zinc-900 text-zinc-900 font-medium text-sm uppercase tracking-[0.1em] hover:border-rose-800 hover:text-rose-900 hover:bg-rose-50 transition-all duration-300 rounded-sm"
              >
                {t.contactBtn}
              </motion.a>
            </motion.div>

            {/* Refined stats */}
            <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto">
              {[
                t.stats.range,
                t.stats.battery,
                t.stats.speed
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.1,
                    ease: [0.21, 0.45, 0.27, 0.9]
                  }}
                  className="relative group"
                >
                  {/* Subtle line accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-rose-800/20 to-transparent"></div>

                  <div className="pt-6 pb-6">
                    <div className="refined-title text-5xl font-bold text-zinc-900 mb-2">{stat.value}</div>
                    <div className="refined-body text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-rose-800/20 to-transparent"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
            <h2 className="refined-title text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl mb-6">
              {t.featuresTitle}
            </h2>
            <p className="refined-body text-lg leading-8 text-zinc-600">
              {t.featuresSubtitle}
            </p>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.21, 0.45, 0.27, 0.9]
                }}
                className="group p-8 bg-white border border-zinc-200 hover:border-zinc-400 transition-all duration-500 rounded-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-800 mb-6">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="refined-title text-xl font-semibold text-zinc-900 mb-4">
                  {feature.title}
                </h3>
                <p className="refined-body text-zinc-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Collection */}
      <section className="py-28 bg-zinc-50 relative overflow-hidden">
        {/* Very subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000000' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.45, 0.27, 0.9] }}
            className="text-center mb-20"
          >
            <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
            <h2 className="refined-title text-5xl font-bold text-zinc-900 mb-3">{t.collectionTitle}</h2>
            <p className="refined-body text-base text-zinc-500 font-light">{t.collectionSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { ...t.products.standard, price: 11500, accent: 'zinc', image: '/images/products/caddy-cart01.jpg' },
              { ...t.products.premium, price: 14000, accent: 'rose', image: '/images/products/caddy-cart13.jpg' },
              { ...t.products.ultimate, price: 16500, accent: 'zinc', image: '/images/products/caddy-cart14.jpg' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.21, 0.45, 0.27, 0.9]
                }}
                className="group relative bg-white border border-zinc-200 hover:border-zinc-400 transition-all duration-500 overflow-hidden"
              >
                {/* Subtle top accent */}
                <div className={`absolute top-0 left-0 w-full h-px ${
                  i === 1 ? 'bg-rose-800' : 'bg-zinc-300'
                } transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700`}></div>

                {/* Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-50 to-zinc-100 overflow-hidden">
                  {/* Subtle hexagon pattern on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23881337' stroke-width='0.5'/%3E%3C/svg%3E")`,
                      backgroundSize: '50px 50px'
                    }}
                  ></div>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Subtle badge */}
                  {i === 1 && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="refined-body px-3 py-1.5 bg-rose-800 text-white text-[10px] font-semibold uppercase tracking-widest shadow-lg">
                        {t.featured}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="refined-body text-[10px] text-zinc-400 uppercase tracking-[0.15em] mb-3 font-medium">
                    {item.tier} Edition
                  </div>

                  <h3 className="refined-title text-2xl font-semibold text-zinc-900 mb-6">{item.name}</h3>

                  <div className="w-10 h-px bg-zinc-200 mb-8"></div>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="refined-body text-4xl font-bold text-zinc-900">${item.price.toLocaleString()}</span>
                    <span className="refined-body text-xs text-zinc-400 uppercase tracking-wide">NZD</span>
                  </div>

                  <motion.a
                    href="/products"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block w-full py-3.5 border-2 ${
                      i === 1
                        ? 'border-rose-800 text-rose-900 hover:bg-rose-800 hover:text-white'
                        : 'border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
                    } refined-body text-xs uppercase tracking-[0.1em] font-medium transition-all duration-300 rounded-sm text-center`}
                  >
                    {t.viewDetails}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Slideshow */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="refined-title text-4xl md:text-5xl font-bold text-zinc-900">
              {language === 'en' ? 'Gallery' : '画廊'}
            </h2>
          </motion.div>

          {/* Slideshow Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Main Image */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <motion.img
                key={currentSlide}
                src={galleryImages[currentSlide].image}
                alt={galleryImages[currentSlide].label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay with Label */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="refined-title text-2xl md:text-3xl font-semibold">{galleryImages[currentSlide].label}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-zinc-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-zinc-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-rose-800 w-8'
                      : 'bg-zinc-300 hover:bg-zinc-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location-Specific SEO Section */}
      <section key={language} className="relative py-24 bg-gradient-to-br from-zinc-50 via-white to-rose-50">
        <div className="absolute inset-0 hexagon-pattern-minimal opacity-[0.02]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="refined-title text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
              {language === 'en'
                ? 'Proudly Serving Auckland & New Zealand'
                : '自豪地服务于奥克兰和新西兰'}
            </h2>
            <p className="refined-body text-lg text-zinc-600 max-w-3xl mx-auto">
              {language === 'en'
                ? 'As Auckland\'s premier electric golf cart supplier, we deliver cutting-edge 72V lithium technology across New Zealand with unmatched performance and reliability.'
                : '作为奥克兰领先的电动高尔夫球车供应商，我们在新西兰各地提供尖端的72V锂电技术，性能和可靠性无与伦比。'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-rose-800 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="refined-title text-xl font-bold text-zinc-900 mb-2">
                {language === 'en' ? '72V Lithium Power' : '72V锂电动力'}
              </h3>
              <p className="refined-body text-zinc-600">
                {language === 'en'
                  ? 'Superior performance vs standard 36-48V systems. Longer range, faster charging, extended battery life.'
                  : '性能优于标准36-48V系统。更长续航、更快充电、更长电池寿命。'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-rose-800 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="refined-title text-xl font-bold text-zinc-900 mb-2">
                {language === 'en' ? 'Auckland Based' : '总部设在奥克兰'}
              </h3>
              <p className="refined-body text-zinc-600">
                {language === 'en'
                  ? 'Local expertise with nationwide delivery. Fast service, competitive pricing, and comprehensive support.'
                  : '本地专业知识，全国配送。快速服务、有竞争力的价格和全面的支持。'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-rose-800 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="refined-title text-xl font-bold text-zinc-900 mb-2">
                {language === 'en' ? 'Sales & Hire Options' : '销售和租赁选项'}
              </h3>
              <p className="refined-body text-zinc-600">
                {language === 'en'
                  ? 'Flexible purchase and rental options for golf courses, events, and private use across New Zealand.'
                  : '为新西兰各地的高尔夫球场、活动和私人使用提供灵活的购买和租赁选项。'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple Footer CTA */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="refined-title text-3xl font-semibold text-zinc-900 mb-4">
            {t.ctaTitle}
          </h3>
          <p className="refined-body text-base text-zinc-600 mb-8">
            {t.ctaSubtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <a href="tel:+64021560307" className="refined-body px-8 py-3 bg-zinc-900 text-white text-sm font-medium uppercase tracking-wide rounded-sm hover:bg-rose-900 transition-all">
              {t.ctaPhone}
            </a>
            <a href="mailto:admin@clubcaddycarts.com" className="refined-body px-8 py-3 border border-zinc-300 text-zinc-900 text-sm font-medium uppercase tracking-wide rounded-sm hover:border-zinc-900 transition-all">
              {t.ctaEmail}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

