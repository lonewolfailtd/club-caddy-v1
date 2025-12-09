'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { commonTranslations } from '@/lib/translations'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { language } = useLanguage()
  const t = commonTranslations[language]

  return (
    <footer className="relative overflow-hidden bg-zinc-50 border-t border-zinc-200">
      {/* Hexagonal Pattern Background */}
      <div className="absolute inset-0 hexagon-pattern-minimal opacity-[0.02]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Main Footer Content - Multi-column Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="refined-title text-2xl font-bold text-zinc-900">
              Club Caddy Carts
            </h3>
            <p className="refined-body text-sm leading-relaxed text-zinc-600">
              {language === 'en'
                ? "New Zealand's premier supplier of premium electric golf carts. From standard to ultra-luxury, we deliver excellence."
                : "新西兰顶级电动高尔夫球车供应商。从标准到超豪华，我们提供卓越品质。"}
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition-all duration-300 hover:border-rose-800 hover:bg-rose-50 hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-rose-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white transition-all duration-300 hover:border-rose-800 hover:bg-rose-50 hover:scale-110"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-rose-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - Navigation */}
          <div className="space-y-4">
            <h4 className="refined-body text-sm font-semibold uppercase tracking-wide text-rose-800">
              {language === 'en' ? 'Quick Links' : '快速链接'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="group inline-flex items-center refined-body text-sm text-zinc-600 transition-colors hover:text-rose-800"
                >
                  <span className="mr-2 text-zinc-400 transition-transform group-hover:translate-x-1">→</span>
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="group inline-flex items-center refined-body text-sm text-zinc-600 transition-colors hover:text-rose-800"
                >
                  <span className="mr-2 text-zinc-400 transition-transform group-hover:translate-x-1">→</span>
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="group inline-flex items-center refined-body text-sm text-zinc-600 transition-colors hover:text-rose-800"
                >
                  <span className="mr-2 text-zinc-400 transition-transform group-hover:translate-x-1">→</span>
                  {t.nav.products}
                </Link>
              </li>
              <li>
                <Link
                  href="/hire"
                  className="group inline-flex items-center refined-body text-sm text-zinc-600 transition-colors hover:text-rose-800"
                >
                  <span className="mr-2 text-zinc-400 transition-transform group-hover:translate-x-1">→</span>
                  {t.nav.hire}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center refined-body text-sm text-zinc-600 transition-colors hover:text-rose-800"
                >
                  <span className="mr-2 text-zinc-400 transition-transform group-hover:translate-x-1">→</span>
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="refined-body text-sm font-semibold uppercase tracking-wide text-rose-800">
              {language === 'en' ? 'Contact Us' : '联系我们'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+64021560307"
                  className="group flex items-start refined-body text-sm text-zinc-600 transition-colors hover:text-rose-800"
                >
                  <svg
                    className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-rose-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <span>+64 021 560 307</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@clubcaddycarts.com"
                  className="group flex items-start refined-body text-sm text-zinc-600 transition-colors hover:text-rose-800"
                >
                  <svg
                    className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-rose-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <span className="break-all">admin@clubcaddycarts.com</span>
                </a>
              </li>
              <li className="flex items-start refined-body text-sm text-zinc-600">
                <svg
                  className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-rose-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>{language === 'en' ? 'New Zealand' : '新西兰'}</span>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="space-y-4">
            <h4 className="refined-body text-sm font-semibold uppercase tracking-wide text-rose-800">
              {language === 'en' ? 'Legal' : '法律信息'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="group inline-flex items-center refined-body text-sm text-zinc-600 transition-colors hover:text-rose-800"
                >
                  <span className="mr-2 text-zinc-400 transition-transform group-hover:translate-x-1">→</span>
                  {language === 'en' ? 'Terms of Service' : '服务条款'}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="group inline-flex items-center refined-body text-sm text-zinc-600 transition-colors hover:text-rose-800"
                >
                  <span className="mr-2 text-zinc-400 transition-transform group-hover:translate-x-1">→</span>
                  {language === 'en' ? 'Privacy Policy' : '隐私政策'}
                </Link>
              </li>
            </ul>

            {/* Trust Badges */}
            <div className="pt-4">
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
                <p className="refined-body text-xs font-semibold text-rose-800">
                  {language === 'en' ? 'Premium Quality' : '优质品质'}
                </p>
                <p className="refined-body mt-1 text-xs text-zinc-600">
                  {language === 'en'
                    ? 'Trusted by golf courses across New Zealand'
                    : '深受新西兰高尔夫球场信赖'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-12 border-t border-zinc-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="refined-body text-center text-sm text-zinc-500 md:text-left">
              &copy; {currentYear} Club Caddy Carts. {language === 'en' ? 'All rights reserved. Built with luxury and precision for New Zealand.' : '版权所有。为新西兰打造的奢华与精准。'}
            </p>
            <a
              href="https://lonewolfaisolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group transition-all hover:scale-105"
            >
              <span className="refined-body text-xs text-zinc-400 group-hover:text-rose-800 transition-colors">
                {language === 'en' ? 'Website by Lonewolf AI Solutions' : '网站由 Lonewolf AI Solutions 制作'}
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
