'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'

interface AddToCartButtonProps {
  product: {
    id: string
    slug: string
    name: string
    tier: 'standard' | 'premium' | 'ultimate'
    base_price: number
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      productTier: product.tier,
      basePrice: Number(product.base_price),
    })

    // Reset button state after animation
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="w-full px-8 py-4 bg-rose-800 text-white font-medium text-sm uppercase tracking-wider hover:bg-rose-900 transition-all rounded-sm shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isAdding ? (
        <span className="flex items-center justify-center">
          <svg className="h-5 w-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Adding...
        </span>
      ) : (
        'Add to Cart'
      )}
    </button>
  )
}
