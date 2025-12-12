-- Fix: Allow trigger functions to update inventory by using SECURITY DEFINER
-- This makes the functions run with the permissions of the function owner (postgres)
-- instead of the user who triggered it

-- Drop existing functions
DROP FUNCTION IF EXISTS reserve_inventory_on_booking() CASCADE;
DROP FUNCTION IF EXISTS release_inventory_on_booking_change() CASCADE;

-- Recreate reserve_inventory function with SECURITY DEFINER
CREATE OR REPLACE FUNCTION reserve_inventory_on_booking()
RETURNS TRIGGER
SECURITY DEFINER -- This makes the function run with elevated privileges
SET search_path = public
AS $$
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

-- Recreate the trigger
CREATE TRIGGER trigger_reserve_inventory_on_booking
    AFTER INSERT ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION reserve_inventory_on_booking();

-- Recreate release_inventory function with SECURITY DEFINER
CREATE OR REPLACE FUNCTION release_inventory_on_booking_change()
RETURNS TRIGGER
SECURITY DEFINER -- This makes the function run with elevated privileges
SET search_path = public
AS $$
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

-- Recreate the trigger
CREATE TRIGGER trigger_release_inventory_on_booking_change
    AFTER UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION release_inventory_on_booking_change();

COMMENT ON FUNCTION reserve_inventory_on_booking IS 'Reserves inventory when a booking is created. Uses SECURITY DEFINER to bypass RLS.';
COMMENT ON FUNCTION release_inventory_on_booking_change IS 'Releases inventory when a booking is completed or cancelled. Uses SECURITY DEFINER to bypass RLS.';
