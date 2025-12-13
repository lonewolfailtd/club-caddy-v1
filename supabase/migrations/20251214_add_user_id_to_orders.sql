-- Add user_id column to orders table to link orders with user accounts

ALTER TABLE orders
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Create index for email lookups (for linking orphaned orders)
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

COMMENT ON COLUMN orders.user_id IS 'User account associated with this order (NULL for guest checkouts)';
