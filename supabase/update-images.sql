-- Update product images with local paths from public folder

-- Standard Golf Cart
UPDATE products
SET images = '["/images/products/cart01.jpg"]'::jsonb
WHERE slug = 'standard-golf-cart';

-- Premium Golf Cart
UPDATE products
SET images = '["/images/products/cart05.jpg", "/images/products/cart06.jpg", "/images/products/cart08.jpg"]'::jsonb
WHERE slug = 'premium-golf-cart';

-- Ultimate Golf Cart 72V
UPDATE products
SET images = '["/images/products/cart10.jpg", "/images/products/cart11.jpg", "/images/products/cart13.jpg"]'::jsonb
WHERE slug = 'ultimate-golf-cart-72v';

-- Verify updates
SELECT slug, jsonb_array_length(images) as image_count
FROM products
ORDER BY base_price;
