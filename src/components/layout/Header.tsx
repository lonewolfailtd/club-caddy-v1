'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingCart, User, LogOut, UserCircle, Settings, Languages } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { commonTranslations } from '@/lib/translations'
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
  const { user, loading, signOut, isAdmin } = useAuth()
  const { language, toggleLanguage } = useLanguage()
  const t = commonTranslations[language]
  const pathname = usePathname()

  const navigation = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.products, href: '/products' },
    { name: t.nav.hire, href: '/hire' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
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
          ? 'bg-white/95 backdrop-blur-lg border-b border-zinc-200 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-b border-zinc-100'
      )}
    >
      {/* Subtle hexagonal pattern overlay */}
      <div className="absolute inset-0 hexagon-pattern-minimal opacity-[0.02] pointer-events-none" />

      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group -m-1.5 p-1.5 flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/images/logo.png"
                  alt="Club Caddy Carts"
                  className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="refined-title text-2xl font-bold text-zinc-900 tracking-tight">
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
                    'relative refined-body text-sm font-semibold leading-6 transition-all duration-300 group',
                    isActive
                      ? 'text-rose-800'
                      : 'text-zinc-600 hover:text-rose-800'
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-0.5 bg-rose-800 transition-all duration-300',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              )
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:ml-24">
            <div className="flex gap-x-3 items-center">
              {/* Request Quote Button */}
              <Link href="/quote">
                <Button className="refined-body bg-rose-800 hover:bg-rose-900 shadow-sm hover:shadow-md transition-all duration-300 !text-white text-xs uppercase tracking-wider">
                  {language === 'en' ? 'Request Quote' : '申请报价'}
                </Button>
              </Link>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative group rounded-lg p-2.5 text-zinc-600 hover:text-rose-800 transition-all duration-300 hover:bg-rose-50"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-800 text-xs font-bold text-white shadow-lg shadow-rose-800/30 animate-pulse">
                    {cart.totalItems}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-zinc-200 animate-pulse" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative group rounded-full p-2.5 text-zinc-600 hover:text-rose-800 hover:bg-rose-50 transition-all duration-300"
                    >
                      <UserCircle className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-white border-zinc-200 text-zinc-900"
                  >
                    <DropdownMenuLabel className="text-rose-800 refined-body">
                      {t.nav.myAccount}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-200" />
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild className="hover:bg-rose-50 hover:text-rose-800 cursor-pointer refined-body">
                          <Link href="/admin" className="flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Admin Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-200" />
                      </>
                    )}
                    <DropdownMenuItem asChild className="hover:bg-rose-50 hover:text-rose-800 cursor-pointer refined-body">
                      <Link href="/account" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t.nav.profile}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="hover:bg-rose-50 hover:text-rose-800 cursor-pointer refined-body">
                      <Link href="/account/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t.nav.settings}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-200" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="hover:bg-rose-50 hover:text-rose-800 cursor-pointer refined-body"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t.nav.logout}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="refined-body text-zinc-600 hover:text-rose-800 hover:bg-rose-50 transition-all duration-300"
                  >
                    {t.nav.login}
                  </Button>
                </Link>
              )}
            </div>

            {/* Language Toggle - Absolute Far Right */}
            <div className="ml-12 pl-12 border-l border-zinc-200">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border-2 border-zinc-300 text-zinc-700 hover:border-rose-800 hover:text-rose-800 hover:bg-rose-50 transition-all duration-300 hover:scale-105 active:scale-95"
                title={language === 'en' ? 'Switch to Chinese' : '切换到英语'}
              >
                <Languages className="h-3.5 w-3.5" />
                <span className="refined-body text-xs font-semibold">
                  {language === 'en' ? '中文' : 'EN'}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden gap-x-2">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-zinc-600 hover:text-rose-800 transition-colors"
              title={language === 'en' ? 'Switch to Chinese' : '切换到英语'}
            >
              <Languages className="h-4 w-4" />
              <span className="refined-body text-xs font-medium">
                {language === 'en' ? '中' : 'EN'}
              </span>
            </button>

            {/* Mobile Cart Button */}
            <button
              onClick={openCart}
              className="relative rounded-lg p-2.5 text-zinc-600 hover:text-rose-800 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-800 text-xs font-bold text-white shadow-lg shadow-rose-800/30">
                  {cart.totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="rounded-lg p-2.5 text-zinc-600 hover:bg-rose-50 hover:text-rose-800 transition-all duration-300"
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
          <div className="space-y-1 pt-4 border-t border-zinc-200">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-300 refined-body',
                    isActive
                      ? 'bg-rose-50 text-rose-800'
                      : 'text-zinc-600 hover:bg-rose-50 hover:text-rose-800'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}

            {/* Mobile Request Quote Button */}
            <div className="pt-4 mt-4 border-t border-zinc-200">
              <Link
                href="/quote"
                className="block rounded-lg px-4 py-3 text-center text-base font-semibold refined-body bg-rose-800 text-white hover:bg-rose-900 shadow-sm"
              >
                {language === 'en' ? 'Request Quote' : '申请报价'}
              </Link>
            </div>

            {/* Mobile User Menu */}
            <div className="pt-4 space-y-2 border-t border-zinc-200 mt-4">
              {loading ? (
                <div className="px-4 py-3">
                  <div className="h-10 rounded-lg bg-zinc-200 animate-pulse" />
                </div>
              ) : user ? (
                <>
                  <Link
                    href="/account"
                    className="flex items-center rounded-lg px-4 py-3 text-base font-semibold refined-body text-zinc-600 hover:bg-rose-50 hover:text-rose-800 transition-all duration-300"
                  >
                    <User className="mr-3 h-5 w-5" />
                    {t.nav.profile}
                  </Link>
                  <Link
                    href="/account/settings"
                    className="flex items-center rounded-lg px-4 py-3 text-base font-semibold refined-body text-zinc-600 hover:bg-rose-50 hover:text-rose-800 transition-all duration-300"
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    {t.nav.settings}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center rounded-lg px-4 py-3 text-base font-semibold refined-body text-zinc-600 hover:bg-rose-50 hover:text-rose-800 transition-all duration-300"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    {t.nav.logout}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block rounded-lg px-4 py-3 text-base font-semibold refined-body text-zinc-600 hover:bg-rose-50 hover:text-rose-800 transition-all duration-300"
                >
                  {t.nav.login}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
