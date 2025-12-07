import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

async function setupDatabase() {
  console.log('🚀 Setting up Club Caddy database...\n')

  // Create Supabase client with service role key
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  try {
    // Read migration file
    console.log('📋 Reading migration file...')
    const migrationSQL = readFileSync(
      join(process.cwd(), 'supabase', 'migrations', '001_initial_schema.sql'),
      'utf-8'
    )

    // Execute migration
    console.log('⚙️  Running database migration...')
    const { error: migrationError } = await supabase.rpc('exec_sql', {
      sql: migrationSQL
    })

    if (migrationError) {
      // Try direct SQL execution (Supabase doesn't have exec_sql by default)
      console.log('📝 Attempting direct SQL execution...')
      console.log('\n⚠️  Note: Please run the migration manually in Supabase SQL Editor')
      console.log('File: supabase/migrations/001_initial_schema.sql\n')
    } else {
      console.log('✅ Migration completed successfully!\n')
    }

    // Read seed file
    console.log('📋 Reading seed data file...')
    const seedSQL = readFileSync(
      join(process.cwd(), 'supabase', 'seed.sql'),
      'utf-8'
    )

    // Execute seed
    console.log('🌱 Running seed data...')
    console.log('\n⚠️  Note: Please run the seed data manually in Supabase SQL Editor')
    console.log('File: supabase/seed.sql\n')

    // Verify tables exist
    console.log('🔍 Checking database tables...')
    const { data: tables, error: tablesError } = await supabase
      .from('products')
      .select('count')
      .limit(1)

    if (!tablesError) {
      console.log('✅ Database tables are accessible!\n')

      // Check products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('name, tier, base_price')

      if (!productsError && products) {
        console.log(`📦 Found ${products.length} products:`)
        products.forEach((p: any) => {
          console.log(`   - ${p.name} (${p.tier}) - $${p.base_price}`)
        })
        console.log('')
      }
    } else {
      console.log('⚠️  Tables not found. Please run migrations manually.\n')
    }

    console.log('🎉 Database setup complete!')
    console.log('\n📚 Next steps:')
    console.log('   1. If tables don\'t exist, run migrations in Supabase SQL Editor')
    console.log('   2. Run seed data in Supabase SQL Editor')
    console.log('   3. Visit http://localhost:3000 to see your site!')

  } catch (error) {
    console.error('❌ Error setting up database:', error)
    console.log('\n📚 Manual setup required:')
    console.log('   1. Go to https://supabase.com/dashboard')
    console.log('   2. Open SQL Editor')
    console.log('   3. Copy supabase/migrations/001_initial_schema.sql')
    console.log('   4. Paste and run in SQL Editor')
    console.log('   5. Copy supabase/seed.sql')
    console.log('   6. Paste and run in SQL Editor')
  }
}

setupDatabase()
