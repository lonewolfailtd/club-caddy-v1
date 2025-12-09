import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
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
  language?: 'en' | 'zh'
}

// Bilingual translations
const translations = {
  en: {
    tiers: {
      standard: { name: 'Standard', edition: 'Essential' },
      premium: { name: 'Premium', edition: 'Refined' },
      ultimate: { name: 'Ultimate', edition: 'Prestige' }
    },
    featured: 'Featured',
    viewDetails: 'View Details',
    battery: 'Battery',
    range: 'Range',
    noProducts: 'No products found',
    adjustFilters: 'Try adjusting your filters to see more results',
    from: 'From'
  },
  zh: {
    tiers: {
      standard: { name: '标准版', edition: '基础版' },
      premium: { name: '高级版', edition: '精品版' },
      ultimate: { name: '旗舰版', edition: '尊贵版' }
    },
    featured: '精选',
    viewDetails: '查看详情',
    battery: '电池',
    range: '续航',
    noProducts: '未找到产品',
    adjustFilters: '请调整筛选条件以查看更多结果',
    from: '起价'
  }
}

// Product image mapping based on tier
const tierImageMapping = {
  standard: '/images/products/caddy-cart01.jpg',
  premium: '/images/products/caddy-cart13.jpg',
  ultimate: '/images/products/caddy-cart14.jpg'
}

export default function ProductGrid({ products, language = 'en' }: ProductGridProps) {
  const t = translations[language]

  if (products.length === 0) {
    return (
      <div className="col-span-full py-24 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100">
          <svg
            className="h-12 w-12 text-zinc-400"
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
        <h3 className="mt-6 text-2xl font-bold text-zinc-900 font-serif">{t.noProducts}</h3>
        <p className="mt-2 text-zinc-600">
          {t.adjustFilters}
        </p>
      </div>
    )
  }

  return (
    <>
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
      `}</style>
      {products.map((product, i) => {
        // Use tier-specific images or fallback to product images
        const primaryImage = tierImageMapping[product.tier] || product.images?.[0] || '/images/products/caddy-cart01.jpg'
        const tierInfo = t.tiers[product.tier]
        const isPremium = product.tier === 'premium'

        return (
          <motion.article
            key={product.id}
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
              isPremium ? 'bg-rose-800' : 'bg-zinc-300'
            } transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700`} />

            {/* Image Section */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-50 to-zinc-100 overflow-hidden">
              {/* Subtle hexagon pattern on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23450a0a' stroke-width='0.5'/%3E%3C/svg%3E")`,
                  backgroundSize: '50px 50px'
                }}
              />

              <Image
                src={primaryImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Featured Badge for Premium */}
              {isPremium && (
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
                {tierInfo.edition} Edition
              </div>

              <h3 className="refined-title text-2xl font-semibold text-zinc-900 mb-4">
                {product.name}
              </h3>

              <p className="refined-body text-sm text-zinc-600 mb-6 line-clamp-2">
                {product.short_description}
              </p>

              <div className="w-10 h-px bg-zinc-200 mb-6" />

              {/* Key Specs */}
              {(product.specifications?.battery || product.specifications?.range) && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {product.specifications?.battery && (
                    <div className="bg-zinc-50 p-3 rounded-sm">
                      <div className="refined-body text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                        {t.battery}
                      </div>
                      <div className="refined-body text-sm font-semibold text-zinc-900">
                        {product.specifications.battery}
                      </div>
                    </div>
                  )}
                  {product.specifications?.range && (
                    <div className="bg-zinc-50 p-3 rounded-sm">
                      <div className="refined-body text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                        {t.range}
                      </div>
                      <div className="refined-body text-sm font-semibold text-zinc-900">
                        {product.specifications.range}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="refined-body text-xs text-zinc-500 uppercase tracking-wider mb-2">
                  {t.from}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="refined-body text-4xl font-bold text-zinc-900">
                    {formatPrice(Number(product.base_price))}
                  </span>
                  <span className="refined-body text-xs text-zinc-400 uppercase tracking-wide">NZD</span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={`/products/${product.slug}`}
                  className={`block w-full py-3.5 text-center border-2 ${
                    isPremium
                      ? 'border-rose-800 text-rose-900 hover:bg-rose-800 hover:text-white'
                      : 'border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
                  } refined-body text-xs uppercase tracking-[0.1em] font-medium transition-all duration-300 rounded-sm`}
                >
                  {t.viewDetails}
                </Link>
              </motion.div>
            </div>
          </motion.article>
        )
      })}
    </>
  )
}
