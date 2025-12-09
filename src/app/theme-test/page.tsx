'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeTestPage() {
  const [activeTheme, setActiveTheme] = useState<'velocity' | 'apex' | 'heritage' | 'monolith' | 'crimson'>('velocity')
  const [language, setLanguage] = useState<'en' | 'zh'>('en')

  const translations = {
    en: {
      badge: 'Premium Golf Carts',
      title: 'Club Caddy',
      subtitle: 'Where sophisticated simplicity meets precision engineering. Refined aesthetics, thoughtful details, uncompromising quality.',
      exploreBtn: 'Explore Collection',
      contactBtn: 'Contact Us',
      stats: {
        range: { value: '100+', label: 'Kilometer Range', unit: 'km' },
        battery: { value: '72V', label: 'Lithium System', unit: 'v' },
        speed: { value: '50+', label: 'Top Speed', unit: 'km/h' }
      },
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
      ctaSubtitle: 'Contact Warren to discuss your custom requirements or schedule a viewing.'
    },
    zh: {
      badge: '高级高尔夫球车',
      title: '俱乐部球童',
      subtitle: '精致简约与精密工程的完美结合。精致美学，周到细节，卓越品质。',
      exploreBtn: '探索系列',
      contactBtn: '联系我们',
      stats: {
        range: { value: '100+', label: '公里续航', unit: '公里' },
        battery: { value: '72V', label: '锂电系统', unit: '伏' },
        speed: { value: '50+', label: '最高速度', unit: '公里/小时' }
      },
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
      ctaSubtitle: '联系Warren讨论您的定制需求或预约看车。'
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">
              Club Caddy <span className="text-red-600">Design System</span>
            </h1>
            <div className="text-xs text-zinc-500 uppercase tracking-widest">Theme Explorer</div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTheme('velocity')}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                activeTheme === 'velocity'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              01 — Velocity Grid
            </button>
            <button
              onClick={() => setActiveTheme('apex')}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                activeTheme === 'apex'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              02 — Apex Performance
            </button>
            <button
              onClick={() => setActiveTheme('heritage')}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                activeTheme === 'heritage'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              03 — Heritage Craft
            </button>
            <button
              onClick={() => setActiveTheme('monolith')}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                activeTheme === 'monolith'
                  ? 'bg-white text-zinc-900 shadow-lg'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              04 — Monolith
            </button>
            <button
              onClick={() => setActiveTheme('crimson')}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                activeTheme === 'crimson'
                  ? 'bg-red-900 text-white shadow-lg shadow-red-900/30'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              05 — Crimson Noir
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-32">
        {/* THEME 01: VELOCITY GRID - Motorsport + Tech Grid */}
        {activeTheme === 'velocity' && (
          <div className="theme-velocity">
            <style jsx>{`
              @keyframes grid-flow {
                0% { transform: translateY(0); }
                100% { transform: translateY(60px); }
              }
              @keyframes pulse-glow {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
              }
              @keyframes slide-in {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
              .grid-pattern {
                background-image:
                  linear-gradient(rgba(239, 68, 68, 0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(239, 68, 68, 0.15) 1px, transparent 1px);
                background-size: 60px 60px;
                animation: grid-flow 3s linear infinite;
              }
              .slide-in-1 { animation: slide-in 0.6s ease-out 0.1s both; }
              .slide-in-2 { animation: slide-in 0.6s ease-out 0.2s both; }
              .slide-in-3 { animation: slide-in 0.6s ease-out 0.3s both; }
              .slide-in-4 { animation: slide-in 0.6s ease-out 0.4s both; }
            `}</style>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950">
              {/* Animated Grid Background */}
              <div className="absolute inset-0 grid-pattern opacity-40"></div>

              {/* Diagonal Accent Lines */}
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-red-600/10 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-red-600/5 to-transparent"></div>

              {/* Speed Lines */}
              <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
              <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="slide-in-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-600/30 bg-red-600/10 mb-6">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                      <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Performance Mode Active</span>
                    </div>

                    <h1 className="slide-in-2 text-7xl font-black text-white mb-4 leading-none">
                      VELOCITY<br/>
                      <span className="text-red-600">GRID</span>
                    </h1>

                    <p className="slide-in-3 text-xl text-zinc-400 mb-8 max-w-lg font-light">
                      Precision engineering meets motorsport aesthetics. Every element aligned to the grid. Every detail optimized for performance.
                    </p>

                    <div className="slide-in-4 flex gap-4">
                      <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-none relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-red-600/50">
                        <span className="relative z-10">CONFIGURE CART</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                      </button>
                      <button className="px-8 py-4 border-2 border-zinc-700 text-white font-bold rounded-none hover:border-red-600 hover:text-red-600 transition-all">
                        VIEW SPECS
                      </button>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-6 mt-12">
                      <div className="border-l-2 border-red-600 pl-4">
                        <div className="text-3xl font-black text-white">100+</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">KM Range</div>
                      </div>
                      <div className="border-l-2 border-red-600 pl-4">
                        <div className="text-3xl font-black text-white">72V</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Lithium</div>
                      </div>
                      <div className="border-l-2 border-red-600 pl-4">
                        <div className="text-3xl font-black text-white">50+</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">KM/H Max</div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Element - Geometric Shape */}
                  <div className="relative h-[500px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Hexagon Pattern from seats */}
                      <div className="w-80 h-80 relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <pattern id="hexPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M10 0l8.66 5v10l-8.66 5-8.66-5v-10z" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="url(#hexPattern)" stroke="#ef4444" strokeWidth="1"/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-8xl">🏎️</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Product Grid */}
            <section className="py-24 bg-zinc-900 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-zinc-900 to-zinc-900"></div>

              <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <div className="text-red-600 text-sm font-bold uppercase tracking-widest mb-3">Performance Lineup</div>
                  <h2 className="text-5xl font-black text-white">BUILT FOR SPEED</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {['STANDARD', 'PREMIUM', 'ULTIMATE'].map((tier, i) => (
                    <div key={i} className="group relative bg-zinc-950 border border-zinc-800 hover:border-red-600 transition-all overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                      <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-40">
                          🏌️
                        </div>
                        <div className="absolute top-3 right-3 px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase">
                          {tier}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-2xl font-black text-white mb-2">{tier} PACKAGE</h3>
                        <p className="text-zinc-500 text-sm mb-4">72V Lithium Performance System</p>

                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-4xl font-black text-white">${11500 + i * 2500}</span>
                          <span className="text-zinc-600 text-sm">NZD</span>
                        </div>

                        <button className="w-full py-3 bg-zinc-900 text-white font-bold uppercase text-sm border border-zinc-800 hover:bg-red-600 hover:border-red-600 transition-all">
                          Configure →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* THEME 02: APEX PERFORMANCE - Enhanced Motorsport (your favorite) */}
        {activeTheme === 'apex' && (
          <div className="theme-apex">
            <style jsx>{`
              @keyframes shimmer {
                0% { background-position: -1000px 0; }
                100% { background-position: 1000px 0; }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
              }
              @keyframes glow-pulse {
                0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
                50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.6); }
              }
              .metal-gradient {
                background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 25%, #3a3a3a 50%, #1a1a1a 75%, #2a2a2a 100%);
                background-size: 400% 400%;
              }
              .chrome-text {
                background: linear-gradient(to bottom, #ffffff 0%, #d4d4d4 50%, #a3a3a3 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
              .checkered-bg {
                background-image:
                  linear-gradient(45deg, #1f1f1f 25%, transparent 25%),
                  linear-gradient(-45deg, #1f1f1f 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #1f1f1f 75%),
                  linear-gradient(-45deg, transparent 75%, #1f1f1f 75%);
                background-size: 40px 40px;
                background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
              }
            `}</style>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950">
              {/* Checkered racing pattern */}
              <div className="absolute inset-0 checkered-bg opacity-5"></div>

              {/* Dramatic lighting */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-600 rounded-full blur-[150px] opacity-10"></div>

              {/* Carbon fiber texture */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
                                   repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`
                }}
              ></div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="max-w-4xl">
                  {/* Racing Badge */}
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600/50 backdrop-blur-sm mb-8">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-black text-red-500 uppercase tracking-[0.2em]">Ultimate Performance</span>
                    <div className="w-8 h-px bg-gradient-to-r from-red-600 to-transparent"></div>
                    <span className="text-sm font-black chrome-text uppercase">72V System</span>
                  </div>

                  <h1 className="text-8xl font-black text-white mb-6 leading-[0.9]">
                    APEX
                    <br />
                    <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
                      PERFORM
ANCE
                    </span>
                  </h1>

                  <p className="text-2xl text-zinc-400 mb-10 max-w-2xl font-light leading-relaxed">
                    Where racing heritage meets golf course refinement. Carbon fiber aesthetics, metallic precision, uncompromising power.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-16">
                    <button className="group relative px-10 py-5 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white font-black text-lg rounded-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-red-600/50 hover:scale-105">
                      <span className="relative z-10 uppercase tracking-wider">Start Engine →</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <button className="px-10 py-5 bg-zinc-900/50 backdrop-blur-sm border-2 border-zinc-700 text-white font-black text-lg rounded-lg hover:border-red-600 hover:bg-red-600/10 transition-all uppercase tracking-wider">
                      Tech Specs
                    </button>
                  </div>

                  {/* Performance Stats - Racing Style */}
                  <div className="grid grid-cols-4 gap-8">
                    {[
                      { value: '100', unit: 'KM', label: 'Range' },
                      { value: '72', unit: 'V', label: 'Power' },
                      { value: '50', unit: 'KM/H', label: 'Speed' },
                      { value: '3.8', unit: 'SEC', label: '0-40' }
                    ].map((stat, i) => (
                      <div key={i} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 group-hover:border-red-600/50 rounded-lg p-5 transition-all">
                          <div className="text-4xl font-black text-white mb-1">{stat.value}<span className="text-2xl text-red-600">+</span></div>
                          <div className="text-xs text-zinc-600 uppercase tracking-wider mb-1">{stat.unit}</div>
                          <div className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Product Showcase */}
            <section className="py-32 bg-zinc-900 relative overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

              <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                  <div className="inline-block px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                    Racing Collection
                  </div>
                  <h2 className="text-6xl font-black text-white mb-4">
                    BUILT TO <span className="text-red-600">DOMINATE</span>
                  </h2>
                  <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                    Three tiers of performance engineering
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { name: 'SPORT', tier: 'Entry', price: 11500, color: 'zinc' },
                    { name: 'PERFORMANCE', tier: 'Pro', price: 14000, color: 'red' },
                    { name: 'ULTIMATE', tier: 'Elite', price: 16500, color: 'orange' }
                  ].map((cart, i) => (
                    <div key={i} className="group relative bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-500">
                      {/* Top accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                        i === 0 ? 'from-zinc-600 to-zinc-700' :
                        i === 1 ? 'from-red-600 to-red-700' :
                        'from-orange-600 to-red-600'
                      }`}></div>

                      {/* Glow effect on hover */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity"></div>

                      <div className="relative">
                        {/* Image area */}
                        <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden">
                          {/* Hexagon pattern */}
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ef4444' stroke-width='1'/%3E%3C/svg%3E")`,
                              backgroundSize: '60px 60px'
                            }}
                          ></div>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-8xl opacity-50">🏎️</div>
                          </div>

                          {/* Tier badge */}
                          <div className="absolute top-4 right-4">
                            <div className={`px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest ${
                              i === 0 ? 'bg-zinc-800 text-zinc-400' :
                              i === 1 ? 'bg-red-600 text-white' :
                              'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                            }`}>
                              {cart.tier}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-3xl font-black text-white mb-2">{cart.name}</h3>
                              <p className="text-sm text-zinc-500 uppercase tracking-wider">Package</p>
                            </div>
                          </div>

                          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                            72V Lithium System • Custom Wheels • Premium Seating
                          </p>

                          <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-sm text-zinc-600">From</span>
                            <span className="text-5xl font-black text-white">${cart.price.toLocaleString()}</span>
                            <span className="text-zinc-600">NZD</span>
                          </div>

                          <button className={`w-full py-4 rounded-lg font-black text-sm uppercase tracking-wider transition-all ${
                            i === 1
                              ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:shadow-xl hover:shadow-red-600/50'
                              : 'bg-zinc-900 border border-zinc-800 text-white hover:border-red-600 hover:text-red-600'
                          }`}>
                            Configure Cart →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* THEME 03: HERITAGE CRAFT - Burgundy Luxury */}
        {activeTheme === 'heritage' && (
          <div className="theme-heritage">
            <style jsx>{`
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Cormorant+Garamond:wght@300;400;600&display=swap');

              .heritage-title {
                font-family: 'Playfair Display', serif;
                font-weight: 900;
              }
              .heritage-body {
                font-family: 'Cormorant Garamond', serif;
              }
              @keyframes shine {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
              }
              .burgundy-shine {
                background: linear-gradient(90deg,
                  #9F1239 0%,
                  #BE123C 25%,
                  #DC2626 50%,
                  #BE123C 75%,
                  #9F1239 100%
                );
                background-size: 200% auto;
                animation: shine 3s linear infinite;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
              .leather-texture {
                background-image:
                  radial-gradient(circle at 20% 50%, transparent 20%, rgba(159, 18, 57, 0.05) 21%, rgba(159, 18, 57, 0.05) 34%, transparent 35%, transparent),
                  radial-gradient(circle at 60% 30%, transparent 20%, rgba(159, 18, 57, 0.05) 21%, rgba(159, 18, 57, 0.05) 34%, transparent 35%, transparent);
                background-size: 50px 50px;
              }
              .damask-pattern {
                background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0 C50 10 50 20 40 30 C30 20 30 10 40 0 M40 30 C50 40 50 50 40 60 C30 50 30 40 40 30 M0 40 C10 50 20 50 30 40 C20 30 10 30 0 40 M50 40 C60 50 70 50 80 40 C70 30 60 30 50 40' fill='none' stroke='%239F1239' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E");
              }
            `}</style>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-rose-950 via-zinc-900 to-rose-950">
              {/* Damask background pattern */}
              <div className="absolute inset-0 damask-pattern opacity-[0.08]"></div>

              {/* Luxurious gradient overlays */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-950/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-rose-950/30 to-transparent"></div>

              {/* Subtle glow */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-800 rounded-full blur-[150px] opacity-5"></div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Decorative line */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent to-rose-700"></div>
                    <div className="px-5 py-2 border border-rose-700/50 rounded-full">
                      <span className="heritage-body text-sm text-rose-400 uppercase tracking-[0.3em]">Est. 2024</span>
                    </div>
                    <div className="w-20 h-px bg-gradient-to-l from-transparent to-rose-700"></div>
                  </div>

                  <h1 className="heritage-title text-8xl text-white mb-6 leading-none">
                    HERITAGE
                    <br />
                    <span className="burgundy-shine">CRAFT</span>
                  </h1>

                  <p className="heritage-body text-2xl text-zinc-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                    Where timeless elegance meets modern engineering. Handcrafted details, rich burgundy tones, and leather-inspired luxury for the discerning golfer.
                  </p>

                  <div className="flex gap-6 justify-center mb-20">
                    <button className="group px-12 py-5 bg-gradient-to-r from-rose-800 via-rose-700 to-rose-800 text-white font-bold text-lg rounded-sm relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-rose-800/40 hover:scale-105">
                      <span className="relative z-10 heritage-body uppercase tracking-wider">Discover Collection</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-900 to-rose-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <button className="px-12 py-5 border-2 border-rose-700/50 text-rose-400 font-bold text-lg rounded-sm hover:bg-rose-900/20 hover:border-rose-600 transition-all heritage-body uppercase tracking-wider">
                      Our Story
                    </button>
                  </div>

                  {/* Luxury Stats */}
                  <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto">
                    {[
                      { number: '100+', label: 'Kilometers Range', desc: 'Per Charge' },
                      { number: '72V', label: 'Lithium Power', desc: 'System' },
                      { number: '50+', label: 'Top Speed', desc: 'KM/H' }
                    ].map((stat, i) => (
                      <div key={i} className="text-center relative">
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-rose-700 to-transparent"></div>

                        <div className="py-8">
                          <div className="heritage-title text-5xl burgundy-shine mb-2">{stat.number}</div>
                          <div className="heritage-body text-sm text-rose-400 uppercase tracking-widest mb-1">{stat.label}</div>
                          <div className="heritage-body text-xs text-zinc-600 italic">{stat.desc}</div>
                        </div>

                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-rose-700 to-transparent"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Product Gallery */}
            <section className="py-32 bg-zinc-950 relative overflow-hidden leather-texture">
              <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                  {/* Ornamental header */}
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-rose-700 text-2xl">✦</div>
                    <h2 className="heritage-title text-6xl text-white">The Collection</h2>
                    <div className="text-rose-700 text-2xl">✦</div>
                  </div>
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-700 to-transparent mx-auto mb-6"></div>
                  <p className="heritage-body text-xl text-zinc-400 italic max-w-2xl mx-auto">
                    Each cart meticulously crafted to embody luxury and performance
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                  {[
                    { name: 'Standard Edition', tier: 'Classic', price: 11500 },
                    { name: 'Premium Edition', tier: 'Distinguished', price: 14000 },
                    { name: 'Ultimate Edition', tier: 'Prestige', price: 16500 }
                  ].map((item, i) => (
                    <div key={i} className="group relative bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-sm overflow-hidden border border-rose-900/30 hover:border-rose-700/60 transition-all duration-500">
                      {/* Burgundy accent corner */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-800/15 to-transparent"></div>
                      <div className="absolute top-0 right-0 w-px h-24 bg-gradient-to-b from-rose-700 to-transparent"></div>
                      <div className="absolute top-0 right-0 w-24 h-px bg-gradient-to-l from-rose-700 to-transparent"></div>

                      {/* Subtle side glow */}
                      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-rose-800 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                      {/* Image */}
                      <div className="relative aspect-[3/4] bg-gradient-to-br from-zinc-800 via-rose-950/10 to-zinc-900 overflow-hidden">
                        {/* Hexagon pattern */}
                        <div
                          className="absolute inset-0 opacity-[0.07]"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%239F1239' stroke-width='0.8'/%3E%3C/svg%3E")`,
                            backgroundSize: '40px 40px'
                          }}
                        ></div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-8xl opacity-30 group-hover:scale-110 transition-transform duration-500">👑</div>
                        </div>

                        {/* Badge */}
                        <div className="absolute top-6 left-6">
                          <div className="heritage-body px-4 py-2 bg-gradient-to-r from-rose-800 to-rose-900 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest shadow-lg">
                            {item.tier}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 text-center">
                        <h3 className="heritage-title text-3xl text-white mb-2">{item.name}</h3>
                        <div className="w-16 h-px bg-rose-700 mx-auto mb-6"></div>

                        <p className="heritage-body text-zinc-400 text-sm mb-8 italic">
                          Handcrafted luxury meets performance
                        </p>

                        <div className="mb-8">
                          <div className="heritage-body text-sm text-zinc-600 uppercase tracking-wider mb-2">From</div>
                          <div className="heritage-title text-5xl burgundy-shine">
                            ${item.price.toLocaleString()}
                          </div>
                          <div className="heritage-body text-xs text-zinc-600 italic mt-1">New Zealand Dollars</div>
                        </div>

                        <button className="w-full py-4 border-2 border-rose-800/40 text-rose-400 heritage-body font-semibold uppercase tracking-wider rounded-sm hover:bg-rose-900/30 hover:border-rose-700 hover:text-rose-300 transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* THEME 04: REFINED ELEGANCE - Simple but Awesome Blend */}
        {activeTheme === 'monolith' && (
          <div className="theme-monolith">
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
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23450a0a' stroke-width='1.2'/%3E%3C/svg%3E")`,
                  backgroundSize: '100px 100px'
                }}
              ></div>

              {/* Elegant top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-800/30 to-transparent z-20"></div>

              {/* Language Toggle Button - Top Right */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-8 right-8 z-30"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-full text-zinc-900 hover:border-rose-800 hover:bg-white transition-all shadow-sm hover:shadow-md"
                >
                  <span className="refined-body text-xs font-medium uppercase tracking-wider">
                    {language === 'en' ? '中文' : 'EN'}
                  </span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </motion.button>
              </motion.div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
                <div className="max-w-4xl text-left lg:text-center mx-auto lg:mx-0">
                  {/* Refined badge */}
                  <div className="slide-in delay-1 inline-flex items-center gap-2 px-4 py-2 mb-10 border border-zinc-200 rounded-full bg-white/80 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 bg-rose-800 rounded-full"></div>
                    <span className="refined-body text-xs text-zinc-600 uppercase tracking-[0.15em] font-medium">{t.badge}</span>
                  </div>

                  <h1 className="slide-in delay-2 refined-title text-7xl md:text-8xl font-bold text-zinc-900 mb-6 leading-[1.1]">
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
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="refined-body px-10 py-4 bg-zinc-900 text-white font-medium text-sm uppercase tracking-[0.1em] hover:bg-rose-900 transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl"
                    >
                      {t.exploreBtn}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="refined-body px-10 py-4 border-2 border-zinc-900 text-zinc-900 font-medium text-sm uppercase tracking-[0.1em] hover:border-rose-800 hover:text-rose-900 hover:bg-rose-50 transition-all duration-300 rounded-sm"
                    >
                      {t.contactBtn}
                    </motion.button>
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

            {/* Product Collection */}
            <section className="py-28 bg-white relative overflow-hidden">
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
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23450a0a' stroke-width='0.5'/%3E%3C/svg%3E")`,
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

                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3.5 border-2 ${
                            i === 1
                              ? 'border-rose-800 text-rose-900 hover:bg-rose-800 hover:text-white'
                              : 'border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
                          } refined-body text-xs uppercase tracking-[0.1em] font-medium transition-all duration-300 rounded-sm`}
                        >
                          {t.viewDetails}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Gallery Showcase */}
            <section className="py-32 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
                  <h2 className="refined-title text-5xl font-bold text-zinc-900 mb-3">{t.galleryTitle}</h2>
                  <p className="refined-body text-base text-zinc-500 font-light">{t.gallerySubtitle}</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { image: '/images/products/caddy-cart02.jpg', label: t.gallery1 },
                    { image: '/images/products/caddy-cart04.jpg', label: t.gallery2 }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.2,
                        ease: [0.21, 0.45, 0.27, 0.9]
                      }}
                      className="group relative aspect-[3/2] overflow-hidden rounded-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="refined-title text-2xl font-semibold">{item.label}</p>
                      </div>
                    </motion.div>
                  ))}
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
                    +64-021-560-307
                  </a>
                  <a href="mailto:admin@clubcaddycarts.com" className="refined-body px-8 py-3 border border-zinc-300 text-zinc-900 text-sm font-medium uppercase tracking-wide rounded-sm hover:border-zinc-900 transition-all">
                    Email Us
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* THEME 05: CRIMSON NOIR - Dark luxury */}
        {activeTheme === 'crimson' && (
          <div className="theme-crimson">
            <style jsx>{`
              @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Lato:wght@300;400;700&display=swap');

              .noir-title {
                font-family: 'Cinzel', serif;
              }
              .noir-body {
                font-family: 'Lato', sans-serif;
              }
              @keyframes blood-pulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
              }
              @keyframes float-up {
                0% { transform: translateY(100px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
              }
              .float-up-1 { animation: float-up 0.8s ease-out 0.1s both; }
              .float-up-2 { animation: float-up 0.8s ease-out 0.3s both; }
              .float-up-3 { animation: float-up 0.8s ease-out 0.5s both; }
              .marble-texture {
                background-image:
                  linear-gradient(135deg, rgba(127, 29, 29, 0.02) 25%, transparent 25%),
                  linear-gradient(225deg, rgba(127, 29, 29, 0.02) 25%, transparent 25%),
                  linear-gradient(45deg, rgba(127, 29, 29, 0.02) 25%, transparent 25%),
                  linear-gradient(315deg, rgba(127, 29, 29, 0.02) 25%, transparent 25%);
                background-size: 60px 60px;
                background-position: 0 0, 30px 0, 30px -30px, 0px 30px;
              }
            `}</style>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-zinc-950 via-red-950/20 to-zinc-950">
              {/* Dramatic lighting */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-red-900 rounded-full blur-[200px] opacity-10"></div>

              {/* Subtle marble texture */}
              <div className="absolute inset-0 marble-texture opacity-30"></div>

              {/* Hex pattern very subtle */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23991b1b' stroke-width='0.8'/%3E%3C/svg%3E")`,
                  backgroundSize: '70px 70px'
                }}
              ></div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
                <div className="max-w-5xl mx-auto text-center">
                  {/* Ornate divider */}
                  <div className="float-up-1 flex items-center justify-center gap-6 mb-10">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent to-red-900"></div>
                    <div className="text-red-900 text-2xl">♦</div>
                    <div className="noir-body text-xs text-red-900 uppercase tracking-[0.3em]">Luxury Redefined</div>
                    <div className="text-red-900 text-2xl">♦</div>
                    <div className="w-24 h-px bg-gradient-to-l from-transparent to-red-900"></div>
                  </div>

                  <h1 className="float-up-2 noir-title text-9xl font-black text-white mb-6 leading-none">
                    CRIMSON
                    <br />
                    <span className="text-red-900">NOIR</span>
                  </h1>

                  <p className="float-up-3 noir-body text-2xl text-zinc-400 mb-14 max-w-3xl mx-auto font-light leading-relaxed">
                    Dramatic elegance shrouded in darkness. Deep burgundy essence meets onyx sophistication for those who command attention through mystery.
                  </p>

                  <div className="flex gap-6 justify-center mb-24">
                    <button className="group relative px-14 py-6 bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white font-bold text-lg overflow-hidden rounded-sm transition-all hover:shadow-2xl hover:shadow-red-900/50">
                      <span className="relative z-10 noir-body uppercase tracking-widest">Enter Collection</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-950 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    <button className="px-14 py-6 border-2 border-red-900/50 text-red-900 font-bold text-lg rounded-sm hover:bg-red-900/10 hover:border-red-900 transition-all noir-body uppercase tracking-widest">
                      Private Viewing
                    </button>
                  </div>

                  {/* Luxury Stats */}
                  <div className="grid grid-cols-3 gap-16 max-w-4xl mx-auto">
                    {[
                      { value: '100', sub: 'KM', label: 'Extended Range' },
                      { value: '72', sub: 'V', label: 'Power Reserve' },
                      { value: '50', sub: 'KM/H', label: 'Peak Velocity' }
                    ].map((stat, i) => (
                      <div key={i} className="group relative">
                        {/* Decorative frame */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-gradient-to-b from-red-900 to-transparent"></div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-gradient-to-t from-red-900 to-transparent"></div>

                        <div className="py-8 border-t border-b border-red-900/30 group-hover:border-red-900/60 transition-all">
                          <div className="noir-title text-6xl font-black text-white mb-1">
                            {stat.value}<span className="text-red-900 text-4xl">{stat.sub}</span>
                          </div>
                          <div className="noir-body text-xs text-zinc-600 uppercase tracking-[0.2em] mt-3">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Product Showcase */}
            <section className="py-32 bg-zinc-950 relative overflow-hidden">
              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-zinc-950 to-red-950/10"></div>

              <div className="relative max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                  {/* Ornate header */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-32 h-px bg-gradient-to-r from-transparent to-red-900"></div>
                    <div className="text-red-900 text-xl">◆</div>
                    <div className="text-red-900 text-2xl">♦</div>
                    <div className="text-red-900 text-xl">◆</div>
                    <div className="w-32 h-px bg-gradient-to-l from-transparent to-red-900"></div>
                  </div>

                  <h2 className="noir-title text-7xl font-black text-white mb-6">
                    The Dark Collection
                  </h2>
                  <p className="noir-body text-xl text-zinc-500 italic max-w-2xl mx-auto">
                    Three masterpieces of shadowed luxury
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { name: 'Onyx', tier: 'I', price: 11500 },
                    { name: 'Crimson', tier: 'II', price: 14000 },
                    { name: 'Midnight', tier: 'III', price: 16500 }
                  ].map((item, i) => (
                    <div key={i} className="group relative bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-sm overflow-hidden border border-red-900/20 hover:border-red-900/60 transition-all duration-500">
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-red-900 to-transparent"></div>
                      <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-red-900 to-transparent"></div>
                      <div className="absolute top-0 right-0 w-12 h-px bg-gradient-to-l from-red-900 to-transparent"></div>
                      <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-red-900 to-transparent"></div>

                      {/* Glow on hover */}
                      <div className="absolute -inset-1 bg-red-900 opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>

                      <div className="relative">
                        {/* Image area */}
                        <div className="relative aspect-[3/4] bg-gradient-to-br from-zinc-950 via-red-950/10 to-zinc-950 overflow-hidden">
                          {/* Dark hex pattern */}
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23991b1b' stroke-width='1'/%3E%3C/svg%3E")`,
                              backgroundSize: '50px 50px'
                            }}
                          ></div>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-9xl opacity-20 group-hover:scale-110 transition-transform duration-700">👑</div>
                          </div>

                          {/* Roman numeral badge */}
                          <div className="absolute top-6 left-1/2 -translate-x-1/2">
                            <div className="noir-title px-6 py-3 bg-red-900/80 backdrop-blur-sm text-white text-lg font-bold">
                              {item.tier}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-10 text-center">
                          <div className="w-16 h-px bg-red-900 mx-auto mb-6"></div>

                          <h3 className="noir-title text-3xl font-black text-white mb-2">{item.name}</h3>
                          <p className="noir-body text-zinc-600 text-xs uppercase tracking-[0.2em] mb-8">Edition</p>

                          <p className="noir-body text-zinc-500 text-sm mb-10 leading-relaxed italic">
                            Crafted in darkness, driven in style
                          </p>

                          <div className="mb-10">
                            <div className="noir-body text-zinc-600 text-xs uppercase tracking-widest mb-3">From</div>
                            <div className="noir-title text-5xl font-black text-white mb-1">
                              ${item.price.toLocaleString()}
                            </div>
                            <div className="noir-body text-xs text-zinc-700 uppercase tracking-wider">NZD</div>
                          </div>

                          <button className="w-full py-4 bg-red-900/20 border border-red-900/30 text-red-900 noir-body font-bold uppercase tracking-wider rounded-sm hover:bg-red-900 hover:text-white hover:border-red-900 transition-all">
                            Discover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
