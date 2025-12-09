import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

type Props = {
  params: Promise<{ productSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('name, description, short_description, images')
    .eq('slug', productSlug)
    .eq('rental_enabled', true)
    .single()

  if (!product) {
    return {
      title: 'Golf Cart Rental Booking | Club Caddy Carts',
      description: 'Book your golf cart rental online with instant confirmation and secure payment.'
    }
  }

  const title = `Rent ${product.name} | Golf Cart Rental Auckland | Club Caddy`
  const description = `Book your ${product.name} rental online. Hourly, daily, and weekly rates available. Perfect for events, work functions, and golf tournaments in Auckland. Instant confirmation and secure payment.`

  const imageUrl = product.images && product.images.length > 0
    ? (product.images[0].startsWith('http') ? product.images[0] : `https://clubcaddycarts.com${product.images[0]}`)
    : 'https://clubcaddycarts.com/images/logo.png'

  return {
    title,
    description,
    keywords: [
      `rent ${product.name}`,
      'golf cart rental Auckland',
      'golf cart hire NZ',
      'hourly golf cart rental',
      'daily golf cart hire',
      'weekly golf cart rental',
      'event golf cart rental',
      'golf tournament cart rental',
      'Auckland golf cart booking'
    ],
    openGraph: {
      title,
      description,
      url: `https://clubcaddycarts.com/booking/${productSlug}`,
      siteName: 'Club Caddy Carts',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Rent ${product.name} - Auckland Golf Cart Rental`
        }
      ],
      locale: 'en_NZ',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    },
    alternates: {
      canonical: `https://clubcaddycarts.com/booking/${productSlug}`
    }
  }
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
