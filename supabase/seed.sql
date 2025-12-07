-- Seed data for Club Caddy Carts

-- Insert Standard Package
INSERT INTO products (
  slug,
  name,
  short_description,
  description,
  tier,
  category,
  base_price,
  sale_type,
  in_stock,
  featured,
  images,
  specifications,
  features,
  seo_title,
  seo_description
) VALUES (
  'standard-golf-cart',
  'Standard Golf Cart Package',
  '48V battery system with essential features for golf course use',
  'Our Standard Package offers excellent value for golf clubs and personal use. Features a reliable 48V battery system, comfortable seating for 2-4 passengers, and essential amenities for a great golfing experience.',
  'standard',
  'golf_cart',
  9200.00,
  'both',
  true,
  true,
  '["/images/products/caddy-cart05.jpg", "/images/products/caddy-cart06.jpg", "/images/products/caddy-cart07.jpg", "/images/products/caddy-cart08.jpg", "/images/products/caddy-cart09.jpg"]'::jsonb,
  '{"battery": "48V Lead-acid or Lithium", "seats": "2-4 seater options", "top_speed": "25km/h", "range": "40-60km per charge", "wheels": "10 inch standard rims", "brakes": "Rear drum brakes", "display": "Basic LCD display"}'::jsonb,
  '[
    {"title": "48V Battery System", "description": "Reliable lead-acid or lithium battery option"},
    {"title": "2-4 Seater Options", "description": "Choose your ideal configuration"},
    {"title": "LED Headlights", "description": "Safe driving in low light"},
    {"title": "Storage Compartment", "description": "Secure lockable storage"},
    {"title": "Cup Holders", "description": "2 cup holders for convenience"}
  ]'::jsonb,
  'Standard Golf Cart Package $9,200 NZD | Club Caddy Carts',
  'Affordable 48V golf cart perfect for clubs and personal use. Starting at $9,200 NZD with 2-4 seater options. Quality and reliability guaranteed.'
),
(
  'premium-golf-cart',
  'Premium Golf Cart Package',
  '60V battery system with enhanced features and comfort',
  'Step up to our Premium Package with a powerful 60V battery system, advanced comfort features, and premium amenities. Perfect for golf clubs seeking enhanced performance and guest comfort.',
  'premium',
  'golf_cart',
  12500.00,
  'both',
  true,
  true,
  '["/images/products/caddy-cart10.jpg", "/images/products/caddy-cart11.jpg", "/images/products/caddy-cart12.jpg", "/images/products/caddy-cart02.jpg", "/images/products/caddy-cart03.jpg"]'::jsonb,
  '{"battery": "60V Lithium", "seats": "4-6 seater options", "top_speed": "35km/h", "range": "70-90km per charge", "wheels": "12 inch alloy rims", "brakes": "4-wheel disc brakes", "display": "7 inch touchscreen"}'::jsonb,
  '[
    {"title": "60V Lithium Battery", "description": "Enhanced power and longer range"},
    {"title": "4-6 Seater Options", "description": "Greater capacity for groups"},
    {"title": "7\" Touchscreen Display", "description": "Advanced controls and monitoring"},
    {"title": "Bluetooth Connectivity", "description": "Music and phone integration"},
    {"title": "Reverse Camera", "description": "Enhanced safety and visibility"},
    {"title": "4-Wheel Disc Brakes", "description": "Superior stopping power"},
    {"title": "Premium Seating", "description": "Extra comfortable cushioned seats"},
    {"title": "Extended Storage", "description": "Multiple storage compartments"}
  ]'::jsonb,
  'Premium Golf Cart $12,500 NZD | 60V Lithium | Club Caddy',
  'Premium 60V golf cart with touchscreen, Bluetooth, and reverse camera. 4-6 seater options. Enhanced comfort and performance at $12,500 NZD.'
),
(
  'ultimate-golf-cart-72v',
  'Ultimate Golf Cart Package - 72V',
  'New Zealand''s First 72V Lithium Battery Golf Cart - The Ultimate Experience',
  'Experience the pinnacle of golf cart luxury with our exclusive 72V Ultimate Package. New Zealand''s first and only 72V lithium battery golf cart featuring cutting-edge technology, premium amenities, and unmatched performance. Perfect for luxury resorts, high-end golf clubs, and discerning private owners.',
  'ultimate',
  'golf_cart',
  16500.00,
  'both',
  true,
  true,
  '["/images/products/caddy-cart13.jpg", "/images/products/caddy-cart01.jpg", "/images/products/caddy-cart14.jpg", "/images/products/caddy-cart04.jpg", "/images/products/caddy-cart02.jpg"]'::jsonb,
  '{"battery": "72V 120Ah Lithium", "seats": "6-8 seater options", "top_speed": "50km/h+", "range": "100km+ per charge", "wheels": "14 inch mag wheels", "brakes": "4-wheel hydraulic disc brakes with automatic braking", "display": "10 inch touchscreen with GPS"}'::jsonb,
  '[
    {"title": "72V 120Ah Lithium Battery", "description": "New Zealand''s first - unmatched power and 100km+ range"},
    {"title": "50km/h+ Top Speed", "description": "Fastest golf cart in NZ with customisable speed settings"},
    {"title": "10\" Touchscreen Display", "description": "Intuitive controls with GPS navigation"},
    {"title": "Bluetooth Connectivity", "description": "Premium sound system for music and calls"},
    {"title": "Reverse Camera & Sensors", "description": "Advanced safety with parking assistance"},
    {"title": "LED Headlights & Indicators", "description": "Full automotive-grade lighting system"},
    {"title": "Hydraulic Disc Brakes", "description": "4-wheel system with automatic emergency braking"},
    {"title": "Adjustable Speed Modes", "description": "Eco mode (20km/h) and Standard mode (35km/h+)"},
    {"title": "14\" Mag Wheels", "description": "Premium alloy wheels with superior grip"},
    {"title": "Luxury Amenities", "description": "Golf ball washer, sand bottles, built-in chilling bin"},
    {"title": "4 Cup Holders", "description": "Plus additional front storage compartments"},
    {"title": "Lockable Storage", "description": "2 secure compartments with front bumper"},
    {"title": "Seat Belts", "description": "Full safety harness system for all passengers"}
  ]'::jsonb,
  'Ultimate 72V Golf Cart $16,500 NZD | 100km Range | Club Caddy',
  'NZ''s first 72V lithium golf cart. 100km+ range, 50km/h top speed, 10" touchscreen. Ultimate luxury and performance. From $16,500 NZD.'
);

-- Insert Add-ons
INSERT INTO addons (name, description, price, category, in_stock) VALUES
('Bag Canopy', 'Weather protection for golf bags', 500.00, 'canopy', true),
('Full Weather Enclosure', 'Complete weather protection with removable panels', 1200.00, 'enclosure', true),
('10" Alloy Rims Upgrade', 'Premium 10 inch alloy wheel upgrade', 400.00, 'wheels', true),
('12" Alloy Rims Upgrade', 'Premium 12 inch alloy wheel upgrade', 600.00, 'wheels', true),
('14" Alloy Rims Upgrade', 'Premium 14 inch alloy wheel upgrade (Ultimate package)', 800.00, 'wheels', true),
('Custom Colour Paint', 'Choose your custom colour (Pearl White, Ocean Blue, Forest Green, Sunset Red, Charcoal Black)', 750.00, 'customization', true),
('Flat Deck Tray', 'Utility flat deck for equipment and supplies', 1500.00, 'utility', true),
('Large Bin Attachment', 'Heavy-duty bin for maintenance and transport', 1200.00, 'utility', true),
('Premium Sound System', 'Upgraded speakers and subwoofer', 650.00, 'electronics', true),
('Solar Panel Roof', 'Eco-friendly solar charging system', 2000.00, 'power', true);

-- Insert knowledge base entries for AI chatbot
INSERT INTO product_knowledge_base (content, metadata) VALUES
('Club Caddy Carts is New Zealand''s premier supplier of premium electric golf carts. We offer three main packages: Standard ($9,200), Premium ($12,500), and Ultimate ($16,500). All carts come with a $1,000 deposit option and approximately 6-week delivery time.', '{"category": "company", "type": "overview"}'::jsonb),
('Our Ultimate Package features New Zealand''s first 72V 120Ah lithium battery golf cart with 100km+ range per charge and 50km/h+ top speed. It includes a 10-inch touchscreen, Bluetooth connectivity, reverse camera, LED headlights, hydraulic disc brakes, and luxury amenities.', '{"category": "products", "type": "ultimate_package", "tier": "ultimate"}'::jsonb),
('The Standard Package is perfect for budget-conscious buyers. It features a 48V battery system (lead-acid or lithium options), 2-4 seater configurations, LED headlights, storage compartment, and cup holders. Starting price: $9,200 NZD.', '{"category": "products", "type": "standard_package", "tier": "standard"}'::jsonb),
('The Premium Package offers a 60V lithium battery, 4-6 seater options, 7-inch touchscreen, Bluetooth, reverse camera, 4-wheel disc brakes, and premium seating. Priced at $12,500 NZD with 70-90km range.', '{"category": "products", "type": "premium_package", "tier": "premium"}'::jsonb),
('We offer various add-ons including: Bag Canopy ($500), Full Weather Enclosure ($1,200), Wheel Upgrades (10"/12"/14" - $400-$800), Custom Colours ($750), Flat Deck Tray ($1,500), Large Bin ($1,200), Premium Sound ($650) and Solar Panels ($2,000).', '{"category": "products", "type": "addons"}'::jsonb),
('Golf cart hire and leasing options are available for events, tournaments, corporate functions, and seasonal use. We offer short-term and long-term rental options for businesses and resorts across New Zealand.', '{"category": "services", "type": "hire_leasing"}'::jsonb),
('Delivery: Approximately 6 weeks across New Zealand to Auckland, Wellington, Christchurch, and other major regions. Secure your order with a $1,000 deposit. Full payment required before delivery.', '{"category": "logistics", "type": "delivery"}'::jsonb),
('Contact Information: Warren - Phone: +64-021-560-307, Email: admin@clubcaddycarts.com. Viewings available by appointment. We are based in New Zealand and serve the entire country.', '{"category": "contact", "type": "info"}'::jsonb),
('Battery options: 48V (Standard), 60V (Premium), 72V (Ultimate). Lithium batteries offer longer range, faster charging, and lighter weight compared to lead-acid. The 72V system provides 100km+ range.', '{"category": "specifications", "type": "battery"}'::jsonb),
('Safety features include: Seat belts for all passengers, LED headlights with turn indicators, 4-wheel hydraulic disc brakes (Ultimate), reverse cameras, automatic braking system, and parking sensors on premium models.', '{"category": "specifications", "type": "safety"}'::jsonb),
('Speed settings: Eco mode runs at 20km/h for maximum battery life. Standard mode operates at 35km/h. The Ultimate package can be customised for speeds of 50km/h+. All speeds are adjustable.', '{"category": "specifications", "type": "speed"}'::jsonb),
('Customisation options: Choose from multiple colours (Pearl White, Ocean Blue, Forest Green, Sunset Red, Charcoal Black), seating configurations (2 to 20 seater), battery types, wheel sizes (10"/12"/14") and add weather protection or utility attachments.', '{"category": "customization", "type": "options"}'::jsonb);

-- Create a sample admin user (password should be set through Supabase Auth UI)
-- This is just for the profile, actual auth account needs to be created via Supabase dashboard
-- INSERT INTO profiles (id, email, full_name, is_admin)
-- VALUES ('ADMIN_USER_UUID_HERE', 'admin@clubcaddycarts.com', 'Admin User', true);
