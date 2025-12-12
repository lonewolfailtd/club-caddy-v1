-- Create orders table for purchase flow (with deposit + balance payment)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,

  -- Customer Information
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,

  -- Shipping Address
  shipping_address JSONB NOT NULL,
  special_instructions TEXT,

  -- Order Items (stored as JSONB array)
  items JSONB NOT NULL,

  -- Pricing
  subtotal DECIMAL(10, 2) NOT NULL,
  deposit_amount DECIMAL(10, 2) NOT NULL,
  deposit_percentage INTEGER DEFAULT 20, -- e.g., 20 for 20%
  balance_due DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,

  -- Payment Status
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN (
    'pending',           -- Initial state, no payment yet
    'deposit_paid',      -- Deposit received, awaiting cart preparation
    'invoice_sent',      -- Balance invoice sent to customer
    'paid',             -- Full payment received
    'refunded',         -- Payment refunded
    'failed'            -- Payment failed
  )),

  -- Order Status
  order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN (
    'pending',          -- Order created, deposit pending
    'processing',       -- Deposit paid, cart being prepared
    'ready',           -- Cart ready, balance invoice sent
    'completed',       -- Fully paid and delivered
    'cancelled'        -- Order cancelled
  )),

  -- Stripe Payment IDs
  deposit_payment_intent_id TEXT,
  deposit_paid_at TIMESTAMPTZ,
  balance_payment_intent_id TEXT,
  balance_paid_at TIMESTAMPTZ,
  balance_invoice_sent_at TIMESTAMPTZ,

  -- Delivery
  estimated_delivery_date DATE,
  delivered_at TIMESTAMPTZ,
  delivery_notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Metadata
  notes TEXT,
  admin_notes TEXT
);

-- Create index for faster lookups
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_order_status ON orders(order_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  counter INTEGER;
BEGIN
  -- Format: CC-YYYYMMDD-XXXX (e.g., CC-20251213-0001)
  SELECT COUNT(*) + 1 INTO counter
  FROM orders
  WHERE DATE(created_at) = CURRENT_DATE;

  new_number := 'CC-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD(counter::TEXT, 4, '0');

  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate order number if not provided
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Allow authenticated users to read their own orders
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' = customer_email
  );

-- Allow service role (backend) to do everything
CREATE POLICY "Service role has full access to orders"
  ON orders
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Allow anon to create orders (for checkout)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  WITH CHECK (true);

-- Admin users can view all orders
CREATE POLICY "Admin users can view all orders"
  ON orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Admin users can update orders
CREATE POLICY "Admin users can update orders"
  ON orders
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Comments
COMMENT ON TABLE orders IS 'Purchase orders with deposit and balance payment tracking';
COMMENT ON COLUMN orders.deposit_amount IS 'Initial deposit amount paid at checkout';
COMMENT ON COLUMN orders.balance_due IS 'Remaining balance after deposit';
COMMENT ON COLUMN orders.payment_status IS 'Tracks payment progression: pending → deposit_paid → invoice_sent → paid';
COMMENT ON COLUMN orders.order_status IS 'Tracks order fulfillment: pending → processing → ready → completed';
