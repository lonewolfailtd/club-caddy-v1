-- =====================================================
-- QUICK SETUP: Run this in Supabase SQL Editor
-- Copy and paste this entire file into Supabase Dashboard > SQL Editor
-- =====================================================

-- Step 1: Make your user an admin
-- IMPORTANT: Replace 'admin@clubcaddycarts.com' with your actual email
UPDATE profiles
SET is_admin = true
WHERE email = 'admin@clubcaddycarts.com';

-- Step 2: Enable rental for products
UPDATE products
SET rental_enabled = true,
    purchase_enabled = true
WHERE category = 'golf_carts';

-- Step 3: Add inventory for Standard Edition (10 carts)
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT id, 10, 10, 0, 0
FROM products
WHERE tier = 'Standard' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = 10,
    available_quantity = 10;

-- Add inventory for Premium Edition (8 carts)
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT id, 8, 8, 0, 0
FROM products
WHERE tier = 'Premium' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = 8,
    available_quantity = 8;

-- Add inventory for Ultimate Edition (5 carts)
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT id, 5, 5, 0, 0
FROM products
WHERE tier = 'Ultimate' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = 5,
    available_quantity = 5;

-- Step 4: Add pricing for Standard Edition
INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
SELECT id, 45.00, 4, 150.00, 900.00, 3000.00, 100.00, true
FROM products
WHERE tier = 'Standard' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = 45.00,
    daily_rate = 150.00,
    weekly_rate = 900.00,
    monthly_rate = 3000.00,
    deposit_amount = 100.00,
    active = true;

-- Add pricing for Premium Edition
INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
SELECT id, 60.00, 4, 200.00, 1200.00, 4000.00, 150.00, true
FROM products
WHERE tier = 'Premium' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = 60.00,
    daily_rate = 200.00,
    weekly_rate = 1200.00,
    monthly_rate = 4000.00,
    deposit_amount = 150.00,
    active = true;

-- Add pricing for Ultimate Edition
INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
SELECT id, 80.00, 4, 280.00, 1680.00, 5600.00, 200.00, true
FROM products
WHERE tier = 'Ultimate' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = 80.00,
    daily_rate = 280.00,
    weekly_rate = 1680.00,
    monthly_rate = 5600.00,
    deposit_amount = 200.00,
    active = true;

-- Verification queries
SELECT '=== Admin Users ===' as section;
SELECT id, email, is_admin, created_at
FROM profiles
WHERE is_admin = true;

SELECT '=== Inventory Summary ===' as section;
SELECT p.name, p.tier, i.total_quantity, i.available_quantity, i.reserved_quantity, i.maintenance_quantity
FROM inventory i
JOIN products p ON p.id = i.product_id
ORDER BY p.tier;

SELECT '=== Pricing Summary ===' as section;
SELECT p.name, p.tier, rp.hourly_rate, rp.daily_rate, rp.weekly_rate, rp.deposit_amount
FROM rental_pricing rp
JOIN products p ON p.id = rp.product_id
ORDER BY p.tier;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Setup complete!';
    RAISE NOTICE 'Next: Log in to /admin with your email';
END $$;
