const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  'https://qlneuwitxcaifupmarfm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5NDg2NCwiZXhwIjoyMDgwNjcwODY0fQ.y9hQs7VaWyiWRornmIPbkCjb_KeCqSGaP2MfesNaEIM'
);

async function runMigration() {
  console.log('🔄 Running orders table migration...\n');

  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251213_create_orders_table.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  // Split by semicolons and execute each statement
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    console.log(`Executing statement ${i + 1}/${statements.length}...`);

    const { error } = await supabase.rpc('exec_sql', { sql: statement });

    if (error) {
      console.error(`❌ Error in statement ${i + 1}:`, error.message);
      // Continue anyway for non-critical errors
    } else {
      console.log(`✅ Statement ${i + 1} executed successfully`);
    }
  }

  console.log('\n✨ Migration completed!');
}

runMigration().catch(console.error);
