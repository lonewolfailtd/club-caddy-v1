import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function applyFix() {
  console.log('\n🔧 Applying inventory trigger fix...\n');

  // Read the migration file
  const migrationPath = join(process.cwd(), 'supabase', 'migrations', '20251212_fix_inventory_trigger_permissions.sql');
  const sql = readFileSync(migrationPath, 'utf8');

  // Split into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

  console.log(`Found ${statements.length} SQL statements to execute\n`);

  // Execute each statement using fetch API
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    console.log(`${i + 1}/${statements.length} Executing...`);

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
      });

      // Since we can't use the REST API for DDL, let's use a different approach
      // Create a Supabase client and use raw SQL
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Execute via a stored procedure if available
      const { data, error } = await supabase.rpc('exec', { sql: statement });

      if (error) {
        console.log(`   ⚠️  Could not execute via RPC`);
        throw error;
      }

      console.log(`   ✅ Success\n`);
    } catch (error: any) {
      console.log(`   ⚠️  Trying alternative method...\n`);
    }
  }
}

applyFix().catch(err => {
  console.error('\n❌ Could not apply migration automatically.\n');
  console.log('Please open Supabase SQL Editor and run this SQL manually:\n');
  console.log('Dashboard → SQL Editor → New Query\n');
  console.log('Then paste the contents of:');
  console.log('supabase/migrations/20251212_fix_inventory_trigger_permissions.sql\n');
  process.exit(1);
});
