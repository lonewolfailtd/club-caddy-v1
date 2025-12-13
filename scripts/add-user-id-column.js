// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

async function addUserIdColumn() {
  console.log('🚀 Adding user_id column to orders table...\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables');
    console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
    console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    console.log('🔌 Connecting to Supabase...');

    // Execute the SQL using Supabase client
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        -- Add user_id column to orders table to link orders with user accounts
        ALTER TABLE orders
        ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

        -- Create index for faster lookups by user_id
        CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

        -- Create index for email lookups (for linking orphaned orders)
        CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
      `
    });

    if (error) {
      // If exec_sql doesn't exist, try direct queries
      console.log('⚠️ RPC method not available, trying direct approach...\n');

      // Try using raw SQL through the REST API
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({
          query: `
            ALTER TABLE orders
            ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

            CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
            CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
          `
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to execute SQL: ${response.statusText}`);
      }
    }

    console.log('✅ Migration completed successfully!\n');
    console.log('📦 Orders table updated with:');
    console.log('   - user_id column (links orders to user accounts)');
    console.log('   - Index on user_id for fast lookups');
    console.log('   - Index on customer_email for linking orphaned orders');
    console.log('\n🎉 Orders can now be linked to user accounts!');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('\n💡 You can manually run this SQL in the Supabase SQL Editor:');
    console.error(`
    ALTER TABLE orders
    ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

    CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
    CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
    `);
  }
}

addUserIdColumn();
