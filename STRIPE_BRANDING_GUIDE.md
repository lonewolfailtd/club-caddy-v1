# Stripe Checkout Branding Guide

## Configure Stripe Dashboard Branding

To make your Stripe Checkout pages match the Club Caddy theme, follow these steps:

### 1. Access Stripe Branding Settings

1. Go to: https://dashboard.stripe.com/settings/branding
2. Make sure you're in **TEST MODE** (top right toggle)

### 2. Configure Brand Colors

Use these Club Caddy brand colors:

#### **Brand/Accent Color** (Primary Blue)
- **Hex Code**: `#0BA5EC`
- This will be used for buttons, links, and primary actions

#### **Button Text Color**
- **Hex Code**: `#FFFFFF` (White)

### 3. Upload Logo

1. Upload your Club Caddy logo (recommended size: 512x512px PNG with transparent background)
2. The logo will appear at the top of the checkout page

### 4. Configure Icon

1. Upload a square icon/favicon (recommended: 128x128px PNG)
2. This appears in the browser tab

### 5. Business Information

- **Business Name**: Club Caddy Carts
- **Support Email**: admin@clubcaddycarts.com
- **Support Phone**: (Add your support phone number)

### 6. Preview

After configuring, Stripe will show you a preview of how your checkout page will look.

---

## Additional Customization Options

### Custom Text (Already Configured in Code)

✅ **Submit Button Message**: "Your booking will be confirmed once payment is processed."
✅ **Terms of Service**: "I agree to the Club Caddy Carts rental terms and conditions."

### Payment Methods Enabled

- ✅ Credit/Debit Cards
- Consider enabling: Apple Pay, Google Pay (can be enabled in Dashboard > Settings > Payment methods)

---

## Color Reference

Here are the Club Caddy brand colors for reference:

| Color Name | Hex | HSL | Usage |
|------------|-----|-----|-------|
| **Primary Blue** | #0BA5EC | hsl(199, 89%, 48%) | Main brand color, buttons, links |
| **Burgundy/Rose** | #731425 | hsl(343, 88%, 28%) | Accent color (optional) |
| **Luxury Gold** | #D4A435 | hsl(45, 77%, 52%) | Premium accents |
| **White** | #FFFFFF | hsl(0, 0%, 100%) | Backgrounds, text on dark |
| **Dark Gray** | #0A0A0A | hsl(0, 0%, 4%) | Text, headers |

---

## Testing Your Branding

After configuration:

1. Create a test checkout session from your app
2. Complete a test payment using Stripe test cards:
   - **Success**: `4242 4242 4242 4242`
   - **Declined**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`
3. Use any future expiry date (e.g., 12/34)
4. Use any 3-digit CVC (e.g., 123)

---

**Note**: Branding changes made in Test Mode are separate from Live Mode. You'll need to configure both when you're ready to go live.
