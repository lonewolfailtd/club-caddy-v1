import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request a Custom Quote | Club Caddy Carts',
  description: 'Get a custom quote for your perfect golf cart. Choose from premium electric golf carts with advanced 72V lithium technology. Customize your cart with lift kits, wheels, lighting, and accessories. Auckland, New Zealand.',
  keywords: [
    'golf cart quote Auckland',
    'custom golf cart NZ',
    'golf cart customization',
    'electric golf cart pricing',
    'golf buggy quote',
    'custom golf cart Auckland',
    'golf cart accessories NZ',
    'personalized golf cart'
  ],
  openGraph: {
    title: 'Request a Custom Quote | Club Caddy Carts',
    description: 'Get a personalized quote for your ideal electric golf cart. Customize features, accessories, and specifications.',
    url: 'https://clubcaddycarts.com/quote',
    siteName: 'Club Caddy Carts',
    images: [
      {
        url: 'https://clubcaddycarts.com/images/hero-golf-cart.jpg',
        width: 1200,
        height: 630,
        alt: 'Club Caddy Golf Cart - Request a Quote'
      }
    ],
    locale: 'en_NZ',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Custom Quote | Club Caddy Carts',
    description: 'Get a personalized quote for your ideal electric golf cart',
    images: ['https://clubcaddycarts.com/images/hero-golf-cart.jpg']
  },
  alternates: {
    canonical: 'https://clubcaddycarts.com/quote'
  }
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
