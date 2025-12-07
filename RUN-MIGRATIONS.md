# 🗄️ Run Database Migrations Manually

## Step 1: Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/qlneuwitxcaifupmarfm
2. Click **SQL Editor** in left sidebar
3. Click **New query**

---

## Step 2: Run Migration (Create Tables)

1. Open file: `supabase/migrations/001_initial_schema.sql`
2. **Copy ALL the SQL** (Ctrl+A, Ctrl+C)
3. **Paste** into Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

**Expected Result**: "Success. No rows returned"

This creates:
- ✅ 11 database tables
- ✅ Row Level Security policies
- ✅ Indexes for performance
- ✅ Triggers for timestamps
- ✅ Functions for user creation

---

## Step 3: Run Seed Data (Add Products)

1. Click **New query** in SQL Editor
2. Open file: `supabase/seed.sql`
3. **Copy ALL the SQL** (Ctrl+A, Ctrl+C)
4. **Paste** into Supabase SQL Editor
5. Click **Run** (or press Ctrl+Enter)

**Expected Result**: "Success. No rows returned"

This adds:
- ✅ 3 product packages (Standard, Premium, Ultimate)
- ✅ 10 add-ons (canopy, enclosure, wheels, etc.)
- ✅ 12 AI knowledge base entries

---

## Step 4: Verify Tables

1. Click **Table Editor** in left sidebar
2. You should see 11 tables:
   - profiles
   - products (**3 rows**)
   - product_variants
   - addons (**10 rows**)
   - orders
   - enquiries
   - wishlist
   - saved_configurations
   - chat_conversations
   - chat_messages
   - product_knowledge_base (**12 rows**)

---

## Step 5: Check Products

1. In Table Editor, click **products** table
2. You should see 3 rows:
   - **Standard Golf Cart Package** - $9,200
   - **Premium Golf Cart Package** - $12,500
   - **Ultimate Golf Cart Package - 72V** - $16,500

---

## Step 6: Restart Dev Server

```bash
# Stop current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

## ✅ Success!

Visit: http://localhost:3000

You should now have a fully functional luxury ecommerce platform with:
- ✅ Database connected
- ✅ Products loaded
- ✅ Homepage displaying
- ✅ Ready for Phase 2!

---

## 🐛 Troubleshooting

### "Column does not exist" error
- ✅ Make sure migration ran successfully
- ✅ Check all tables were created
- ✅ Try refreshing Supabase dashboard

### "No rows returned" after seed
- ✅ This is normal! It means it worked
- ✅ Check Table Editor to see data
- ✅ Click "products" to see 3 products

### Site still not loading data
- ✅ Check .env.local has correct credentials
- ✅ Restart dev server
- ✅ Check browser console for errors (F12)

---

## 📞 Need Help?

Check the browser console (F12) for any errors and let me know!
