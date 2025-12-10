'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export interface GalleryItem {
  image: string
  label: string
}

export interface GalleryShowcaseProps {
  items: GalleryItem[]
}

export default function GalleryShowcase({ items }: GalleryShowcaseProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.45, 0.27, 0.9] as any
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid md:grid-cols-2 gap-8"
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className="group relative aspect-[3/2] overflow-hidden rounded-sm"
        >
          <Image
            src={item.image}
            alt={item.label}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p
              className="text-2xl font-semibold"
              style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}
            >
              {item.label}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
