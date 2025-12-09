const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdminUser() {
  console.log('\n=================================');
  console.log('   CLUB CADDY ADMIN SETUP');
  console.log('=================================\n');

  try {
    // Check if user wants to create new user or update existing
    const choice = await question('Do you want to:\n1. Create new admin user\n2. Make existing user admin\n\nEnter 1 or 2: ');

    if (choice === '1') {
      // Create new user
      const email = await question('\nEnter admin email: ');
      const password = await question('Enter admin password (min 6 characters): ');
      const name = await question('Enter admin name: ');

      console.log('\nCreating admin user...');

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: {
          is_admin: true
        }
      });

      if (authError) {
        console.error('❌ Error creating auth user:', authError.message);
        rl.close();
        return;
      }

      console.log('✅ Auth user created');

      // Create/update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: email,
          full_name: name,
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
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
      console.log('\nYou can now login at: http://localhost:3000/login');
      console.log('=================================\n');

    } else if (choice === '2') {
      // Update existing user
      const email = await question('\nEnter email of existing user: ');

      console.log('\nSearching for user...');

      // Find user by email
      const { data: profiles, error: searchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (searchError || !profiles) {
        console.error('❌ User not found with email:', email);
        console.log('\nPlease register this user first at: http://localhost:3000/register');
        rl.close();
        return;
      }

      console.log('✅ User found:', profiles.full_name || profiles.email);

      // Update to admin
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_admin: true })
        .eq('id', profiles.id);

      if (updateError) {
        console.error('❌ Error updating user:', updateError.message);
      } else {
        console.log('\n=================================');
        console.log('✅ USER UPDATED TO ADMIN');
        console.log('=================================');
        console.log(`Email: ${email}`);
        console.log('\nYou can now login at: http://localhost:3000/login');
        console.log('And access admin panel at: http://localhost:3000/admin');
        console.log('=================================\n');
      }
    } else {
      console.log('Invalid choice. Please run the script again.');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

// Run the script
createAdminUser();
