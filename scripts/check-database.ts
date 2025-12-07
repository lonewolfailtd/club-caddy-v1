import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

async function checkDatabase() {
  console.log('🔍 Checking database contents...\n')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Check products
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, slug, name, tier, base_price')
    .order('tier')

  if (productsError) {
    console.error('❌ Error fetching products:', productsError.message)
  } else {
    console.log(`✅ Products in database: ${products?.length || 0}`)
    products?.forEach((p) => {
      console.log(`   - ${p.name} (${p.tier}) - $${p.base_price}`)
    })
  }

  // Check addons
  const { data: addons, error: addonsError } = await supabase
    .from('addons')
    .select('id, name, price, category')

  if (addonsError) {
    console.error('\n❌ Error fetching addons:', addonsError.message)
  } else {
    console.log(`\n✅ Add-ons in database: ${addons?.length || 0}`)
    addons?.forEach((a) => {
      console.log(`   - ${a.name} ($${a.price}) - ${a.category}`)
    })
  }

  // Check knowledge base
  const { data: kb, error: kbError } = await supabase
    .from('product_knowledge_base')
    .select('id, metadata')

  if (kbError) {
    console.error('\n❌ Error fetching knowledge base:', kbError.message)
  } else {
    console.log(`\n✅ Knowledge base entries: ${kb?.length || 0}`)
  }

  console.log('\n✨ Database check complete!')
}

checkDatabase().catch(console.error)
