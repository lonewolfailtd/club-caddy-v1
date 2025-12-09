-- =====================================================
-- CREATE ADMIN USER
-- Run this in Supabase SQL Editor
-- =====================================================

-- STEP 1: Update the email below with your admin email
-- Then run this entire script in your Supabase SQL Editor

-- Set your admin email here:
DO $$
DECLARE
    admin_email TEXT := 'admin@clubcaddycarts.com'; -- CHANGE THIS EMAIL
BEGIN
    -- Check if profile exists
    IF EXISTS (SELECT 1 FROM profiles WHERE email = admin_email) THEN
        -- Update existing profile to admin
        UPDATE profiles
        SET is_admin = true
        WHERE email = admin_email;

        RAISE NOTICE 'Admin privileges granted to: %', admin_email;
    ELSE
        RAISE NOTICE 'No user found with email: %. Please register first at /register', admin_email;
    END IF;
END $$;

-- Verify admin was set
SELECT
    'Admin Users:' as info,
    email,
    is_admin,
    created_at
FROM profiles
WHERE is_admin = true;
