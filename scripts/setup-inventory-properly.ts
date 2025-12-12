import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qlneuwitxcaifupmarfm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5NDg2NCwiZXhwIjoyMDgwNjcwODY0fQ.y9hQs7VaWyiWRornmIPbkCjb_KeCqSGaP2MfesNaEIM'
);

async function setupInventory() {
  console.log('🔧 Setting up inventory properly...\n');

  // 1. Get all products
  const { data: products } = await supabase
    .from('products')
    .select('id, name');

  if (!products) {
    console.error('No products found');
    return;
  }

  // 2. Clear existing inventory
  console.log('🧹 Clearing old inventory...');
  await supabase
    .from('inventory')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  // 3. Create inventory for each product with 10 carts
  console.log('\n📦 Creating inventory records...');
  for (const product of products) {
    const { error } = await supabase
      .from('inventory')
      .insert({
        product_id: product.id,
        total_quantity: 10,
        available_quantity: 10,
        reserved_quantity: 0,
        maintenance_quantity: 0
      });

    if (error) {
      console.error(`❌ ${product.name}:`, error.message);
    } else {
      console.log(`✅ ${product.name}: 10 carts available`);
    }
  }

  console.log('\n✨ Done! All products now have 10 carts available.');
}

setupInventory();
