import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'Premium Golf Carts',
  description: 'Browse our complete range of premium electric golf carts. Standard, Premium and Ultimate packages available with customisable options.',
  keywords: ['golf carts NZ', 'electric golf carts', 'premium golf carts', 'golf cart packages'],
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
      <div className="min-h-screen bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-red-600">Error loading products. Please try again later.</p>
        </div>
      </div>
    )
  }

  return <ProductsClient products={products || []} />
}
