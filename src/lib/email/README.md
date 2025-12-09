# Club Caddy Carts Email System

Complete email template system using Resend with the refined elegance theme.

## 📧 Email Templates Overview

All templates use:
- **Fonts**: Playfair Display (headings) + Inter (body text)
- **Brand Colour**: Rose-800 (#881337)
- **NZ English**: Proper spelling and grammar
- **Professional Tone**: Premium brand positioning

## 🔧 Setup

1. **Environment Variables** (already configured in `.env.local`):
```
RESEND_API_KEY=re_D4YvZ51h_NFCx7GoJJgY8t85aDmCMKuGY
RESEND_FROM_EMAIL=admin@clubcaddycarts.com
```

2. **Install Dependencies** (already installed):
```bash
npm install resend @react-email/render @react-email/components
```

## 📚 Available Templates

### Authentication Emails

#### 1. Welcome Email
Sent when a user creates an account.
```typescript
import { sendWelcomeEmail } from '@/lib/email/services/email-service'

await sendWelcomeEmail('customer@example.com', 'John Smith')
```

#### 2. Password Reset
Sent when a user requests a password reset.
```typescript
import { sendPasswordResetEmail } from '@/lib/email/services/email-service'

await sendPasswordResetEmail(
  'customer@example.com',
  'John Smith',
  'https://clubcaddycarts.com/reset-password?token=...',
  60 // expiry in minutes
)
```

#### 3. Email Verification
Sent to verify email address.
```typescript
import { sendEmailVerification } from '@/lib/email/services/email-service'

await sendEmailVerification(
  'customer@example.com',
  'John Smith',
  'https://clubcaddycarts.com/verify-email?token=...'
)
```

#### 4. Password Changed
Confirmation after password is changed.
```typescript
import { sendPasswordChangedEmail } from '@/lib/email/services/email-service'

await sendPasswordChangedEmail('customer@example.com', 'John Smith')
```

---

### Order Emails

#### 5. Order Confirmation
Sent after order is placed and deposit is paid.
```typescript
import { sendOrderConfirmation } from '@/lib/email/services/email-service'

await sendOrderConfirmation('customer@example.com', {
  name: 'John Smith',
  orderNumber: 'CC-2025-001',
  orderDate: new Date(),
  items: [
    {
      name: 'Ultimate Golf Cart 72V',
      quantity: 1,
      price: 18500,
      customisations: [
        '4" Lift Kit',
        'Premium Wheels & Tyres',
        'Full LED Package',
        'Lithium-Ion Battery'
      ]
    }
  ],
  subtotal: 18500,
  tax: 2775,
  depositAmount: 1000,
  totalAmount: 21275,
  estimatedDelivery: '6 weeks',
  trackingUrl: 'https://clubcaddycarts.com/orders/CC-2025-001'
})
```

#### 6. Order Shipped
Sent when order is shipped.
```typescript
import { sendOrderShipped } from '@/lib/email/services/email-service'

await sendOrderShipped('customer@example.com', {
  name: 'John Smith',
  orderNumber: 'CC-2025-001',
  trackingNumber: 'NZ123456789',
  trackingUrl: 'https://tracking.example.com/NZ123456789',
  carrier: 'NZ Post',
  estimatedDeliveryDate: '15 December 2025',
  shippingAddress: {
    street: '123 Golf Road',
    city: 'Auckland',
    postcode: '1010',
    country: 'New Zealand'
  }
})
```

#### 7. Order Delivered
Sent when order is delivered.
```typescript
import { sendOrderDelivered } from '@/lib/email/services/email-service'

await sendOrderDelivered('customer@example.com', {
  name: 'John Smith',
  orderNumber: 'CC-2025-001',
  deliveryDate: new Date(),
  serialNumber: 'CC72V-2025-001234',
  productName: 'Ultimate Golf Cart 72V',
  warrantyUrl: 'https://clubcaddycarts.com/warranty',
  supportUrl: 'https://clubcaddycarts.com/support'
})
```

#### 8. Order Cancelled
Sent when order is cancelled.
```typescript
import { sendOrderCancelled } from '@/lib/email/services/email-service'

await sendOrderCancelled('customer@example.com', {
  name: 'John Smith',
  orderNumber: 'CC-2025-001',
  orderDate: new Date('2025-01-01'),
  cancellationDate: new Date(),
  refundAmount: 1000,
  refundMethod: 'Original payment method',
  refundTimeframe: '5-7 business days',
  cancellationReason: 'Customer request'
})
```

#### 9. Payment Received
Sent when final balance is paid.
```typescript
import { sendPaymentReceived } from '@/lib/email/services/email-service'

await sendPaymentReceived('customer@example.com', {
  name: 'John Smith',
  orderNumber: 'CC-2025-001',
  paymentDate: new Date(),
  thisPayment: 20275,
  totalPaid: 21275,
  orderTotal: 21275,
  receiptUrl: 'https://clubcaddycarts.com/receipts/...',
  trackingUrl: 'https://clubcaddycarts.com/orders/CC-2025-001',
  estimatedDelivery: '2 weeks'
})
```

---

### Quote Request Emails

#### 10. Quote Received (Customer)
Sent to customer when they submit a quote request.
```typescript
import { sendQuoteReceivedToCustomer } from '@/lib/email/services/email-service'

await sendQuoteReceivedToCustomer('customer@example.com', {
  name: 'John Smith',
  quoteNumber: 'Q-2025-001',
  submissionDate: new Date(),
  expectedResponseTime: '48 hours',
  selectedProduct: 'Ultimate Golf Cart 72V',
  customisations: {
    liftKit: '4" Lift Kit',
    wheels: 'Premium Wheels & Tyres',
    lighting: 'Full LED Package',
    battery: 'Lithium-Ion',
    accessories: ['Cup Holders', 'Storage Box', 'Bluetooth Sound System']
  },
  budgetRange: '$20,000 - $30,000',
  purchaseTimeline: '1-3 months',
  additionalNotes: 'Would like to see it in person',
  contactDetails: {
    email: 'customer@example.com',
    phone: '+64 21 123 4567'
  }
})
```

#### 11. Quote Received (Admin)
Sent to admin when new quote request is submitted.
```typescript
import { sendQuoteReceivedToAdmin } from '@/lib/email/services/email-service'

await sendQuoteReceivedToAdmin({
  // Same data as customer version
  name: 'John Smith',
  quoteNumber: 'Q-2025-001',
  // ... rest of data
})
```

#### 12. Quote Ready
Sent to customer when their quote is ready.
```typescript
import { sendQuoteReady } from '@/lib/email/services/email-service'

await sendQuoteReady('customer@example.com', {
  name: 'John Smith',
  quoteNumber: 'Q-2025-001',
  quoteDate: new Date(),
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  quoteUrl: 'https://clubcaddycarts.com/quotes/Q-2025-001',
  items: [
    { category: 'Base Cart', description: 'Ultimate Golf Cart 72V', amount: 15000 },
    { category: 'Lift Kit', description: '4" Premium Lift Kit', amount: 1500 },
    { category: 'Wheels & Tyres', description: 'Premium Package', amount: 2000 },
    { category: 'Lighting', description: 'Full LED Package', amount: 800 },
    { category: 'Battery', description: 'Lithium-Ion Upgrade', amount: 2000 },
    { category: 'Accessories', description: 'Sound System, Storage', amount: 700 }
  ],
  subtotal: 22000,
  gst: 3300,
  total: 25300,
  depositRequired: 1000,
  estimatedDelivery: '6 weeks',
  specialConditions: [
    'Price valid for 30 days',
    'Deposit required to commence build',
    'Balance due before delivery'
  ],
  additionalInfo: 'Contact us if you have any questions about this quote.'
})
```

---

### Refund Emails

#### 13. Refund Requested
Sent when customer requests a refund.
```typescript
import { sendRefundRequested } from '@/lib/email/services/email-service'

await sendRefundRequested('customer@example.com', {
  name: 'John Smith',
  orderNumber: 'CC-2025-001',
  requestDate: new Date(),
  refundAmount: 1000,
  reason: 'Changed my mind',
  reviewTimeframe: '5-7 business days'
})
```

#### 14. Refund Approved
Sent when refund is approved.
```typescript
import { sendRefundApproved } from '@/lib/email/services/email-service'

await sendRefundApproved('customer@example.com', {
  name: 'John Smith',
  orderNumber: 'CC-2025-001',
  approvalDate: new Date(),
  refundAmount: 1000,
  paymentMethod: 'Visa ending in 1234',
  estimatedTimeframe: '5-10 business days'
})
```

#### 15. Refund Processed
Sent when refund is completed.
```typescript
import { sendRefundProcessed } from '@/lib/email/services/email-service'

await sendRefundProcessed('customer@example.com', {
  name: 'John Smith',
  orderNumber: 'CC-2025-001',
  processedDate: new Date(),
  refundAmount: 1000,
  transactionId: 'REF-2025-001234',
  destinationAccount: 'Visa ending in 1234'
})
```

---

### General Emails

#### 16. Contact Form Confirmation
Sent when someone submits the contact form.
```typescript
import { sendContactFormConfirmation } from '@/lib/email/services/email-service'

await sendContactFormConfirmation('customer@example.com', {
  name: 'John Smith',
  submissionDate: new Date(),
  subject: 'Question about golf carts',
  message: 'I would like to know more about your products...',
  email: 'customer@example.com',
  phone: '+64 21 123 4567',
  areasOfInterest: ['Products', 'Customisation', 'Pricing']
})
```

#### 17. Newsletter Welcome
Sent when someone subscribes to the newsletter.
```typescript
import { sendNewsletterWelcome } from '@/lib/email/services/email-service'

await sendNewsletterWelcome('customer@example.com', {
  name: 'John Smith',
  email: 'customer@example.com',
  subscriptionDate: new Date(),
  welcomeOffer: {
    code: 'WELCOME10',
    discountPercent: 10
  },
  preferences: ['New Products', 'Special Offers', 'Events']
})
```

## 🚀 Direct Email Sending

For more control, use the `sendEmail` function directly:

```typescript
import { sendEmail } from '@/lib/email/send'
import { WelcomeEmail } from '@/lib/email/templates'
import * as React from 'react'

await sendEmail({
  to: 'customer@example.com',
  subject: 'Welcome!',
  react: React.createElement(WelcomeEmail, { name: 'John', email: 'customer@example.com' }),
  replyTo: 'support@clubcaddycarts.com',
  cc: 'admin@clubcaddycarts.com'
})
```

## 📝 Testing Emails

To preview emails locally, you can use the React Email preview tool:

```bash
# Install React Email CLI
npm install -g react-email

# Preview emails
react-email dev
```

## 🎨 Customising Templates

All templates are located in `src/lib/email/templates/`. Each template uses:

- **Base Layout**: `templates/base-layout.tsx` - Shared header, footer, and components
- **Reusable Components**: Heading, Paragraph, Button, Divider, InfoBox, HighlightBox

To customise the brand elements, edit `base-layout.tsx`.

## 📞 Support

All emails include:
- Phone: +64 021 560 307
- Email: admin@clubcaddycarts.com
- Location: New Zealand

## 🔒 Security

- API key stored in `.env.local` (never commit to git)
- All emails sent through Resend's secure servers
- Templates use safe HTML email structure

---

**Created for Club Caddy Carts** - New Zealand's Premier Electric Golf Carts
