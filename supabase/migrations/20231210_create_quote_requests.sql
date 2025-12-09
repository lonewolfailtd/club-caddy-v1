-- Create quote_requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  business_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  body_color TEXT,
  seat_color TEXT,
  lift_kit TEXT,
  wheel_upgrade TEXT,
  lighting TEXT,
  battery_type TEXT,
  accessories TEXT[],
  primary_use TEXT,
  budget_range TEXT,
  purchase_timeline TEXT,
  special_requests TEXT,
  hear_about_us TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_quote_requests_email ON quote_requests(email);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX idx_quote_requests_product_id ON quote_requests(product_id);

-- Enable Row Level Security
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to insert quote requests (public submission)
CREATE POLICY "Anyone can submit quote requests"
  ON quote_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admins) can view quote requests
CREATE POLICY "Only authenticated users can view quote requests"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users (admins) can update quote requests
CREATE POLICY "Only authenticated users can update quote requests"
  ON quote_requests
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
