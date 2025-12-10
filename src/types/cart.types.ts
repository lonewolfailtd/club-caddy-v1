export interface CartItem {
  id: string
  productId: string
  productSlug: string
  productName: string
  name: string // Alias for productName
  productTier: 'standard' | 'premium' | 'ultimate'
  tier: 'standard' | 'premium' | 'ultimate' // Alias for productTier
  basePrice: number
  price: number // Alias for basePrice
  quantity: number
  selectedAddons?: CartAddon[]
  addons?: CartAddon[] // Alias for selectedAddons
  variantId?: string
  variantName?: string
  imageUrl?: string
  image?: string // Alias for imageUrl
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
