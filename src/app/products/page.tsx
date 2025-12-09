import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'Electric Golf Carts for Sale & Hire Auckland | 72V Lithium Range | Club Caddy',
  description: 'Browse our premium 72V lithium electric golf cart range. Superior performance, extended range, faster charging. Sales & hire available across Auckland & New Zealand. View specs & pricing.',
  keywords: [
    '72V electric golf cart',
    'golf cart for sale Auckland',
    'golf buggy hire Auckland',
    'lithium battery golf cart NZ',
    'premium golf carts Auckland',
    'electric golf buggy range',
    'golf cart specifications',
    'golf cart rental Auckland'
  ],
  openGraph: {
    title: 'Premium Electric Golf Carts Auckland | 72V Lithium Range',
    description: 'Browse our 72V lithium electric golf cart range. Superior performance, sales & hire across Auckland NZ.',
    url: 'https://clubcaddycarts.com/products',
    type: 'website'
  }
}

export default async function ProductsPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'golf_cart')
    .order('base_price', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-red-50 mb-4">
              <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-zinc-900 mb-2">Error Loading Products</h3>
            <p className="text-zinc-600">We encountered an issue loading the products. Please try again later.</p>
            <p className="text-sm text-zinc-500 mt-2">加载产品时出错。请稍后再试。</p>
          </div>
        </div>
      </div>
    )
  }

  return <ProductsClient products={products || []} />
}
