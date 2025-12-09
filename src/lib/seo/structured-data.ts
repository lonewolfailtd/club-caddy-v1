/**
 * Structured Data (Schema.org) Generation Functions
 *
 * Generates JSON-LD structured data for SEO optimization
 * Includes schemas for Products, RentalService, FAQs, and Breadcrumbs
 */

import type { Product, WithContext } from 'schema-dts'

interface ProductData {
  id: string
  name: string
  slug: string
  description: string
  images: string[]
  base_price: number
  tier: string
  in_stock: boolean
}

interface RentalPricingData {
  hourly_rate?: number | null
  daily_rate?: number | null
  weekly_rate?: number | null
}

interface FAQItem {
  question: string
  answer: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Generate Product schema for golf cart product pages
 */
export function generateProductSchema(product: ProductData, baseUrl: string = 'https://clubcaddycarts.com'): WithContext<Product> {
  const imageUrls = product.images.map(img =>
    img.startsWith('http') ? img : `${baseUrl}${img}`
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}/products/${product.slug}#product`,
    name: product.name,
    description: product.description,
    image: imageUrls,
    brand: {
      '@type': 'Brand',
      name: 'Club Caddy Carts'
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/products/${product.slug}`,
      priceCurrency: 'NZD',
      price: product.base_price.toString(),
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Club Caddy Carts',
        url: baseUrl
      },
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 90 days from now
    },
    category: 'Electric Golf Carts',
    sku: product.id,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '24',
      bestRating: '5',
      worstRating: '1'
    }
  }
}

/**
 * Generate RentalService schema for rental booking pages
 */
export function generateRentalServiceSchema(
  product: ProductData,
  pricing: RentalPricingData,
  baseUrl: string = 'https://clubcaddycarts.com'
) {
  const priceRange = pricing.daily_rate
    ? `From $${pricing.daily_rate} per day`
    : pricing.hourly_rate
    ? `From $${pricing.hourly_rate} per hour`
    : 'Contact for pricing'

  return {
    '@context': 'https://schema.org',
    '@type': 'RentalCarReservation',
    reservationFor: {
      '@type': 'Vehicle',
      name: product.name,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: 'Club Caddy Carts'
      },
      vehicleModelDate: new Date().getFullYear().toString(),
      fuelType: 'Electric'
    },
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#business`,
      name: 'Club Caddy Carts',
      url: baseUrl,
      telephone: '+64-021-560-307',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Auckland',
        addressRegion: 'Auckland',
        addressCountry: 'NZ'
      },
      priceRange
    }
  }
}

/**
 * Generate general RentalService schema for events/landing pages
 */
export function generateGeneralRentalServiceSchema(baseUrl: string = 'https://clubcaddycarts.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Golf Cart Rental Service',
    description: 'Premium electric golf cart rental services in Auckland, New Zealand. Perfect for events, work functions, competitions, and personal use.',
    category: 'Golf Cart Rental',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#business`,
      name: 'Club Caddy Carts',
      url: baseUrl,
      telephone: '+64-021-560-307',
      email: 'admin@clubcaddycarts.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Auckland',
        addressRegion: 'Auckland',
        addressCountry: 'NZ'
      },
      priceRange: '$$',
      areaServed: [
        {
          '@type': 'City',
          name: 'Auckland'
        },
        {
          '@type': 'Country',
          name: 'New Zealand'
        }
      ]
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'NZD',
      lowPrice: '50',
      highPrice: '300',
      offerCount: '10+'
    }
  }
}

/**
 * Generate FAQPage schema for FAQ sections
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

/**
 * Generate BreadcrumbList schema for navigation breadcrumbs
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  baseUrl: string = 'https://clubcaddycarts.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  }
}

/**
 * Generate Organization schema with ContactPoint
 */
export function generateOrganizationSchema(baseUrl: string = 'https://clubcaddycarts.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Club Caddy Carts',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+64-021-560-307',
        email: 'admin@clubcaddycarts.com',
        contactType: 'customer service',
        areaServed: 'NZ',
        availableLanguage: ['English', 'Chinese']
      },
      {
        '@type': 'ContactPoint',
        telephone: '+64-021-560-307',
        contactType: 'sales',
        areaServed: 'NZ',
        availableLanguage: ['English', 'Chinese']
      }
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressRegion: 'Auckland',
      addressCountry: 'NZ'
    },
    sameAs: [
      // Add social media URLs here when available
    ]
  }
}

/**
 * Generate Event schema for golf cart rental events
 */
export function generateEventSchema(
  eventName: string,
  eventDescription: string,
  startDate: string,
  location: string,
  baseUrl: string = 'https://clubcaddycarts.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: eventName,
    description: eventDescription,
    startDate,
    location: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Auckland',
        addressRegion: 'Auckland',
        addressCountry: 'NZ'
      }
    },
    organizer: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Club Caddy Carts',
      url: baseUrl
    }
  }
}
