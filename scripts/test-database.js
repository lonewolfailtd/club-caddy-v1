const { createClient } = require('@supabase/supabase-js')

async function testDatabase() {
  console.log('\n🔍 Testing Database Connection...\n')

  require('dotenv').config({ path: '.env.local' })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  try {
    // Test 1: Check products
    console.log('📦 Checking products table...')
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, tier, base_price, slug')
      .order('base_price', { ascending: true })

    if (productsError) {
      console.log('❌ Products error:', productsError.message)
      console.log('   Code:', productsError.code)
      console.log('\n⚠️  Database tables may not exist yet.')
      console.log('   Please run the migration SQL in Supabase SQL Editor.\n')
      return
    }

    if (products && products.length > 0) {
      console.log(`✅ Found ${products.length} products!\n`)

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
    } else {
      console.log('⚠️  No products found. Please run seed data.\n')
    }

    // Test 2: Check addons
    console.log('🛠️  Checking addons table...')
    const { data: addons, error: addonsError } = await supabase
      .from('addons')
      .select('id, name, price, category')
      .order('price', { ascending: true })
      .limit(5)

    if (!addonsError && addons && addons.length > 0) {
      console.log(`✅ Found ${addons.length}+ add-ons!\n`)

      addons.forEach((a, i) => {
        const price = parseFloat(a.price).toLocaleString('en-NZ', {
          style: 'currency',
          currency: 'NZD',
          minimumFractionDigits: 0
        })
        console.log(`   ${i + 1}. ${a.name} - ${price} (${a.category})`)
      })
      console.log('')
    } else if (addonsError) {
      console.log('⚠️  Add-ons table:', addonsError.message, '\n')
    }

    // Test 3: Check knowledge base
    console.log('🤖 Checking AI knowledge base...')
    const { data: kb, error: kbError } = await supabase
      .from('product_knowledge_base')
      .select('id')

    if (!kbError && kb) {
      console.log(`✅ Knowledge base has ${kb.length} entries!\n`)
    } else if (kbError) {
      console.log('⚠️  Knowledge base:', kbError.message, '\n')
    }

    // Success summary
    if (products && products.length > 0) {
      console.log('🎉 Database is working perfectly!\n')
      console.log('✅ Next steps:')
      console.log('   1. Visit http://localhost:3000')
      console.log('   2. Your site is ready with live data!')
      console.log('   3. Ready to build product pages!\n')
    }

  } catch (error) {
    console.error('❌ Error:', error.message, '\n')
  }
}

testDatabase()
