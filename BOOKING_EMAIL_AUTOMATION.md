# Booking Email Automation

This document describes the email automation system for the Club Caddy booking platform, implemented as part of Phase 6 of the hire-plan.

## Overview

The booking email automation system sends professional, responsive email notifications at key points in the rental booking lifecycle. All emails use React Email components and follow the refined elegance theme established for Club Caddy Carts.

## Email Templates

### 1. Booking Confirmation (Customer)
**File:** `src/lib/email/templates/bookings/booking-confirmation-customer.tsx`

**Trigger:** Sent immediately after successful payment (Stripe webhook: `checkout.session.completed`)

**Contains:**
- Booking number and confirmation
- Complete rental details (dates, quantity, cart model)
- Payment summary with itemized breakdown
- Delivery/pickup information
- Special requests
- Next steps and important policies
- Cancellation policy
- Contact information

**Key Features:**
- Full payment breakdown including GST
- Professional booking number display
- Clear rental period dates and duration
- Highlighted next steps
- Mobile-responsive design

### 2. Booking Confirmation (Admin)
**File:** `src/lib/email/templates/bookings/booking-confirmation-admin.tsx`

**Trigger:** Sent immediately after successful payment (Stripe webhook: `checkout.session.completed`)

**Contains:**
- Booking number and internal booking ID
- Customer contact information (clickable email/phone)
- Complete rental details
- Payment information and Stripe payment intent ID
- Delivery/pickup requirements
- Special requests (highlighted)
- Action checklist for operations team

**Key Features:**
- Admin-focused action items
- Stripe payment intent reference for reconciliation
- Clear operational requirements
- Emphasis on special requests and delivery needs

### 3. Booking Reminder
**File:** `src/lib/email/templates/bookings/booking-reminder.tsx`

**Trigger:** Sent 24 hours before rental start date (requires cron job - see Implementation Notes)

**Contains:**
- Friendly reminder of upcoming rental
- Booking number
- Rental summary
- Delivery/pickup details and timing
- Special requests recap
- Important reminders (safety, contact info, weather, return condition)
- What to expect at delivery/pickup
- Easy-to-find contact information

**Key Features:**
- Friendly, helpful tone
- Clear timing information
- Practical preparation tips
- Emergency contact details prominently displayed

### 4. Booking Thank You
**File:** `src/lib/email/templates/bookings/booking-thank-you.tsx`

**Trigger:** Sent after rental end date (requires cron job - see Implementation Notes)

**Contains:**
- Thank you message
- Booking recap
- Feedback request with link
- 10% discount code for next rental (RETURN10)
- Reasons to rent again (value propositions)
- Referral program information
- Stay connected / social media follow
- Booking CTA with discount code pre-applied

**Key Features:**
- Customer retention focus
- Tangible incentive (10% discount)
- Feedback collection
- Referral encouragement
- Re-engagement CTA

## Email Service Functions

### Location
`src/lib/email/send.ts`

### Functions

#### `sendBookingConfirmationEmail(booking: BookingWithProduct)`
Sends the customer confirmation email after successful payment.

**Parameters:**
- `booking`: Complete booking object with product details

**Returns:**
- `{ success: boolean, id?: string, error?: any }`

**Usage:**
```typescript
import { sendBookingConfirmationEmail } from '@/lib/email/send'

const result = await sendBookingConfirmationEmail(bookingWithProduct)
if (result.success) {
  console.log('Confirmation email sent')
}
```

#### `sendBookingConfirmationAdminEmail(booking: BookingWithProduct)`
Sends the admin notification email after successful payment.

**Parameters:**
- `booking`: Complete booking object with product details

**Returns:**
- `{ success: boolean, id?: string, error?: any }`

**Environment Variables:**
- `ADMIN_EMAIL`: Admin email address (defaults to admin@clubcaddycarts.com)

#### `sendBookingReminderEmail(booking: BookingWithProduct)`
Sends the reminder email 24 hours before rental start.

**Parameters:**
- `booking`: Complete booking object with product details

**Returns:**
- `{ success: boolean, id?: string, error?: any }`

**Note:** Should be called by a cron job that queries bookings starting tomorrow.

#### `sendBookingThankYouEmail(booking: BookingWithProduct)`
Sends the thank you email after rental completion.

**Parameters:**
- `booking`: Complete booking object with product details

**Returns:**
- `{ success: boolean, id?: string, error?: any }`

**Environment Variables:**
- `NEXT_PUBLIC_SITE_URL`: Base URL for feedback link generation

**Note:** Should be called by a cron job that queries completed bookings.

## Webhook Integration

### Stripe Webhook Handler
**File:** `src/app/api/stripe/webhooks/route.ts`

The webhook handler has been updated to automatically send confirmation emails when payment is successful.

**Event:** `checkout.session.completed`

**Flow:**
1. Stripe sends webhook event
2. Webhook verifies signature
3. Updates booking status to 'confirmed' and payment_status to 'paid'
4. Fetches complete booking details with product information
5. Sends customer confirmation email
6. Sends admin notification email
7. Updates `confirmation_email_sent` flag in database

**Error Handling:**
- Emails are sent asynchronously
- Failures are logged but don't block webhook acknowledgment
- Database flag tracks email delivery status

## Testing

### Email Preview Page
**URL:** `http://localhost:3000/email-preview`

A dedicated email preview page has been created to test all booking email templates with sample data.

**Features:**
- Live preview of all email templates
- Category-based navigation (Auth, Orders, Bookings)
- Sample data for each template
- Responsive iframe preview
- Easy testing without sending actual emails

**Access the Booking Templates:**
1. Navigate to `/email-preview`
2. Select "Bookings" category
3. Choose from:
   - Booking Confirmation (Customer)
   - Booking Confirmation (Admin)
   - Booking Reminder
   - Booking Thank You

### Testing Webhook Emails

**Using Stripe CLI:**
```bash
# Forward webhooks to local development
stripe listen --forward-to localhost:3000/api/stripe/webhooks

# Trigger test checkout.session.completed event
stripe trigger checkout.session.completed
```

**Manual Testing:**
```typescript
// In your test file or API route
import { sendBookingConfirmationEmail } from '@/lib/email/send'

const testBooking = {
  // ... booking data
}

await sendBookingConfirmationEmail(testBooking)
```

## Implementation Notes

### Completed
- ✅ 4 booking email templates created
- ✅ Email service functions implemented
- ✅ Stripe webhook integration complete
- ✅ Email preview page updated with booking templates
- ✅ All templates use BaseLayout for consistency
- ✅ Responsive design matching refined elegance theme
- ✅ TypeScript types for all email props

### Pending (Future Implementation)

#### Cron Jobs for Scheduled Emails

The reminder and thank you emails require scheduled jobs to be implemented. Two approaches:

**Option 1: Vercel Cron Jobs (Recommended)**

Create `src/app/api/cron/booking-reminders/route.ts`:
```typescript
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Query bookings starting tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, products(*)')
    .eq('status', 'confirmed')
    .eq('reminder_email_sent', false)
    .gte('start_date', tomorrow.toISOString().split('T')[0])
    .lt('start_date', /* day after tomorrow */)

  // Send reminder emails
  for (const booking of bookings) {
    await sendBookingReminderEmail(booking)
    // Update reminder_email_sent flag
  }

  return Response.json({ success: true, sent: bookings.length })
}
```

Create `src/app/api/cron/booking-thank-you/route.ts`:
```typescript
export async function GET(request: Request) {
  // Similar implementation for completed bookings
}
```

Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/booking-reminders",
    "schedule": "0 9 * * *"
  }, {
    "path": "/api/cron/booking-thank-you",
    "schedule": "0 10 * * *"
  }]
}
```

**Option 2: External Cron Service**
Use services like:
- Cron-job.org
- EasyCron
- AWS EventBridge
- Google Cloud Scheduler

Configure to hit your API routes at scheduled times.

## Environment Variables

Required environment variables for email automation:

```env
# Resend API (already configured)
RESEND_API_KEY=re_...

# Stripe (already configured)
STRIPE_WEBHOOK_SECRET=whsec_...

# Admin notifications
ADMIN_EMAIL=admin@clubcaddycarts.com

# Site URL for links
NEXT_PUBLIC_SITE_URL=https://clubcaddycarts.com

# Cron job authentication (for scheduled emails)
CRON_SECRET=your_random_secret_here
```

## Email Branding

All booking emails follow the Club Caddy refined elegance theme:

**Colors:**
- Primary: Rose-800 (#881337)
- Secondary: Zinc gray scale
- Accents: Rose gradients

**Typography:**
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

**Components:**
- Gradient header with hexagon pattern
- Rose accent dividers
- InfoBox (gray background)
- HighlightBox (rose tinted background)
- Professional button styling

**Responsive Design:**
- Mobile-optimized tables
- 600px max width for desktop
- Touch-friendly buttons
- Readable font sizes

## Database Schema Notes

Email tracking fields in `bookings` table:
- `confirmation_email_sent`: BOOLEAN - Tracks if confirmation was sent
- `reminder_email_sent`: BOOLEAN - Tracks if reminder was sent

These flags prevent duplicate emails and allow retry logic.

## Troubleshooting

### Email Not Sending from Webhook
1. Check Stripe webhook logs in dashboard
2. Verify `STRIPE_WEBHOOK_SECRET` is correct
3. Check server logs for email sending errors
4. Verify `RESEND_API_KEY` is valid
5. Ensure booking has associated product data

### Email Formatting Issues
1. Test in email preview page first
2. Check React Email component syntax
3. Verify all props are passed correctly
4. Test in multiple email clients (Gmail, Outlook, Apple Mail)

### Scheduled Emails Not Sending
1. Verify cron job is configured and running
2. Check cron job authentication
3. Verify database query is returning correct bookings
4. Check reminder_email_sent flags are being updated

## Future Enhancements

Potential improvements for the email system:

1. **Email Analytics**
   - Track open rates using Resend analytics
   - Track click-through rates for CTAs
   - A/B test email variations

2. **Email Preferences**
   - Allow customers to opt-out of marketing emails
   - Customize reminder timing preference
   - SMS notifications as alternative

3. **Additional Emails**
   - Booking modification confirmation
   - Cancellation confirmation
   - Payment failure notification
   - Cart maintenance delays

4. **Personalization**
   - Previous rental history
   - Seasonal promotions
   - Location-based offers
   - Birthday/anniversary discounts

5. **Internationalization**
   - Multi-language support
   - Currency formatting
   - Date/time localization

## Support

For issues with the email automation system:
- Check logs in Vercel dashboard
- Review Resend delivery logs
- Test with email preview page
- Verify environment variables
- Check Stripe webhook delivery logs

## Links

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
