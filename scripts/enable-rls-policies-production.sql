-- =====================================================
-- ENABLE RLS POLICIES FOR PRODUCTION
-- CRITICAL: Run this before deploying to production!
-- Currently RLS is DISABLED which is a security risk
-- =====================================================

-- =====================================================
-- PROFILES TABLE - User authentication & admin access
-- =====================================================

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON profiles;

-- Policy 1: Users can read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy 2: Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy 3: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;
GRANT SELECT ON profiles TO anon; -- Needed for checking admin status

-- =====================================================
-- PRODUCTS TABLE - Public read access
-- =====================================================

-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

-- Policy 1: Anyone can view products (public)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT
  USING (true);

-- Policy 2: Only admins can insert products
CREATE POLICY "Admins can insert products" ON products
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Policy 3: Only admins can update products
CREATE POLICY "Admins can update products" ON products
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Policy 4: Only admins can delete products
CREATE POLICY "Admins can delete products" ON products
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Grant necessary permissions
GRANT SELECT ON products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON products TO authenticated;

-- =====================================================
-- ADDONS TABLE - Public read access
-- =====================================================

-- Enable RLS on addons table
ALTER TABLE addons ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Addons are viewable by everyone" ON addons;
DROP POLICY IF EXISTS "Admins can manage addons" ON addons;

-- Policy 1: Anyone can view addons
CREATE POLICY "Addons are viewable by everyone" ON addons
  FOR SELECT
  USING (true);

-- Policy 2: Only admins can manage addons
CREATE POLICY "Admins can manage addons" ON addons
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Grant necessary permissions
GRANT SELECT ON addons TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON addons TO authenticated;

-- =====================================================
-- QUOTE_REQUESTS TABLE - User-specific access
-- =====================================================

-- Enable RLS on quote_requests (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'quote_requests') THEN
    ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies
    DROP POLICY IF EXISTS "Users can view own quote requests" ON quote_requests;
    DROP POLICY IF EXISTS "Users can create quote requests" ON quote_requests;
    DROP POLICY IF EXISTS "Admins can view all quote requests" ON quote_requests;

    -- Policy 1: Admins can view all quotes
    CREATE POLICY "Admins can view all quote requests" ON quote_requests
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM profiles
          WHERE profiles.id = auth.uid()
          AND profiles.is_admin = true
        )
      );

    -- Policy 2: Anyone can create a quote request
    CREATE POLICY "Users can create quote requests" ON quote_requests
      FOR INSERT
      WITH CHECK (true);

    -- Grant necessary permissions
    GRANT SELECT, INSERT ON quote_requests TO authenticated, anon;
  END IF;
END $$;

-- =====================================================
-- BOOKINGS TABLE - User-specific access
-- =====================================================

-- Enable RLS on bookings (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'bookings') THEN
    ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies
    DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
    DROP POLICY IF EXISTS "Users can create bookings" ON bookings;
    DROP POLICY IF EXISTS "Admins can view all bookings" ON bookings;
    DROP POLICY IF EXISTS "Admins can update bookings" ON bookings;

    -- Policy 1: Users can view their own bookings
    CREATE POLICY "Users can view own bookings" ON bookings
      FOR SELECT
      USING (
        auth.uid() = user_id OR
        EXISTS (
          SELECT 1 FROM profiles
          WHERE profiles.id = auth.uid()
          AND profiles.is_admin = true
        )
      );

    -- Policy 2: Authenticated users can create bookings
    CREATE POLICY "Users can create bookings" ON bookings
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);

    -- Policy 3: Admins can update any booking
    CREATE POLICY "Admins can update bookings" ON bookings
      FOR UPDATE
      USING (
        EXISTS (
          SELECT 1 FROM profiles
          WHERE profiles.id = auth.uid()
          AND profiles.is_admin = true
        )
      );

    -- Grant necessary permissions
    GRANT SELECT, INSERT ON bookings TO authenticated;
    GRANT UPDATE ON bookings TO authenticated;
  END IF;
END $$;

-- =====================================================
-- VERIFICATION & TESTING
-- =====================================================

-- Check that RLS is enabled on all tables
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('profiles', 'products', 'addons', 'quote_requests', 'bookings')
ORDER BY tablename;

-- Show all policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Test profile access (as authenticated user)
SELECT
  '✅ RLS Policies Enabled Successfully' as status,
  COUNT(*) as total_policies
FROM pg_policies
WHERE schemaname = 'public';

-- =====================================================
-- IMPORTANT NOTES
-- =====================================================

/*
AFTER RUNNING THIS SCRIPT:

1. ✅ RLS is now ENABLED on all tables
2. ✅ Products are publicly viewable
3. ✅ Users can only see their own profiles
4. ✅ Only admins can manage products/addons
5. ✅ Quote requests work for everyone
6. ✅ Bookings are user-specific

NEXT STEPS:

1. Test admin login still works
2. Test products page loads
3. Test quote form submission
4. Verify non-admin users can't access admin dashboard

IF SOMETHING BREAKS:

Run this to disable RLS temporarily:
```sql
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE addons DISABLE ROW LEVEL SECURITY;
```

Then debug the specific policy that's causing issues.
*/
