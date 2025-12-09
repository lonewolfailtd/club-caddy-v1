'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import ProductFilters, { FilterState } from '@/components/products/ProductFilters'
import ProductGrid from '@/components/products/ProductGrid'

interface Product {
  id: string
  slug: string
  name: string
  short_description: string | null
  tier: 'standard' | 'premium' | 'ultimate'
  base_price: number
  images: any
  specifications: any
}

interface ProductsClientProps {
  products: Product[]
}

// Bilingual translations
const translations = {
  en: {
    badge: 'Premium Golf Carts',
    title: 'Our Collection',
    subtitle: 'Where sophisticated simplicity meets precision engineering. Three tiers of refined excellence.',
    productsAvailable: 'Products Available',
    product: 'Product',
    tiers: {
      standard: 'Standard',
      premium: 'Premium',
      ultimate: 'Ultimate'
    }
  },
  zh: {
    badge: '高级高尔夫球车',
    title: '产品系列',
    subtitle: '精致简约与精密工程的完美结合。三个级别的卓越品质。',
    productsAvailable: '款产品可选',
    product: '款产品',
    tiers: {
      standard: '标准版',
      premium: '高级版',
      ultimate: '旗舰版'
    }
  }
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const { language } = useLanguage()
  const t = translations[language]

  // Calculate min and max prices
  const minPrice = useMemo(() => {
    if (products.length === 0) return 0
    return Math.min(...products.map((p) => Number(p.base_price)))
  }, [products])

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 100000
    return Math.max(...products.map((p) => Number(p.base_price)))
  }, [products])

  const [filters, setFilters] = useState<FilterState>({
    tier: 'all',
    priceRange: { min: minPrice, max: maxPrice },
    sort: 'price-asc',
  })

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by tier
    if (filters.tier !== 'all') {
      filtered = filtered.filter((product) => product.tier === filters.tier)
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        Number(product.base_price) >= filters.priceRange.min &&
        Number(product.base_price) <= filters.priceRange.max
    )

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc':
          return Number(a.base_price) - Number(b.base_price)
        case 'price-desc':
          return Number(b.base_price) - Number(a.base_price)
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return filtered
  }, [products, filters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
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
        .breathing-hex {
          animation: breathe 5s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-50 pt-24 pb-16">
        {/* Hexagon pattern overlay */}
        <div
          className="absolute inset-0 breathing-hex pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23450a0a' stroke-width='1.2'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Elegant top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-800/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Refined badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-zinc-200 rounded-full bg-white/80 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-rose-800 rounded-full" />
              <span className="refined-body text-xs text-zinc-600 uppercase tracking-[0.15em] font-medium">
                {t.badge}
              </span>
            </div>

            <h1 className="refined-title text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 mb-6 leading-tight">
              {t.title}
            </h1>

            <div className="w-16 h-px bg-rose-800 mx-auto mb-6" />

            <p className="refined-body text-xl text-zinc-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-200 rounded-full bg-white shadow-sm"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-800">
                <span className="refined-body text-sm font-bold text-white">
                  {filteredAndSortedProducts.length}
                </span>
              </div>
              <span className="refined-body text-sm text-zinc-900 font-medium">
                {filteredAndSortedProducts.length === 1 ? t.product : t.productsAvailable}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid with Filters */}
      <section className="py-20 bg-white">
        {/* Very subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000000' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters
                onFilterChange={setFilters}
                minPrice={minPrice}
                maxPrice={maxPrice}
                language={language}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                <ProductGrid products={filteredAndSortedProducts} language={language} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
