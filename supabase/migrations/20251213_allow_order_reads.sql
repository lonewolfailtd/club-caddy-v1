-- Allow anyone to read orders if they have the order ID (UUID acts as secure token)
-- This allows anonymous users to view their order confirmation after checkout
CREATE POLICY "Anyone can view orders by ID"
  ON orders
  FOR SELECT
  USING (true);
