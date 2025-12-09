const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Default admin credentials - CHANGE THESE!
const ADMIN_EMAIL = 'admin@clubcaddycarts.com';
const ADMIN_PASSWORD = 'Admin123!';  // Change this!
const ADMIN_NAME = 'Admin';

async function quickCreateAdmin() {
  console.log('\n=================================');
  console.log('   QUICK ADMIN SETUP');
  console.log('=================================\n');

  try {
    console.log('Creating admin user with email:', ADMIN_EMAIL);

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: {
        is_admin: true
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('⚠️  User already exists. Updating to admin...');

        // Find and update existing user
        const { data: profiles } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', ADMIN_EMAIL)
          .single();

        if (profiles) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ is_admin: true })
            .eq('email', ADMIN_EMAIL);

          if (updateError) {
            console.error('❌ Error updating user:', updateError.message);
          } else {
            console.log('\n=================================');
            console.log('✅ EXISTING USER UPDATED TO ADMIN');
            console.log('=================================');
            console.log(`Email: ${ADMIN_EMAIL}`);
            console.log(`\nLogin at: http://localhost:3000/login`);
            console.log(`Admin panel: http://localhost:3000/admin`);
            console.log('=================================\n');
          }
        }
        return;
      }

      console.error('❌ Error creating user:', authError.message);
      return;
    }

    console.log('✅ Auth user created');

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        email: ADMIN_EMAIL,
        full_name: ADMIN_NAME,
        is_admin: true
      });

    if (profileError) {
      console.error('❌ Error creating profile:', profileError.message);
    } else {
      console.log('✅ Admin profile created');
    }

    console.log('\n=================================');
    console.log('✅ ADMIN USER CREATED SUCCESSFULLY');
    console.log('=================================');
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log(`\n⚠️  IMPORTANT: Change this password after first login!`);
    console.log(`\nLogin at: http://localhost:3000/login`);
    console.log(`Admin panel: http://localhost:3000/admin`);
    console.log('=================================\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
quickCreateAdmin();
