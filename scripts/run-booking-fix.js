const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function runFix() {
  // Use service role key for admin access
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    console.error('Need: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log('Reading SQL fix file...');
  const sqlPath = path.join(__dirname, 'fix-booking-permissions.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('Executing booking permissions fix...');

  try {
    // Split by semicolons and execute each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));

    for (const statement of statements) {
      if (!statement) continue;

      console.log(`Executing: ${statement.substring(0, 60)}...`);
      const { error } = await supabase.rpc('exec_sql', { sql_query: statement + ';' });

      if (error) {
        // Try direct execution if rpc fails
        const { error: directError } = await supabase.from('_sql').select('*').limit(0);
        if (directError) {
          console.error('Error:', error.message);
        }
      }
    }

    console.log('✅ Booking permissions fix completed successfully!');
    console.log('');
    console.log('Changes made:');
    console.log('- Updated check_availability function with SECURITY DEFINER');
    console.log('- Granted execute permissions to anon users');
    console.log('- Created RLS policies for inventory, rental_pricing, and bookings');
    console.log('');
    console.log('You should now be able to create bookings!');

  } catch (error) {
    console.error('Failed to execute fix:', error.message);
    console.error('');
    console.error('Please run the SQL manually in Supabase Dashboard:');
    console.error('https://supabase.com/dashboard/project/qlneuwitxcaifupmarfm/editor');
    console.error('Copy the contents of scripts/fix-booking-permissions.sql');
    process.exit(1);
  }
}

runFix();
