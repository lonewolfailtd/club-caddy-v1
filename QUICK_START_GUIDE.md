# Club Caddy Carts - Quick Start Guide

## 🚀 Getting Your Site Production-Ready

Follow these steps in order to get your website live with real data and proper security.

---

## Step 1: Add Product Data to Supabase (15 minutes)

**What:** Populate your database with 3 golf cart models and 8 add-ons

**How:**
1. Go to https://supabase.com and log in to your project
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open `scripts/seed-products.sql` from this repo
5. Copy the entire contents and paste into Supabase
6. Click **Run** (or press Ctrl+Enter)
7. You should see: "Products Added: 3" and "Add-ons Added: 8"

**Products Added:**
- Classic Caddy (Standard) - $11,500
- Elite Caddy (Premium) - $14,000
- Prestige Caddy (Ultimate) - $16,500

**Verify:** Visit http://localhost:3004/products - you should now see all 3 carts!

**Full Guide:** See `scripts/README-SEEDING.md`

---

## Step 2: Enable RLS Security Policies (10 minutes) ⚠️ CRITICAL

**What:** Re-enable Row Level Security (currently DISABLED = security risk!)

**Why:** Right now anyone can access/modify your database. This fixes that.

**How:**
1. In Supabase SQL Editor, click **New Query**
2. Open `scripts/enable-rls-policies-production.sql`
3. Copy the entire contents and paste into Supabase
4. Click **Run**
5. You should see: "✅ RLS Policies Enabled Successfully"

**Test After Running:**
- Log in as admin → Should work ✅
- Visit /products → Should show products ✅
- Try submitting quote form → Should work ✅
- Log out and try to access /admin → Should redirect to login ✅

**If Something Breaks:**
The script includes instructions to temporarily disable RLS while you debug.

---

## Step 3: Upload Product Images (30 minutes)

**What:** Replace placeholder images with real golf cart photos

**Images Needed (15 total):**

**Classic Caddy** (Standard tier):
- `public/images/products/caddy-cart01.jpg`
- `public/images/products/caddy-cart02.jpg`
- `public/images/products/caddy-cart03.jpg`
- `public/images/products/caddy-cart04.jpg`

**Elite Caddy** (Premium tier):
- `public/images/products/caddy-cart05.jpg`
- `public/images/products/caddy-cart06.jpg`
- `public/images/products/caddy-cart07.jpg`
- `public/images/products/caddy-cart08.jpg`
- `public/images/products/caddy-cart09.jpg`

**Prestige Caddy** (Ultimate tier):
- `public/images/products/caddy-cart10.jpg`
- `public/images/products/caddy-cart11.jpg`
- `public/images/products/caddy-cart12.jpg`
- `public/images/products/caddy-cart13.jpg`
- `public/images/products/caddy-cart14.jpg`

**Image Requirements:**
- Format: JPG (or WebP for better compression)
- Recommended size: 1200x800px minimum
- Max file size: 500KB each (compress with TinyPNG.com)
- Show carts from different angles
- Professional quality photos

**How to Add:**
1. Place images in `public/images/products/` folder
2. Commit to git: `git add public/images/products/ && git commit -m "Add product images" && git push`
3. Refresh products page to see them

---

## Step 4: Set Up Email Service (30 minutes)

**What:** Enable quote/contact form emails using Resend

**How:**

### A. Sign Up for Resend
1. Go to https://resend.com
2. Sign up for free account (100 emails/day free)
3. Click **API Keys** in sidebar
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

### B. Add to Environment Variables
1. Open `.env.local` in your project
2. Add this line:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
3. Save the file

### C. Verify Domain (Optional but Recommended)
1. In Resend dashboard, click **Domains**
2. Click **Add Domain**
3. Enter: `clubcaddycarts.com`
4. Follow DNS setup instructions
5. Wait for verification (can take up to 48 hours)

**Test:**
1. Restart your dev server
2. Submit a quote request form
3. Check your email (and spam folder)

**Troubleshooting:**
- If emails don't send, check browser console for errors
- Verify API key is correct in `.env.local`
- Make sure you restarted the server after adding the key

---

## Step 5: Update Content (1 hour)

**Review and update these:**

### A. Contact Information
File: `src/components/layout/Footer.tsx` and `Header.tsx`
- [ ] Phone number: +64 021 560 307
- [ ] Email: admin@clubcaddycarts.com
- [ ] Location: Auckland, New Zealand

### B. Pricing
Files: Product pages and database
- [ ] Verify all prices are correct
- [ ] Update if needed in `scripts/seed-products.sql` and re-run

### C. Social Media Links
File: `src/components/layout/Footer.tsx`
- [ ] Update Facebook URL (currently placeholder)
- [ ] Update Instagram URL (currently placeholder)

### D. About Page
File: `src/app/about/page.tsx`
- [ ] Update Warren Mitchell bio if needed
- [ ] Replace placeholder testimonials with real ones
- [ ] Update company story if needed

---

## Step 6: Deploy to Vercel (30 minutes)

**What:** Get your site live on the internet!

**How:**

### A. Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **Add New Project**
4. Select `club-caddy-v1` repository
5. Click **Import**

### B. Configure Environment Variables
In Vercel project settings, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
RESEND_API_KEY=re_your_resend_key_here
```

Get these from:
- Supabase: Project Settings → API
- Resend: API Keys section

### C. Deploy
1. Click **Deploy**
2. Wait 2-3 minutes for build
3. You'll get a URL like: `club-caddy-v1.vercel.app`
4. Test everything works!

---

## Step 7: Connect Custom Domain (1 hour + DNS propagation)

**What:** Make your site accessible at clubcaddycarts.com

**How:**

### A. In Vercel
1. Go to your project → Settings → Domains
2. Enter: `clubcaddycarts.com`
3. Click **Add**
4. Vercel will show DNS instructions

### B. In Your Domain Registrar (GoDaddy, Namecheap, etc.)
1. Log in to where you bought clubcaddycarts.com
2. Find DNS settings
3. Add the DNS records Vercel showed you
4. Typically:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

### C. Wait for DNS Propagation
- Can take 5 minutes to 48 hours
- Usually works within 30 minutes
- Check status: https://www.whatsmydns.net/

### D. Enable SSL
- Vercel automatically enables HTTPS
- Just wait for DNS to propagate
- Your site will be secure with SSL certificate

---

## Step 8: Final Testing (1-2 hours)

**Test everything works:**

### Core Functionality
- [ ] Homepage loads with video
- [ ] All navigation links work
- [ ] Products page shows all 3 carts
- [ ] Individual product pages work
- [ ] Quote form sends email
- [ ] Contact form sends email
- [ ] About page loads
- [ ] Events page loads
- [ ] Chatbot appears and responds
- [ ] Language switcher works (EN/中文)

### Admin Functions
- [ ] Can log in as admin
- [ ] Admin dashboard accessible
- [ ] Can view quotes
- [ ] Can view bookings (if enabled)

### Mobile Testing
- [ ] Test on iPhone/Android
- [ ] All pages responsive
- [ ] Forms work on mobile
- [ ] Video plays on mobile
- [ ] Navigation menu works

### Performance
- [ ] Run Lighthouse audit (target: >85 score)
- [ ] Check page load speed
- [ ] Verify images load quickly

---

## Step 9: SEO Setup (30 minutes)

### A. Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: clubcaddycarts.com
3. Verify ownership (via HTML tag or DNS)
4. Submit sitemap: https://clubcaddycarts.com/sitemap.xml

### B. Update SEO Code
File: `src/app/layout.tsx` line 100
```typescript
verification: {
  google: 'your_actual_verification_code'  // Replace placeholder
}
```

### C. Google Business Profile (Optional but Recommended)
1. Go to https://business.google.com
2. Create business profile
3. Verify your business
4. Add photos, hours, contact info

---

## Step 10: Create Legal Pages (1-2 hours)

**Required for professional site:**

### A. Terms of Service
- Create file: `src/app/terms/page.tsx`
- Use template from online generator
- Or hire lawyer to draft

### B. Privacy Policy
- Create file: `src/app/privacy/page.tsx`
- Include GDPR compliance if applicable
- Cover cookie usage, data collection

**Tip:** Use free generators:
- https://www.termsfeed.com/privacy-policy-generator/
- https://www.termsfeed.com/terms-conditions-generator/

---

## ✅ LAUNCH CHECKLIST

Before announcing your site is live:

**Content**
- [ ] All products have real data
- [ ] All images are uploaded
- [ ] Contact information is correct
- [ ] Pricing is accurate
- [ ] Terms of Service exists
- [ ] Privacy Policy exists

**Functionality**
- [ ] All forms work and send emails
- [ ] Admin login works
- [ ] No broken links
- [ ] Mobile version works perfectly
- [ ] Video plays correctly

**Security**
- [ ] RLS policies are ENABLED
- [ ] Environment variables are set
- [ ] SSL certificate is active
- [ ] No sensitive data in code

**Performance**
- [ ] Lighthouse score >85
- [ ] Images are optimized
- [ ] Page load time <3 seconds

**SEO**
- [ ] Google Search Console set up
- [ ] Sitemap submitted
- [ ] Meta descriptions updated

---

## 🎉 YOU'RE LIVE!

Congratulations! Your Club Caddy Carts website is now live and ready for customers.

## Next Steps After Launch

1. **Monitor Analytics** - Check Vercel analytics daily
2. **Respond to Quotes** - Check email for quote requests
3. **Content Marketing** - Start blogging about golf carts
4. **Social Media** - Post regularly on Facebook/Instagram
5. **Google Ads** - Consider paid advertising
6. **Customer Reviews** - Collect and display testimonials

---

## 🆘 Need Help?

**Documentation:**
- This repo: See all .md files
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/docs

**Support:**
- Create GitHub issue in this repo
- Check DEPLOYMENT_CHECKLIST.md
- Review error logs in Vercel dashboard

---

**Last Updated:** December 10, 2025
**Status:** Ready for Production Setup
**Estimated Total Time:** 6-8 hours
