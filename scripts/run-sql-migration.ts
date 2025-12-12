import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

async function runSQLStatements() {
  console.log('\n🔧 Fixing inventory trigger permissions...\n');

  const statements = [
    {
      name: 'Drop existing reserve function',
      sql: 'DROP FUNCTION IF EXISTS reserve_inventory_on_booking() CASCADE;'
    },
    {
      name: 'Drop existing release function',
      sql: 'DROP FUNCTION IF EXISTS release_inventory_on_booking_change() CASCADE;'
    },
    {
      name: 'Create reserve_inventory function',
      sql: `
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
      `
    },
    {
      name: 'Create reserve inventory trigger',
      sql: `
CREATE TRIGGER trigger_reserve_inventory_on_booking
    AFTER INSERT ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION reserve_inventory_on_booking();
      `
    },
    {
      name: 'Create release_inventory function',
      sql: `
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
      `
    },
    {
      name: 'Create release inventory trigger',
      sql: `
CREATE TRIGGER trigger_release_inventory_on_booking_change
    AFTER UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION release_inventory_on_booking_change();
      `
    }
  ];

  for (const statement of statements) {
    console.log(`▶️  ${statement.name}...`);

    try {
      // Use the Supabase REST API to execute SQL
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ query: statement.sql })
      });

      if (!response.ok) {
        // If exec_sql doesn't exist, try using pg_meta
        const pgResponse = await fetch(`${supabaseUrl}/pg/exec`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`
          },
          body: JSON.stringify({ query: statement.sql })
        });

        if (!pgResponse.ok) {
          console.error(`   ❌ Failed: ${response.status} ${response.statusText}`);
          const error = await response.text();
          console.error(`   Error: ${error}`);
          console.log('\n⚠️  SQL execution via API not available.');
          console.log('Please run this SQL manually in Supabase SQL Editor:\n');
          statements.forEach(s => {
            console.log(`-- ${s.name}`);
            console.log(s.sql);
            console.log('');
          });
          return;
        }
        console.log(`   ✅ Done`);
      } else {
        console.log(`   ✅ Done`);
      }
    } catch (error: any) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }

  console.log('\n✅ All done! Inventory triggers now have SECURITY DEFINER.\n');
}

runSQLStatements().catch(console.error);
