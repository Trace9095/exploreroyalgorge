import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    _stripe = new Stripe(key, { apiVersion: '2024-12-18.acacia' })
  }
  return _stripe
}

export const TIER_PRICES: Record<string, string | undefined> = {
  premium: process.env.STRIPE_PRICE_PREMIUM,
  sponsored: process.env.STRIPE_PRICE_SPONSORED,
}
