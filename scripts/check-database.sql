-- Check what products exist and their categories
SELECT 'Products in database:' as info;
SELECT id, name, slug, tier, category
FROM products
LIMIT 10;

-- Check what enum values are allowed for category
SELECT 'Category enum values:' as info;
SELECT unnest(enum_range(NULL::product_category))::text as allowed_categories;

-- Check if products table has rental_enabled column
SELECT 'Product columns:' as info;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'products'
AND column_name IN ('category', 'rental_enabled', 'purchase_enabled');
