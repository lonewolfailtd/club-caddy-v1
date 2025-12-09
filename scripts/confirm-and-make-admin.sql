-- =====================================================
-- CONFIRM USER AND MAKE ADMIN
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Confirm the email for admin@clubcaddycarts.com
UPDATE auth.users
SET
  email_confirmed_at = NOW(),
  confirmed_at = NOW()
WHERE email = 'admin@clubcaddycarts.com';

-- Step 2: Make the user an admin
UPDATE profiles
SET is_admin = true
WHERE email = 'admin@clubcaddycarts.com';

-- Step 3: Verify the user is confirmed and admin
SELECT
  'User Status:' as info,
  u.email,
  u.confirmed_at,
  p.is_admin,
  p.full_name
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE u.email = 'admin@clubcaddycarts.com';
