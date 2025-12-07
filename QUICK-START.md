# ⚡ Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Create Supabase Project (2 min)
```bash
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: club-caddy-carts
4. Password: [choose strong password]
5. Region: Singapore
6. Click "Create new project"
```

### Step 2: Get Credentials (1 min)
```bash
1. Wait for project to finish setting up
2. Go to Settings > API
3. Copy these 3 values:
   - Project URL
   - anon public key
   - service_role key (click "Reveal")
```

### Step 3: Create .env.local (30 sec)
```bash
# Create file in root directory
# Add these 3 lines:

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-key-here
```

### Step 4: Run Migrations (1 min)
```bash
1. In Supabase Dashboard, go to SQL Editor
2. Click "New query"
3. Open: supabase/migrations/001_initial_schema.sql
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click "Run"
```

### Step 5: Run Seed Data (30 sec)
```bash
1. In Supabase SQL Editor, click "New query"
2. Open: supabase/seed.sql
3. Copy ALL the SQL code
4. Paste into Supabase SQL Editor
5. Click "Run"
```

### Step 6: View Your Site! 🎉
```bash
# Open your browser to:
http://localhost:3000

# You should see the luxury homepage with:
# - Hexagonal pattern overlay
# - Gold/platinum colors
# - Glass morphism effects
# - Smooth animations
```

---

## ✅ Verify Setup

### Check Database
```bash
# In Supabase Dashboard:
# 1. Go to Table Editor
# 2. You should see 11 tables:
#    - profiles
#    - products (3 rows)
#    - addons (10 rows)
#    - orders
#    - enquiries
#    - etc.
```

### Check Homepage
```bash
# Visit http://localhost:3000
# You should see:
# ✅ "Club Caddy Carts" heading
# ✅ "Premium Electric Golf Carts" subheading
# ✅ Stats: 100km+, 72V, 50km/h+
# ✅ Features grid
# ✅ Contact info: +64-021-560-307
```

---

## 🎯 What You Can Do Now

1. ✅ Browse the luxury homepage
2. ✅ See the hexagonal pattern design
3. ✅ View database tables in Supabase
4. ✅ Check seed data (3 products, 10 add-ons)
5. ⏳ Ready for Phase 2: Product pages!

---

## 📚 Full Documentation

- **Detailed Setup**: See SETUP.md
- **Progress**: See PROGRESS.md
- **Summary**: See SUMMARY.md
- **Plan**: See .claude/plans/ethereal-knitting-avalanche.md

---

## 🆘 Common Issues

### "Cannot connect to Supabase"
- ✅ Check .env.local exists in root directory
- ✅ Check no extra spaces in environment variables
- ✅ Restart dev server: Stop (Ctrl+C) then `npm run dev`

### "Database tables not found"
- ✅ Run migration SQL in Supabase SQL Editor
- ✅ Check table editor to confirm tables exist

### "Site not loading"
- ✅ Make sure dev server is running: `npm run dev`
- ✅ Check console for errors
- ✅ Try: `rm -rf .next` then `npm run dev`

---

## 🎉 You're Ready!

**Development server running**: http://localhost:3000

Next: Start building product pages, shopping cart, and checkout! 🚀
