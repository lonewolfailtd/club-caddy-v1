import Stripe from 'stripe'

// Initialize Stripe with the secret key (use placeholder for build if not set)
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build'

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-11-17.clover',
  typescript: true,
})

// Helper function to format amount for Stripe (convert to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100)
}

// Helper function to format amount from Stripe (convert from cents)
export const formatAmountFromStripe = (amount: number): number => {
  return amount / 100
}
