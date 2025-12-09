-- =====================================================
-- FIX ALL PERMISSIONS ON PROFILES TABLE
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Verify the profiles table structure
SELECT
  'Profiles table columns:' as info,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;

-- Step 2: Grant all permissions to all roles
GRANT ALL PRIVILEGES ON TABLE profiles TO anon;
GRANT ALL PRIVILEGES ON TABLE profiles TO authenticated;
GRANT ALL PRIVILEGES ON TABLE profiles TO service_role;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Step 3: Ensure table owner is correct
ALTER TABLE profiles OWNER TO postgres;

-- Step 4: Test direct query
SELECT
  'Direct query test:' as info,
  *
FROM profiles
WHERE email = 'contact@lonewolfaisolutions.com';

-- Step 5: Check for any problematic columns or constraints
SELECT
  'Constraints:' as info,
  conname as constraint_name,
  contype as constraint_type
FROM pg_constraint
WHERE conrelid = 'profiles'::regclass;

-- Step 6: Show current permissions
SELECT
  'Current permissions:' as info,
  grantee,
  privilege_type
FROM information_schema.table_privileges
WHERE table_name = 'profiles' AND table_schema = 'public';
