import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function fixInventoryPermissions() {
  console.log('\n🔧 Fixing inventory trigger permissions...\n');

  // Step 1: Drop existing functions
  console.log('1️⃣  Dropping existing trigger functions...');
  await supabase.rpc('exec_sql', {
    sql_string: 'DROP FUNCTION IF EXISTS reserve_inventory_on_booking() CASCADE;'
  });
  await supabase.rpc('exec_sql', {
    sql_string: 'DROP FUNCTION IF EXISTS release_inventory_on_booking_change() CASCADE;'
  });

  // Step 2: Create reserve_inventory function with SECURITY DEFINER
  console.log('2️⃣  Creating reserve_inventory function with SECURITY DEFINER...');
  const reserveFunction = `
CREATE OR REPLACE FUNCTION reserve_inventory_on_booking()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NEW.status IN ('confirmed', 'pending') THEN
        UPDATE inventory
        SET
            available_quantity = available_quantity - NEW.quantity,
            reserved_quantity = reserved_quantity + NEW.quantity
        WHERE product_id = NEW.product_id;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Inventory not found for product_id: %', NEW.product_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
  `;

  const { error: reserveError } = await supabase.rpc('exec_sql', { sql_string: reserveFunction });
  if (reserveError) {
    console.error('❌ Error creating reserve function:', reserveError);
    return;
  }

  // Step 3: Create trigger
  console.log('3️⃣  Creating reserve inventory trigger...');
  const reserveTrigger = `
CREATE TRIGGER trigger_reserve_inventory_on_booking
    AFTER INSERT ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION reserve_inventory_on_booking();
  `;

  await supabase.rpc('exec_sql', { sql_string: reserveTrigger });

  // Step 4: Create release_inventory function with SECURITY DEFINER
  console.log('4️⃣  Creating release_inventory function with SECURITY DEFINER...');
  const releaseFunction = `
CREATE OR REPLACE FUNCTION release_inventory_on_booking_change()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF OLD.status IN ('confirmed', 'pending', 'in_progress') AND
       NEW.status IN ('completed', 'cancelled', 'no_show') THEN

        UPDATE inventory
        SET
            available_quantity = available_quantity + OLD.quantity,
            reserved_quantity = reserved_quantity - OLD.quantity
        WHERE product_id = OLD.product_id;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Inventory not found for product_id: %', OLD.product_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
  `;

  const { error: releaseError } = await supabase.rpc('exec_sql', { sql_string: releaseFunction });
  if (releaseError) {
    console.error('❌ Error creating release function:', releaseError);
    return;
  }

  // Step 5: Create trigger
  console.log('5️⃣  Creating release inventory trigger...');
  const releaseTrigger = `
CREATE TRIGGER trigger_release_inventory_on_booking_change
    AFTER UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION release_inventory_on_booking_change();
  `;

  await supabase.rpc('exec_sql', { sql_string: releaseTrigger });

  console.log('\n✅ Successfully fixed inventory trigger permissions!');
  console.log('   The triggers now run with elevated privileges and can update inventory.');
  console.log('\n   You can now create bookings as an anonymous user! 🎉\n');
}

fixInventoryPermissions().catch(console.error);
