const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  console.log('🚀 Running orders table migration (clean)...\n');

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251213_create_orders_table_clean.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Migration file loaded');
    console.log('📊 Executing SQL...\n');

    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // Try direct execution if exec_sql doesn't exist
      console.log('⚠️  Trying direct execution...');

      // Split the SQL into individual statements and execute them
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (const statement of statements) {
        const { error: execError } = await supabase.rpc('exec', {
          sql: statement + ';'
        });

        if (execError) {
          throw execError;
        }
      }
    }

    console.log('✅ Migration completed successfully!\n');
    console.log('📦 Orders table created with:');
    console.log('   - Auto-generating order numbers (CC-YYYYMMDD-XXXX)');
    console.log('   - Payment status tracking');
    console.log('   - Row Level Security policies');
    console.log('   - Indexes for performance');
    console.log('\n🎉 You can now test the deposit + balance payment system!');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('\n💡 Please run this SQL manually in Supabase SQL Editor:');
    console.error('   1. Go to: https://supabase.com/dashboard/project/qlneuwitxcaifupmarfm');
    console.error('   2. Click "SQL Editor"');
    console.error('   3. Paste the contents of: supabase/migrations/20251213_create_orders_table_clean.sql');
    console.error('   4. Click "Run"');
    process.exit(1);
  }
}

runMigration();
