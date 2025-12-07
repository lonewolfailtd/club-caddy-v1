const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

async function runMigrations() {
  console.log('\n🚀 Club Caddy - Running Database Migrations\n')

  // Load environment variables
  require('dotenv').config({ path: '.env.local' })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Missing Supabase credentials in .env.local')
    console.log('Please make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set')
    process.exit(1)
  }

  console.log('✅ Environment variables loaded')
  console.log(`📡 Connecting to: ${supabaseUrl}\n`)

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Read migration file
    console.log('📋 Reading migration file...')
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8')

    console.log(`✅ Migration file loaded (${migrationSQL.length} characters)\n`)

    // Split SQL into individual statements
    console.log('⚙️  Processing SQL statements...')
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    console.log(`📝 Found ${statements.length} SQL statements\n`)

    // Execute each statement
    console.log('🔄 Executing migration statements...\n')
    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';'
      const preview = statement.substring(0, 60).replace(/\s+/g, ' ')

      process.stdout.write(`   [${i + 1}/${statements.length}] ${preview}... `)

      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement })

        if (error) {
          // Supabase doesn't have exec_sql, so we'll log this for manual execution
          console.log('⚠️')
          errorCount++
        } else {
          console.log('✅')
          successCount++
        }
      } catch (err) {
        console.log('⚠️')
        errorCount++
      }
    }

    console.log(`\n📊 Results: ${successCount} successful, ${errorCount} need manual execution\n`)

    if (errorCount > 0) {
      console.log('⚠️  Some statements need to be run manually in Supabase SQL Editor')
      console.log('📄 File: supabase/migrations/001_initial_schema.sql\n')
    }

    // Now run seed data
    console.log('🌱 Running seed data...\n')
    const seedPath = path.join(__dirname, '..', 'supabase', 'seed.sql')
    const seedSQL = fs.readFileSync(seedPath, 'utf-8')

    const seedStatements = seedSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    console.log(`📝 Found ${seedStatements.length} seed statements\n`)

    let seedSuccess = 0
    let seedError = 0

    for (let i = 0; i < seedStatements.length; i++) {
      const statement = seedStatements[i] + ';'
      const preview = statement.substring(0, 60).replace(/\s+/g, ' ')

      process.stdout.write(`   [${i + 1}/${seedStatements.length}] ${preview}... `)

      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement })

        if (error) {
          console.log('⚠️')
          seedError++
        } else {
          console.log('✅')
          seedSuccess++
        }
      } catch (err) {
        console.log('⚠️')
        seedError++
      }
    }

    console.log(`\n📊 Seed Results: ${seedSuccess} successful, ${seedError} need manual execution\n`)

    // Verify tables exist by checking products
    console.log('🔍 Verifying database setup...\n')

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('name, tier, base_price')
      .order('base_price', { ascending: true })

    if (productsError) {
      console.log('⚠️  Could not verify products table')
      console.log('   This is normal if you need to run migrations manually\n')

      console.log('📚 Manual Steps Required:')
      console.log('   1. Go to: https://supabase.com/dashboard/project/qlneuwitxcaifupmarfm')
      console.log('   2. Click "SQL Editor" → "New query"')
      console.log('   3. Copy all of: supabase/migrations/001_initial_schema.sql')
      console.log('   4. Paste and click "Run"')
      console.log('   5. Then copy all of: supabase/seed.sql')
      console.log('   6. Paste and click "Run"\n')
    } else {
      console.log('✅ Database setup verified!\n')
      console.log(`📦 Products loaded (${products.length} total):\n`)

      products.forEach((product) => {
        const price = parseFloat(product.base_price).toLocaleString('en-NZ', {
          style: 'currency',
          currency: 'NZD',
          minimumFractionDigits: 0
        })
        console.log(`   ✓ ${product.name}`)
        console.log(`     Tier: ${product.tier} | Price: ${price}\n`)
      })
    }

    // Check add-ons
    const { data: addons, error: addonsError } = await supabase
      .from('addons')
      .select('name, price, category')
      .order('price', { ascending: true })

    if (!addonsError && addons) {
      console.log(`🛠️  Add-ons loaded (${addons.length} total):\n`)
      addons.slice(0, 5).forEach((addon) => {
        const price = parseFloat(addon.price).toLocaleString('en-NZ', {
          style: 'currency',
          currency: 'NZD',
          minimumFractionDigits: 0
        })
        console.log(`   ✓ ${addon.name} - ${price} (${addon.category})`)
      })
      if (addons.length > 5) {
        console.log(`   ... and ${addons.length - 5} more`)
      }
      console.log('')
    }

    console.log('🎉 Migration process complete!\n')
    console.log('🚀 Next steps:')
    console.log('   1. Visit: http://localhost:3000')
    console.log('   2. Check that the homepage loads')
    console.log('   3. Products should be ready to display!\n')

  } catch (error) {
    console.error('\n❌ Error during migration:', error.message)
    console.log('\n📚 Please run migrations manually:')
    console.log('   See: RUN-MIGRATIONS.md for step-by-step instructions\n')
    process.exit(1)
  }
}

runMigrations()
