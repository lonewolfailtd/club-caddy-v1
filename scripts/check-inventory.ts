import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkInventory() {
  console.log('\n=== Checking Products ===');
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, slug, rental_enabled')
    .eq('rental_enabled', true);

  if (productsError) {
    console.error('Error fetching products:', productsError);
    return;
  }

  console.log(`Found ${products?.length || 0} rental-enabled products:`);
  products?.forEach(p => console.log(`  - ${p.name} (${p.slug}) - ID: ${p.id}`));

  console.log('\n=== Checking Inventory ===');
  for (const product of products || []) {
    const { data: inventory, error: invError } = await supabase
      .from('inventory')
      .select('*')
      .eq('product_id', product.id);

    if (invError) {
      console.error(`Error fetching inventory for ${product.name}:`, invError);
      continue;
    }

    if (!inventory || inventory.length === 0) {
      console.log(`❌ NO INVENTORY for ${product.name} (${product.id})`);
    } else {
      console.log(`✅ ${product.name}: ${inventory.length} inventory records`);
      inventory.forEach(inv => {
        console.log(`   - ID: ${inv.id}, Total: ${inv.total_quantity}, Available: ${inv.available_quantity}`);
      });
    }
  }
}

checkInventory().catch(console.error);
