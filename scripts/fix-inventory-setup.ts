import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qlneuwitxcaifupmarfm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5NDg2NCwiZXhwIjoyMDgwNjcwODY0fQ.y9hQs7VaWyiWRornmIPbkCjb_KeCqSGaP2MfesNaEIM'
);

async function fixInventory() {
  console.log('🔧 Fixing inventory setup...\n');

  // 1. Set total_quantity for all products (10 carts each)
  const { data: products } = await supabase
    .from('products')
    .select('id, name');

  if (products) {
    for (const product of products) {
      const { error } = await supabase
        .from('products')
        .update({ total_quantity: 10 })
        .eq('id', product.id);

      if (error) {
        console.error(`Error updating ${product.name}:`, error);
      } else {
        console.log(`✅ ${product.name}: Set to 10 carts`);
      }
    }
  }

  // 2. Cancel old pending test bookings
  console.log('\n🧹 Cleaning up old test bookings...');
  const { data: cancelled, error: cancelError } = await supabase
    .from('bookings')
    .update({
      status: 'cancelled',
      cancellation_reason: 'Test booking cleanup'
    })
    .eq('payment_status', 'pending')
    .eq('status', 'pending')
    .select();

  if (cancelError) {
    console.error('Error cancelling bookings:', cancelError);
  } else {
    console.log(`✅ Cancelled ${cancelled?.length || 0} pending test bookings`);
  }

  // 3. Reset inventory
  console.log('\n🔄 Resetting inventory...');
  const { error: deleteError } = await supabase
    .from('inventory')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error('Error resetting inventory:', deleteError);
  } else {
    console.log('✅ Inventory reset');
  }

  console.log('\n✨ Done! You should now have 10 carts available per product.');
}

fixInventory();
