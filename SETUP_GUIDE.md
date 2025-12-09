# Club Caddy - Setup Guide

This guide will help you set up admin access and seed initial data for the Club Caddy rental platform.

## Prerequisites

- ✅ Supabase project created
- ✅ Database migrations run (`supabase/migrations/*.sql`)
- ✅ `.env.local` configured with Supabase credentials
- ✅ At least one user account created (sign up through the app)

## Option 1: Automated Setup (Recommended)

Use the Node.js script for quick setup:

```bash
# Install dependencies (if not already done)
npm install

# Run setup with your email
node scripts/run-setup.js your-email@example.com

# Or use default email (admin@clubcaddycarts.com)
node scripts/run-setup.js
```

### What the script does:
1. ✅ Makes your user account an admin (`is_admin = true`)
2. ✅ Enables rental for all golf cart products
3. ✅ Seeds inventory data:
   - Standard Edition: 10 carts
   - Premium Edition: 8 carts
   - Ultimate Edition: 5 carts
4. ✅ Seeds rental pricing:
   - Standard: $45/hr, $150/day, $900/week
   - Premium: $60/hr, $200/day, $1200/week
   - Ultimate: $80/hr, $280/day, $1680/week

---

## Option 2: Manual Setup via SQL

If you prefer to run SQL directly:

### Step 1: Create Admin User

1. First, sign up through the app at `/auth/signup`
2. Then run this SQL in Supabase SQL Editor:

```sql
-- Replace with your actual email
UPDATE profiles
SET is_admin = true
WHERE email = 'your-email@example.com';

-- Verify admin user
SELECT id, email, is_admin FROM profiles WHERE is_admin = true;
```

### Step 2: Seed Inventory and Pricing

Run the complete SQL file:

```bash
# Copy the SQL file contents
cat scripts/setup-admin-and-seed.sql

# Run in Supabase SQL Editor or via psql
```

Or run individual commands from `scripts/setup-admin-and-seed.sql`.

---

## Option 3: Using Supabase CLI

```bash
# Start Supabase locally
npm run supabase:start

# Run the setup SQL file
supabase db execute --file scripts/setup-admin-and-seed.sql

# For production, use --remote flag
supabase db execute --remote --file scripts/setup-admin-and-seed.sql
```

---

## Verification

After setup, verify everything is configured correctly:

### 1. Check Admin Access
```bash
# Log in to the admin dashboard
http://localhost:3000/admin
```

You should see:
- ✅ Dashboard with statistics
- ✅ Navigation to Bookings, Inventory, Pricing, Quotes

### 2. Check Inventory
Navigate to `/admin/inventory`:
- ✅ Standard Edition: 10 total, 10 available
- ✅ Premium Edition: 8 total, 8 available
- ✅ Ultimate Edition: 5 total, 5 available

### 3. Check Pricing
Navigate to `/admin/pricing`:
- ✅ All products have hourly, daily, weekly, and monthly rates
- ✅ All pricing is marked as "Active"
- ✅ Deposit amounts are set

### 4. Test Booking Flow
Try making a test booking:
1. Go to `/products`
2. Select a product
3. Click "Book Now" or navigate to `/booking/[product-slug]`
4. Complete the booking form
5. Proceed to Stripe checkout (use test card: 4242 4242 4242 4242)

---

## Customizing Initial Data

### Adjust Inventory Quantities

Edit `scripts/run-setup.js` and modify:

```javascript
const inventoryData = [
  { tier: 'Standard', total: 15 },  // Change from 10 to 15
  { tier: 'Premium', total: 12 },   // Change from 8 to 12
  { tier: 'Ultimate', total: 8 }    // Change from 5 to 8
];
```

### Adjust Pricing

Edit `scripts/run-setup.js` and modify:

```javascript
const pricingData = [
  {
    tier: 'Standard',
    hourly_rate: 50.00,    // Changed from 45.00
    daily_rate: 180.00,    // Changed from 150.00
    weekly_rate: 1080.00,  // Changed from 900.00
    monthly_rate: 3600.00, // Changed from 3000.00
    deposit: 150.00        // Changed from 100.00
  },
  // ... other tiers
];
```

---

## Troubleshooting

### "No profile found with that email"
**Problem:** User account doesn't exist yet.

**Solution:**
1. Sign up at `/auth/signup` first
2. Then run the setup script again

### "SUPABASE_SERVICE_ROLE_KEY not found"
**Problem:** Missing service role key in `.env.local`

**Solution:**
1. Get service role key from Supabase dashboard: Settings > API
2. Add to `.env.local`:
```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### "permission denied for table inventory"
**Problem:** Database migrations not run.

**Solution:**
```bash
# Run migrations
npm run migrate

# Or using Supabase CLI
supabase db push
```

### Can't access /admin after setup
**Problem:** is_admin flag not set correctly.

**Solution:**
```sql
-- Verify admin status
SELECT email, is_admin FROM profiles WHERE email = 'your-email@example.com';

-- If false, update again
UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';
```

---

## Adding More Admin Users

To give admin access to additional users:

```sql
UPDATE profiles
SET is_admin = true
WHERE email = 'another-admin@example.com';
```

Or use the Admin Dashboard:
1. Navigate to `/admin/users` (if implemented)
2. Select user and toggle admin status

---

## Production Deployment

Before deploying to production:

1. **Update Admin Email:**
```bash
node scripts/run-setup.js production-admin@clubcaddycarts.com
```

2. **Review Inventory:**
- Set accurate cart quantities based on actual inventory
- Add availability blocks for maintenance periods

3. **Review Pricing:**
- Confirm pricing is competitive for Auckland market
- Set appropriate deposit amounts

4. **Test Complete Flow:**
- Test booking with real Stripe account
- Verify email notifications work
- Test admin dashboard operations

5. **Set up Monitoring:**
- Enable Supabase logs
- Set up Stripe webhook monitoring
- Configure email delivery tracking

---

## Next Steps

After setup is complete:

1. ✅ Configure Stripe webhook endpoint in Stripe dashboard
2. ✅ Test email notifications with Resend
3. ✅ Submit sitemap to Google Search Console
4. ✅ Set up availability blocks for holidays/maintenance
5. ✅ Add product images to Supabase Storage
6. ✅ Test complete booking flow end-to-end

---

## Support

For issues or questions:
- Check `hire-plan.md` for implementation details
- Review database schema in `supabase/migrations/*.sql`
- Check API routes in `src/app/api/*`
- Review admin documentation in `src/app/admin/README.md`

---

## Summary

Quick setup command:
```bash
node scripts/run-setup.js your-email@example.com
```

That's it! Your Club Caddy rental platform is now ready to accept bookings. 🎉
