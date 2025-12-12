# Google Places API Setup Guide

## Step 1: Create Google Cloud Account

1. Go to: https://console.cloud.google.com/
2. Sign in with your Google account
3. Accept the Terms of Service if prompted

## Step 2: Create a New Project

1. Click the project dropdown at the top of the page
2. Click "NEW PROJECT"
3. **Project Name**: Club Caddy Carts
4. Click "CREATE"
5. Wait for the project to be created (takes a few seconds)

## Step 3: Enable Places API

1. In the search bar at the top, type "Places API"
2. Click on "Places API" from the results
3. Click the **"ENABLE"** button
4. Wait for it to enable (takes a few seconds)

## Step 4: Create API Key

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"API key"**
4. Your API key will be created and displayed

**IMPORTANT:** Copy this key immediately!

Example API key format: `AIzaSyC...` (starts with AIzaSy)

## Step 5: Restrict Your API Key (IMPORTANT for Security)

### Application Restrictions

1. Click "EDIT API KEY" (or the pencil icon)
2. Under **"Application restrictions"**:
   - For Development: Select **"HTTP referrers (web sites)"**
   - Add these referrers:
     ```
     http://localhost:3000/*
     http://localhost:*
     https://clubcaddycarts.com/*
     https://*.clubcaddycarts.com/*
     ```

### API Restrictions

1. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Select these APIs:
     - ✅ Places API
     - ✅ Maps JavaScript API (needed for Places API to work)
     - ✅ Geocoding API (optional, but useful)

2. Click **"SAVE"**

## Step 6: Enable Billing (Required)

Google Places API requires billing to be enabled, but they offer:
- **$200 free credit per month**
- First 1,000 requests per month are free
- Very unlikely you'll exceed free tier for a rental business

### To Enable Billing:

1. Go to: https://console.cloud.google.com/billing
2. Click "LINK A BILLING ACCOUNT"
3. Click "CREATE BILLING ACCOUNT"
4. Enter your business information
5. Add a payment method (credit/debit card)
6. Click "START MY FREE TRIAL"

**Note:** You won't be charged unless you exceed $200/month in usage.

## Step 7: Add API Key to Your Project

Once you have your API key, I'll help you add it to your `.env.local` file.

---

## Pricing (Don't Worry, It's Generous!)

**Places Autocomplete:**
- First 1,000 requests/month: **FREE**
- After that: $2.83 per 1,000 requests

**Example Usage:**
- 100 bookings/month = ~100 address searches
- Cost: **$0** (well within free tier)

**$200 Free Credit:**
- Even if you exceed free tier, you get $200/month credit
- That's ~70,000 address autocomplete requests!

---

## Your API Key

After completing the steps above, paste your API key here:

```
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=AIzaSy...your-key-here
```

I'll help you add this to your `.env.local` file once you have it!

---

## Testing Your API Key

Once set up, you can test it here:
https://console.cloud.google.com/apis/api/places-backend.googleapis.com/metrics

You'll see API calls as you test the address autocomplete on your site.

---

## Security Best Practices

✅ **Always restrict your API key** (we covered this above)
✅ **Never commit API keys to Git** (already in .gitignore)
✅ **Use HTTP referrer restrictions** for production
✅ **Monitor usage** in Google Cloud Console

---

## Need Help?

If you get stuck on any step, let me know and I'll help guide you through it!

Once you have your API key, just paste it in the chat and I'll add it to your project.
