-- =====================================================
-- FIX RLS POLICIES - NO RECURSION
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Drop ALL existing policies on profiles table
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Step 2: Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create NON-RECURSIVE policies
-- Allow users to view their own profile (no recursion)
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Allow users to insert their own profile (for triggers)
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Step 4: Grant permissions to authenticated users
GRANT ALL ON profiles TO authenticated;

-- Step 5: Verify policies
SELECT
  'Policies created:' as status,
  policyname,
  cmd,
  qual as using_expression
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;

-- Step 6: Test fetching your profile (should work now)
SELECT
  'Test query:' as info,
  id,
  email,
  full_name,
  is_admin
FROM profiles
WHERE id = auth.uid();
