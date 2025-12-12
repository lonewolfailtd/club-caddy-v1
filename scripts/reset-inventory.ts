import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qlneuwitxcaifupmarfm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5NDg2NCwiZXhwIjoyMDgwNjcwODY0fQ.y9hQs7VaWyiWRornmIPbkCjb_KeCqSGaP2MfesNaEIM'
);

async function resetInventory() {
  console.log('Resetting inventory...');

  // Delete all existing inventory
  const { error: deleteError } = await supabase
    .from('inventory')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (deleteError) {
    console.error('Delete error:', deleteError);
    return;
  }

  console.log('✅ Inventory cleared');
  console.log('Inventory will be auto-populated by triggers when bookings are checked');
}

resetInventory();
