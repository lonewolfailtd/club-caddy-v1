-- =====================================================
-- DIAGNOSE PROFILE TABLE ISSUES
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Check if profiles table exists and its structure
SELECT
  'Table structure:' as info,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;

-- Step 2: Check current RLS policies
SELECT
  'Current RLS Policies:' as info,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'profiles';

-- Step 3: Check if RLS is enabled
SELECT
  'RLS Status:' as info,
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'profiles';

-- Step 4: Check existing profiles
SELECT
  'Existing profiles:' as info,
  id,
  email,
  full_name,
  is_admin,
  created_at
FROM profiles;

-- Step 5: Check triggers on profiles
SELECT
  'Triggers:' as info,
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'profiles';

-- Step 6: Try to select as the current user
SELECT
  'Your user ID:' as info,
  auth.uid() as current_user_id;

-- Step 7: Try to fetch your own profile
SELECT
  'Your profile:' as info,
  p.*
FROM profiles p
WHERE p.id = auth.uid();
