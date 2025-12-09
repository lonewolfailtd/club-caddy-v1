import type { Metadata } from "next"
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { LanguageProvider } from "@/context/LanguageContext"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import CartDrawer from "@/components/cart/CartDrawer"
import Chatbot from "@/components/chat/Chatbot"
import StructuredData from "@/components/seo/StructuredData"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'Club Caddy Carts | Premium 72V Electric Golf Carts Auckland NZ - Sales & Hire',
  description: 'Auckland\'s premier electric golf cart supplier. Advanced 72V lithium technology, superior range & performance. Sales, hire & service across New Zealand. View our premium golf buggy range.',
  keywords: [
    'electric golf cart Auckland',
    'golf cart hire Auckland',
    'golf buggy NZ',
    '72V lithium golf cart',
    'electric golf buggy Auckland',
    'golf cart sales New Zealand',
    'premium golf carts Auckland',
    'golf cart rental Auckland',
    'lithium battery golf cart',
    'electric cart hire NZ'
  ],
  authors: [{ name: 'Club Caddy Carts' }],
  creator: "Club Caddy Carts",
  publisher: "Club Caddy Carts",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://clubcaddycarts.com"),
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/images/logo.png', type: 'image/png' }
    ],
    shortcut: '/images/logo.png',
  },
  openGraph: {
    title: 'Club Caddy Carts | Premium 72V Electric Golf Carts Auckland',
    description: 'Auckland\'s premier electric golf cart supplier with advanced 72V lithium technology. Sales, hire & service across New Zealand.',
    url: 'https://clubcaddycarts.com',
    siteName: 'Club Caddy Carts',
    locale: 'en_NZ',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Club Caddy Carts - Premium Electric Golf Carts Auckland'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Club Caddy Carts | Premium 72V Electric Golf Carts Auckland',
    description: 'Auckland\'s premier electric golf cart supplier with 72V lithium technology',
    images: ['/images/logo.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  verification: {
    google: 'google-site-verification-code-here' // Replace with actual code from Google Search Console
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-white antialiased">
        <StructuredData />
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="pt-20">
                {children}
              </main>
              <Footer />
              <CartDrawer />
              <Chatbot />
              <Analytics />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
