-- =====================================================
-- Club Caddy: Admin Setup and Initial Data Seeding
-- =====================================================
-- This script sets up an admin user and seeds initial inventory/pricing data

-- =====================================================
-- STEP 1: Set up admin user
-- =====================================================
-- Replace 'your-email@example.com' with your actual email address

-- Option 1: If you already have a user account, make it admin
UPDATE profiles
SET is_admin = true
WHERE email = 'your-email@example.com';

-- Option 2: If profile doesn't exist, you'll need to sign up first through the app
-- Then run the UPDATE command above

-- Verify admin user was created
SELECT id, email, is_admin, created_at
FROM profiles
WHERE is_admin = true;

-- =====================================================
-- STEP 2: Seed Inventory Data
-- =====================================================
-- Add inventory for all rental-enabled products
-- Adjust quantities based on your actual cart inventory

-- First, enable rental for products
UPDATE products
SET rental_enabled = true,
    purchase_enabled = true
WHERE category = 'golf_carts';

-- Add inventory for each product
-- Standard Edition (Product 1) - 10 carts
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT
    id,
    10,  -- total_quantity
    10,  -- available_quantity (all available initially)
    0,   -- reserved_quantity
    0    -- maintenance_quantity
FROM products
WHERE tier = 'Standard' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = EXCLUDED.total_quantity,
    available_quantity = EXCLUDED.available_quantity;

-- Premium Edition (Product 2) - 8 carts
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT
    id,
    8,   -- total_quantity
    8,   -- available_quantity
    0,   -- reserved_quantity
    0    -- maintenance_quantity
FROM products
WHERE tier = 'Premium' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = EXCLUDED.total_quantity,
    available_quantity = EXCLUDED.available_quantity;

-- Ultimate Edition (Product 3) - 5 carts (fewer of the luxury model)
INSERT INTO inventory (product_id, total_quantity, available_quantity, reserved_quantity, maintenance_quantity)
SELECT
    id,
    5,   -- total_quantity
    5,   -- available_quantity
    0,   -- reserved_quantity
    0    -- maintenance_quantity
FROM products
WHERE tier = 'Ultimate' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    total_quantity = EXCLUDED.total_quantity,
    available_quantity = EXCLUDED.available_quantity;

-- Verify inventory was created
SELECT
    p.name,
    p.tier,
    i.total_quantity,
    i.available_quantity,
    i.reserved_quantity,
    i.maintenance_quantity
FROM inventory i
JOIN products p ON p.id = i.product_id
ORDER BY p.tier;

-- =====================================================
-- STEP 3: Seed Rental Pricing Data
-- =====================================================
-- Set competitive rental rates for Auckland market

-- Standard Edition Pricing
-- Lower-tier model with affordable rates
INSERT INTO rental_pricing (
    product_id,
    hourly_rate,
    hourly_minimum_hours,
    daily_rate,
    weekly_rate,
    monthly_rate,
    deposit_amount,
    active
)
SELECT
    id,
    45.00,      -- $45/hour
    4,          -- 4-hour minimum
    150.00,     -- $150/day
    900.00,     -- $900/week (saves $150 vs daily)
    3000.00,    -- $3000/month
    100.00,     -- $100 deposit
    true
FROM products
WHERE tier = 'Standard' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = EXCLUDED.hourly_rate,
    daily_rate = EXCLUDED.daily_rate,
    weekly_rate = EXCLUDED.weekly_rate,
    monthly_rate = EXCLUDED.monthly_rate,
    deposit_amount = EXCLUDED.deposit_amount,
    active = EXCLUDED.active;

-- Premium Edition Pricing
-- Mid-tier model with enhanced features
INSERT INTO rental_pricing (
    product_id,
    hourly_rate,
    hourly_minimum_hours,
    daily_rate,
    weekly_rate,
    monthly_rate,
    deposit_amount,
    active
)
SELECT
    id,
    60.00,      -- $60/hour
    4,          -- 4-hour minimum
    200.00,     -- $200/day
    1200.00,    -- $1200/week (saves $200 vs daily)
    4000.00,    -- $4000/month
    150.00,     -- $150 deposit
    true
FROM products
WHERE tier = 'Premium' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = EXCLUDED.hourly_rate,
    daily_rate = EXCLUDED.daily_rate,
    weekly_rate = EXCLUDED.weekly_rate,
    monthly_rate = EXCLUDED.monthly_rate,
    deposit_amount = EXCLUDED.deposit_amount,
    active = EXCLUDED.active;

-- Ultimate Edition Pricing
-- Premium luxury model with highest rates
INSERT INTO rental_pricing (
    product_id,
    hourly_rate,
    hourly_minimum_hours,
    daily_rate,
    weekly_rate,
    monthly_rate,
    deposit_amount,
    active
)
SELECT
    id,
    80.00,      -- $80/hour
    4,          -- 4-hour minimum
    280.00,     -- $280/day
    1680.00,    -- $1680/week (saves $280 vs daily)
    5600.00,    -- $5600/month
    200.00,     -- $200 deposit
    true
FROM products
WHERE tier = 'Ultimate' AND category = 'golf_carts'
ON CONFLICT (product_id) DO UPDATE SET
    hourly_rate = EXCLUDED.hourly_rate,
    daily_rate = EXCLUDED.daily_rate,
    weekly_rate = EXCLUDED.weekly_rate,
    monthly_rate = EXCLUDED.monthly_rate,
    deposit_amount = EXCLUDED.deposit_amount,
    active = EXCLUDED.active;

-- Verify pricing was created
SELECT
    p.name,
    p.tier,
    rp.hourly_rate,
    rp.hourly_minimum_hours,
    rp.daily_rate,
    rp.weekly_rate,
    rp.monthly_rate,
    rp.deposit_amount,
    rp.active
FROM rental_pricing rp
JOIN products p ON p.id = rp.product_id
ORDER BY p.tier;

-- =====================================================
-- STEP 4: Summary Report
-- =====================================================
-- Display complete setup summary

-- Admin Users
SELECT
    'Admin Users' as report_section,
    COUNT(*) as count
FROM profiles
WHERE is_admin = true;

-- Inventory Summary
SELECT
    'Inventory Summary' as report_section,
    COUNT(*) as products_with_inventory,
    SUM(total_quantity) as total_carts,
    SUM(available_quantity) as available_carts,
    SUM(reserved_quantity) as reserved_carts
FROM inventory;

-- Pricing Summary
SELECT
    'Pricing Summary' as report_section,
    COUNT(*) as products_with_pricing,
    MIN(daily_rate) as min_daily_rate,
    MAX(daily_rate) as max_daily_rate,
    AVG(daily_rate)::numeric(10,2) as avg_daily_rate
FROM rental_pricing
WHERE active = true;

-- Rental-Enabled Products
SELECT
    'Rental-Enabled Products' as report_section,
    COUNT(*) as count
FROM products
WHERE rental_enabled = true;

-- =====================================================
-- OPTIONAL: Create Sample Availability Blocks
-- =====================================================
-- Block out Christmas/New Year period for maintenance

-- Uncomment to add availability blocks
/*
INSERT INTO availability_blocks (
    product_id,
    start_date,
    end_date,
    quantity_blocked,
    reason,
    notes
)
SELECT
    id,
    '2025-12-24 00:00:00+00'::timestamptz,
    '2025-12-27 23:59:59+00'::timestamptz,
    2,  -- Block 2 carts for maintenance
    'maintenance',
    'Annual maintenance and inspection period'
FROM products
WHERE rental_enabled = true;

-- Verify blocks were created
SELECT
    p.name,
    ab.start_date,
    ab.end_date,
    ab.quantity_blocked,
    ab.reason,
    ab.notes
FROM availability_blocks ab
JOIN products p ON p.id = ab.product_id
ORDER BY ab.start_date;
*/

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Setup Complete!';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Admin user configured ✓';
    RAISE NOTICE 'Inventory seeded ✓';
    RAISE NOTICE 'Pricing configured ✓';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Log in to /admin with your admin account';
    RAISE NOTICE '2. Verify inventory quantities in Admin > Inventory';
    RAISE NOTICE '3. Adjust pricing if needed in Admin > Pricing';
    RAISE NOTICE '4. Test a booking at /booking/[product-slug]';
    RAISE NOTICE '========================================';
END $$;
