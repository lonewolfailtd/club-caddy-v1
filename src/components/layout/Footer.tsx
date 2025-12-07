import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-luxury-onyx text-luxury-platinum">
      {/* Hexagonal Pattern Background */}
      <div className="absolute inset-0 bg-hexagon opacity-5" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Main Footer Content - Multi-column Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient-luxury font-heading">
              Club Caddy Carts
            </h3>
            <p className="text-sm leading-relaxed text-luxury-platinum/80">
              New Zealand's premier supplier of premium electric golf carts. From standard to ultra-luxury, we deliver excellence.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-gold/10 transition-all duration-300 hover:border-luxury-gold hover:bg-luxury-gold/20 hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5 text-luxury-gold transition-colors group-hover:text-luxury-gold-light"
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
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-gold/10 transition-all duration-300 hover:border-luxury-gold hover:bg-luxury-gold/20 hover:scale-110"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5 text-luxury-gold transition-colors group-hover:text-luxury-gold-light"
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
            <h4 className="text-sm font-semibold uppercase tracking-wide text-luxury-gold font-heading">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="group inline-flex items-center text-sm text-luxury-platinum/80 transition-colors hover:text-luxury-gold"
                >
                  <span className="mr-2 text-luxury-gold/50 transition-transform group-hover:translate-x-1">→</span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="group inline-flex items-center text-sm text-luxury-platinum/80 transition-colors hover:text-luxury-gold"
                >
                  <span className="mr-2 text-luxury-gold/50 transition-transform group-hover:translate-x-1">→</span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="group inline-flex items-center text-sm text-luxury-platinum/80 transition-colors hover:text-luxury-gold"
                >
                  <span className="mr-2 text-luxury-gold/50 transition-transform group-hover:translate-x-1">→</span>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/hire"
                  className="group inline-flex items-center text-sm text-luxury-platinum/80 transition-colors hover:text-luxury-gold"
                >
                  <span className="mr-2 text-luxury-gold/50 transition-transform group-hover:translate-x-1">→</span>
                  Hire
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center text-sm text-luxury-platinum/80 transition-colors hover:text-luxury-gold"
                >
                  <span className="mr-2 text-luxury-gold/50 transition-transform group-hover:translate-x-1">→</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-luxury-gold font-heading">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+64021560307"
                  className="group flex items-start text-sm text-luxury-platinum/80 transition-colors hover:text-luxury-gold"
                >
                  <svg
                    className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-luxury-gold"
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
                  <span>+64-021-560-307</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@clubcaddycarts.com"
                  className="group flex items-start text-sm text-luxury-platinum/80 transition-colors hover:text-luxury-gold"
                >
                  <svg
                    className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-luxury-gold"
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
              <li className="flex items-start text-sm text-luxury-platinum/80">
                <svg
                  className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-luxury-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
                <span>Contact: Warren</span>
              </li>
              <li className="flex items-start text-sm text-luxury-platinum/80">
                <svg
                  className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-luxury-gold"
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
                <span>New Zealand</span>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-luxury-gold font-heading">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="group inline-flex items-center text-sm text-luxury-platinum/80 transition-colors hover:text-luxury-gold"
                >
                  <span className="mr-2 text-luxury-gold/50 transition-transform group-hover:translate-x-1">→</span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="group inline-flex items-center text-sm text-luxury-platinum/80 transition-colors hover:text-luxury-gold"
                >
                  <span className="mr-2 text-luxury-gold/50 transition-transform group-hover:translate-x-1">→</span>
                  Privacy Policy
                </Link>
              </li>
            </ul>

            {/* Trust Badges */}
            <div className="pt-4">
              <div className="rounded-lg border border-luxury-gold/20 bg-luxury-gold/5 p-4">
                <p className="text-xs font-semibold text-luxury-gold">Premium Quality</p>
                <p className="mt-1 text-xs text-luxury-platinum/70">
                  Trusted by golf courses across New Zealand
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-12 border-t border-luxury-gold/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-luxury-platinum/60 md:text-left">
              &copy; {currentYear} Club Caddy Carts. All rights reserved. Built with luxury and precision for New Zealand.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-luxury-gold animate-pulse" />
              <span className="text-xs text-luxury-platinum/50">Crafted with Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
