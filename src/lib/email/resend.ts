import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'admin@clubcaddycarts.com'
export const COMPANY_NAME = 'Club Caddy Carts'
export const COMPANY_PHONE = '+64 021 560 307'
export const COMPANY_EMAIL = 'admin@clubcaddycarts.com'
export const COMPANY_ADDRESS = 'New Zealand'
