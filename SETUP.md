# 🚀 Club Caddy - Local Development Setup Guide

## ✅ What's Already Done

- ✅ Next.js 15 project initialized
- ✅ All dependencies installed (652 packages)
- ✅ Supabase CLI installed
- ✅ Stripe CLI installed
- ✅ Database schema ready
- ✅ Seed data ready
- ✅ Development server running

---

## 📋 Quick Setup Checklist

### 1. Supabase Setup (Required)

#### Option A: Use Supabase Cloud (Recommended)

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com/dashboard
   # Click "New Project"
   # Name: club-caddy-carts
   # Database Password: [choose strong password]
   # Region: Singapore (closest to NZ)
   ```

2. **Get Your Credentials**
   ```bash
   # In Supabase Dashboard:
   # Settings > API
   # Copy: Project URL, anon key, service_role key
   ```

3. **Create `.env.local`**
   ```bash
   # Copy from .env.local.example
   cp .env.local.example .env.local

   # Edit .env.local with your Supabase credentials
   ```

4. **Run Database Migrations**
   ```sql
   # In Supabase Dashboard > SQL Editor
   # Copy and run: supabase/migrations/001_initial_schema.sql
   ```

5. **Run Seed Data**
   ```sql
   # In Supabase Dashboard > SQL Editor
   # Copy and run: supabase/seed.sql
   ```

#### Option B: Use Local Supabase (Advanced)

1. **Install Docker Desktop**
   ```bash
   # Download from: https://www.docker.com/products/docker-desktop
   ```

2. **Start Supabase Locally**
   ```bash
   npm run supabase:start

   # This will start:
   # - Postgres database
   # - Auth server
   # - Storage server
   # - Realtime server
   ```

3. **Get Local Credentials**
   ```bash
   npm run supabase:status

   # Copy the API URL and anon key to .env.local
   ```

4. **Push Database Schema**
   ```bash
   npm run supabase:db:push
   ```

---

### 2. Stripe Setup (Optional - for payments)

1. **Create Stripe Account**
   ```bash
   # Go to https://stripe.com
   # Sign up for account
   ```

2. **Get API Keys**
   ```bash
   # Stripe Dashboard > Developers > API Keys
   # Copy: Publishable key & Secret key
   ```

3. **Add to `.env.local`**
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

4. **Login to Stripe CLI**
   ```bash
   npm run stripe:login
   ```

5. **Listen for Webhooks (in separate terminal)**
   ```bash
   npm run stripe:listen

   # Copy the webhook signing secret to .env.local
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

---

### 3. OpenAI Setup (Optional - for AI chatbot)

1. **Create OpenAI Account**
   ```bash
   # Go to https://platform.openai.com
   ```

2. **Get API Key**
   ```bash
   # OpenAI Dashboard > API Keys
   # Create new secret key
   ```

3. **Add to `.env.local`**
   ```env
   OPENAI_API_KEY=sk-...
   ```

---

### 4. Resend Setup (Optional - for emails)

1. **Create Resend Account**
   ```bash
   # Go to https://resend.com
   ```

2. **Get API Key**
   ```bash
   # Resend Dashboard > API Keys
   ```

3. **Verify Domain** (for production)
   ```bash
   # Add clubcaddycarts.com
   # Add DNS records
   ```

4. **Add to `.env.local`**
   ```env
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=admin@clubcaddycarts.com
   ```

---

## 🎯 NPM Scripts Reference

### Development
```bash
npm run dev                    # Start Next.js dev server (port 3000)
npm run build                  # Build for production
npm start                      # Start production server
npm run lint                   # Run ESLint
```

### Supabase
```bash
npm run supabase:start         # Start local Supabase (requires Docker)
npm run supabase:stop          # Stop local Supabase
npm run supabase:status        # Check Supabase status
npm run supabase:db:push       # Push migrations to database
npm run supabase:db:reset      # Reset database (WARNING: deletes data)
npm run supabase:generate-types # Generate TypeScript types from DB
```

### Stripe
```bash
npm run stripe:login           # Login to Stripe CLI
npm run stripe:listen          # Listen for webhooks (localhost)
```

---

## 🔧 Minimum `.env.local` for Development

```env
# Required for basic functionality
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Club Caddy Carts"

# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Optional (add when ready)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_SECRET_KEY=
# STRIPE_WEBHOOK_SECRET=
# OPENAI_API_KEY=
# RESEND_API_KEY=
```

---

## 🐛 Troubleshooting

### Next.js won't start
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Supabase connection errors
```bash
# Check .env.local has correct values
# Check Supabase project is active
# Check API keys are correct (no extra spaces)
```

### Stripe CLI not found
```bash
# Make sure it's installed
npm install -D stripe-cli

# Or use global Stripe CLI
# Download from: https://stripe.com/docs/stripe-cli
```

### TypeScript errors
```bash
# Regenerate types from Supabase
npm run supabase:generate-types

# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P > "TypeScript: Restart TS Server"
```

---

## 📚 Useful Commands

### Database Management
```bash
# View Supabase logs
supabase logs

# Create new migration
supabase migration new migration_name

# Diff local vs remote database
supabase db diff

# Pull remote schema to local
supabase db pull
```

### Stripe Testing
```bash
# Test cards
4242 4242 4242 4242  # Success
4000 0000 0000 9995  # Decline

# Trigger webhooks manually
stripe trigger payment_intent.succeeded
```

---

## 🎯 Next Steps After Setup

1. ✅ Create Supabase project
2. ✅ Add environment variables
3. ✅ Run migrations and seed data
4. 🚀 Start building features!

Visit: http://localhost:3000

---

## 📞 Need Help?

- **Documentation**: Check README.md, PROGRESS.md, SUMMARY.md
- **Implementation Plan**: `.claude/plans/ethereal-knitting-avalanche.md`
- **Database Schema**: `supabase/migrations/001_initial_schema.sql`

---

*Last Updated: December 7, 2025*
