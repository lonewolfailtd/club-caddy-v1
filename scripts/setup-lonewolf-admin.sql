-- =====================================================
-- SETUP LONEWOLF ADMIN ACCOUNT
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Confirm the email for contact@lonewolfaisolutions.com
UPDATE auth.users
SET
  email_confirmed_at = NOW(),
  confirmed_at = NOW()
WHERE email = 'contact@lonewolfaisolutions.com';

-- Step 2: Make the user an admin
UPDATE profiles
SET is_admin = true
WHERE email = 'contact@lonewolfaisolutions.com';

-- Step 3: Verify the user is confirmed and admin
SELECT
  'Your Admin Account:' as info,
  u.email,
  u.confirmed_at as email_confirmed,
  p.is_admin,
  p.full_name,
  p.created_at
FROM auth.users u
LEFT JOIN profiles p ON p.id = u.id
WHERE u.email = 'contact@lonewolfaisolutions.com';

-- Step 4: Show all admin users
SELECT
  'All Admin Users:' as info,
  p.email,
  p.full_name,
  p.is_admin,
  p.created_at
FROM profiles p
WHERE p.is_admin = true
ORDER BY p.created_at DESC;
