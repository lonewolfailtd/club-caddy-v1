'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: string
  slug: string
  name: string
  tier: 'standard' | 'premium' | 'ultimate'
  base_price: number
  short_description: string
  images?: string[]
}

interface RelatedProductsProps {
  products: Product[]
  currentProductId: string
}

export default function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  const relatedProducts = products.filter(p => p.id !== currentProductId).slice(0, 3)

  if (relatedProducts.length === 0) {
    return null
  }

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

  return (
    <div className="bg-luxury-pearl py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-luxury-onyx sm:text-4xl">
            Other Packages
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our complete range of electric golf carts
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map(product => {
            const primaryImage = product.images?.[0] || '/images/products/cart01.jpg'

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Tier Badge */}
                  <div className="absolute left-4 top-4">
                    <div className={`rounded-full bg-gradient-to-r ${tierColors[product.tier]} px-4 py-2 shadow-lg`}>
                      <span className="text-xs font-bold uppercase tracking-wide text-white">
                        {tierLabels[product.tier]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-luxury-onyx group-hover:text-primary-600">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {product.short_description}
                  </p>

                  <div className="mt-auto pt-4">
                    <div className="text-xs text-gray-500">Starting from</div>
                    <div className="mt-1 text-2xl font-bold text-luxury-onyx">
                      {formatPrice(Number(product.base_price))}
                    </div>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className={`h-1 bg-gradient-to-r ${tierColors[product.tier]}`} />
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-luxury-onyx px-8 py-3 font-semibold text-white transition-all hover:bg-luxury-onyx/90"
          >
            View All Packages →
          </Link>
        </div>
      </div>
    </div>
  )
}
