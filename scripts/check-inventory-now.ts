import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qlneuwitxcaifupmarfm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5NDg2NCwiZXhwIjoyMDgwNjcwODY0fQ.y9hQs7VaWyiWRornmIPbkCjb_KeCqSGaP2MfesNaEIM'
);

async function checkInventory() {
  const { data, error } = await supabase
    .from('inventory')
    .select('*, products(name, slug)')
    .order('date');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Inventory Status:');
  console.log('=================');
  data?.forEach((inv: any) => {
    console.log(`\nProduct: ${inv.products?.name}`);
    console.log(`Date: ${inv.date}`);
    console.log(`Total: ${inv.total_quantity}`);
    console.log(`Reserved: ${inv.reserved_quantity}`);
    console.log(`Available: ${inv.available_quantity}`);
    console.log(`Booked: ${inv.booked_quantity}`);
  });
}

checkInventory();
