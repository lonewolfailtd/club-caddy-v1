-- =====================================================
-- TEMPORARILY DISABLE RLS FOR TESTING
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Disable RLS temporarily
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Step 2: Grant SELECT permission to authenticated and anon
GRANT SELECT ON profiles TO authenticated, anon;

-- Step 3: Test query
SELECT
  'Test without RLS:' as info,
  id,
  email,
  full_name,
  is_admin,
  created_at
FROM profiles
WHERE email = 'contact@lonewolfaisolutions.com';

-- Step 4: Show all profiles
SELECT
  'All profiles:' as info,
  id,
  email,
  full_name,
  is_admin
FROM profiles;
