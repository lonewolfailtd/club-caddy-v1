const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const productImages = {
  'standard-golf-cart': [
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart01.jpg',
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart02-1.jpg',
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart04.jpg',
  ],
  'premium-golf-cart': [
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart05.jpg',
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart06.jpg',
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart07.jpg',
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart08.jpg',
  ],
  'ultimate-golf-cart-72v': [
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart09.jpg',
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart10.jpg',
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart11.jpg',
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart12.jpg',
    'https://clubcaddycarts.com/wp-content/uploads/2025/03/caddy-cart13.jpg',
  ],
}

async function updateImages() {
  console.log('🖼️  Updating product images...\n')

  for (const [slug, images] of Object.entries(productImages)) {
    const { data, error } = await supabase
      .from('products')
      .update({ images })
      .eq('slug', slug)
      .select()

    if (error) {
      console.log(`❌ Error updating ${slug}:`, error.message)
    } else {
      console.log(`✅ Updated ${slug} with ${images.length} images`)
    }
  }

  console.log('\n🎉 All product images updated!')
}

updateImages()
