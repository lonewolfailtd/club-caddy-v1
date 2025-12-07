'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Cart, CartItem, CartAddon } from '@/types/cart.types'

interface CartContextType {
  cart: Cart
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  addAddonToItem: (itemId: string, addon: CartAddon) => void
  removeAddonFromItem: (itemId: string, addonId: string) => void
  clearCart: () => void
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'club-caddy-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    subtotal: 0,
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  // Recalculate totals whenever cart items change
  useEffect(() => {
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cart.items.reduce((sum, item) => {
      const addonsTotal = item.selectedAddons?.reduce((addonSum, addon) => addonSum + addon.price, 0) || 0
      return sum + (item.basePrice + addonsTotal) * item.quantity
    }, 0)

    const depositAmount = subtotal > 0 ? 1000 : 0 // $1,000 deposit

    setCart(prev => ({
      ...prev,
      totalItems,
      subtotal,
      depositAmount,
    }))
  }, [cart.items])

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    setCart(prev => {
      // Check if item already exists
      const existingItemIndex = prev.items.findIndex(
        i => i.productId === item.productId && i.variantId === item.variantId
      )

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prev.items]
        updatedItems[existingItemIndex].quantity += 1
        return { ...prev, items: updatedItems }
      } else {
        // Add new item
        const newItem: CartItem = {
          ...item,
          id: `${item.productId}-${Date.now()}`,
          quantity: 1,
        }
        return { ...prev, items: [...prev.items, newItem] }
      }
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId),
    }))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }))
  }

  const addAddonToItem = (itemId: string, addon: CartAddon) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? {
              ...item,
              selectedAddons: [...(item.selectedAddons || []), addon],
            }
          : item
      ),
    }))
  }

  const removeAddonFromItem = (itemId: string, addonId: string) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId
          ? {
              ...item,
              selectedAddons: item.selectedAddons?.filter(a => a.id !== addonId),
            }
          : item
      ),
    }))
  }

  const clearCart = () => {
    setCart({
      items: [],
      totalItems: 0,
      subtotal: 0,
    })
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        addAddonToItem,
        removeAddonFromItem,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
