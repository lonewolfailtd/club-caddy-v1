import { Resend } from 'resend'

// Use placeholder for build if not set (similar to Stripe)
const resendKey = process.env.RESEND_API_KEY || 're_placeholder_for_build'

if (!process.env.RESEND_API_KEY && process.env.NODE_ENV === 'production') {
  console.warn('RESEND_API_KEY is not set in production. Email sending will fail.')
}

export const resend = new Resend(resendKey)

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'admin@clubcaddycarts.com'
export const COMPANY_NAME = 'Club Caddy Carts'
export const COMPANY_PHONE = '+64 021 560 307'
export const COMPANY_EMAIL = 'admin@clubcaddycarts.com'
export const COMPANY_ADDRESS = 'New Zealand'
