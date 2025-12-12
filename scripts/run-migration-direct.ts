import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function runMigration() {
  // Extract project ref from URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

  if (!projectRef) {
    console.error('❌ Could not extract project ref from NEXT_PUBLIC_SUPABASE_URL');
    process.exit(1);
  }

  // Use the database password
  const dbPassword = process.env.SUPABASE_DB_PASSWORD!;

  if (!dbPassword) {
    console.error('❌ SUPABASE_DB_PASSWORD not found in .env.local');
    process.exit(1);
  }

  // Try direct connection (port 5432) instead of pooler
  // Format: postgres://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
  const connectionString = `postgresql://postgres:${encodeURIComponent(dbPassword)}@db.${projectRef}.supabase.co:5432/postgres`;

  console.log('\n🔧 Connecting to Supabase database...\n');

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Read migration file
    const migrationPath = join(process.cwd(), 'supabase', 'migrations', '20251212_fix_inventory_trigger_permissions.sql');
    const sql = readFileSync(migrationPath, 'utf8');

    console.log('📝 Executing migration...\n');

    // Execute the SQL
    await client.query(sql);

    console.log('✅ Migration applied successfully!\n');
    console.log('🎉 Inventory triggers now have SECURITY DEFINER permissions.');
    console.log('   Anonymous users can now create bookings!\n');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.log('\nIf you see a password authentication error, you need to use the database password.');
    console.log('Please run the SQL manually in Supabase Dashboard instead.\n');
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
