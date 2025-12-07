const { createClient } = require('@supabase/supabase-js')

async function testDatabase() {
  console.log('\n🔍 Testing Database Connection (using anon key)...\n')

  require('dotenv').config({ path: '.env.local' })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('URL:', supabaseUrl)
  console.log('Anon Key:', supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'MISSING')
  console.log('')

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  try {
    // Test products
    console.log('📦 Fetching products...')
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, tier, base_price, slug')
      .order('base_price', { ascending: true })

    if (productsError) {
      console.log('❌ Error:', productsError.message)
      console.log('   Details:', productsError)
      console.log('\n💡 This could mean:')
      console.log('   1. Tables haven\'t been created yet')
      console.log('   2. Row Level Security is blocking access')
      console.log('   3. Need to run migration in Supabase SQL Editor\n')

      console.log('🔧 Try this:')
      console.log('   1. Go to: https://supabase.com/dashboard/project/qlneuwitxcaifupmarfm/sql')
      console.log('   2. Click "New query"')
      console.log('   3. Copy ALL of: supabase/migrations/001_initial_schema.sql')
      console.log('   4. Paste and Run')
      console.log('   5. Then copy ALL of: supabase/seed.sql')
      console.log('   6. Paste and Run\n')
      return
    }

    if (products && products.length > 0) {
      console.log(`✅ SUCCESS! Found ${products.length} products!\n`)

      products.forEach((p, i) => {
        const price = parseFloat(p.base_price).toLocaleString('en-NZ', {
          style: 'currency',
          currency: 'NZD',
          minimumFractionDigits: 0
        })
        console.log(`   ${i + 1}. ${p.name}`)
        console.log(`      Tier: ${p.tier}`)
        console.log(`      Price: ${price}`)
        console.log(`      Slug: /${p.slug}`)
        console.log('')
      })

      console.log('🎉 Database is working perfectly!')
      console.log('✅ Migration and seed data completed successfully!\n')
      console.log('🚀 Ready to build features!\n')
    } else {
      console.log('⚠️  Tables exist but no products found.')
      console.log('   Please run seed.sql in Supabase SQL Editor.\n')
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    console.log('')
  }
}

testDatabase()
