import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

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

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const tierGradients = {
    standard: 'from-blue-600 via-blue-500 to-cyan-500',
    premium: 'from-purple-600 via-purple-500 to-pink-500',
    ultimate: 'from-amber-500 via-luxury-gold to-yellow-500',
  }

  const tierLabels = {
    standard: 'Standard',
    premium: 'Premium',
    ultimate: 'Ultimate',
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full py-24 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-luxury-pearl">
          <svg
            className="h-12 w-12 text-luxury-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-bold text-luxury-onyx">No products found</h3>
        <p className="mt-2 text-gray-600">
          Try adjusting your filters to see more results
        </p>
      </div>
    )
  }

  return (
    <>
      {products.map((product) => {
        const primaryImage = product.images?.[0] || '/images/products/cart01.jpg'

        return (
          <article
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            {/* Image Section with Gradient Overlay */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  tierGradients[product.tier]
                } opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40`}
              />

              {/* Tier Badge */}
              <div className="absolute left-4 top-4">
                <div
                  className={`rounded-full bg-gradient-to-r ${
                    tierGradients[product.tier]
                  } px-4 py-2 shadow-lg`}
                >
                  <span className="text-sm font-bold uppercase tracking-wide text-white">
                    {tierLabels[product.tier]}
                  </span>
                </div>
              </div>

              {/* Premium Badge */}
              {product.tier === 'ultimate' && (
                <div className="absolute right-4 top-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-8">
              <h3 className="text-2xl font-bold text-luxury-onyx transition-colors group-hover:text-primary-600">
                {product.name}
              </h3>

              <p className="mt-4 text-gray-600 line-clamp-2">
                {product.short_description}
              </p>

              {/* Key Specs Grid */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {product.specifications?.battery && (
                  <div className="rounded-lg bg-luxury-pearl p-3">
                    <div className="text-xs text-gray-500">Battery</div>
                    <div className="mt-1 text-sm font-semibold text-luxury-onyx">
                      {product.specifications.battery}
                    </div>
                  </div>
                )}
                {product.specifications?.range && (
                  <div className="rounded-lg bg-luxury-pearl p-3">
                    <div className="text-xs text-gray-500">Range</div>
                    <div className="mt-1 text-sm font-semibold text-luxury-onyx">
                      {product.specifications.range}
                    </div>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mt-auto pt-6">
                <div className="text-sm text-gray-500">Starting from</div>
                <div className="mt-1 text-4xl font-bold text-luxury-onyx">
                  {formatPrice(Number(product.base_price))}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={`/products/${product.slug}`}
                className="btn-luxury mt-6 block text-center transition-all duration-300"
              >
                Explore Details →
              </Link>
            </div>

            {/* Bottom Accent Line */}
            <div
              className={`h-2 bg-gradient-to-r ${tierGradients[product.tier]}`}
            />
          </article>
        )
      })}
    </>
  )
}
