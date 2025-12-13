-- Add delivery fields to orders table

-- Add delivery_method column
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS delivery_method TEXT CHECK (delivery_method IN ('delivery', 'pickup')) DEFAULT 'delivery';

-- Add delivery_cost column
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS delivery_cost DECIMAL(10, 2) DEFAULT 0;

-- Add comment to delivery_method column
COMMENT ON COLUMN orders.delivery_method IS 'Delivery method: delivery (home delivery) or pickup (customer pickup)';

-- Add comment to delivery_cost column
COMMENT ON COLUMN orders.delivery_cost IS 'Delivery cost in dollars (0 for pickup)';
