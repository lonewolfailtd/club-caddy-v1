'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export interface RefinedProductCardProps {
  name: string
  tier: string
  price: number
  image: string
  featured?: boolean
  onViewDetails?: () => void
}

export default function RefinedProductCard({
  name,
  tier,
  price,
  image,
  featured = false,
  onViewDetails
}: RefinedProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.21, 0.45, 0.27, 0.9]
      }}
      className="group relative bg-white border border-zinc-200 hover:border-zinc-400 transition-all duration-500 overflow-hidden"
    >
      {/* Top accent line animation */}
      <div className={`absolute top-0 left-0 w-full h-px ${
        featured ? 'bg-rose-800' : 'bg-zinc-300'
      } transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700`}></div>

      {/* Image with hover scale effect */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-50 to-zinc-100 overflow-hidden">
        {/* Hexagon pattern on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23450a0a' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }}
        ></div>

        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <div className="px-3 py-1.5 bg-rose-800 text-white text-[10px] font-semibold uppercase tracking-widest shadow-lg" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
              Featured
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Tier label */}
        <div className="text-[10px] text-zinc-400 uppercase tracking-[0.15em] mb-3 font-medium" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
          {tier} Edition
        </div>

        {/* Product name */}
        <h3 className="text-2xl font-semibold text-zinc-900 mb-6" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}>
          {name}
        </h3>

        <div className="w-10 h-px bg-zinc-200 mb-8"></div>

        {/* Price display */}
        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-4xl font-bold text-zinc-900" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
            ${price.toLocaleString()}
          </span>
          <span className="text-xs text-zinc-400 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
            NZD
          </span>
        </div>

        {/* CTA button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewDetails}
          className={`w-full py-3.5 border-2 ${
            featured
              ? 'border-rose-800 text-rose-900 hover:bg-rose-800 hover:text-white'
              : 'border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
          } text-xs uppercase tracking-[0.1em] font-medium transition-all duration-300 rounded-sm`}
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
}
