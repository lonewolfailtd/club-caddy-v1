# How to Seed Your Database with Products

## Step 1: Open Supabase SQL Editor

1. Go to https://supabase.com
2. Log in to your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

## Step 2: Run the Seed Script

1. Open `scripts/seed-products.sql`
2. Copy the entire contents
3. Paste into Supabase SQL Editor
4. Click **Run** button (or press Ctrl+Enter)

## Step 3: Verify

You should see output like:
```
Products Added: 3
- Classic Caddy, Elite Caddy, Prestige Caddy

Add-ons Added: 8
- Weather Enclosure, Golf Bag Attachment, ...
```

## Step 4: Check Your Products Page

Navigate to http://localhost:3004/products

You should now see all three golf cart tiers with full details!

## What This Script Does

**Adds 3 Golf Carts:**
- **Classic Caddy** (Standard) - $11,500 NZD
- **Elite Caddy** (Premium) - $14,000 NZD
- **Prestige Caddy** (Ultimate) - $16,500 NZD

**Adds 8 Add-ons:**
- Weather Enclosure - $850
- Golf Bag Attachment - $250
- Upgraded Sound System - $650
- Custom Paint Job - $1,200
- Extended Warranty - $800
- Rear Seat Kit - $950
- LED Light Bar - $320
- Lift Kit - $750

## Product Images Needed

Each product references these images (you'll need to add actual photos):

**Classic Caddy:**
- caddy-cart01.jpg
- caddy-cart02.jpg
- caddy-cart03.jpg
- caddy-cart04.jpg

**Elite Caddy:**
- caddy-cart05.jpg
- caddy-cart06.jpg
- caddy-cart07.jpg
- caddy-cart08.jpg
- caddy-cart09.jpg

**Prestige Caddy:**
- caddy-cart10.jpg
- caddy-cart11.jpg
- caddy-cart12.jpg
- caddy-cart13.jpg
- caddy-cart14.jpg

Place all images in `public/images/products/` folder.

## Customization

Feel free to modify the SQL script to:
- Change pricing
- Update descriptions
- Add/remove features
- Adjust specifications
- Change stock quantities

## Troubleshooting

**Error: "relation products does not exist"**
- Your database schema hasn't been created yet
- Run the migrations first from `supabase/migrations/`

**Error: "duplicate key value"**
- Products already exist
- Either delete existing products or comment out the DELETE line at the top

**Products not showing on website**
- Clear your browser cache
- Refresh the page
- Check console for errors
