import type { Metadata } from "next"
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import CartDrawer from "@/components/cart/CartDrawer"
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
  title: {
    default: "Club Caddy Carts | Premium Electric Golf Carts NZ",
    template: "%s | Club Caddy Carts",
  },
  description:
    "New Zealand's premium electric golf cart supplier. From 2-seater to 20-seater carts with cutting-edge 72V lithium battery technology. Sales, hire & custom builds available.",
  keywords: [
    "electric golf carts NZ",
    "golf cart hire New Zealand",
    "electric golf buggy",
    "club caddy",
    "72V lithium golf cart",
    "golf cart sales NZ",
    "premium golf carts",
  ],
  authors: [{ name: "Club Caddy Carts" }],
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
    type: "website",
    locale: "en_NZ",
    url: "https://clubcaddycarts.com",
    title: "Club Caddy Carts | Premium Electric Golf Carts NZ",
    description:
      "New Zealand's premium electric golf cart supplier. 72V lithium battery carts with 100km+ range. Sales, hire & custom builds.",
    siteName: "Club Caddy Carts",
    images: [
      {
        url: '/logo.svg',
        width: 200,
        height: 200,
        alt: 'Club Caddy Carts Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Club Caddy Carts | Premium Electric Golf Carts NZ",
    description:
      "New Zealand's premium electric golf cart supplier. 72V lithium battery carts with 100km+ range.",
    images: ['/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-luxury-pearl antialiased">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="pt-20">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
