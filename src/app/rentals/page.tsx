'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function RentalsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'golf_cart')
        .eq('rental_enabled', true)
        .order('base_price', { ascending: true })

      if (error) {
        console.error('Error fetching rental products:', error)
      }

      setProducts(data || [])
      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-zinc-900">Loading...</div>
      </div>
    )
  }

  const rentalProducts = products

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');
        .refined-title { font-family: 'Playfair Display', serif; }
        .refined-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-50 pt-24 pb-16">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23450a0a' stroke-width='1.2'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-800/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-zinc-200 bg-white/80 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-rose-800 rounded-full" />
              <span className="refined-body text-xs text-zinc-600 uppercase tracking-[0.15em] font-medium">
                Available for Rental
              </span>
            </div>

            <h1 className="refined-title text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 mb-6 leading-tight">
              Golf Cart Rentals
            </h1>

            <div className="w-16 h-px bg-rose-800 mx-auto mb-6" />

            <p className="refined-body text-xl text-zinc-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Premium electric golf carts available for hourly, daily, and weekly rental. Perfect for events, tournaments, and short-term use.
            </p>

            <div className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-200 bg-white shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-800">
                <span className="refined-body text-sm font-bold text-white">
                  {rentalProducts.length}
                </span>
              </div>
              <span className="refined-body text-sm text-zinc-900 font-medium">
                Carts Available for Rental
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rentalProducts.map((product: any) => {
              const primaryImage = `/images/products/caddy-cart${product.tier === 'premium' ? '13' : product.tier === 'ultimate' ? '14' : '01'}.jpg`

              return (
                <article
                  key={product.id}
                  className="group relative bg-white border-2 border-zinc-200 hover:border-rose-800 transition-all duration-500 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-50 to-zinc-100 overflow-hidden">
                    <Image
                      src={primaryImage}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Rental Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="refined-body px-3 py-1.5 bg-rose-800 text-white text-[10px] font-semibold uppercase tracking-widest shadow-lg">
                        For Rental
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="refined-body text-[10px] text-zinc-400 uppercase tracking-[0.15em] mb-3 font-medium">
                      {product.tier} Edition
                    </div>

                    <h3 className="refined-title text-2xl font-semibold text-zinc-900 mb-4">
                      {product.name}
                    </h3>

                    <p className="refined-body text-sm text-zinc-600 mb-6 line-clamp-2 font-light">
                      {product.short_description}
                    </p>

                    <div className="w-10 h-px bg-zinc-200 mb-6" />

                    {/* Rental Pricing Preview */}
                    <div className="mb-6">
                      <div className="refined-body text-xs text-zinc-500 uppercase tracking-wider mb-2">
                        Starting from
                      </div>
                      <div className="refined-body text-2xl font-bold text-zinc-900">
                        $50/hr
                      </div>
                      <div className="refined-body text-xs text-zinc-400 mt-1">
                        Hourly, daily & weekly rates available
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/rentals/${product.slug}`}
                      className="block w-full py-3.5 text-center border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white refined-body text-xs uppercase tracking-[0.1em] font-medium transition-all duration-300"
                    >
                      View Rental Details
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          {rentalProducts.length === 0 && (
            <div className="text-center py-24">
              <div className="refined-title text-2xl font-bold text-zinc-900 mb-4">
                No rental carts available
              </div>
              <p className="refined-body text-zinc-600 font-light">
                Please check back later or contact us for availability.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
