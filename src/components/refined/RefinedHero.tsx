'use client'

import { motion } from 'framer-motion'

export interface HeroStat {
  value: string
  label: string
  unit?: string
}

export interface RefinedHeroProps {
  badge: string
  title: string
  subtitle: string
  primaryCTA: {
    text: string
    onClick: () => void
  }
  secondaryCTA: {
    text: string
    onClick: () => void
  }
  stats: HeroStat[]
  videoSrc?: string
}

export default function RefinedHero({
  badge,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  stats,
  videoSrc
}: RefinedHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      {/* Video Background - Right Side */}
      {videoSrc && (
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/40 to-white z-10"></div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            style={{ animation: 'video-fade 1.5s ease-out forwards' }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Hexagon pattern overlay - only on left side with text */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23450a0a' stroke-width='1.2'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          animation: 'breathe 5s ease-in-out infinite'
        }}
      ></div>

      {/* Elegant top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-800/30 to-transparent z-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-4xl text-left lg:text-center mx-auto lg:mx-0">
          {/* Refined badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 mb-10 border border-zinc-200 rounded-full bg-white/80 backdrop-blur-sm"
            style={{ animation: 'subtle-slide 0.8s ease-out 0.1s both' }}
          >
            <div className="w-1.5 h-1.5 bg-rose-800 rounded-full"></div>
            <span
              className="text-xs text-zinc-600 uppercase tracking-[0.15em] font-medium"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}
            >
              {badge}
            </span>
          </div>

          <h1
            className="text-7xl md:text-8xl font-bold text-zinc-900 mb-6 leading-[1.1]"
            style={{
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.01em',
              animation: 'subtle-slide 0.8s ease-out 0.2s both'
            }}
          >
            {title}
          </h1>

          <div
            className="w-16 h-px bg-rose-800 mx-auto mb-8"
            style={{ animation: 'subtle-slide 0.8s ease-out 0.2s both' }}
          ></div>

          <p
            className="text-xl text-zinc-900 mb-12 max-w-2xl mx-auto font-semibold leading-relaxed"
            style={{
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.01em',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.8)',
              animation: 'subtle-slide 0.8s ease-out 0.3s both'
            }}
          >
            {subtitle}
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
              onClick={primaryCTA.onClick}
              className="px-10 py-4 bg-zinc-900 text-white font-medium text-sm uppercase tracking-[0.1em] hover:bg-rose-900 transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}
            >
              {primaryCTA.text}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={secondaryCTA.onClick}
              className="px-10 py-4 border-2 border-zinc-900 text-zinc-900 font-medium text-sm uppercase tracking-[0.1em] hover:border-rose-800 hover:text-rose-900 hover:bg-rose-50 transition-all duration-300 rounded-sm"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}
            >
              {secondaryCTA.text}
            </motion.button>
          </motion.div>

          {/* Refined stats */}
          <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
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
                  <div
                    className="text-5xl font-bold text-zinc-900 mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs text-zinc-500 uppercase tracking-wider"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}
                  >
                    {stat.label}
                  </div>
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-rose-800/20 to-transparent"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </section>
  )
}
