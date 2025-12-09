# Admin Setup Guide

## Problem
Getting 400 errors when trying to register or login at:
- `/register` - Can't create account
- `/login` - Can't login

## Solution

### Step 1: Fix Supabase Email Settings

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/qlneuwitxcaifupmarfm

2. Navigate to **Authentication** → **Email Templates**

3. Check the **Email Auth** settings:
   - Go to **Authentication** → **Settings** → **Auth**
   - Find **Email Auth** section
   - **Disable** "Confirm email" (or set to false)
   - Click **Save**

### Step 2: Run the Auth Fix Script

1. In Supabase Dashboard, go to **SQL Editor**

2. Click "New Query"

3. Copy and paste the entire contents of `scripts/fix-auth-setup.sql`

4. Click **Run** (or press Ctrl+Enter)

5. Verify you see "Setup Complete!" message

### Step 3: Create Admin User

#### Option A: Register via Website (Recommended)

1. Go to http://localhost:3000/register

2. Fill in the form:
   - Email: `admin@clubcaddycarts.com`
   - Password: (choose a strong password)
   - Full Name: `Admin`

3. Click "Create an account"

4. Go back to Supabase Dashboard → **SQL Editor**

5. Run this query:
   ```sql
   UPDATE profiles
   SET is_admin = true
   WHERE email = 'admin@clubcaddycarts.com';

   -- Verify
   SELECT email, is_admin, created_at
   FROM profiles
   WHERE is_admin = true;
   ```

#### Option B: Direct SQL Creation

Run this in Supabase SQL Editor:

```sql
-- Create admin user directly (if register still doesn't work)
-- This uses the auth.users table directly

-- First, check if you can create via auth (requires service role)
-- If not, use Option A above after fixing email confirmation

-- Manual profile creation (after user registers)
INSERT INTO profiles (id, email, full_name, is_admin)
SELECT
  id,
  email,
  'Admin User',
  true
FROM auth.users
WHERE email = 'admin@clubcaddycarts.com'
ON CONFLICT (id) DO UPDATE SET
  is_admin = true;
```

### Step 4: Test Admin Access

1. Login at: http://localhost:3000/login
   - Email: `admin@clubcaddycarts.com`
   - Password: (your password)

2. After login, click on your user icon (top right)

3. You should see "Admin Dashboard" in the dropdown menu

4. Click "Admin Dashboard" or go to: http://localhost:3000/admin

5. You should see the admin dashboard with:
   - Statistics (bookings, revenue, inventory)
   - Sidebar navigation
   - Recent bookings
   - Upcoming rentals

## Troubleshooting

### Still Getting 400 Error?

1. **Check Email Confirmation Setting:**
   - Supabase Dashboard → Authentication → Settings
   - Scroll to "Email Auth"
   - Make sure "Confirm email" is DISABLED for development

2. **Check RLS Policies:**
   ```sql
   -- Run this to check policies
   SELECT * FROM pg_policies WHERE tablename = 'profiles';
   ```

3. **Check for existing user:**
   ```sql
   -- See if user already exists
   SELECT email, confirmed_at FROM auth.users
   WHERE email = 'admin@clubcaddycarts.com';

   -- If user exists but not confirmed, confirm them:
   UPDATE auth.users
   SET confirmed_at = NOW(),
       email_confirmed_at = NOW()
   WHERE email = 'admin@clubcaddycarts.com';
   ```

### Can't Access Admin Dashboard?

1. **Verify admin flag:**
   ```sql
   SELECT email, is_admin FROM profiles
   WHERE email = 'admin@clubcaddycarts.com';
   ```

2. **If is_admin is false, update it:**
   ```sql
   UPDATE profiles
   SET is_admin = true
   WHERE email = 'admin@clubcaddycarts.com';
   ```

3. **Clear browser cache and logout/login again**

## Quick Commands

### Check Admin Users
```sql
SELECT email, full_name, is_admin, created_at
FROM profiles
WHERE is_admin = true;
```

### Make Any User Admin
```sql
UPDATE profiles
SET is_admin = true
WHERE email = 'USER_EMAIL_HERE';
```

### Remove Admin Access
```sql
UPDATE profiles
SET is_admin = false
WHERE email = 'USER_EMAIL_HERE';
```

## Complete Service Role Key

If you need the complete service role key for scripts:

1. Go to Supabase Dashboard → Settings → API
2. Find "Service Role Key" (under "Project API keys")
3. Click "Reveal" and copy the full key
4. Update `.env.local`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_full_service_role_key_here
   ```

## Need Help?

If you're still having issues:
1. Check browser console for specific error messages
2. Check Supabase logs (Dashboard → Logs → Authentication)
3. Verify your Supabase URL and anon key in `.env.local`
