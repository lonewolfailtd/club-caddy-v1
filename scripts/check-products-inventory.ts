import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qlneuwitxcaifupmarfm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5NDg2NCwiZXhwIjoyMDgwNjcwODY0fQ.y9hQs7VaWyiWRornmIPbkCjb_KeCqSGaP2MfesNaEIM'
);

async function checkProductsAndBookings() {
  // Get all products
  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug, total_quantity');

  console.log('\n📦 Products and Total Quantities:');
  console.log('================================');
  products?.forEach(p => {
    console.log(`${p.name}: ${p.total_quantity || 0} carts`);
  });

  // Get active bookings
  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, booking_number, product_id, quantity, start_date, end_date, status, payment_status')
    .in('status', ['pending', 'confirmed'])
    .order('start_date');

  console.log('\n📅 Active/Pending Bookings:');
  console.log('==========================');
  if (!bookings || bookings.length === 0) {
    console.log('No active bookings');
  } else {
    bookings.forEach(b => {
      console.log(`\n${b.booking_number}`);
      console.log(`  Status: ${b.status} / ${b.payment_status}`);
      console.log(`  Quantity: ${b.quantity} carts`);
      console.log(`  Dates: ${new Date(b.start_date).toLocaleDateString()} - ${new Date(b.end_date).toLocaleDateString()}`);
    });
  }
}

checkProductsAndBookings();
