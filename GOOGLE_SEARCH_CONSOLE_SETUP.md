# Google Search Console Setup Guide - Club Caddy Carts

## Overview
This guide provides step-by-step instructions for setting up and optimizing Club Caddy Carts in Google Search Console. Proper setup ensures Google can effectively crawl, index, and rank your site in search results.

## Prerequisites
- Google account (use business account if available)
- Access to clubcaddycarts.com domain or Google Analytics/Search Console verification
- Administrative access to the codebase (already configured)

---

## Part 1: Verify Domain Ownership

### Method 1: HTML Meta Tag (Recommended - Already Configured)

We have already added the Google Search Console verification meta tag to your layout.tsx file:

```typescript
// Located in src/app/layout.tsx (line 99-101)
verification: {
  google: 'google-site-verification-code-here' // Replace with actual code from Google Search Console
}
```

This generates the following meta tag in your HTML:
```html
<meta name="google-site-verification" content="google-site-verification-code-here" />
```

**To Complete This Setup:**

1. Go to [Google Search Console](https://search.google.com/search-console/about)
2. Click "Add property"
3. Select "URL prefix" and enter: `https://clubcaddycarts.com`
4. Click "Verify later"
5. Click on "HTML tag" as the verification method
6. Copy the verification code from the content attribute
7. Edit `src/app/layout.tsx` and replace `'google-site-verification-code-here'` with your actual code
8. Deploy the changes to production
9. Return to Google Search Console and click "Verify"

### Method 2: DNS TXT Record (Alternative)

If you prefer DNS verification:
1. In Google Search Console, select "DNS" as verification method
2. Add a TXT record to your domain's DNS settings:
   - Host: `@` (or your domain)
   - Type: TXT
   - Value: `google-site-verification=<your-code>`
3. Wait 24-48 hours for propagation
4. Click "Verify" in Google Search Console

### Method 3: Google Analytics (If Using)

If Club Caddy Carts uses Google Analytics:
1. Ensure the Analytics tracking code is properly installed
2. In Google Search Console, Google Analytics automatically verifies ownership

---

## Part 2: Submit Sitemap

### Sitemap Configuration Status

Your sitemap is already properly configured:

**Location:** `src/app/sitemap.ts`

**Features:**
- Automatically generates dynamic sitemap.xml at runtime
- Includes all static pages (products, events, quote, about, contact, privacy, terms)
- Dynamically includes all in-stock product pages with priority 0.8
- Dynamically includes rental-enabled product booking pages with priority 0.7
- Updates change frequency and lastModified timestamps automatically
- Base URL: https://clubcaddycarts.com

**Static Pages Included:**
- Home (priority: 1.0, daily)
- Products (priority: 0.9, daily)
- Events (priority: 0.8, weekly)
- Quote Request (priority: 0.7, monthly)
- About (priority: 0.6, monthly)
- Contact (priority: 0.6, monthly)
- Privacy Policy (priority: 0.3, yearly)
- Terms of Service (priority: 0.3, yearly)

### Submit Sitemap to Google

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Select your property: clubcaddycarts.com
3. In the left sidebar, click "Sitemaps"
4. Click "Add/test sitemap"
5. Enter the sitemap URL: `https://clubcaddycarts.com/sitemap.xml`
6. Click "Submit"
7. Google will begin crawling and indexing your pages within 24-48 hours

### Monitor Sitemap Performance

In Google Search Console:
1. Go to "Sitemaps" section
2. View submission status and any errors
3. Check "Coverage" to see indexed vs. not indexed pages
4. Review "Mobile usability" to ensure mobile-friendly rendering
5. Check "Performance" to see click-through rates in search results

---

## Part 3: Robots.txt Configuration

Your robots.txt is properly configured at `src/app/robots.ts`:

**Current Configuration:**
- Allows all user agents full access to public pages
- Blocks: /api/, /admin/, /account/, /_next/, /private/
- Blocks AI bots: GPTBot, CCBot, ChatGPT-User
- Directs all bots to sitemap.xml at: https://clubcaddycarts.com/sitemap.xml

This is optimal for your business needs and won't interfere with Google indexing.

---

## Part 4: SEO Best Practices for NZ Golf Cart Business

### On-Page Optimization

**1. Title Tags and Meta Descriptions**
- Keep title tags under 60 characters
- Include primary keyword (e.g., "electric golf cart Auckland")
- Include location (Auckland, New Zealand) where relevant
- Make each title unique across your site

Current example (Home):
```
Club Caddy Carts | Premium 72V Electric Golf Carts Auckland NZ - Sales & Hire
```

**2. Header Structure (H1-H3)**
- Use one H1 per page
- Use H2 for major sections (Features, Pricing, FAQ)
- Use H3 for subsections
- Include keywords naturally in headers

**3. Content Optimization**
- Write 300+ words for product pages (Google prefers substantial content)
- Use keywords 1-2% of the time (avoid keyword stuffing)
- Include location keywords for local SEO
- Use internal linking to related products/content
- Add schema markup for products, local business, etc.

**4. Image Optimization**
- Use descriptive alt text (e.g., "Red 72V electric golf cart with lithium battery")
- Compress images to reduce load time
- Use modern formats (WebP, AVIF)
- Include keywords in image filenames where appropriate

### Technical SEO

**1. Site Speed**
- Monitor Core Web Vitals in Google Search Console
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**2. Mobile Optimization**
- Ensure all pages are mobile-friendly
- Test with Google's Mobile-Friendly Test tool
- Optimize images and fonts for mobile

**3. Structured Data**
- Product schema for golf carts (price, rating, availability)
- LocalBusiness schema with:
  - Business name: Club Caddy Carts
  - Address: [Auckland address]
  - Phone: [Business phone]
  - Operating hours
  - Service areas
- AggregateOffer schema for pricing
- FAQSchema for FAQ pages

**4. XML Sitemap & Robots.txt**
- Already configured (see Part 2 & 3)

### Local SEO for New Zealand

**1. Google Business Profile**
- Claim/update your Google Business Profile
- Add complete business information:
  - Full address (Auckland, New Zealand)
  - Phone number
  - Website URL
  - Operating hours
  - Service areas (Auckland, wider NZ)
- Add high-quality photos of products/showroom
- Encourage customer reviews
- Respond to all reviews

**2. Local Keywords**
- Target "Auckland" in primary keywords
- Include "New Zealand" for broader reach
- Target nearby suburbs: Epsom, Parnell, Mount Eden, CBD
- Include "NZ" in some pages for local relevance

**3. Local Link Building**
- Get listed in NZ business directories
- Partner with local golf clubs or courses
- Feature in local news or business publications
- Get reviews on NZ-specific platforms

**4. Multi-Location Content**
- Create location-specific pages if expanding beyond Auckland
- Optimize for city+service combinations
- Ensure NAP consistency (Name, Address, Phone)

### Content Strategy

**1. Product Pages**
Each product page should include:
- Unique, descriptive title
- Detailed description (300+ words)
- Specifications and features
- Pricing and availability
- Customer reviews/testimonials
- High-quality product images
- Call-to-action (Buy, Rent, Quote)
- Related products (internal links)

**2. Blog/Resource Content**
Consider creating content around:
- "Benefits of 72V electric golf carts"
- "Golf cart maintenance guide"
- "Electric vs. petrol golf carts: comparison"
- "Golf cart hire guide for events"
- "Why choose lithium battery technology"

**3. FAQ Content**
Create FAQ pages with:
- Common customer questions
- Detailed answers
- Related product links
- Schema markup for FAQs

---

## Part 5: Keywords to Target

### Primary Keywords (High Intent)

```
electric golf cart Auckland
golf cart hire Auckland
golf cart sales Auckland
72V electric golf cart
lithium golf cart
golf cart rental NZ
electric golf buggy Auckland
golf cart sales New Zealand
premium golf carts Auckland
golf cart hire NZ
```

### Secondary Keywords (Medium Intent)

```
golf cart battery replacement
golf cart maintenance
golf cart rentals events
golf cart hire pricing
best golf carts NZ
golf cart leasing Auckland
golf cart charger
golf cart accessories
golf cart parts
used golf cart Auckland
```

### Long-Tail Keywords (Specific Intent)

```
72V lithium battery golf cart Auckland
golf cart hire for wedding Auckland
golf cart rental 24 hours
best electric golf cart 2024
golf cart hire corporate events
lightweight golf cart NZ
golf cart with longest range
fastest electric golf cart
golf cart hire with driver
golf cart rental by day
```

### Local Keywords

```
golf cart near me
golf carts in Auckland
golf cart Auckland CBD
golf cart Parnell
golf cart Mount Eden
golf cart Epsom
golf cart hire South Auckland
golf cart rental North Shore
golf carts New Zealand
golf cart company Auckland
```

### Informational Keywords

```
how much does golf cart cost
golf cart vs golf buggy difference
electric golf cart advantages
golf cart charging time
golf cart range per charge
golf cart maintenance tips
golf cart safety guide
golf cart insurance NZ
```

### Branded Keywords

```
Club Caddy Carts
Club Caddy golf carts
Club Caddy Auckland
Club Caddy cart rental
Club Caddy reviews
```

### Seasonal Keywords

```
golf cart hire summer Auckland
golf cart for events
golf cart hire holidays
golf cart wedding Auckland
golf cart corporate outing
```

---

## Part 6: Monitoring and Maintenance

### Weekly Tasks
- Monitor Search Console for new indexing issues
- Check for crawl errors or security issues
- Review new search queries and impressions
- Check for 404 errors

### Monthly Tasks
- Analyze Core Web Vitals performance
- Review top performing pages
- Check mobile usability issues
- Audit internal linking opportunities
- Monitor competitor rankings

### Quarterly Tasks
- Comprehensive SEO audit
- Update outdated content
- Review and refresh keyword strategy
- Check for broken links
- Analyze user behavior in Search Console

### Tools to Use
- Google Search Console: https://search.google.com/search-console/
- Google Analytics: https://analytics.google.com/
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- Schema Markup Validator: https://schema.org/validate
- GTmetrix: https://gtmetrix.com/

---

## Implementation Checklist

- [ ] Replace verification code in `src/app/layout.tsx` with actual Google code
- [ ] Verify domain ownership in Google Search Console
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Claim Google Business Profile
- [ ] Add complete business information to Google Business Profile
- [ ] Enable Google Analytics integration
- [ ] Test mobile-friendliness
- [ ] Validate schema markup
- [ ] Check Core Web Vitals performance
- [ ] Set up Search Console alerts
- [ ] Create monitoring schedule
- [ ] Plan content strategy for local keywords
- [ ] Plan link building strategy
- [ ] Set up review management system

---

## Support and Troubleshooting

### Common Issues

**"Verification failed"**
- Ensure changes are deployed to production
- Clear browser cache
- Check verification code matches exactly
- Wait 24 hours for DNS/cache propagation

**"Sitemap errors"**
- Verify sitemap.xml is accessible at https://clubcaddycarts.com/sitemap.xml
- Check for XML syntax errors
- Ensure all URLs are valid and follow proper format
- Check URL count is under 50,000 entries

**"Crawl errors"**
- Check robots.txt isn't blocking important pages
- Ensure server returns 200 status for valid pages
- Fix 404s for frequently linked pages
- Check for redirect chains

### Google Resources
- Search Central Blog: https://developers.google.com/search/blog
- Search Console Help: https://support.google.com/webmasters
- Search Central Documentation: https://developers.google.com/search/docs
- Core Web Vitals Guide: https://support.google.com/webmasters/answer/9205233

---

**Last Updated:** December 2024
**Next Review:** December 2025
