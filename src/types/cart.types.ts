export interface CartItem {
  id: string
  productId: string
  productSlug: string
  productName: string
  productTier: 'standard' | 'premium' | 'ultimate'
  basePrice: number
  quantity: number
  selectedAddons?: CartAddon[]
  variantId?: string
  variantName?: string
  imageUrl?: string
}

export interface CartAddon {
  id: string
  name: string
  price: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  subtotal: number
  depositAmount?: number
}
