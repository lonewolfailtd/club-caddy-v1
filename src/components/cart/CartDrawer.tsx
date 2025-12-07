'use client'

import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Minus, Plus, X, ShoppingBag } from 'lucide-react'

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, closeCart } = useCart()

  const depositAmount = 1000 // Fixed $1,000 deposit

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent
        className="w-full sm:max-w-lg bg-white overflow-hidden flex flex-col p-0"
        side="right"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-luxury-platinum/30 bg-gradient-to-r from-luxury-pearl to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-luxury-gold/10">
                <ShoppingCart className="h-6 w-6 text-luxury-gold" />
              </div>
              <div>
                <SheetTitle className="text-2xl font-heading text-luxury-onyx">
                  Shopping Cart
                </SheetTitle>
                <SheetDescription className="text-sm text-luxury-onyx/60">
                  {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
                </SheetDescription>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* Cart Items - Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-luxury">
          <AnimatePresence mode="popLayout">
            {cart.items.length === 0 ? (
              <motion.div
                key="empty-cart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex h-full flex-col items-center justify-center text-center py-12"
              >
                <div className="p-6 rounded-full bg-luxury-pearl mb-6">
                  <ShoppingBag className="h-16 w-16 text-luxury-platinum" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-luxury-onyx mb-2">
                  Your cart is empty
                </h3>
                <p className="text-sm text-luxury-onyx/60 mb-6 max-w-xs">
                  Start adding some premium golf carts to your collection!
                </p>
                <Button
                  onClick={closeCart}
                  asChild
                  className="btn-luxury"
                >
                  <Link href="/products">
                    Browse Products
                  </Link>
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item, index) => {
                  const itemTotal = (item.basePrice + (item.selectedAddons?.reduce((sum, a) => sum + a.price, 0) || 0)) * item.quantity

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative"
                    >
                      <div className="glass rounded-xl p-4 border border-luxury-platinum/30 hover:border-luxury-gold/40 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <Link
                            href={`/products/${item.productSlug}`}
                            onClick={closeCart}
                            className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-luxury-pearl ring-1 ring-luxury-platinum/20 group-hover:ring-luxury-gold/50 transition-all duration-300"
                          >
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.productName}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ShoppingCart className="h-8 w-8 text-luxury-platinum" />
                              </div>
                            )}
                          </Link>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1">
                                <Link
                                  href={`/products/${item.productSlug}`}
                                  onClick={closeCart}
                                  className="font-heading font-semibold text-luxury-onyx hover:text-luxury-gold transition-colors line-clamp-1"
                                >
                                  {item.productName}
                                </Link>
                                {item.variantName && (
                                  <p className="text-xs text-luxury-onyx/60 mt-1">
                                    {item.variantName}
                                  </p>
                                )}
                                <div className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-luxury-gold/20 to-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wide">
                                  {item.productTier}
                                </div>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 rounded-lg text-luxury-onyx/40 hover:text-red-600 hover:bg-red-50 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                aria-label="Remove item"
                                title="Remove from cart"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Selected Add-ons */}
                            {item.selectedAddons && item.selectedAddons.length > 0 && (
                              <div className="mb-3 space-y-1.5 p-2 rounded-lg bg-luxury-pearl/50 border border-luxury-platinum/20">
                                <p className="text-xs font-semibold text-luxury-onyx/70 mb-1">Add-ons:</p>
                                {item.selectedAddons.map(addon => (
                                  <div key={addon.id} className="flex items-center justify-between gap-2">
                                    <p className="text-xs text-luxury-onyx/70 flex items-center gap-1.5">
                                      <span className="text-luxury-gold font-bold">+</span>
                                      <span>{addon.name}</span>
                                    </p>
                                    <span className="text-xs font-semibold text-luxury-gold">
                                      {formatPrice(addon.price)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Quantity Controls & Price */}
                            <div className="flex items-center justify-between gap-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2 bg-luxury-pearl rounded-lg p-1 border border-luxury-gold/20 shadow-sm">
                                <button
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="p-2 rounded-md hover:bg-luxury-gold/10 hover:text-luxury-gold transition-all duration-200 text-luxury-onyx disabled:opacity-40 disabled:cursor-not-allowed min-w-[40px] min-h-[40px] flex items-center justify-center"
                                  disabled={item.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-10 text-center text-sm font-bold text-luxury-onyx tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, Math.min(99, item.quantity + 1))}
                                  className="p-2 rounded-md hover:bg-luxury-gold/10 hover:text-luxury-gold transition-all duration-200 text-luxury-onyx disabled:opacity-40 disabled:cursor-not-allowed min-w-[40px] min-h-[40px] flex items-center justify-center"
                                  disabled={item.quantity >= 99}
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Item Total Price */}
                              <div className="text-right">
                                <p className="font-heading font-bold text-luxury-onyx text-lg">
                                  {formatPrice(itemTotal)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Checkout Section */}
        {cart.items.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="border-t border-luxury-platinum/30 bg-gradient-to-b from-white to-luxury-pearl px-6 py-6"
          >
            {/* Subtotal */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center text-base">
                <span className="text-luxury-onyx/80">Subtotal</span>
                <span className="font-heading font-bold text-luxury-onyx text-xl">
                  {formatPrice(cart.subtotal)}
                </span>
              </div>

              {/* Deposit Amount */}
              <div className="p-4 rounded-lg bg-luxury-gold/5 border border-luxury-gold/20">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-luxury-onyx mb-1">
                      Deposit Option Available
                    </p>
                    <p className="text-xs text-luxury-onyx/60">
                      Secure your order with a deposit, pay the balance later
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-heading font-bold text-luxury-gold">
                      {formatPrice(depositAmount)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-start gap-2 text-xs text-luxury-onyx/60">
                <svg
                  className="h-4 w-4 flex-shrink-0 mt-0.5 text-luxury-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <p>
                  Delivery in approximately 6 weeks across New Zealand
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Checkout Button */}
              <Button
                onClick={closeCart}
                asChild
                className="btn-luxury w-full h-12 text-base shadow-xl"
              >
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              {/* View Full Cart Link */}
              <Button
                onClick={closeCart}
                asChild
                variant="outline"
                className="w-full h-11 text-sm border-luxury-gold/30 hover:bg-luxury-gold/5 hover:border-luxury-gold"
              >
                <Link href="/cart">
                  View Full Cart
                </Link>
              </Button>

              {/* Continue Shopping */}
              <button
                onClick={closeCart}
                className="w-full text-center text-sm font-medium text-luxury-onyx/70 hover:text-luxury-gold transition-colors py-2"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  )
}
