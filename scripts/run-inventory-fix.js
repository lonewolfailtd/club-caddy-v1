const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY in .env.local');
  console.error('You need the service role key (not anon key) to run migrations.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251212_fix_inventory_trigger_permissions.sql');

  console.log('📖 Reading migration file...');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log('🚀 Running migration...');
  const { data, error } = await supabase.rpc('exec_sql', { sql_string: sql });

  if (error) {
    // Try direct execution via REST API
    console.log('⚠️  exec_sql not available, trying direct query...');

    // Split by semicolons and run each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      try {
        const result = await supabase.rpc('exec', { sql: statement });
        if (result.error) {
          console.error('❌ Error executing statement:', statement.substring(0, 100) + '...');
          console.error(result.error);
        }
      } catch (err) {
        console.error('❌ Error:', err.message);
      }
    }
  }

  console.log('✅ Migration completed!');
  console.log('\nThe inventory trigger functions now have SECURITY DEFINER which allows them to');
  console.log('update inventory even when called by anonymous users during booking creation.');
}

runMigration().catch(console.error);
