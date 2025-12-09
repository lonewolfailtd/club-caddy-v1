'use client'

import Script from 'next/script'

export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://clubcaddycarts.com/#business",
    "name": "Club Caddy Carts",
    "image": "https://clubcaddycarts.com/images/logo.png",
    "description": "Auckland's premier electric golf cart supplier with advanced 72V lithium technology. Sales, hire & service across New Zealand.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Auckland",
      "addressRegion": "Auckland",
      "addressCountry": "NZ"
    },
    "url": "https://clubcaddycarts.com",
    "telephone": "+64-XXX-XXX-XXX",
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Auckland"
      },
      {
        "@type": "Country",
        "name": "New Zealand"
      }
    ],
    "sameAs": []
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://clubcaddycarts.com/#website",
    "url": "https://clubcaddycarts.com",
    "name": "Club Caddy Carts",
    "description": "Premium 72V Electric Golf Carts - Auckland NZ",
    "publisher": {
      "@id": "https://clubcaddycarts.com/#business"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://clubcaddycarts.com/products?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </>
  )
}
