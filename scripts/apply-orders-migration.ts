import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  'https://qlneuwitxcaifupmarfm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5NDg2NCwiZXhwIjoyMDgwNjcwODY0fQ.y9hQs7VaWyiWRornmIPbkCjb_KeCqSGaP2MfesNaEIM'
);

async function applyMigration() {
  console.log('🔧 Applying orders table migration...\n');

  const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '20251213_create_orders_table.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log('📝 SQL file loaded. Creating orders table...\n');

  // Execute the entire migration
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

  if (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }

  console.log('✅ Orders table created successfully!');
  console.log('\nTable structure:');
  console.log('- id (UUID)');
  console.log('- order_number (auto-generated: CC-YYYYMMDD-XXXX)');
  console.log('- customer info (name, email, phone)');
  console.log('- shipping address (JSONB)');
  console.log('- items (JSONB array)');
  console.log('- pricing (subtotal, deposit, balance, total)');
  console.log('- payment_status (pending → deposit_paid → invoice_sent → paid)');
  console.log('- order_status (pending → processing → ready → completed)');
  console.log('- Stripe payment IDs');
  console.log('- delivery tracking');
  console.log('- timestamps\n');

  console.log('✨ Ready for deposit + balance payment flow!');
}

applyMigration();
