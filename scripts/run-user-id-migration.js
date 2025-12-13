const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function runMigration() {
  console.log('🚀 Running user_id column migration...\n');

  // Check if pg is installed
  let pg;
  try {
    pg = require('pg');
  } catch (err) {
    console.log('📦 Installing pg package...');
    const { execSync } = require('child_process');
    execSync('npm install pg', { stdio: 'inherit' });
    pg = require('pg');
  }

  const { Client } = pg;

  // Parse the connection string
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables');
    console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
    console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
    process.exit(1);
  }

  // Extract project ref from URL
  const projectRef = supabaseUrl.match(/https:\/\/(.+?)\.supabase\.co/)?.[1];

  const client = new Client({
    host: `aws-0-ap-southeast-2.pooler.supabase.com`,
    port: 6543,
    database: 'postgres',
    user: `postgres.${projectRef}`,
    password: 'Qrl01345!',
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected\n');

    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251214_add_user_id_to_orders.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Migration file loaded');
    console.log('📊 Executing SQL...\n');

    // Execute the SQL
    await client.query(sql);

    console.log('✅ Migration completed successfully!\n');
    console.log('📦 Orders table updated with:');
    console.log('   - user_id column (links orders to user accounts)');
    console.log('   - Index on user_id for fast lookups');
    console.log('   - Index on customer_email for linking orphaned orders');
    console.log('\n🎉 Orders can now be linked to user accounts!');
    console.log('\n📍 Next steps:');
    console.log('   1. Orders created by logged-in users will auto-link');
    console.log('   2. Guest orders will link when user creates account');
    console.log('   3. Existing orders link when user logs in');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('\n💡 Error details:', error);
  } finally {
    await client.end();
  }
}

runMigration();
