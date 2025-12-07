# ⚡ Quick Migration - Just Copy & Paste!

## ✅ STEP 1: Migration SQL (Already in Clipboard!)

The migration SQL is already copied to your clipboard!

1. **Supabase SQL Editor should be open** in your browser
2. If not, go to: https://supabase.com/dashboard/project/qlneuwitxcaifupmarfm/sql
3. Click **"New query"**
4. **Paste** (Ctrl+V) - the SQL is already in your clipboard!
5. Click **"Run"** or press Ctrl+Enter

**Expected**: "Success. No rows returned" (this is good!)

---

## ✅ STEP 2: Seed Data (Copy This Next)

After migration succeeds, copy the seed data:

**Run this in PowerShell:**
```powershell
Get-Content supabase/seed.sql | Set-Clipboard
```

**Or run this in Git Bash:**
```bash
cat supabase/seed.sql | clip
```

Then:
1. In Supabase SQL Editor, click **"New query"** again
2. **Paste** (Ctrl+V) the seed data
3. Click **"Run"**

**Expected**: "Success. No rows returned" (this creates 3 products + 10 add-ons!)

---

## ✅ STEP 3: Verify

In Supabase Dashboard:
1. Click **"Table Editor"** in sidebar
2. Click **"products"** table
3. You should see **3 rows**:
   - Standard Golf Cart Package - $9,200
   - Premium Golf Cart Package - $12,500
   - Ultimate Golf Cart Package - 72V - $16,500

---

## ✅ STEP 4: Restart Dev Server

```bash
# In your terminal, press Ctrl+C to stop
# Then restart:
npm run dev
```

Visit: **http://localhost:3000**

Your site will now have:
- ✅ Database connected
- ✅ Products loaded
- ✅ Ready to build features!

---

## 🎉 Done!

The foundation is complete. Ready for Phase 2! 🚀
