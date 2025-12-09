 Overview

     Transform Club Caddy from a sales-focused e-commerce site into a fully automated golf cart rental and booking platform with real-time availability, seamless payment processing, and marketing focus on events,       
     work functions, and competitions.

     User Requirements Summary

     - ✅ Automated booking with real-time availability
     - ✅ Rental options: Hourly (2-4hr min), Daily, Weekly, Custom date ranges
     - ✅ Multi-cart booking support
     - ✅ Full payment upfront via Stripe
     - ✅ Optional user accounts (guest checkout + registered users)
     - ✅ Marketing focus: Affordability, events, work functions, competitions
     - ✅ UI/UX consistency: Theme, animations, buttons, spelling/grammar
     - ✅ SEO optimization: Metadata, sitemaps, structured data

     Current State Analysis

     ✅ What's Already Built

     - Database schema (products, orders, quote_requests, profiles)
     - Stripe client library initialized
     - Resend email service with 17+ templates
     - Cart context with localStorage
     - Quote form (frontend only, no automation)
     - Basic checkout flow (no backend integration)

     ❌ What's Missing

     - Booking system (database tables, API routes, UI)
     - Real-time availability checking
     - Stripe checkout/webhook integration
     - Email automation triggers
     - Admin dashboard
     - SEO metadata on dynamic pages
     - UI/UX consistency (buttons, animations)
     - Sitemap/robots configuration

     ---
     Implementation Plan

     PHASE 1: Database Foundation (Priority: CRITICAL)

     New Migration File

     supabase/migrations/003_rental_booking_system.sql

     Create 4 new tables:
     1. rental_pricing - Hourly/daily/weekly rates per product
     2. inventory - Track cart quantities (total, available, reserved, maintenance)
     3. bookings - Rental bookings with customer info, dates, pricing, payment status
     4. availability_blocks - Block out dates for maintenance/holidays

     Key features:
     - Booking number generation (BK-YYYYMMDD-####)
     - check_availability() function - Prevents double bookings
     - Database triggers - Auto-update inventory on booking create/cancel
     - Row-level security policies for public booking submission
     - Enum types: rental_type, payment_status, booking_status

     Critical Fields:
     - Bookings: rental_type, start_date, end_date, quantity, total_amount, payment_status, status
     - Inventory: total_quantity, available_quantity, reserved_quantity
     - Pricing: hourly_rate, daily_rate, weekly_rate, hourly_minimum_hours

     ---
     PHASE 2: API Routes (Priority: CRITICAL)

     2.1 Availability Check

     src/app/api/bookings/check-availability/route.ts
     - POST endpoint
     - Input: productId, startDate, endDate, quantity
     - Calls check_availability() database function
     - Returns: { available: boolean }

     2.2 Create Booking

     src/app/api/bookings/create/route.ts
     - POST endpoint
     - Validates availability first
     - Calculates pricing based on rental_type and duration
     - Creates booking record with status: 'pending'
     - Returns booking object

     2.3 Stripe Checkout Session

     src/app/api/stripe/create-checkout-session/route.ts
     - POST endpoint
     - Input: bookingId
     - Fetches booking details from database
     - Creates Stripe checkout session with line items
     - Metadata: { bookingId, bookingNumber, type: 'rental_booking' }
     - Returns: { sessionId, url }

     2.4 Stripe Webhook Handler

     src/app/api/stripe/webhooks/route.ts
     - POST endpoint with signature verification
     - Handles events:
       - checkout.session.completed → Update booking to 'paid' + 'confirmed'
       - payment_intent.payment_failed → Update to 'failed'
       - charge.refunded → Update to 'refunded' + 'cancelled'
     - Triggers email notifications
     - Uses SUPABASE_SERVICE_ROLE_KEY for admin access

     2.5 Booking Retrieval

     src/app/api/bookings/[id]/route.ts
     - GET: Retrieve booking details with product info
     - PATCH: Update booking (status, cancellation)

     ---
     PHASE 3: Frontend Booking Components (Priority: HIGH)

     3.1 Booking Calendar Component

     src/components/booking/BookingCalendar.tsx

     Features:
     - Date range picker with availability visualization
     - Rental type toggle: Hourly / Daily / Weekly / Custom
     - Blocked dates shown in gray (unavailable)
     - Real-time availability check on date selection
     - Minimum rental period enforcement (2-4hr for hourly)
     - Live price calculation display

     3.2 Cart Quantity Selector

     src/components/booking/CartQuantitySelector.tsx

     Features:
     - Quantity selector (1-20 carts)
     - Availability indicator per quantity
     - Bulk rental messaging (5+ carts = "Perfect for events!")
     - Price per cart display

     3.3 Booking Summary

     src/components/booking/BookingSummary.tsx

     Display:
     - Selected dates/times with duration
     - Number of carts × unit price
     - Selected addons itemized
     - Subtotal + total
     - Payment terms

     3.4 Booking Page

     src/app/booking/[productSlug]/page.tsx (NEW)

     Full booking flow:
     1. Product display with rental pricing table
     2. BookingCalendar component
     3. CartQuantitySelector
     4. Addons selection (from existing cart context)
     5. Customer info form (guest or logged in)
     6. BookingSummary
     7. "Proceed to Payment" button → Creates booking → Stripe checkout

     Flow:
     User selects dates → Check availability → Select quantity →
     Add addons → Enter customer info → Create booking API →
     Create Stripe session → Redirect to Stripe →
     Webhook confirms payment → Booking confirmed email

     ---
     PHASE 4: UI/UX Consistency (Priority: MEDIUM)

     4.1 Button Standardization

     Extend src/components/ui/button.tsx with brand variants:

     variant: {
       elegant: "bg-rose-800 text-white hover:bg-rose-900 shadow-lg hover:shadow-xl",
       elegantOutline: "border-2 border-zinc-700 text-white hover:border-rose-800 hover:bg-rose-900/20",
       elegantGhost: "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
     }

     Files to refactor (replace inline button styles with <Button variant="elegant">):
     - src/app/products/[slug]/page.tsx (lines 214-226)
     - src/app/quote/page.tsx (lines 785-796)
     - src/app/checkout/page.tsx (line 376)
     - src/components/layout/Header.tsx
     - src/components/products/AddToCartButton.tsx
     - src/components/refined/RefinedHero.tsx
     - All other components with custom button styles

     Current Issue: 80% of app uses inline Tailwind instead of Button component

     4.2 Animation Consolidation

     Standardize on Framer Motion for all animations:
     - Remove duplicate keyframe definitions from:
       - src/app/globals.css (lines 205-232)
       - Component-level <style jsx> blocks
     - Keep only Tailwind config animations (for utility classes)

     Animation Standards:
     - Interactions: 300ms
     - Page transitions: 800ms
     - Scroll reveals: viewport={{ once: true, margin: "-100px" }}

     Update tailwind.config.ts:
     - Remove duplicate keyframes already in globals.css
     - Standardize durations

     4.3 Font Loading Optimization

     Current Issue: Fonts loaded multiple times via inline <style jsx>

     Fix: Remove all inline font imports, rely on:
     - src/app/layout.tsx - Single font import location
     - CSS variables: var(--font-playfair), var(--font-inter)

     ---
     PHASE 5: SEO Optimization (Priority: MEDIUM-HIGH)

     5.1 Add Missing Metadata

     Files to update:

     1. src/app/products/[slug]/page.tsx
       - Add generateMetadata() function
       - Dynamic title: "{Product Name} - {Tier} Edition | Club Caddy"
       - Include product description, price, images
       - OpenGraph tags
     2. src/app/quote/page.tsx
       - Add static metadata export
       - Title: "Request a Quote | Club Caddy Carts"
     3. src/app/booking/[productSlug]/page.tsx (NEW)
       - Add generateMetadata() for rental pages
     4. src/app/privacy/page.tsx - Add metadata
     5. src/app/terms/page.tsx - Add metadata
     6. src/app/layout.tsx
       - Replace Google verification placeholder with actual code

     5.2 Sitemap & Robots

     Create src/app/sitemap.ts:
     - Fetch all products from Supabase
     - Generate URLs for: home, products, quote, events, all product pages
     - Set proper priorities and changeFrequency

     Create src/app/robots.ts:
     - Allow all except /api/, /admin/, /account/
     - Include sitemap URL

     5.3 Structured Data

     Create src/lib/seo/structured-data.ts:
     - generateProductSchema() - Product schema for each cart
     - generateRentalServiceSchema() - Service schema for rental business
     - generateFAQSchema() - FAQ schema (after creating FAQ section)
     - generateBreadcrumbSchema() - Navigation breadcrumbs

     Update src/components/seo/StructuredData.tsx:
     - Add Product schema to product pages
     - Add RentalService schema to events page
     - Enhance LocalBusiness schema with ContactPoint

     5.4 Events Landing Page (NEW)

     src/app/events/page.tsx

     Content focus:
     - H1: "Golf Cart Rentals for Events & Work Functions in Auckland"
     - Sections:
       - "Affordable Multi-Cart Bookings"
       - "Perfect for Competitions & Corporate Events"
       - "Weddings, Festivals, and Outdoor Functions"
       - Bulk pricing table
       - Testimonials
       - FAQ section with FAQPage schema
     - CTA: "Book Your Event Carts Now"

     SEO Target Keywords:
     - "golf cart rental auckland events"
     - "golf cart hire for work functions"
     - "bulk golf cart rental nz"
     - "corporate event golf carts"

     ---
     PHASE 6: Email Automation (Priority: MEDIUM)

     6.1 Create Booking Email Templates

     New templates:
     1. src/lib/email/templates/bookings/booking-confirmation-customer.tsx
       - Sent immediately after payment
       - Booking number, dates, cart details, total paid
       - Pickup/delivery instructions
     2. src/lib/email/templates/bookings/booking-confirmation-admin.tsx
       - Admin notification
       - Customer details, special requests
       - Link to admin dashboard
     3. src/lib/email/templates/bookings/booking-reminder.tsx
       - Sent 24hrs before rental start
       - Pickup time/location reminder
       - Contact info
     4. src/lib/email/templates/bookings/booking-thank-you.tsx
       - Sent after rental end
       - Thank you + feedback request
       - Discount code for next booking

     6.2 Email Service Integration

     Update src/lib/email/send.ts:
     export async function sendBookingConfirmationEmail(booking) { ... }
     export async function sendBookingReminderEmail(booking) { ... }
     export async function sendBookingThankYouEmail(booking) { ... }

     Trigger Points:
     - Confirmation: Stripe webhook checkout.session.completed
     - Reminder: Cron job (24hrs before start_date)
     - Thank you: Cron job (after end_date)

     6.3 Scheduled Email Jobs

     src/lib/cron/booking-reminders.ts (optional, can use Vercel Cron)
     - Query bookings with start_date = tomorrow
     - Send reminder emails
     - Mark as reminder_sent in database

     ---
     PHASE 7: Admin Dashboard (Priority: HIGH for operations)

     7.1 Booking Management

     src/app/admin/bookings/page.tsx

     Features:
     - Calendar view of all bookings
     - List view with filters (status, date range, customer)
     - Search by booking number or email
     - Quick actions: Confirm, Cancel, Refund
     - Booking details modal
     - Export to CSV

     7.2 Inventory Management

     src/app/admin/inventory/page.tsx

     Features:
     - Set total quantities per product
     - View available vs reserved counts
     - Block out dates (maintenance, holidays)
     - Availability calendar visualization
     - Low inventory alerts

     7.3 Pricing Management

     src/app/admin/pricing/page.tsx

     Features:
     - Set hourly/daily/weekly rates per product
     - Bulk pricing updates
     - Seasonal pricing rules (future enhancement)

     7.4 Quote Management

     src/app/admin/quotes/page.tsx (enhance existing quote system)

     Features:
     - View all quote requests
     - Respond with pricing
     - Convert quote to booking
     - Archive old quotes

     ---
     PHASE 8: User Accounts (Optional - Guest Checkout Supported)

     8.1 Customer Dashboard

     src/app/account/bookings/page.tsx

     Features:
     - View upcoming and past bookings
     - Booking details with receipts
     - Cancel booking (if > 48hrs before start)
     - Download invoices

     8.2 Guest Checkout

     Already supported via optional user_id field in bookings table:
     - Bookings linked to email instead of user account
     - Optional account creation after booking
     - Email-based order lookup

     ---
     Implementation Order

     Week 1-2: Foundation

     1. ✅ Database migration (Phase 1)
     2. ✅ API routes (Phase 2)
     3. ✅ Basic booking flow test

     Week 3-4: User Experience

     4. ✅ Frontend booking components (Phase 3)
     5. ✅ End-to-end booking test
     6. ✅ UI/UX consistency fixes (Phase 4)

     Week 4-5: Discoverability

     7. ✅ SEO optimization (Phase 5)
     8. ✅ Events landing page

     Week 6: Automation

     9. ✅ Email templates and automation (Phase 6)

     Week 7-8: Operations

     10. ✅ Admin dashboard (Phase 7)

     Week 9: Optional

     11. ✅ User accounts enhancement (Phase 8)

     ---
     Critical Files to Create/Modify

     NEW FILES (Create)

     1. supabase/migrations/003_rental_booking_system.sql - Database schema
     2. src/app/api/bookings/check-availability/route.ts - Availability API
     3. src/app/api/bookings/create/route.ts - Booking creation API
     4. src/app/api/bookings/[id]/route.ts - Booking retrieval API
     5. src/app/api/stripe/create-checkout-session/route.ts - Stripe checkout
     6. src/app/api/stripe/webhooks/route.ts - Stripe webhook handler
     7. src/app/booking/[productSlug]/page.tsx - Booking page
     8. src/components/booking/BookingCalendar.tsx - Calendar component
     9. src/components/booking/CartQuantitySelector.tsx - Quantity selector
     10. src/components/booking/BookingSummary.tsx - Booking summary
     11. src/app/sitemap.ts - Sitemap generation
     12. src/app/robots.ts - Robots.txt
     13. src/app/events/page.tsx - Events landing page
     14. src/lib/seo/structured-data.ts - Schema.org schemas
     15. src/lib/email/templates/bookings/*.tsx - 4 booking email templates
     16. src/app/admin/bookings/page.tsx - Admin booking management
     17. src/app/admin/inventory/page.tsx - Admin inventory management
     18. src/app/admin/pricing/page.tsx - Admin pricing management
     19. src/types/booking.types.ts - TypeScript types

     MODIFY EXISTING FILES

     1. src/components/ui/button.tsx - Add elegant variants
     2. src/app/products/[slug]/page.tsx - Add generateMetadata(), refactor buttons
     3. src/app/quote/page.tsx - Add metadata, refactor buttons
     4. src/app/checkout/page.tsx - Refactor buttons
     5. src/app/layout.tsx - Replace Google verification placeholder
     6. src/lib/email/send.ts - Add booking email functions
     7. tailwind.config.ts - Remove duplicate animations
     8. src/app/globals.css - Clean up redundant keyframes
     9. All components with inline button styles - Refactor to use Button component

     ---
     Key Technical Decisions

     1. Real-Time Availability

     Implementation: PostgreSQL function check_availability() with row-level locking
     Prevents: Double bookings and inventory overselling
     Performance: Sub-500ms response time target

     2. Payment Flow

     Choice: Full payment upfront (not deposit split)
     Reason: Simpler implementation, less admin overhead, secured revenue
     Stripe Mode: Checkout Session (hosted payment page)

     3. Guest Checkout

     Choice: Optional user accounts (support both guest and registered)
     Benefits: Faster conversion for first-time customers, order history for registered users
     Implementation: user_id is nullable in bookings table

     4. Inventory Management

     Method: Database triggers automatically update inventory on booking status changes
     Safety: Constraint checks ensure total = available + reserved + maintenance
     Manual Override: Admin can block dates via availability_blocks table

     5. Pricing Calculation

     Storage: Snapshot pricing in bookings table (not recalculated later)
     Logic: Based on rental_type and duration (hourly/daily/weekly)
     Discounts: Future enhancement via promo codes

     ---
     Edge Cases Handled

     1. Overlapping Bookings - check_availability() function prevents
     2. Concurrent Bookings - Row-level locking during reservation
     3. Payment Failures - Webhook updates status, inventory released after 1hr
     4. Cancellations - Database trigger releases inventory automatically
     5. No-Shows - Admin can mark as no_show, releases inventory
     6. Maintenance Periods - availability_blocks table blocks dates
     7. Pricing Changes - Snapshot stored in booking (not recalculated)
     8. Guest Order Lookup - Email + booking number required

     ---
     SEO Target Keywords

     Primary Keywords

     - "golf cart rental auckland" (high intent)
     - "electric golf cart hire nz" (local focus)
     - "golf cart rental for events" (target audience)

     Secondary Keywords

     - "affordable golf cart rental"
     - "work function golf cart hire"
     - "golf tournament cart rental"
     - "corporate event golf carts"
     - "bulk golf cart rental nz"

     Long-Tail Keywords

     - "how much does it cost to rent a golf cart in auckland"
     - "golf cart hire for wedding nz"
     - "electric golf cart rental for work site"

     ---
     Success Metrics

     Business KPIs

     - Booking conversion rate: >15%
     - Average booking value: $500+
     - Multi-cart bookings: >30%
     - Repeat customer rate: >25%

     Technical KPIs

     - Availability check: <500ms
     - Payment success rate: >95%
     - Webhook processing: >99%
     - Zero inventory overselling
     - Page load time: <2s

     SEO KPIs

     - Organic traffic: +200% in 6 months
     - "golf cart rental auckland" ranking: Top 3
     - Sitemap indexation: 100%

     ---
     Environment Variables Required

     Add to .env.local:

     # Stripe
     STRIPE_SECRET_KEY=sk_test_...
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
     STRIPE_WEBHOOK_SECRET=whsec_...

     # Supabase (service role for webhooks)
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

     # Site URL
     NEXT_PUBLIC_SITE_URL=http://localhost:3000

     # Optional: Cron job secret
     CRON_SECRET=your_random_secret

     ---
     Deployment Checklist

     Pre-Launch

     - Run database migrations
     - Seed initial inventory data (set total_quantity for each product)
     - Configure Stripe webhook endpoint in Stripe dashboard
     - Test webhook locally (Stripe CLI)
     - Configure Resend domain authentication
     - Test all email templates
     - Set production environment variables
     - Test full booking flow (guest + authenticated)
     - Verify SEO metadata on all pages
     - Submit sitemap to Google Search Console
     - Load test availability checking (concurrent users)

     Post-Launch

     - Monitor Stripe webhook logs daily
     - Monitor email delivery rates (Resend dashboard)
     - Track booking conversion funnel
     - Review inventory synchronization
     - Check for failed payments
     - Analyze SEO performance weekly

     ---
     Marketing Implementation

     Affordability Messaging

     - Homepage hero: "Affordable Golf Cart Rentals from $XX/day"
     - Pricing transparency: Show hourly/daily/weekly rates upfront
     - Bulk discount callouts: "Save 20% on 5+ carts"

     Events & Work Functions

     - Dedicated /events landing page
     - Testimonials from corporate clients
     - Case studies: "How XYZ Company Used Our Carts for Their Team Building Day"
     - Event-specific CTAs: "Book Your Event Fleet"

     Day Competitions

     - Homepage section: "Official Supplier for Golf Tournaments"
     - Same-day availability badge
     - Flexible hourly rates highlighted

     ---
     Risk Mitigation

     Risk 1: Inventory Overselling

     Mitigation: Database constraints + row-level locking + check_availability() function
     Monitoring: Daily inventory audit report

     Risk 2: Payment Processing Failures

     Mitigation: Stripe webhook retry logic + manual reconciliation dashboard
     Monitoring: Daily payment reconciliation

     Risk 3: Calendar Race Conditions

     Mitigation: Pessimistic locking during availability checks
     Monitoring: Log concurrent booking attempts

     Risk 4: Email Delivery Failures

     Mitigation: Resend retry queue + fallback to manual notification
     Monitoring: Email delivery rate dashboard

     Risk 5: Poor SEO Performance

     Mitigation: Comprehensive metadata + structured data + sitemap
     Monitoring: Google Search Console weekly reviews

     ---
     Future Enhancements (Post-MVP)

     1. Dynamic pricing (surge pricing for weekends/holidays)
     2. Subscription rentals (monthly unlimited membership)
     3. Mobile app (native iOS/Android)
     4. GPS fleet tracking
     5. Damage insurance add-on
     6. Loyalty program with points
     7. Referral system with discounts
     8. Multi-language expansion
     9. Partner API for golf courses
     10. Advanced analytics dashboard

     ---
     Summary

     This plan transforms Club Caddy into a comprehensive automated rental platform while maintaining existing purchase functionality. The phased approach ensures:

     1. Foundation first - Database and APIs before UI
     2. User experience - Seamless booking flow with real-time availability
     3. Business critical - Payment processing and email automation
     4. Discoverability - SEO optimization for organic traffic
     5. Operations - Admin tools for day-to-day management

     Estimated Timeline: 8-9 weeks for full implementation
     Core booking system: 4 weeks
     Polish and launch: Additional 4-5 weeks

     The system will handle multiple rental durations, multi-cart bookings, guest checkout, and full payment automation while maintaining a consistent, refined theme throughout.