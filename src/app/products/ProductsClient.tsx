'use client'

import { useState, useMemo } from 'react'
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

export default function ProductsClient({ products }: ProductsClientProps) {
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
    <div className="min-h-screen bg-gradient-to-b from-luxury-pearl to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-luxury-onyx via-primary-900 to-luxury-onyx pt-24 pb-16">
        <div className="absolute inset-0 bg-hexagon opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              <span className="block">Premium Golf Carts</span>
              <span className="mt-2 block text-gradient-luxury">Built for New Zealand</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-luxury-platinum">
              From standard to ultra-luxury. Choose the perfect electric golf cart for your needs.
            </p>

            {/* Results Count */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-luxury-gold">
                <span className="text-sm font-bold text-white">
                  {filteredAndSortedProducts.length}
                </span>
              </div>
              <span className="text-sm text-white">
                {filteredAndSortedProducts.length === 1 ? 'Product' : 'Products'} Available
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent" />
      </section>

      {/* Products Grid with Filters */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters
                onFilterChange={setFilters}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                <ProductGrid products={filteredAndSortedProducts} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
