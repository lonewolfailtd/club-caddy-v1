import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qlneuwitxcaifupmarfm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5NDg2NCwiZXhwIjoyMDgwNjcwODY0fQ.y9hQs7VaWyiWRornmIPbkCjb_KeCqSGaP2MfesNaEIM'
);

async function createOrdersTable() {
  console.log('🔧 Creating orders table...\n');

  // Test if table already exists by trying to query it
  const { error: testError } = await supabase.from('orders').select('id').limit(1);

  if (!testError || testError.code !== 'PGRST116') {
    console.log('✅ Orders table already exists!');
    return;
  }

  console.log('📝 Table does not exist. Please create it manually:');
  console.log('\n1. Go to https://supabase.com/dashboard/project/qlneuwitxcaifupmarfm/editor');
  console.log('2. Click on "SQL Editor"');
  console.log('3. Paste the contents of: supabase/migrations/20251213_create_orders_table.sql');
  console.log('4. Click "Run"\n');

  console.log('OR, I can proceed with the implementation and you can run the migration later.');
  console.log('The table will be needed when customers start making purchases.\n');
}

createOrdersTable();
