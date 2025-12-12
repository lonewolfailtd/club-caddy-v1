-- Fix permissions for booking functions
-- This allows anon users to check availability and create bookings

-- Update check_availability function to use SECURITY DEFINER
CREATE OR REPLACE FUNCTION check_availability(
    p_product_id UUID,
    p_start_date TIMESTAMPTZ,
    p_end_date TIMESTAMPTZ,
    p_quantity INTEGER
)
RETURNS BOOLEAN
SECURITY DEFINER  -- Run with owner privileges, bypassing RLS
SET search_path = public
AS $$
DECLARE
    v_total_inventory INTEGER;
    v_blocked_quantity INTEGER;
    v_booked_quantity INTEGER;
    v_available INTEGER;
BEGIN
    -- Get total inventory for product
    SELECT total_quantity INTO v_total_inventory
    FROM inventory
    WHERE product_id = p_product_id;

    -- If no inventory record or quantity is 0, not available
    IF v_total_inventory IS NULL OR v_total_inventory = 0 THEN
        RETURN FALSE;
    END IF;

    -- Check blocked availability (maintenance, holidays, etc.)
    SELECT COALESCE(SUM(quantity_blocked), 0) INTO v_blocked_quantity
    FROM availability_blocks
    WHERE product_id = p_product_id
        AND (
            -- Overlapping date ranges
            (start_date <= p_start_date AND end_date >= p_start_date) OR
            (start_date <= p_end_date AND end_date >= p_end_date) OR
            (start_date >= p_start_date AND end_date <= p_end_date)
        );

    -- Check existing confirmed/pending bookings
    SELECT COALESCE(SUM(quantity), 0) INTO v_booked_quantity
    FROM bookings
    WHERE product_id = p_product_id
        AND status IN ('pending', 'confirmed', 'in_progress')
        AND (
            -- Overlapping date ranges
            (start_date <= p_start_date AND end_date >= p_start_date) OR
            (start_date <= p_end_date AND end_date >= p_end_date) OR
            (start_date >= p_start_date AND end_date <= p_end_date)
        );

    -- Calculate available quantity
    v_available := v_total_inventory - v_blocked_quantity - v_booked_quantity;

    -- Return TRUE if enough carts available
    RETURN v_available >= p_quantity;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to anon and authenticated users
GRANT EXECUTE ON FUNCTION check_availability(UUID, TIMESTAMPTZ, TIMESTAMPTZ, INTEGER) TO anon, authenticated;

-- Also update generate_booking_number if it exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc
        WHERE proname = 'generate_booking_number'
    ) THEN
        EXECUTE 'ALTER FUNCTION generate_booking_number() SECURITY DEFINER';
        EXECUTE 'GRANT EXECUTE ON FUNCTION generate_booking_number() TO anon, authenticated';
    END IF;
END $$;

-- Ensure RLS policies allow anon users to:
-- 1. Read inventory (to check availability)
-- 2. Read rental_pricing (to calculate prices)
-- 3. Insert bookings (to create reservations)

-- Allow anon to read inventory
DROP POLICY IF EXISTS "Allow anon to read inventory" ON inventory;
CREATE POLICY "Allow anon to read inventory"
ON inventory FOR SELECT
TO anon
USING (true);

-- Allow anon to read rental_pricing
DROP POLICY IF EXISTS "Allow anon to read rental_pricing" ON rental_pricing;
CREATE POLICY "Allow anon to read rental_pricing"
ON rental_pricing FOR SELECT
TO anon
USING (active = true);

-- Allow anon to insert bookings (for guest checkout)
DROP POLICY IF EXISTS "Allow anon to create bookings" ON bookings;
CREATE POLICY "Allow anon to create bookings"
ON bookings FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anon to read their own bookings by email
DROP POLICY IF EXISTS "Allow anon to read own bookings" ON bookings;
CREATE POLICY "Allow anon to read own bookings"
ON bookings FOR SELECT
TO anon
USING (true);  -- We'll rely on the API to filter by email

COMMENT ON POLICY "Allow anon to create bookings" ON bookings IS
'Allows anonymous users to create bookings for guest checkout';
