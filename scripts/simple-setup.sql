-- =====================================================
-- SIMPLE SETUP: No ON CONFLICT (works without constraints)
-- Run this in Supabase SQL Editor
-- =====================================================

-- ====== PART 1: Add missing columns ======

ALTER TABLE products ADD COLUMN IF NOT EXISTS rental_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS purchase_enabled BOOLEAN DEFAULT TRUE;

-- ====== PART 2: Set up admin user ======

-- IMPORTANT: Replace with your actual email address
UPDATE profiles
SET is_admin = true
WHERE email = 'admin@clubcaddycarts.com';

-- Show admin user
SELECT '✅ Admin user created:' as status, email, is_admin
FROM profiles
WHERE is_admin = true;

-- ====== PART 3: Show existing products ======

SELECT '📦 Your products:' as status, id, name, slug, tier
FROM products
ORDER BY created_at;

-- ====== PART 4: Enable rental ======

UPDATE products
SET rental_enabled = true,
    purchase_enabled = true;

SELECT '✅ Rental enabled for:' as status, COUNT(*) as product_count
FROM products
WHERE rental_enabled = true;

-- ====== PART 5: Check if rental tables exist ======

SELECT
    CASE
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'inventory')
        THEN '✅ inventory table exists'
        ELSE '❌ inventory table missing - run migration first!'
    END as inventory_status,
    CASE
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'rental_pricing')
        THEN '✅ rental_pricing table exists'
        ELSE '❌ rental_pricing table missing - run migration first!'
    END as pricing_status,
    CASE
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bookings')
        THEN '✅ bookings table exists'
        ELSE '❌ bookings table missing - run migration first!'
    END as bookings_status;

-- ====== ONLY RUN THE FOLLOWING IF TABLES EXIST ======
-- If you see errors above, STOP and run the migration file first!
-- File: supabase/migrations/20231211_rental_booking_system.sql

-- ====== PART 6: Delete existing data (safe to run multiple times) ======

DELETE FROM inventory;
DELETE FROM rental_pricing;

-- ====== PART 7: Add inventory (simple INSERT without conflicts) ======

-- Get product IDs
DO $$
DECLARE
    product1_id UUID;
    product2_id UUID;
    product3_id UUID;
BEGIN
    -- Get first product ID
    SELECT id INTO product1_id FROM products ORDER BY created_at LIMIT 1 OFFSET 0;
    -- Get second product ID
    SELECT id INTO product2_id FROM products ORDER BY created_at LIMIT 1 OFFSET 1;
    -- Get third product ID
    SELECT id INTO product3_id FROM products ORDER BY created_at LIMIT 1 OFFSET 2;

    -- Insert inventory for product 1 (10 carts)
    IF product1_id IS NOT NULL THEN
        INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
        VALUES (product1_id, 10, 10, 0, 0);
        RAISE NOTICE 'Added inventory for product 1: 10 carts';
    END IF;

    -- Insert inventory for product 2 (8 carts)
    IF product2_id IS NOT NULL THEN
        INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
        VALUES (product2_id, 8, 8, 0, 0);
        RAISE NOTICE 'Added inventory for product 2: 8 carts';
    END IF;

    -- Insert inventory for product 3 (5 carts)
    IF product3_id IS NOT NULL THEN
        INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
        VALUES (product3_id, 5, 5, 0, 0);
        RAISE NOTICE 'Added inventory for product 3: 5 carts';
    END IF;
END $$;

-- ====== PART 8: Add pricing (simple INSERT without conflicts) ======

DO $$
DECLARE
    product1_id UUID;
    product2_id UUID;
    product3_id UUID;
BEGIN
    -- Get product IDs
    SELECT id INTO product1_id FROM products ORDER BY created_at LIMIT 1 OFFSET 0;
    SELECT id INTO product2_id FROM products ORDER BY created_at LIMIT 1 OFFSET 1;
    SELECT id INTO product3_id FROM products ORDER BY created_at LIMIT 1 OFFSET 2;

    -- Insert pricing for product 1 (Standard: $45/hr, $150/day)
    IF product1_id IS NOT NULL THEN
        INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
        VALUES (product1_id, 45.00, 4, 150.00, 900.00, 3000.00, 100.00, true);
        RAISE NOTICE 'Added pricing for product 1: $45/hr, $150/day';
    END IF;

    -- Insert pricing for product 2 (Premium: $60/hr, $200/day)
    IF product2_id IS NOT NULL THEN
        INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
        VALUES (product2_id, 60.00, 4, 200.00, 1200.00, 4000.00, 150.00, true);
        RAISE NOTICE 'Added pricing for product 2: $60/hr, $200/day';
    END IF;

    -- Insert pricing for product 3 (Ultimate: $80/hr, $280/day)
    IF product3_id IS NOT NULL THEN
        INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
        VALUES (product3_id, 80.00, 4, 280.00, 1680.00, 5600.00, 200.00, true);
        RAISE NOTICE 'Added pricing for product 3: $80/hr, $280/day';
    END IF;
END $$;

-- ====== VERIFICATION ======

SELECT '✅ Inventory summary:' as status, p.name, i.total_quantity, i.available_quantity
FROM inventory i
JOIN products p ON p.id = i.product_id
ORDER BY i.created_at;

SELECT '✅ Pricing summary:' as status, p.name, rp.hourly_rate, rp.daily_rate, rp.weekly_rate
FROM rental_pricing rp
JOIN products p ON p.id = rp.product_id
ORDER BY rp.created_at;

-- ====== FINAL SUMMARY ======

SELECT
    '🎉 SETUP COMPLETE!' as status,
    (SELECT COUNT(*) FROM profiles WHERE is_admin = true) as admin_users,
    (SELECT COUNT(*) FROM products WHERE rental_enabled = true) as rental_products,
    (SELECT COUNT(*) FROM inventory) as inventory_records,
    (SELECT COUNT(*) FROM rental_pricing WHERE active = true) as pricing_records,
    (SELECT COALESCE(SUM(total_quantity), 0) FROM inventory) as total_carts;
