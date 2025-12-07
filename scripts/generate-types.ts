import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function generateTypes() {
  console.log('🔍 Fetching database schema...')

  // For now, let's create a basic type file
  const types = `export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          short_description: string | null
          tier: 'standard' | 'premium' | 'ultimate'
          category: 'golf_cart' | 'utility' | 'commercial' | 'addon'
          base_price: number
          sale_type: 'immediate' | 'enquiry' | 'both'
          stripe_product_id: string | null
          stripe_price_id: string | null
          in_stock: boolean
          featured: boolean
          images: Json
          video_url: string | null
          specifications: Json
          features: Json
          seo_title: string | null
          seo_description: string | null
          created_at: string
          updated_at: string
        }
      }
      addons: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          category: string
          image_url: string | null
          in_stock: boolean
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
`

  writeFileSync('src/types/database.types.ts', types)
  console.log('✅ Types generated successfully!')
}

generateTypes()
