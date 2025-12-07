'use client'

import { formatPrice } from '@/lib/utils'

interface Product {
  id: string
  name: string
  tier: 'standard' | 'premium' | 'ultimate'
  base_price: number
  short_description: string
  specifications?: {
    battery?: string
    range?: string
    seating?: string
    top_speed?: string
    brakes?: string
    display?: string
  }
  features?: Array<{
    title: string
    description: string
  }>
}

interface ProductComparisonProps {
  products: Product[]
}

export default function ProductComparison({ products }: ProductComparisonProps) {
  const tierColors = {
    standard: 'from-blue-500 to-blue-600',
    premium: 'from-purple-500 to-purple-600',
    ultimate: 'from-luxury-gold to-amber-600',
  }

  const tierLabels = {
    standard: 'Standard',
    premium: 'Premium',
    ultimate: 'Ultimate',
  }

  // Sort products by tier
  const sortedProducts = [...products].sort((a, b) => {
    const tierOrder = { standard: 1, premium: 2, ultimate: 3 }
    return tierOrder[a.tier] - tierOrder[b.tier]
  })

  // Get all unique specification keys
  const allSpecKeys = new Set<string>()
  sortedProducts.forEach(product => {
    if (product.specifications) {
      Object.keys(product.specifications).forEach(key => allSpecKeys.add(key))
    }
  })

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white p-4 text-left">
              <span className="text-lg font-bold text-luxury-onyx">Compare Packages</span>
            </th>
            {sortedProducts.map(product => (
              <th key={product.id} className="min-w-[250px] p-4">
                <div className={`rounded-xl bg-gradient-to-br ${tierColors[product.tier]} p-6 text-center`}>
                  <div className="text-sm font-semibold uppercase tracking-wide text-white/80">
                    {tierLabels[product.tier]}
                  </div>
                  <div className="mt-2 text-xl font-bold text-white">
                    {product.name}
                  </div>
                  <div className="mt-4 text-3xl font-bold text-white">
                    {formatPrice(Number(product.base_price))}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {/* Description Row */}
          <tr className="bg-white">
            <td className="sticky left-0 z-10 bg-white p-4 font-semibold text-luxury-onyx">
              Description
            </td>
            {sortedProducts.map(product => (
              <td key={product.id} className="p-4 text-sm text-gray-600">
                {product.short_description}
              </td>
            ))}
          </tr>

          {/* Specifications */}
          {Array.from(allSpecKeys).map(specKey => (
            <tr key={specKey} className="bg-white hover:bg-luxury-pearl/50">
              <td className="sticky left-0 z-10 bg-white p-4 font-semibold capitalize text-luxury-onyx hover:bg-luxury-pearl/50">
                {specKey.replace(/_/g, ' ')}
              </td>
              {sortedProducts.map(product => (
                <td key={product.id} className="p-4 text-center">
                  <span className="font-medium text-gray-900">
                    {product.specifications?.[specKey as keyof typeof product.specifications] || '—'}
                  </span>
                </td>
              ))}
            </tr>
          ))}

          {/* Features Count */}
          <tr className="bg-white hover:bg-luxury-pearl/50">
            <td className="sticky left-0 z-10 bg-white p-4 font-semibold text-luxury-onyx hover:bg-luxury-pearl/50">
              Premium Features
            </td>
            {sortedProducts.map(product => (
              <td key={product.id} className="p-4 text-center">
                <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-800">
                  {product.features?.length || 0} included
                </span>
              </td>
            ))}
          </tr>

          {/* Action Row */}
          <tr className="bg-luxury-pearl">
            <td className="sticky left-0 z-10 bg-luxury-pearl p-4"></td>
            {sortedProducts.map(product => (
              <td key={product.id} className="p-4">
                <a
                  href={`/products/${product.id}`}
                  className="block w-full rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-center font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                >
                  View Details →
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
