-- =====================================================
-- SEED PRODUCTS FOR CLUB CADDY CARTS (FIXED VERSION)
-- Matches the actual database schema
-- Run this in Supabase SQL Editor
-- =====================================================

-- First, let's clear any existing products (optional - comment out if you want to keep existing data)
-- DELETE FROM products;

-- Insert Standard Edition Golf Cart
INSERT INTO products (
  id,
  name,
  slug,
  tier,
  category,
  base_price,
  description,
  short_description,
  features,
  specifications,
  images,
  in_stock,
  featured,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'Classic Caddy',
  'classic-caddy',
  'standard',
  'golf-cart',
  11500.00,
  'The Classic Caddy represents the perfect entry point into premium electric golf cart ownership. Built with quality components and powered by advanced 72V lithium technology, this cart delivers exceptional performance for golf courses, estates, and community use.

Featuring a comfortable 2-4 seater configuration, the Classic Caddy comes equipped with essential safety features including hydraulic disc brakes, LED headlights, and seat belts. The 72V lithium battery provides an impressive 80-100km range on a single charge, making it ideal for a full day on the course or around your property.

Standard amenities include a basic digital display, USB charging ports, weather canopy, and lockable storage compartment. Available in multiple colors with customizable options to suit your needs.',
  'Entry-level premium golf cart with 72V lithium power, 80-100km range, and essential safety features. Perfect for golf courses and estates.',
  jsonb_build_array(
    'Advanced 72V Lithium Battery System',
    '80-100km Range Per Charge',
    '4-Wheel Hydraulic Disc Brakes',
    'LED Headlights & Taillights',
    'Digital Speed Display',
    'USB Charging Ports',
    'Weather Canopy Included',
    'Lockable Storage Compartment',
    'Seat Belts (All Seats)',
    'Cup Holders (2)',
    'Eco & Standard Driving Modes',
    '2-4 Seater Configuration',
    'Multiple Color Options',
    '6-Week Delivery to NZ'
  ),
  jsonb_build_object(
    'Battery', '72V Lithium (80Ah)',
    'Range', '80-100km per charge',
    'Top Speed', '35 km/h',
    'Charging Time', '6-8 hours',
    'Seating', '2-4 passengers',
    'Dimensions (L×W×H)', '2850mm × 1200mm × 1850mm',
    'Weight', '450kg',
    'Load Capacity', '400kg',
    'Motor', '5kW AC Motor',
    'Brakes', '4-Wheel Hydraulic Disc',
    'Tires', '10" Standard',
    'Suspension', 'Independent Front & Rear',
    'Warranty', '2 Years'
  ),
  jsonb_build_array(
    '/images/products/caddy-cart01.jpg',
    '/images/products/caddy-cart02.jpg',
    '/images/products/caddy-cart03.jpg',
    '/images/products/caddy-cart04.jpg'
  ),
  true,
  false,
  NOW(),
  NOW()
);

-- Insert Premium Edition Golf Cart
INSERT INTO products (
  id,
  name,
  slug,
  tier,
  category,
  base_price,
  description,
  short_description,
  features,
  specifications,
  images,
  in_stock,
  featured,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'Elite Caddy',
  'elite-caddy',
  'premium',
  'golf-cart',
  14000.00,
  'The Elite Caddy elevates your golf cart experience with premium features and enhanced technology. Building on the solid foundation of our Classic model, the Elite adds sophisticated amenities that make every journey more comfortable and enjoyable.

At the heart of the Elite is the advanced 10" touchscreen display with Bluetooth connectivity, allowing you to stream music, take hands-free calls, and monitor all vehicle systems. The integrated reverse camera provides enhanced safety when backing up, while the premium sound system ensures you enjoy every moment on the course.

Enhanced comfort features include a built-in chilling bin for beverages, golf ball washer, sand bottles, and 4 cup holders. The Elite Caddy also features upgraded 12" wheels, enhanced suspension, and premium upholstery. With 100-120km range from the enhanced 72V lithium system, this cart is perfect for those who demand more from their golf cart experience.',
  'Premium golf cart with 10" touchscreen, Bluetooth, reverse camera, 100-120km range. Enhanced comfort and technology features.',
  jsonb_build_array(
    '10" Touchscreen Display with Bluetooth',
    'Integrated Reverse Camera',
    'Premium Sound System',
    'Enhanced 72V Lithium Battery (100Ah)',
    '100-120km Extended Range',
    'Built-in Chilling Bin',
    'Golf Ball Washer',
    'Sand Bottles (2)',
    'Cup Holders (4)',
    'Lockable Storage with USB Charging',
    '4-Wheel Hydraulic Disc Brakes',
    'LED Headlights & Taillights',
    'Premium Upholstery',
    'Upgraded 12" Wheels',
    'Enhanced Suspension System',
    'Multiple Driving Modes',
    '2-6 Seater Configuration',
    'Multiple Color Options'
  ),
  jsonb_build_object(
    'Battery', '72V Lithium (100Ah)',
    'Range', '100-120km per charge',
    'Top Speed', '40 km/h',
    'Charging Time', '6-8 hours',
    'Seating', '2-6 passengers',
    'Dimensions (L×W×H)', '2900mm × 1250mm × 1900mm',
    'Weight', '520kg',
    'Load Capacity', '500kg',
    'Motor', '7kW AC Motor',
    'Brakes', '4-Wheel Hydraulic Disc',
    'Tires', '12" Alloy Wheels',
    'Suspension', 'Premium Independent Front & Rear',
    'Display', '10" Touchscreen',
    'Warranty', '3 Years'
  ),
  jsonb_build_array(
    '/images/products/caddy-cart05.jpg',
    '/images/products/caddy-cart06.jpg',
    '/images/products/caddy-cart07.jpg',
    '/images/products/caddy-cart08.jpg',
    '/images/products/caddy-cart09.jpg'
  ),
  true,
  true,
  NOW(),
  NOW()
);

-- Insert Ultimate Edition Golf Cart
INSERT INTO products (
  id,
  name,
  slug,
  tier,
  category,
  base_price,
  description,
  short_description,
  features,
  specifications,
  images,
  in_stock,
  featured,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'Prestige Caddy',
  'prestige-caddy',
  'ultimate',
  'golf-cart',
  16500.00,
  'The Prestige Caddy represents the pinnacle of electric golf cart luxury and performance. This flagship model combines cutting-edge technology, premium materials, and exceptional craftsmanship to deliver an unparalleled driving experience.

Powered by the most advanced 72V lithium system (120Ah), the Prestige Caddy offers an extraordinary 120-150km range - enough for multiple rounds without recharging. The powerful 9kW motor delivers smooth, responsive acceleration up to 50 km/h, while the advanced suspension system ensures a comfortable ride over any terrain.

Luxury appointments include premium leather upholstery, ambient LED lighting, heated seats, wireless phone charging, and a premium 10" touchscreen with navigation. The comprehensive safety package adds automatic emergency braking, hill assist, and advanced stability control. The Prestige also features a full weather enclosure, alloy wheels, and multiple customization options.

Perfect for discerning golf enthusiasts, estate owners, and those who refuse to compromise on quality.',
  'Ultimate luxury golf cart with 120-150km range, premium leather, heated seats, navigation, and advanced safety features.',
  jsonb_build_array(
    'Premium 72V Lithium Battery (120Ah)',
    '120-150km Maximum Range',
    'Powerful 9kW Motor',
    '50 km/h Top Speed',
    '10" Touchscreen with GPS Navigation',
    'Premium Leather Upholstery',
    'Heated Seats',
    'Wireless Phone Charging',
    'Ambient LED Lighting',
    'Premium Sound System with Subwoofer',
    'Integrated Reverse Camera',
    'Automatic Emergency Braking',
    'Hill Assist',
    'Advanced Stability Control',
    'Full Weather Enclosure',
    '14" Alloy Wheels',
    'Premium Suspension System',
    'Built-in Chilling Bin with Temperature Control',
    'Golf Ball Washer & Sand Bottles',
    'Cup Holders (6)',
    'Extra Lockable Storage',
    'Remote Key Fob',
    '2-8 Seater Configuration',
    'Fully Customizable'
  ),
  jsonb_build_object(
    'Battery', '72V Lithium (120Ah)',
    'Range', '120-150km per charge',
    'Top Speed', '50 km/h',
    'Charging Time', '6-8 hours',
    'Seating', '2-8 passengers',
    'Dimensions (L×W×H)', '3000mm × 1300mm × 1950mm',
    'Weight', '600kg',
    'Load Capacity', '600kg',
    'Motor', '9kW AC Motor',
    'Brakes', '4-Wheel Hydraulic Disc with ABS',
    'Tires', '14" Premium Alloy Wheels',
    'Suspension', 'Premium Independent 4-Wheel',
    'Display', '10" Touchscreen with Navigation',
    'Safety', 'Automatic Emergency Braking, Hill Assist, Stability Control',
    'Warranty', '5 Years'
  ),
  jsonb_build_array(
    '/images/products/caddy-cart10.jpg',
    '/images/products/caddy-cart11.jpg',
    '/images/products/caddy-cart12.jpg',
    '/images/products/caddy-cart13.jpg',
    '/images/products/caddy-cart14.jpg'
  ),
  true,
  true,
  NOW(),
  NOW()
);

-- Check if addons table exists and insert add-ons
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'addons') THEN
    -- Insert some add-ons/accessories
    INSERT INTO addons (
      id,
      name,
      description,
      price,
      category,
      in_stock,
      image_url,
      created_at,
      updated_at
    ) VALUES
      (
        gen_random_uuid(),
        'Weather Enclosure',
        'Premium full weather enclosure with clear windows and zippered doors. Keeps you dry in rain and warm in cold weather.',
        850.00,
        'protection',
        true,
        '/images/addons/weather-enclosure.jpg',
        NOW(),
        NOW()
      ),
      (
        gen_random_uuid(),
        'Golf Bag Attachment',
        'Heavy-duty golf bag holder that attaches to the rear of the cart. Holds 2 full-size golf bags securely.',
        250.00,
        'golf',
        true,
        '/images/addons/golf-bag-holder.jpg',
        NOW(),
        NOW()
      ),
      (
        gen_random_uuid(),
        'Upgraded Sound System',
        'Premium Bluetooth sound system with 6 speakers and subwoofer. Crystal clear audio for music and calls.',
        650.00,
        'electronics',
        true,
        '/images/addons/sound-system.jpg',
        NOW(),
        NOW()
      ),
      (
        gen_random_uuid(),
        'Custom Paint Job',
        'Professional custom paint in your choice of color. Includes clear coat protection and logo application.',
        1200.00,
        'customization',
        true,
        '/images/addons/custom-paint.jpg',
        NOW(),
        NOW()
      ),
      (
        gen_random_uuid(),
        'Extended Warranty (3 Years)',
        'Extended warranty coverage for an additional 3 years beyond the standard warranty. Comprehensive parts and labor.',
        800.00,
        'warranty',
        true,
        '/images/addons/warranty.jpg',
        NOW(),
        NOW()
      ),
      (
        gen_random_uuid(),
        'Rear Seat Kit (Flip-Up)',
        'Converts your 2-seater into a 4-seater with fold-down rear bench. Includes seat belts and padding.',
        950.00,
        'seating',
        true,
        '/images/addons/rear-seat.jpg',
        NOW(),
        NOW()
      ),
      (
        gen_random_uuid(),
        'LED Light Bar',
        'Powerful LED light bar for enhanced visibility. Perfect for early morning or evening use.',
        320.00,
        'lighting',
        true,
        '/images/addons/light-bar.jpg',
        NOW(),
        NOW()
      ),
      (
        gen_random_uuid(),
        'Lift Kit (3")',
        '3-inch suspension lift kit for enhanced ground clearance. Includes all necessary hardware.',
        750.00,
        'performance',
        true,
        '/images/addons/lift-kit.jpg',
        NOW(),
        NOW()
      );
  END IF;
END $$;

-- Verify the data was inserted
SELECT
  '✅ Products Added:' as status,
  COUNT(*) as count
FROM products;

SELECT
  tier,
  name,
  base_price,
  in_stock,
  featured
FROM products
ORDER BY base_price ASC;

-- Check add-ons if table exists
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'addons') THEN
    PERFORM (
      SELECT
        '✅ Add-ons Added:' as status,
        COUNT(*) as count
      FROM addons
    );
  END IF;
END $$;
