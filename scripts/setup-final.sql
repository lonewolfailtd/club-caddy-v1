-- =====================================================
-- FINAL SETUP: No assumptions about enum values
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Make your user an admin
-- IMPORTANT: Replace with your actual email address
UPDATE profiles
SET is_admin = true
WHERE email = 'admin@clubcaddycarts.com';

-- Verify admin was set
SELECT 'Step 1 - Admin user created:' as step, email, is_admin
FROM profiles
WHERE is_admin = true;

-- Step 2: Show existing products (so we know what we're working with)
SELECT 'Step 2 - Existing products:' as step, id, name, slug, tier
FROM products
ORDER BY created_at
LIMIT 10;

-- Step 3: Enable rental for ALL products (no tier filter)
UPDATE products
SET rental_enabled = true,
    purchase_enabled = true;

SELECT 'Step 3 - Products updated:' as step, COUNT(*) as products_enabled
FROM products
WHERE rental_enabled = true;

-- Step 4: Add inventory for ALL products
-- We'll add inventory based on product order (first 3 products)

-- Product 1 (assuming first product is lowest tier)
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

-- Product 2 (assuming second product is mid tier)
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

-- Product 3 (assuming third product is highest tier)
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

-- Show inventory created
SELECT 'Step 4 - Inventory created:' as step, p.name, i.total_quantity, i.available_quantity
FROM inventory i
JOIN products p ON p.id = i.product_id
ORDER BY i.created_at;

-- Step 5: Add pricing for products

-- Product 1 - Standard pricing ($45/hr, $150/day)
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

-- Product 2 - Premium pricing ($60/hr, $200/day)
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

-- Product 3 - Ultimate pricing ($80/hr, $280/day)
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

-- Show pricing created
SELECT 'Step 5 - Pricing created:' as step, p.name, rp.hourly_rate, rp.daily_rate, rp.weekly_rate
FROM rental_pricing rp
JOIN products p ON p.id = rp.product_id
ORDER BY rp.created_at;

-- Final Summary
SELECT
    '✅ SETUP COMPLETE!' as status,
    (SELECT COUNT(*) FROM profiles WHERE is_admin = true) as admin_users,
    (SELECT COUNT(*) FROM products WHERE rental_enabled = true) as rental_enabled_products,
    (SELECT COUNT(*) FROM inventory) as inventory_records,
    (SELECT COUNT(*) FROM rental_pricing WHERE active = true) as pricing_records,
    (SELECT COALESCE(SUM(total_quantity), 0) FROM inventory) as total_carts_available;
