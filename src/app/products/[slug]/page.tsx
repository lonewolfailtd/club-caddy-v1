import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import AddToCartButton from '@/components/products/AddToCartButton'
import ProductGallery from '@/components/products/ProductGallery'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('seo_title, seo_description, name')
    .eq('slug', slug)
    .single()

  return {
    title: (product as any)?.seo_title || (product as any)?.name || 'Product',
    description: (product as any)?.seo_description || '',
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !product) {
    notFound()
  }

  // Type assertion for product
  const typedProduct = product as any

  // Fetch add-ons
  const { data: addons } = await supabase
    .from('addons')
    .select('*')
    .eq('in_stock', true)
    .order('price', { ascending: true })

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${tierColors[typedProduct.tier as keyof typeof tierColors]}`}>
        <div className="absolute inset-0 bg-hexagon opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-white">
                {tierLabels[typedProduct.tier as keyof typeof tierLabels]} Package
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {typedProduct.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
              {typedProduct.short_description}
            </p>
            <div className="mt-8 text-5xl font-bold text-white">
              Starting from {formatPrice(Number(typedProduct.base_price))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Image Gallery */}
          {typedProduct.images && Array.isArray(typedProduct.images) && typedProduct.images.length > 0 && (
            <div className="mb-16">
              <ProductGallery images={typedProduct.images} productName={typedProduct.name} />
            </div>
          )}

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left Column - Description */}
            <div>
              <h2 className="text-3xl font-bold text-luxury-onyx">Overview</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {typedProduct.description}
              </p>

              {/* Features */}
              {typedProduct.features && Array.isArray(typedProduct.features) && typedProduct.features.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-luxury-onyx">Key Features</h3>
                  <div className="mt-6 space-y-4">
                    {typedProduct.features.map((feature: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-luxury-gold to-amber-600">
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-luxury-onyx">{feature.title}</h4>
                          <p className="mt-1 text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Specifications */}
            <div>
              <div className="glass-dark sticky top-8 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white">Technical Specifications</h3>

                {typedProduct.specifications && (
                  <div className="mt-8 space-y-4">
                    {Object.entries(typedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-white/10 pb-4">
                        <span className="font-medium capitalize text-luxury-platinum">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="font-semibold text-white">{value as string}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="mt-8 space-y-4">
                  <AddToCartButton product={typedProduct} />
                  <a href="#contact" className="glass block w-full rounded-lg px-8 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-white/20">
                    Request a Quote
                  </a>
                  <Link href="/products" className="glass block w-full rounded-lg px-8 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-white/20">
                    ← Back to All Products
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Add-ons Section */}
          {addons && addons.length > 0 && (
            <div className="mt-24">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-luxury-onyx sm:text-4xl">
                  Customise Your Cart
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                  Enhance your golf cart with premium add-ons and accessories.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {addons.map((addon: any) => (
                  <div key={addon.id} className="luxury-card p-6">
                    <h4 className="text-lg font-semibold text-luxury-onyx">{addon.name}</h4>
                    <p className="mt-2 text-sm text-gray-600">{addon.description}</p>
                    <div className="mt-4 text-2xl font-bold text-primary-600">
                      {formatPrice(Number(addon.price))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden bg-luxury-onyx">
        <div className="absolute inset-0 bg-hexagon opacity-10" />
        <div className="relative z-10 px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Order?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-luxury-platinum">
              Contact Warren today for viewings, quotes or to discuss your custom requirements.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a href="tel:+64021560307" className="btn-luxury w-full sm:w-auto">
                📞 +64-021-560-307
              </a>
              <a href="mailto:admin@clubcaddycarts.com" className="glass w-full rounded-lg px-8 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-white/20 sm:w-auto">
                ✉️ admin@clubcaddycarts.com
              </a>
            </div>
            <p className="mt-8 text-sm text-luxury-platinum">
              Secure your order with a $1,000 deposit • Delivery in approximately 6 weeks
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
