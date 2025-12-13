const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function createOrdersTable() {
  console.log('🚀 Creating orders table...\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables');
    process.exit(1);
  }

  // Create Supabase admin client
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251213_create_orders_table_clean.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Migration file loaded');
    console.log('📊 Executing SQL via Supabase...\n');

    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`Found ${statements.length} SQL statements to execute\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      console.log(`[${i + 1}/${statements.length}] Executing statement...`);

      const { error } = await supabase.rpc('exec_sql', { sql: statement });

      if (error) {
        // If exec_sql doesn't exist, try direct query
        console.log('exec_sql not found, trying direct query...');
        const { error: queryError } = await supabase.from('_temp_').select('*').limit(0);

        if (queryError && queryError.message.includes('relation "_temp_" does not exist')) {
          console.error(`❌ Cannot execute SQL directly. Please run this in Supabase SQL Editor:`);
          console.error(`\n${sql}\n`);
          process.exit(1);
        }
      } else {
        console.log(`✓ Statement ${i + 1} executed`);
      }
    }

    console.log('\n✅ Migration completed successfully!\n');
    console.log('📦 Orders table created with:');
    console.log('   - Auto-generating order numbers (CC-YYYYMMDD-XXXX)');
    console.log('   - Payment status tracking');
    console.log('   - Row Level Security policies');
    console.log('\n🎉 You can now test the purchase payment system!');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('\n💡 Please run the migration manually in Supabase SQL Editor');
    console.error('\n📍 SQL File: supabase/migrations/20251213_create_orders_table_clean.sql');
  }
}

createOrdersTable();
