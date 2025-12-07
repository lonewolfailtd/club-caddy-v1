'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      updateQuantity(itemId, newQuantity)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center px-4 py-16">
        <Card className="max-w-md w-full p-12 text-center bg-white/80 backdrop-blur-sm border-luxury-gold/20">
          <div className="mx-auto w-20 h-20 rounded-full bg-luxury-gold/10 flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-luxury-gold" />
          </div>
          <h1 className="text-3xl font-bold text-luxury-onyx mb-4 font-heading">
            Your Cart is Empty
          </h1>
          <p className="text-luxury-onyx/60 mb-8">
            Start adding some premium golf carts to your collection!
          </p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-white hover:shadow-lg hover:shadow-luxury-gold/30 transition-all duration-300">
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-20rem)] bg-gradient-to-b from-luxury-pearl to-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-luxury-onyx mb-2 font-heading">
            Shopping <span className="text-gradient-luxury">Cart</span>
          </h1>
          <p className="text-luxury-onyx/60">
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card
                key={item.id}
                className="p-6 bg-white/80 backdrop-blur-sm border-luxury-gold/20 hover:border-luxury-gold/40 transition-all duration-300"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-luxury-pearl">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-luxury-gold/30">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-luxury-onyx font-heading">
                          {item.name}
                        </h3>
                        {item.tier && (
                          <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full bg-luxury-gold/10 text-luxury-gold uppercase tracking-wide">
                            {item.tier}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-luxury-onyx/40 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Add-ons */}
                    {item.addons && item.addons.length > 0 && (
                      <div className="mt-3 mb-4">
                        <p className="text-sm font-semibold text-luxury-onyx/60 mb-2">
                          Included Add-ons:
                        </p>
                        <ul className="space-y-1">
                          {item.addons.map((addon, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-luxury-onyx/60 flex items-center"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mr-2" />
                              {addon.name} - {formatPrice(addon.price)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-luxury-onyx/60 font-semibold">
                          Qty:
                        </span>
                        <div className="flex items-center border border-luxury-gold/30 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-luxury-gold/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 text-luxury-gold" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-16 text-center border-x border-luxury-gold/30 py-2 text-sm font-semibold text-luxury-onyx focus:outline-none focus:bg-luxury-gold/5"
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= 99}
                            className="p-2 hover:bg-luxury-gold/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4 text-luxury-gold" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-luxury-gold font-heading">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-luxury-onyx/60">
                            {formatPrice(item.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-luxury-gold/20 sticky top-24">
              <h2 className="text-2xl font-bold text-luxury-onyx mb-6 font-heading">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-luxury-onyx/80">
                  <span>Subtotal ({cart.totalItems} items)</span>
                  <span className="font-semibold">
                    {formatPrice(cart.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-luxury-onyx/80">
                  <span>Shipping</span>
                  <span className="text-sm text-luxury-onyx/60">
                    Contact for quote
                  </span>
                </div>
                <div className="pt-4 border-t border-luxury-gold/20">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-luxury-onyx">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-gradient-luxury font-heading">
                      {formatPrice(cart.subtotal)}
                    </span>
                  </div>
                  <p className="text-xs text-luxury-onyx/60 mt-2">
                    GST included where applicable
                  </p>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-white hover:shadow-lg hover:shadow-luxury-gold/30 transition-all duration-300 py-6 text-lg font-semibold">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/products">
                <Button
                  variant="ghost"
                  className="w-full mt-3 text-luxury-onyx hover:text-luxury-gold hover:bg-luxury-gold/10"
                >
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-luxury-gold/20 space-y-3">
                <div className="flex items-center gap-3 text-sm text-luxury-onyx/60">
                  <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-luxury-gold">✓</span>
                  </div>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-luxury-onyx/60">
                  <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-luxury-gold">✓</span>
                  </div>
                  <span>NZ-wide delivery</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-luxury-onyx/60">
                  <div className="w-8 h-8 rounded-full bg-luxury-gold/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-luxury-gold">✓</span>
                  </div>
                  <span>Premium quality guaranteed</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
