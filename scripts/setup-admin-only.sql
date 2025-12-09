-- =====================================================
-- SIMPLIFIED SETUP: Admin + Inventory + Pricing Only
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Make your user an admin
-- IMPORTANT: Replace with your actual email address
UPDATE profiles
SET is_admin = true
WHERE email = 'admin@clubcaddycarts.com';

-- Verify admin was set
SELECT 'Admin user:' as info, email, is_admin
FROM profiles
WHERE is_admin = true;

-- Step 2: Enable rental for existing products
UPDATE products
SET rental_enabled = true,
    purchase_enabled = true
WHERE category = 'golf_carts';

-- Check which products exist
SELECT 'Existing products:' as info, id, name, slug, tier
FROM products
WHERE category = 'golf_carts'
ORDER BY tier;

-- Step 3: Add/Update Inventory
-- This uses UPSERT so it's safe to run multiple times

-- Standard Edition
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT id, 10, 10, 0, 0
FROM products
WHERE tier = 'Standard' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = EXCLUDED.total_quantity,
    available_quantity = EXCLUDED.available_quantity,
    reserved_quantity = EXCLUDED.reserved_quantity,
    maintenance_quantity = EXCLUDED.maintenance_quantity;

-- Premium Edition
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT id, 8, 8, 0, 0
FROM products
WHERE tier = 'Premium' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = EXCLUDED.total_quantity,
    available_quantity = EXCLUDED.available_quantity,
    reserved_quantity = EXCLUDED.reserved_quantity,
    maintenance_quantity = EXCLUDED.maintenance_quantity;

-- Ultimate Edition
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT id, 5, 5, 0, 0
FROM products
WHERE tier = 'Ultimate' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = EXCLUDED.total_quantity,
    available_quantity = EXCLUDED.available_quantity,
    reserved_quantity = EXCLUDED.reserved_quantity,
    maintenance_quantity = EXCLUDED.maintenance_quantity;

-- Verify inventory
SELECT 'Inventory summary:' as info, p.name, p.tier, i.total_quantity, i.available_quantity
FROM inventory i
JOIN products p ON p.id = i.product_id
ORDER BY p.tier;

-- Step 4: Add/Update Pricing
-- Safe to run multiple times

-- Standard Edition
INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
SELECT id, 45.00, 4, 150.00, 900.00, 3000.00, 100.00, true
FROM products
WHERE tier = 'Standard' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = EXCLUDED.hourly_rate,
    hourly_minimum_hours = EXCLUDED.hourly_minimum_hours,
    daily_rate = EXCLUDED.daily_rate,
    weekly_rate = EXCLUDED.weekly_rate,
    monthly_rate = EXCLUDED.monthly_rate,
    deposit_amount = EXCLUDED.deposit_amount,
    active = EXCLUDED.active;

-- Premium Edition
INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
SELECT id, 60.00, 4, 200.00, 1200.00, 4000.00, 150.00, true
FROM products
WHERE tier = 'Premium' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = EXCLUDED.hourly_rate,
    hourly_minimum_hours = EXCLUDED.hourly_minimum_hours,
    daily_rate = EXCLUDED.daily_rate,
    weekly_rate = EXCLUDED.weekly_rate,
    monthly_rate = EXCLUDED.monthly_rate,
    deposit_amount = EXCLUDED.deposit_amount,
    active = EXCLUDED.active;

-- Ultimate Edition
INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate, monthly_rate, deposit_amount, active)
SELECT id, 80.00, 4, 280.00, 1680.00, 5600.00, 200.00, true
FROM products
WHERE tier = 'Ultimate' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = EXCLUDED.hourly_rate,
    hourly_minimum_hours = EXCLUDED.hourly_minimum_hours,
    daily_rate = EXCLUDED.daily_rate,
    weekly_rate = EXCLUDED.weekly_rate,
    monthly_rate = EXCLUDED.monthly_rate,
    deposit_amount = EXCLUDED.deposit_amount,
    active = EXCLUDED.active;

-- Verify pricing
SELECT 'Pricing summary:' as info, p.name, p.tier, rp.hourly_rate, rp.daily_rate, rp.weekly_rate
FROM rental_pricing rp
JOIN products p ON p.id = rp.product_id
ORDER BY p.tier;

-- Final Summary
SELECT
    'SETUP COMPLETE!' as status,
    (SELECT COUNT(*) FROM profiles WHERE is_admin = true) as admin_users,
    (SELECT COUNT(*) FROM inventory) as inventory_records,
    (SELECT COUNT(*) FROM rental_pricing WHERE active = true) as pricing_records,
    (SELECT SUM(total_quantity) FROM inventory) as total_carts;
