-- =====================================================
-- Club Caddy: Rental Booking System Migration
-- Created: 2024-12-10
-- Description: Complete rental booking system with inventory management
-- =====================================================

-- Create custom types
DO $$ BEGIN
    CREATE TYPE rental_type AS ENUM ('hourly', 'daily', 'weekly', 'custom');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'paid', 'failed', 'refunded', 'partially_refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM (
        'pending',
        'confirmed',
        'in_progress',
        'completed',
        'cancelled',
        'no_show',
        'requires_action'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- TABLE: rental_pricing
-- Purpose: Store hourly/daily/weekly rental rates per product
-- =====================================================
CREATE TABLE IF NOT EXISTS rental_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,

    -- Pricing tiers
    hourly_rate DECIMAL(10, 2),
    hourly_minimum_hours INTEGER DEFAULT 2, -- Minimum 2-4 hours for hourly rentals
    daily_rate DECIMAL(10, 2),
    weekly_rate DECIMAL(10, 2),
    monthly_rate DECIMAL(10, 2),

    -- Deposit
    deposit_amount DECIMAL(10, 2) DEFAULT 0,

    -- Status
    active BOOLEAN DEFAULT TRUE,

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    CONSTRAINT positive_rates CHECK (
        (hourly_rate IS NULL OR hourly_rate >= 0) AND
        (daily_rate IS NULL OR daily_rate >= 0) AND
        (weekly_rate IS NULL OR weekly_rate >= 0) AND
        (monthly_rate IS NULL OR monthly_rate >= 0) AND
        deposit_amount >= 0
    )
);

-- =====================================================
-- TABLE: inventory
-- Purpose: Track cart quantities (total, available, reserved, maintenance)
-- =====================================================
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE UNIQUE NOT NULL,

    -- Inventory counts
    total_quantity INTEGER NOT NULL DEFAULT 0,
    available_quantity INTEGER NOT NULL DEFAULT 0,
    reserved_quantity INTEGER NOT NULL DEFAULT 0,
    maintenance_quantity INTEGER NOT NULL DEFAULT 0,

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    CONSTRAINT inventory_quantities_valid CHECK (
        total_quantity >= 0 AND
        available_quantity >= 0 AND
        reserved_quantity >= 0 AND
        maintenance_quantity >= 0 AND
        total_quantity = available_quantity + reserved_quantity + maintenance_quantity
    )
);

-- =====================================================
-- TABLE: bookings
-- Purpose: Store rental bookings with customer info, dates, pricing
-- =====================================================
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_number TEXT UNIQUE NOT NULL,

    -- User reference (nullable for guest checkout)
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

    -- Customer information (required for guest checkout)
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,

    -- Booking details
    product_id UUID REFERENCES products(id) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0 AND quantity <= 20),

    -- Rental period
    rental_type rental_type NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    duration_hours INTEGER, -- Calculated for hourly rentals
    duration_days INTEGER,  -- Calculated for daily+ rentals

    -- Pricing (snapshot at time of booking)
    base_rate DECIMAL(10, 2) NOT NULL CHECK (base_rate >= 0),
    addon_total DECIMAL(10, 2) DEFAULT 0 CHECK (addon_total >= 0),
    subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
    tax_amount DECIMAL(10, 2) DEFAULT 0 CHECK (tax_amount >= 0),
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),

    -- Payment tracking
    payment_status payment_status DEFAULT 'pending',
    stripe_payment_intent_id TEXT,
    stripe_session_id TEXT,
    paid_at TIMESTAMPTZ,

    -- Booking status
    status booking_status DEFAULT 'pending',

    -- Additional details (JSONB for flexibility)
    selected_addons JSONB DEFAULT '[]'::jsonb,
    delivery_address JSONB,
    pickup_location TEXT,
    special_requests TEXT,

    -- Admin notes
    admin_notes TEXT,

    -- Cancellation tracking
    cancelled_at TIMESTAMPTZ,
    cancellation_reason TEXT,

    -- Email tracking
    confirmation_email_sent BOOLEAN DEFAULT FALSE,
    reminder_email_sent BOOLEAN DEFAULT FALSE,

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    CONSTRAINT valid_date_range CHECK (end_date > start_date),
    CONSTRAINT valid_duration CHECK (
        (rental_type = 'hourly' AND duration_hours >= 2) OR
        (rental_type IN ('daily', 'weekly', 'custom') AND duration_days >= 1)
    )
);

-- =====================================================
-- TABLE: availability_blocks
-- Purpose: Block out dates for maintenance, holidays, etc.
-- =====================================================
CREATE TABLE IF NOT EXISTS availability_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,

    -- Date range to block
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    quantity_blocked INTEGER NOT NULL DEFAULT 1 CHECK (quantity_blocked > 0),

    -- Reason for blocking
    reason TEXT NOT NULL CHECK (reason IN ('maintenance', 'holiday', 'reserved', 'other')),
    notes TEXT,

    -- Admin tracking
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    CONSTRAINT valid_block_dates CHECK (end_date > start_date)
);

-- =====================================================
-- INDEXES for performance optimization
-- =====================================================

-- Rental pricing indexes
CREATE INDEX IF NOT EXISTS idx_rental_pricing_product_id ON rental_pricing(product_id);
CREATE INDEX IF NOT EXISTS idx_rental_pricing_active ON rental_pricing(active) WHERE active = TRUE;

-- Inventory indexes
CREATE INDEX IF NOT EXISTS idx_inventory_product_id ON inventory(product_id);

-- Bookings indexes (critical for performance)
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_number ON bookings(booking_number);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_product_id ON bookings(product_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_start_date ON bookings(start_date);
CREATE INDEX IF NOT EXISTS idx_bookings_end_date ON bookings(end_date);
CREATE INDEX IF NOT EXISTS idx_bookings_date_range ON bookings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- Availability blocks indexes
CREATE INDEX IF NOT EXISTS idx_availability_blocks_product_id ON availability_blocks(product_id);
CREATE INDEX IF NOT EXISTS idx_availability_blocks_dates ON availability_blocks(start_date, end_date);

-- =====================================================
-- FUNCTIONS: Booking number generation
-- =====================================================

-- Sequence for booking numbers
CREATE SEQUENCE IF NOT EXISTS booking_number_seq START 1;

-- Function to generate unique booking numbers (format: BK-YYYYMMDD-####)
CREATE OR REPLACE FUNCTION generate_booking_number()
RETURNS TEXT AS $$
DECLARE
    new_booking_number TEXT;
    date_part TEXT;
    sequence_part TEXT;
BEGIN
    date_part := TO_CHAR(NOW(), 'YYYYMMDD');
    sequence_part := LPAD(NEXTVAL('booking_number_seq')::TEXT, 4, '0');
    new_booking_number := 'BK-' || date_part || '-' || sequence_part;

    RETURN new_booking_number;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- FUNCTIONS: Availability checking
-- =====================================================

-- Function to check if carts are available for a given date range
CREATE OR REPLACE FUNCTION check_availability(
    p_product_id UUID,
    p_start_date TIMESTAMPTZ,
    p_end_date TIMESTAMPTZ,
    p_quantity INTEGER
)
RETURNS BOOLEAN AS $$
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

-- =====================================================
-- TRIGGERS: Auto-update timestamps
-- =====================================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_rental_pricing_updated_at
    BEFORE UPDATE ON rental_pricing
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_availability_blocks_updated_at
    BEFORE UPDATE ON availability_blocks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TRIGGERS: Inventory management
-- =====================================================

-- Function to reserve inventory when booking is created
CREATE OR REPLACE FUNCTION reserve_inventory_on_booking()
RETURNS TRIGGER AS $$
BEGIN
    -- Only reserve if booking is pending or confirmed
    IF NEW.status IN ('confirmed', 'pending') THEN
        UPDATE inventory
        SET
            available_quantity = available_quantity - NEW.quantity,
            reserved_quantity = reserved_quantity + NEW.quantity
        WHERE product_id = NEW.product_id;

        -- Check if update was successful
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Inventory not found for product_id: %', NEW.product_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to reserve inventory on booking creation
CREATE TRIGGER trigger_reserve_inventory_on_booking
    AFTER INSERT ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION reserve_inventory_on_booking();

-- Function to release inventory when booking status changes
CREATE OR REPLACE FUNCTION release_inventory_on_booking_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Release inventory when booking is completed, cancelled, or no-show
    IF OLD.status IN ('confirmed', 'pending', 'in_progress') AND
       NEW.status IN ('completed', 'cancelled', 'no_show') THEN

        UPDATE inventory
        SET
            available_quantity = available_quantity + OLD.quantity,
            reserved_quantity = reserved_quantity - OLD.quantity
        WHERE product_id = OLD.product_id;

        -- Check if update was successful
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Inventory not found for product_id: %', OLD.product_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to release inventory on booking status change
CREATE TRIGGER trigger_release_inventory_on_booking_change
    AFTER UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION release_inventory_on_booking_change();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) Policies
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE rental_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_blocks ENABLE ROW LEVEL SECURITY;

-- Rental Pricing Policies
CREATE POLICY "rental_pricing_public_read"
    ON rental_pricing FOR SELECT
    USING (active = TRUE);

CREATE POLICY "rental_pricing_admin_all"
    ON rental_pricing FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = TRUE
        )
    );

-- Inventory Policies
CREATE POLICY "inventory_public_read"
    ON inventory FOR SELECT
    USING (TRUE);

CREATE POLICY "inventory_admin_all"
    ON inventory FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = TRUE
        )
    );

-- Bookings Policies
CREATE POLICY "bookings_insert_anyone"
    ON bookings FOR INSERT
    WITH CHECK (TRUE); -- Allow anyone to create bookings (guest checkout)

CREATE POLICY "bookings_select_own"
    ON bookings FOR SELECT
    USING (
        -- Users can see their own bookings
        auth.uid() = user_id
        OR
        -- Guest users can see bookings by email (implement email verification in app)
        customer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
        OR
        -- Admins can see all bookings
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = TRUE
        )
    );

CREATE POLICY "bookings_update_own_or_admin"
    ON bookings FOR UPDATE
    USING (
        auth.uid() = user_id
        OR
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = TRUE
        )
    );

CREATE POLICY "bookings_admin_delete"
    ON bookings FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = TRUE
        )
    );

-- Availability Blocks Policies
CREATE POLICY "availability_blocks_public_read"
    ON availability_blocks FOR SELECT
    USING (TRUE);

CREATE POLICY "availability_blocks_admin_all"
    ON availability_blocks FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_admin = TRUE
        )
    );

-- =====================================================
-- PRODUCT TABLE UPDATES
-- =====================================================

-- Add rental flags to products table
ALTER TABLE products
    ADD COLUMN IF NOT EXISTS rental_enabled BOOLEAN DEFAULT FALSE;

ALTER TABLE products
    ADD COLUMN IF NOT EXISTS purchase_enabled BOOLEAN DEFAULT TRUE;

-- Comment on new columns
COMMENT ON COLUMN products.rental_enabled IS 'Whether this product is available for rental';
COMMENT ON COLUMN products.purchase_enabled IS 'Whether this product is available for purchase';

-- =====================================================
-- HELPER FUNCTIONS for Admin
-- =====================================================

-- Function to get booking statistics
CREATE OR REPLACE FUNCTION get_booking_stats(p_start_date TIMESTAMPTZ, p_end_date TIMESTAMPTZ)
RETURNS TABLE (
    total_bookings BIGINT,
    confirmed_bookings BIGINT,
    cancelled_bookings BIGINT,
    total_revenue NUMERIC,
    avg_booking_value NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*)::BIGINT as total_bookings,
        COUNT(*) FILTER (WHERE status = 'confirmed')::BIGINT as confirmed_bookings,
        COUNT(*) FILTER (WHERE status = 'cancelled')::BIGINT as cancelled_bookings,
        COALESCE(SUM(total_amount) FILTER (WHERE payment_status = 'paid'), 0) as total_revenue,
        COALESCE(AVG(total_amount) FILTER (WHERE payment_status = 'paid'), 0) as avg_booking_value
    FROM bookings
    WHERE created_at >= p_start_date AND created_at <= p_end_date;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INITIAL DATA SEEDING (Optional - comment out if not needed)
-- =====================================================

-- Note: Uncomment and modify the following to seed initial data

/*
-- Example: Add rental pricing for existing products
INSERT INTO rental_pricing (product_id, hourly_rate, hourly_minimum_hours, daily_rate, weekly_rate)
SELECT
    id,
    50.00,  -- $50/hour
    4,      -- 4 hour minimum
    200.00, -- $200/day
    1200.00 -- $1200/week
FROM products
WHERE category = 'golf_carts'
ON CONFLICT (product_id) DO NOTHING;

-- Example: Initialize inventory for existing products
INSERT INTO inventory (product_id, total_quantity, available_quantity)
SELECT
    id,
    10,  -- 10 carts total
    10   -- All available initially
FROM products
WHERE category = 'golf_carts'
ON CONFLICT (product_id) DO NOTHING;

-- Enable rental for golf cart products
UPDATE products
SET rental_enabled = TRUE
WHERE category = 'golf_carts';
*/

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Output success message
DO $$
BEGIN
    RAISE NOTICE 'Rental booking system migration completed successfully!';
    RAISE NOTICE 'Tables created: rental_pricing, inventory, bookings, availability_blocks';
    RAISE NOTICE 'Functions created: generate_booking_number, check_availability, get_booking_stats';
    RAISE NOTICE 'Triggers created: inventory management, timestamp updates';
    RAISE NOTICE 'RLS policies enabled for all tables';
END $$;
