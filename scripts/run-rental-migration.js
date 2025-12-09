#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runRentalMigration() {
  console.log('\n🚀 Running Rental Booking System Migration\n');

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20231211_rental_booking_system.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('📋 Migration file loaded');
    console.log('📡 Executing on Supabase...\n');

    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql }).single();

    if (error) {
      console.error('❌ Error:', error.message);
      console.log('\n💡 You need to run this migration manually:');
      console.log('1. Go to Supabase Dashboard > SQL Editor');
      console.log('2. Copy contents of: supabase/migrations/20231211_rental_booking_system.sql');
      console.log('3. Paste and click Run\n');
      process.exit(1);
    }

    console.log('✅ Migration completed successfully!\n');

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('\n💡 Manual execution required:');
    console.log('Run the SQL file in Supabase Dashboard > SQL Editor\n');
    process.exit(1);
  }
}

runRentalMigration();
