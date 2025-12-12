# Stripe Payment Testing Guide

## Current Setup Status ✅

Your Stripe integration is now fully configured and ready for testing!

**Services Running:**
- ✅ Next.js Dev Server: http://localhost:3000
- ✅ Stripe Webhook Listener: Forwarding events to localhost:3000/api/stripe/webhooks
- ✅ Test Mode: Active (all payments are simulated)
- ✅ Webhook Secret: Configured
- ✅ API Keys: Configured

---

## End-to-End Payment Flow

### Step 1: Create a Test Booking

1. Navigate to: http://localhost:3000/hire
2. Click "Book Now" on any cart package
3. Fill out the booking form:
   - **Rental Type**: Daily, Hourly, or Weekly
   - **Start/End Dates**: Select future dates
   - **Quantity**: Select number of carts (1-10)
   - **Customer Details**:
     - Name: Test Customer
     - Email: test@example.com
     - Phone: 021 123 4567
   - **Delivery/Pickup**: Choose either option
   - **Special Requests**: (Optional)

4. Click **"Complete Booking"** button

### Step 2: Stripe Checkout Page

You'll be redirected to Stripe's hosted checkout page with:
- **Product details** and images
- **Rental period** information
- **Total amount** with GST breakdown
- **Secure payment form**

### Step 3: Test Payment with Stripe Test Cards

Use these test card numbers (they won't charge real money):

#### ✅ Successful Payment
```
Card Number: 4242 4242 4242 4242
Expiry: 12/34 (any future date)
CVC: 123 (any 3 digits)
Postal Code: 12345
```

#### ❌ Card Declined
```
Card Number: 4000 0000 0000 0002
Expiry: 12/34
CVC: 123
```

#### 🔐 Requires 3D Secure Authentication
```
Card Number: 4000 0025 0000 3155
Expiry: 12/34
CVC: 123
(Will prompt for additional authentication)
```

#### 💳 Insufficient Funds
```
Card Number: 4000 0000 0000 9995
Expiry: 12/34
CVC: 123
```

### Step 4: Payment Confirmation

After successful payment:

1. **Stripe redirects** you to: `http://localhost:3000/bookings/[booking-id]?success=true`
2. **Success message** appears confirming payment
3. **Booking details** are displayed with:
   - Booking number
   - Payment status: PAID
   - Confirmation that email was sent
4. **Webhook processes** the payment:
   - Updates booking status to "confirmed"
   - Marks payment as "paid"
   - Sends confirmation email (if RESEND_API_KEY is configured)
   - Creates audit log entry

---

## What Happens Behind the Scenes

### When You Click "Complete Booking":

1. **POST /api/bookings/create**
   - Creates booking record in Supabase
   - Status: "pending"
   - Payment status: "processing"

2. **POST /api/stripe/create-checkout-session**
   - Creates Stripe checkout session
   - Links session to booking
   - Generates secure payment URL
   - Session expires in 30 minutes

3. **Redirect to Stripe**
   - User enters payment details
   - Stripe processes payment securely

### When Payment Succeeds:

4. **Stripe sends webhook** → `POST /api/stripe/webhooks`
   - Event type: `checkout.session.completed`
   - Webhook signature is verified

5. **Webhook Handler Updates Database:**
   - Booking status → "confirmed"
   - Payment status → "paid"
   - Adds payment timestamp
   - Stores Stripe payment intent ID

6. **Sends Confirmation Emails:**
   - Customer confirmation email
   - Admin notification email
   - Updates `confirmation_email_sent` flag

7. **Creates Audit Log:**
   - Logs successful payment
   - Records amount, payment intent ID
   - Stores IP address and user agent

8. **User Redirected Back:**
   - Returns to booking confirmation page
   - Shows success message

---

## Monitoring Webhook Events

### In Your Terminal

Watch the Stripe webhook listener output for events:

```
[EVENTS]
2025-12-12 12:34:56   --> checkout.session.completed [evt_xxx]
2025-12-12 12:34:56   <-- [200] POST http://localhost:3000/api/stripe/webhooks
```

### In Your Next.js Console

Check for webhook processing logs:

```
Received Stripe webhook event: checkout.session.completed
Processing checkout.session.completed for booking [booking-id]
Booking [booking-id] marked as paid and confirmed
Confirmation email sent successfully to test@example.com
```

### In Stripe Dashboard

1. Go to: https://dashboard.stripe.com/test/events
2. See all webhook events
3. Click any event to see:
   - Event details
   - Webhook delivery attempts
   - Response from your endpoint

---

## Testing Different Scenarios

### Scenario 1: Successful Payment ✅

**Test Card:** `4242 4242 4242 4242`

**Expected Outcome:**
- ✅ Payment succeeds
- ✅ Booking status: "confirmed"
- ✅ Payment status: "paid"
- ✅ Confirmation emails sent
- ✅ Redirected to success page

### Scenario 2: Payment Declined ❌

**Test Card:** `4000 0000 0000 0002`

**Expected Outcome:**
- ❌ Payment fails
- ⚠️ Error message shown in Stripe checkout
- ⚠️ Booking remains "pending"
- ⚠️ User can try different payment method

### Scenario 3: Session Expires ⏰

**Steps:**
1. Create booking
2. Wait 30 minutes without paying
3. Try to complete payment

**Expected Outcome:**
- ⚠️ Session expired message
- ⚠️ Booking status: "cancelled"
- ⚠️ Cancellation reason: "Payment session expired (30 minutes)"

### Scenario 4: Payment Cancelled by User 🚫

**Steps:**
1. Create booking
2. Click "Cancel" or "Back" in Stripe checkout

**Expected Outcome:**
- ⚠️ Redirected to: `/bookings/[id]?cancelled=true`
- ⚠️ Booking remains "pending"
- ✅ Can retry payment with "Complete Payment" button

---

## Common Issues & Solutions

### Issue: Webhook not receiving events

**Solution:**
1. Check Stripe webhook listener is running
2. Verify it's forwarding to correct port (3000)
3. Restart webhook listener: `stripe listen --forward-to localhost:3000/api/stripe/webhooks`

### Issue: Environment variables not loading

**Solution:**
1. Restart Next.js dev server after changing `.env.local`
2. Verify all three Stripe keys are uncommented:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`

### Issue: "Stripe key not found" error

**Solution:**
1. Check `.env.local` file has Stripe keys
2. Ensure dev server restarted after adding keys
3. Verify keys match your Stripe account

### Issue: Webhook signature verification failed

**Solution:**
1. Check `STRIPE_WEBHOOK_SECRET` matches webhook listener output
2. Restart both webhook listener and dev server
3. The secret changes each time you restart the listener

---

## Stripe Dashboard - Test Mode Tools

### Useful Links

- **Dashboard Home**: https://dashboard.stripe.com/test/dashboard
- **Payments**: https://dashboard.stripe.com/test/payments
- **Customers**: https://dashboard.stripe.com/test/customers
- **Webhook Events**: https://dashboard.stripe.com/test/events
- **Logs**: https://dashboard.stripe.com/test/logs
- **Branding Settings**: https://dashboard.stripe.com/settings/branding

### Viewing Test Payments

1. Go to: https://dashboard.stripe.com/test/payments
2. Click any payment to see:
   - Amount, currency, status
   - Customer details
   - Booking metadata
   - Event timeline
   - Webhook deliveries

### Triggering Test Webhooks

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click "Add endpoint"
3. Or use CLI: `stripe trigger checkout.session.completed`

---

## Next Steps

### 1. Configure Stripe Branding

See `STRIPE_BRANDING_GUIDE.md` for instructions to:
- Upload your logo
- Set brand colors (#0BA5EC)
- Customize checkout appearance

### 2. Enable Email Confirmations

To send real confirmation emails:
1. Uncomment `RESEND_API_KEY` in `.env.local`
2. Add your Resend API key
3. Emails will be sent on successful payments

### 3. Test Refunds (Optional)

```bash
# In Stripe CLI
stripe refunds create --payment-intent=pi_xxx --amount=5000
```

This will trigger the `charge.refunded` webhook and:
- Update booking status to "refunded"
- Cancel the booking
- Create audit log entry

---

## Production Checklist

Before going live:

- [ ] Switch to Live Mode in Stripe Dashboard
- [ ] Update `.env.local` with live keys (pk_live_..., sk_live_...)
- [ ] Configure production webhook endpoint in Stripe Dashboard
- [ ] Update webhook secret to production secret
- [ ] Configure custom domain in Stripe branding
- [ ] Test with real card (use small amount like $1.00)
- [ ] Set up proper error monitoring (Sentry, etc.)
- [ ] Review and adjust rate limits if needed
- [ ] Enable additional payment methods (Apple Pay, Google Pay)

---

## Support

**Stripe Documentation:**
- Testing Guide: https://stripe.com/docs/testing
- Checkout: https://stripe.com/docs/payments/checkout
- Webhooks: https://stripe.com/docs/webhooks

**Need Help?**
- Check Stripe Dashboard logs
- Review webhook delivery attempts
- Check browser console for errors
- Review server logs for API errors
