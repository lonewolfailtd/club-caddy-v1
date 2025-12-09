-- =====================================================
-- COMPLETE SETUP: Adds missing columns + seeds data
-- Run this ENTIRE script in Supabase SQL Editor
-- =====================================================

-- ====== PART 1: Add missing columns to products table ======

-- Add rental_enabled column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'rental_enabled'
    ) THEN
        ALTER TABLE products ADD COLUMN rental_enabled BOOLEAN DEFAULT FALSE;
        RAISE NOTICE 'Added rental_enabled column';
    ELSE
        RAISE NOTICE 'rental_enabled column already exists';
    END IF;
END $$;

-- Add purchase_enabled column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'purchase_enabled'
    ) THEN
        ALTER TABLE products ADD COLUMN purchase_enabled BOOLEAN DEFAULT TRUE;
        RAISE NOTICE 'Added purchase_enabled column';
    ELSE
        RAISE NOTICE 'purchase_enabled column already exists';
    END IF;
END $$;

-- ====== PART 2: Set up admin user ======

-- IMPORTANT: Replace with your actual email address
UPDATE profiles
SET is_admin = true
WHERE email = 'admin@clubcaddycarts.com';

SELECT 'Step 1 - Admin user:' as step, email, is_admin
FROM profiles
WHERE is_admin = true;

-- ====== PART 3: Show existing products ======

SELECT 'Step 2 - Existing products:' as step, id, name, slug, tier
FROM products
ORDER BY created_at
LIMIT 10;

-- ====== PART 4: Enable rental for all products ======

UPDATE products
SET rental_enabled = true,
    purchase_enabled = true;

SELECT 'Step 3 - Rental enabled:' as step, COUNT(*) as count
FROM products
WHERE rental_enabled = true;

-- ====== PART 5: Add inventory ======

-- Product 1 (first by creation date) - 10 carts
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT id, 10, 10, 0, 0
FROM products
ORDER BY created_at
LIMIT 1
OFFSET 0
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = EXCLUDED.total_quantity,
    available_quantity = EXCLUDED.available_quantity,
    reserved_quantity = EXCLUDED.reserved_quantity,
    maintenance_quantity = EXCLUDED.maintenance_quantity;

-- Product 2 (second by creation date) - 8 carts
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT id, 8, 8, 0, 0
FROM products
ORDER BY created_at
LIMIT 1
OFFSET 1
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = EXCLUDED.total_quantity,
    available_quantity = EXCLUDED.available_quantity,
    reserved_quantity = EXCLUDED.reserved_quantity,
    maintenance_quantity = EXCLUDED.maintenance_quantity;

-- Product 3 (third by creation date) - 5 carts
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT id, 5, 5, 0, 0
FROM products
ORDER BY created_at
LIMIT 1
OFFSET 2
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = EXCLUDED.total_quantity,
    available_quantity = EXCLUDED.available_quantity,
    reserved_quantity = EXCLUDED.reserved_quantity,
    maintenance_quantity = EXCLUDED.maintenance_quantity;

SELECT 'Step 4 - Inventory:' as step, p.name, i.total_quantity, i.available_quantity
FROM inventory i
JOIN products p ON p.id = i.product_id
ORDER BY i.created_at;

-- ====== PART 6: Add pricing ======

-- Product 1 - Standard pricing ($45/hr, $150/day, $900/week)
INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
SELECT id, 45.00, 4, 150.00, 900.00, 3000.00, 100.00, true
FROM products
ORDER BY created_at
LIMIT 1
OFFSET 0
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = EXCLUDED.hourly_rate,
    hourly_minimum_hours = EXCLUDED.hourly_minimum_hours,
    daily_rate = EXCLUDED.daily_rate,
    weekly_rate = EXCLUDED.weekly_rate,
    monthly_rate = EXCLUDED.monthly_rate,
    deposit_amount = EXCLUDED.deposit_amount,
    active = EXCLUDED.active;

-- Product 2 - Premium pricing ($60/hr, $200/day, $1200/week)
INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
SELECT id, 60.00, 4, 200.00, 1200.00, 4000.00, 150.00, true
FROM products
ORDER BY created_at
LIMIT 1
OFFSET 1
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = EXCLUDED.hourly_rate,
    hourly_minimum_hours = EXCLUDED.hourly_minimum_hours,
    daily_rate = EXCLUDED.daily_rate,
    weekly_rate = EXCLUDED.weekly_rate,
    monthly_rate = EXCLUDED.monthly_rate,
    deposit_amount = EXCLUDED.deposit_amount,
    active = EXCLUDED.active;

-- Product 3 - Ultimate pricing ($80/hr, $280/day, $1680/week)
INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
SELECT id, 80.00, 4, 280.00, 1680.00, 5600.00, 200.00, true
FROM products
ORDER BY created_at
LIMIT 1
OFFSET 2
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = EXCLUDED.hourly_rate,
    hourly_minimum_hours = EXCLUDED.hourly_minimum_hours,
    daily_rate = EXCLUDED.daily_rate,
    weekly_rate = EXCLUDED.weekly_rate,
    monthly_rate = EXCLUDED.monthly_rate,
    deposit_amount = EXCLUDED.deposit_amount,
    active = EXCLUDED.active;

SELECT 'Step 5 - Pricing:' as step, p.name, rp.hourly_rate, rp.daily_rate, rp.weekly_rate
FROM rental_pricing rp
JOIN products p ON p.id = rp.product_id
ORDER BY rp.created_at;

-- ====== FINAL SUMMARY ======

SELECT
    '✅ SETUP COMPLETE!' as status,
    (SELECT COUNT(*) FROM profiles WHERE is_admin = true) as admin_users,
    (SELECT COUNT(*) FROM products WHERE rental_enabled = true) as rental_products,
    (SELECT COUNT(*) FROM inventory) as inventory_records,
    (SELECT COUNT(*) FROM rental_pricing WHERE active = true) as pricing_records,
    (SELECT COALESCE(SUM(total_quantity), 0) FROM inventory) as total_carts;

-- Show what was created
SELECT 'Summary - Admin:' as type, email FROM profiles WHERE is_admin = true
UNION ALL
SELECT 'Summary - Products:', name FROM products WHERE rental_enabled = true
ORDER BY type;
