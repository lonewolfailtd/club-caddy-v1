# Club Caddy Carts - Luxury Ecommerce Platform

**New Zealand's Premier Electric Golf Cart Store**

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15.1.8-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0.0-38bdf8)

---

## 🚀 Quick Start

```bash
# Install dependencies (already done)
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

---

## 📋 Project Overview

A world-class luxury ecommerce platform for Club Caddy Carts, featuring:

- **Next.js 15** App Router with React 19
- **Supabase** for database, auth & storage
- **Stripe** for payment processing
- **OpenAI GPT-4** for AI chatbot
- **Luxury Design System** with hexagonal patterns
- **Full SEO Optimization** for NZ market

---

## 🎨 Features

### Current (Phase 1 - 80% Complete)
- ✅ Luxury homepage with hexagonal design
- ✅ Custom design system (gold, platinum, onyx, pearl)
- ✅ Complete database schema (11 tables)
- ✅ Authentication system with protected routes
- ✅ Product catalogue (3 packages + 10 add-ons)
- ✅ AI knowledge base seeded
- ✅ SEO optimised

### Coming Soon (Phase 2-8)
- ⏳ Product catalogue pages with video showcases
- ⏳ Shopping cart & Stripe checkout
- ⏳ Customer dashboard & order tracking
- ⏳ AI chatbot with human escalation
- ⏳ Admin panel for product management
- ⏳ Enquiry system for custom orders

---

## 🗄️ Database Schema

11 tables designed with Row Level Security:
- `profiles` - User profiles
- `products` - Product catalogue
- `product_variants` - Product configurations
- `addons` - Cart accessories
- `orders` - Order management
- `enquiries` - Custom order requests
- `wishlist` - Saved products
- `saved_configurations` - Cart configs
- `chat_conversations` - AI chat sessions
- `chat_messages` - Chat history
- `product_knowledge_base` - AI training data

---

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 15.1.8
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 4.0.0
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion

### Backend
- **Database**: Supabase (Postgres)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Payments**: Stripe
- **AI**: OpenAI GPT-4
- **Email**: Resend

### Deployment
- **Platform**: Vercel
- **Analytics**: Vercel Analytics
- **SEO**: next-seo, next-sitemap

---

## 📁 Project Structure

```
club-caddy-v1/
├── public/              # Static assets
│   └── images/          # Hexagonal SVG pattern
├── src/
│   ├── app/             # Next.js 15 App Router
│   ├── components/      # React components
│   ├── lib/             # Supabase, Stripe, OpenAI clients
│   ├── types/           # TypeScript types
│   ├── hooks/           # React hooks
│   └── context/         # React context
├── supabase/
│   ├── migrations/      # Database migrations
│   └── seed.sql         # Seed data
└── scripts/             # Utility scripts
```

---

## ⚙️ Environment Variables

Create `.env.local`:

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# OpenAI (for AI chatbot)
OPENAI_API_KEY=

# Resend (for emails)
RESEND_API_KEY=
RESEND_FROM_EMAIL=admin@clubcaddycarts.com
```

---

## 🎯 Getting Started

### 1. Set Up Supabase

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create new project
3. Run migrations: Copy `supabase/migrations/001_initial_schema.sql`
4. Run seed data: Copy `supabase/seed.sql`
5. Copy project URL & keys to `.env.local`

### 2. Run Development Server

```bash
npm run dev
```

### 3. View the Site

Open [http://localhost:3000](http://localhost:3000)

---

## 🎨 Design System

### Colors
- **Luxury Gold**: #D4AF37
- **Luxury Platinum**: #E5E4E2
- **Luxury Onyx**: #0F0F0F
- **Luxury Pearl**: #FAFAFA
- **Ocean Blue**: #0284c7

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Code**: JetBrains Mono

### Patterns
- **Hexagonal Pattern**: Luxury SVG overlay matching cart design
- **Glass Morphism**: Frosted glass effects
- **Gradient Text**: Luxury gold/platinum gradients

---

## 📦 Products

### Standard Package - $9,200 NZD
48V battery, 2-4 seater, 40-60km range

### Premium Package - $12,500 NZD
60V battery, 4-6 seater, 70-90km range, touchscreen

### Ultimate Package - $16,500 NZD
**NZ's First 72V Lithium Cart**
100km+ range, 50km/h+ speed, full luxury features

---

## 📚 Documentation

- **Implementation Plan**: `.claude/plans/ethereal-knitting-avalanche.md`
- **Progress Tracking**: `PROGRESS.md`
- **Summary**: `SUMMARY.md`
- **Database Schema**: `supabase/migrations/001_initial_schema.sql`

---

## 🤝 Contributing

This is a private commercial project. For internal development only.

---

## 📞 Contact

**Club Caddy Carts**
- Phone: +64-021-560-307
- Email: admin@clubcaddycarts.com
- Contact: Warren

---

## 📝 License

Private & Confidential - All Rights Reserved

---

**Built with 💎 luxury and precision for New Zealand's finest golf courses**

*Last Updated: December 7, 2025*
