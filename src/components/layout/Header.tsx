'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingCart, User, LogOut, UserCircle, Settings } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cart, openCart } = useCart()
  const { user, loading, signOut } = useAuth()
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Hire', href: '/hire' },
    { name: 'Contact', href: '/contact' },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-luxury-onyx/95 backdrop-blur-lg border-b border-luxury-gold/20 shadow-lg shadow-luxury-gold/5'
          : 'bg-luxury-onyx/80 backdrop-blur-md border-b border-luxury-gold/10'
      )}
    >
      {/* Subtle hexagonal pattern overlay */}
      <div className="absolute inset-0 bg-hexagon opacity-5 pointer-events-none" />

      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group -m-1.5 p-1.5 flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-luxury-gold/20 blur-xl group-hover:bg-luxury-gold/30 transition-all duration-300" />
                <img
                  src="/images/logo.png"
                  alt="Club Caddy Carts"
                  className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-2xl font-bold text-gradient-luxury tracking-tight">
                Club Caddy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'relative text-sm font-semibold leading-6 transition-all duration-300 group',
                    isActive
                      ? 'text-luxury-gold'
                      : 'text-luxury-platinum hover:text-luxury-gold'
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-luxury-gold to-luxury-gold-dark transition-all duration-300',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              )
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative group rounded-lg p-2.5 text-luxury-platinum hover:text-luxury-gold transition-all duration-300 hover:bg-luxury-gold/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-dark text-xs font-bold text-white shadow-lg shadow-luxury-gold/30 animate-pulse">
                  {cart.totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-luxury-platinum/20 animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative group rounded-full p-2.5 text-luxury-platinum hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300"
                  >
                    <UserCircle className="h-5 w-5" />
                    <span className="absolute inset-0 rounded-full ring-2 ring-luxury-gold/0 group-hover:ring-luxury-gold/50 transition-all duration-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-luxury-onyx/95 backdrop-blur-lg border-luxury-gold/20 text-luxury-platinum"
                >
                  <DropdownMenuLabel className="text-luxury-gold">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-luxury-gold/20" />
                  <DropdownMenuItem asChild className="hover:bg-luxury-gold/10 hover:text-luxury-gold cursor-pointer">
                    <Link href="/account" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-luxury-gold/10 hover:text-luxury-gold cursor-pointer">
                    <Link href="/account/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-luxury-gold/20" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="hover:bg-luxury-gold/10 hover:text-luxury-gold cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-x-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-luxury-platinum hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-white hover:shadow-lg hover:shadow-luxury-gold/30 transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden gap-x-2">
            {/* Mobile Cart Button */}
            <button
              onClick={openCart}
              className="relative rounded-lg p-2.5 text-luxury-platinum hover:text-luxury-gold transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-dark text-xs font-bold text-white shadow-lg shadow-luxury-gold/30">
                  {cart.totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="rounded-lg p-2.5 text-luxury-platinum hover:bg-luxury-gold/10 hover:text-luxury-gold transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileMenuOpen
              ? 'max-h-screen opacity-100 pb-6'
              : 'max-h-0 opacity-0'
          )}
        >
          <div className="space-y-1 pt-4 border-t border-luxury-gold/10">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-300',
                    isActive
                      ? 'bg-luxury-gold/20 text-luxury-gold'
                      : 'text-luxury-platinum hover:bg-luxury-gold/10 hover:text-luxury-gold'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}

            {/* Mobile User Menu */}
            <div className="pt-4 space-y-2 border-t border-luxury-gold/10 mt-4">
              {loading ? (
                <div className="px-4 py-3">
                  <div className="h-10 rounded-lg bg-luxury-platinum/20 animate-pulse" />
                </div>
              ) : user ? (
                <>
                  <Link
                    href="/account"
                    className="flex items-center rounded-lg px-4 py-3 text-base font-semibold text-luxury-platinum hover:bg-luxury-gold/10 hover:text-luxury-gold transition-all duration-300"
                  >
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href="/account/settings"
                    className="flex items-center rounded-lg px-4 py-3 text-base font-semibold text-luxury-platinum hover:bg-luxury-gold/10 hover:text-luxury-gold transition-all duration-300"
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center rounded-lg px-4 py-3 text-base font-semibold text-luxury-platinum hover:bg-luxury-gold/10 hover:text-luxury-gold transition-all duration-300"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-luxury-platinum hover:bg-luxury-gold/10 hover:text-luxury-gold transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block rounded-lg px-4 py-3 text-center text-base font-semibold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-white shadow-lg shadow-luxury-gold/20"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
