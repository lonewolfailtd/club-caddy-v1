#!/usr/bin/env node

/**
 * Club Caddy: Admin Setup and Data Seeding Script
 *
 * This script runs the SQL setup commands to:
 * 1. Create admin user
 * 2. Seed inventory data
 * 3. Seed rental pricing data
 *
 * Usage: node scripts/run-setup.js [email]
 * Example: node scripts/run-setup.js admin@clubcaddycarts.com
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Get email from command line or use default
const adminEmail = process.argv[2] || 'admin@clubcaddycarts.com';

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL not found in .env.local');
  process.exit(1);
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY not found in .env.local');
  console.error('Note: This script requires the service role key for admin operations');
  process.exit(1);
}

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

console.log('\n📦 Club Caddy - Admin Setup & Data Seeding\n');
console.log('=' .repeat(50));

async function runSetup() {
  try {
    // Step 1: Set up admin user
    console.log('\n🔧 Step 1: Setting up admin user...');
    console.log(`Email: ${adminEmail}`);

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('email', adminEmail)
      .select()
      .single();

    if (profileError) {
      if (profileError.code === 'PGRST116') {
        console.log('⚠️  No profile found with that email.');
        console.log('   Please sign up through the app first, then run this script again.');
        console.log(`   Sign up URL: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/signup`);
      } else {
        throw profileError;
      }
    } else {
      console.log('✅ Admin user configured successfully');
      console.log(`   User ID: ${profile.id}`);
    }

    // Step 2: Enable rental for products
    console.log('\n🔧 Step 2: Enabling rental for products...');

    const { data: products, error: productsError } = await supabase
      .from('products')
      .update({
        rental_enabled: true,
        purchase_enabled: true
      })
      .eq('category', 'golf_carts')
      .select('id, name, tier');

    if (productsError) throw productsError;

    console.log(`✅ Enabled rental for ${products.length} products`);
    products.forEach(p => console.log(`   - ${p.name} (${p.tier})`));

    // Step 3: Seed inventory data
    console.log('\n🔧 Step 3: Seeding inventory data...');

    const inventoryData = [
      { tier: 'Standard', total: 10 },
      { tier: 'Premium', total: 8 },
      { tier: 'Ultimate', total: 5 }
    ];

    for (const item of inventoryData) {
      const product = products.find(p => p.tier === item.tier);
      if (!product) continue;

      const { error: invError } = await supabase
        .from('inventory')
        .upsert({
          product_id: product.id,
          total_quantity: item.total,
          available_quantity: item.total,
          reserved_quantity: 0,
          maintenance_quantity: 0
        }, {
          onConflict: 'product_id'
        });

      if (invError) throw invError;
      console.log(`✅ ${item.tier}: ${item.total} carts added`);
    }

    // Step 4: Seed rental pricing data
    console.log('\n🔧 Step 4: Seeding rental pricing data...');

    const pricingData = [
      {
        tier: 'Standard',
        hourly_rate: 45.00,
        daily_rate: 150.00,
        weekly_rate: 900.00,
        monthly_rate: 3000.00,
        deposit: 100.00
      },
      {
        tier: 'Premium',
        hourly_rate: 60.00,
        daily_rate: 200.00,
        weekly_rate: 1200.00,
        monthly_rate: 4000.00,
        deposit: 150.00
      },
      {
        tier: 'Ultimate',
        hourly_rate: 80.00,
        daily_rate: 280.00,
        weekly_rate: 1680.00,
        monthly_rate: 5600.00,
        deposit: 200.00
      }
    ];

    for (const item of pricingData) {
      const product = products.find(p => p.tier === item.tier);
      if (!product) continue;

      const { error: priceError } = await supabase
        .from('rental_pricing')
        .upsert({
          product_id: product.id,
          hourly_rate: item.hourly_rate,
          hourly_minimum_hours: 4,
          daily_rate: item.daily_rate,
          weekly_rate: item.weekly_rate,
          monthly_rate: item.monthly_rate,
          deposit_amount: item.deposit,
          active: true
        }, {
          onConflict: 'product_id'
        });

      if (priceError) throw priceError;
      console.log(`✅ ${item.tier}: $${item.hourly_rate}/hr, $${item.daily_rate}/day, $${item.weekly_rate}/wk`);
    }

    // Step 5: Display summary
    console.log('\n📊 Setup Summary');
    console.log('=' .repeat(50));

    const { data: inventory } = await supabase
      .from('inventory')
      .select('total_quantity, available_quantity');

    const totalCarts = inventory.reduce((sum, i) => sum + i.total_quantity, 0);
    const availableCarts = inventory.reduce((sum, i) => sum + i.available_quantity, 0);

    console.log(`\n📦 Inventory:`);
    console.log(`   Total carts: ${totalCarts}`);
    console.log(`   Available: ${availableCarts}`);

    const { data: pricing } = await supabase
      .from('rental_pricing')
      .select('daily_rate')
      .eq('active', true);

    const dailyRates = pricing.map(p => p.daily_rate);
    const minRate = Math.min(...dailyRates);
    const maxRate = Math.max(...dailyRates);
    const avgRate = (dailyRates.reduce((a, b) => a + b, 0) / dailyRates.length).toFixed(2);

    console.log(`\n💰 Pricing:`);
    console.log(`   Products with pricing: ${pricing.length}`);
    console.log(`   Daily rate range: $${minRate} - $${maxRate}`);
    console.log(`   Average daily rate: $${avgRate}`);

    console.log('\n✅ Setup Complete!');
    console.log('=' .repeat(50));
    console.log('\n📝 Next Steps:');
    console.log(`   1. Log in to /admin with: ${adminEmail}`);
    console.log('   2. Verify inventory at /admin/inventory');
    console.log('   3. Adjust pricing at /admin/pricing');
    console.log('   4. Test a booking at /booking/[product-slug]');
    console.log('\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    if (error.details) console.error('Details:', error.details);
    if (error.hint) console.error('Hint:', error.hint);
    process.exit(1);
  }
}

// Run the setup
runSetup();
