# Resend Email Setup Guide

This guide walks you through setting up email functionality for Club Caddy using Resend, a reliable transactional email service.

## Overview

Resend is used to send transactional emails for:
- Quote request confirmations
- Order notifications
- Password reset emails
- Welcome emails
- Newsletter confirmations

## Prerequisites

- A valid email address for your Resend account
- Access to your domain (clubcaddycarts.com) DNS settings
- The project running locally or ready to test

## Step 1: Sign Up for Resend

1. Visit [https://resend.com](https://resend.com)
2. Click **"Get Started"** or **"Sign Up"** button
3. Enter your email address
4. Create a strong password
5. Click **"Continue"** or **"Sign Up"**
6. Check your email and verify your account (click the verification link)
7. Log in to your Resend dashboard

## Step 2: Create a Resend Project

1. In your Resend dashboard, click **"Create Project"** or **"+ New Project"**
2. Name your project: `Club Caddy` (or similar)
3. Click **"Create"**
4. You'll be taken to your project dashboard

## Step 3: Obtain Your API Key

1. In your project dashboard, look for **"API Keys"** section (usually in the sidebar or settings)
2. Click **"Create API Key"** or **"+ New API Key"**
3. Give it a name: `Club Caddy Development` or `Club Caddy Production`
4. Select scope: **"Full Access"** or the default permissions
5. Click **"Create"**
6. You'll see your API key displayed - **Copy this key immediately**
   - The key will look like: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - This will only be shown once, so save it somewhere safe

## Step 4: Add API Key to .env.local

1. Open the `.env.local` file in your project root (C:\Users\lonewolf\club-caddy-v1\.env.local)
2. Find or add the following line:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
3. Replace `re_your_actual_api_key_here` with the actual API key you copied in Step 3
4. Save the file

Example:
```
RESEND_API_KEY=re_8y7d6c5b4a3z2x1w0v9u8t7s6r5q4p3o
```

## Step 5: Verify Your Domain (Critical for Production)

Domain verification ensures your emails are trusted and don't go to spam.

### For Development/Testing:
You can send emails to any address without domain verification using Resend's default domain, but only to authorized test addresses.

### For Production:
You must verify your domain. Follow these steps:

1. **In Resend Dashboard:**
   - Go to **Settings** or **Domains**
   - Click **"Add Domain"**
   - Enter your domain: `clubcaddycarts.com`
   - Click **"Add"**

2. **In Resend Dashboard - Copy DNS Records:**
   - You'll see DNS records (usually 3-4 records)
   - These will be similar to:
     - **Type**: CNAME, **Name**: default._domainkey.clubcaddycarts.com, **Value**: [provided value]
     - **Type**: MX, **Name**: clubcaddycarts.com, **Value**: [provided value]
     - **Type**: TXT, **Name**: clubcaddycarts.com, **Value**: v=spf1...

3. **In Your Domain Registrar (GoDaddy, Namecheap, etc.):**
   - Log in to your domain provider's control panel
   - Go to DNS Records or DNS Settings
   - For each DNS record from Resend:
     - Add a new record with the exact **Type**, **Name**, and **Value**
     - Save/Apply the changes

4. **Back in Resend Dashboard:**
   - Click **"Verify Domain"** or **"Check DNS"**
   - Wait for DNS propagation (can take 10-48 hours, usually 15-30 minutes)
   - Once verified, you'll see a green checkmark

5. **Update Environment Variable (Optional for Production):**
   - Once verified, you can optionally add to `.env.local`:
     ```
     RESEND_FROM_EMAIL=noreply@clubcaddycarts.com
     ```

## Step 6: Test Email Functionality

### Testing Quote Form Emails

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the quote page:**
   - Open your browser to `http://localhost:3000/quote`

3. **Fill out the quote form:**
   - First Name: Test User
   - Email: your-email@example.com (use a real email you have access to)
   - Phone: 555-123-4567
   - Product: Select any product
   - Message: Test quote request

4. **Submit the form**
   - Wait for confirmation message
   - Check your email inbox (and spam folder)
   - Verify you received the confirmation email from Resend

### Testing with Different Email Addresses

To test sending to different email addresses:

1. Add test email addresses in Resend Dashboard:
   - Go to **Settings** → **Verified Senders**
   - Add email addresses you want to test with
   - Verify each address by clicking the link in confirmation emails

2. Re-test the quote form with verified test addresses

## Step 7: Troubleshooting

### "Invalid API Key" Error
- Verify you copied the API key correctly (no extra spaces)
- Ensure the key starts with `re_`
- Check that it's in `.env.local` not `.env`
- Restart your development server after adding the key

### Emails Not Arriving
- Check spam/junk folders
- Verify the email address in your test form submission
- Check Resend dashboard logs for delivery status
- For production, ensure domain is verified

### "Unauthorized" or 401 Error
- API key is invalid or expired
- Verify key is in correct format
- Generate a new API key if needed

### Development vs Production API Keys
- Use separate API keys for development and production
- Store them in different `.env` files as needed
- Never commit API keys to git

## Email Templates Available

The following email templates are already set up and ready to use:

- **Quote Confirmations**
  - `quote-received-customer.tsx` - Sent to customer
  - `quote-received-admin.tsx` - Sent to admin
  - `quote-ready.tsx` - Sent when quote is ready

- **Authentication Emails**
  - `welcome.tsx` - Welcome email
  - `password-reset.tsx` - Password reset instructions
  - `password-changed.tsx` - Password change confirmation
  - `email-verification.tsx` - Email verification

- **Order Emails**
  - `order-confirmation.tsx` - Order confirmation
  - `order-shipped.tsx` - Shipment notification
  - `order-delivered.tsx` - Delivery confirmation
  - `order-cancelled.tsx` - Cancellation notice

- **General Emails**
  - `contact-form.tsx` - Contact form submissions
  - `newsletter-welcome.tsx` - Newsletter signup

## Next Steps

1. Once domain verification is complete, update the `.env.local` with verified domain
2. Test each email template in your application
3. Monitor delivery in Resend dashboard for any issues
4. Set up email webhooks in Resend for tracking bounces and complaints (optional)

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Email Templates Guide](src/lib/email/README.md)
- [Testing Email Setup](src/app/email-preview/page.tsx)

## Security Notes

- Never commit `.env.local` to version control
- Rotate API keys periodically
- Use different keys for development and production
- Monitor your Resend dashboard for unauthorized usage
- Set up billing alerts in Resend to monitor email volume
