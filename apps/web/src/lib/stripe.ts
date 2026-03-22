import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    _stripe = new Stripe(key, { apiVersion: '2025-02-24.acacia' })
  }
  return _stripe
}

export const TIER_PRICES: Record<string, string | undefined> = {
  premium: process.env.STRIPE_PRICE_PREMIUM,
  sponsored: process.env.STRIPE_PRICE_SPONSORED,
}

export const TIER_LABELS: Record<string, { name: string; price: number }> = {
  premium: { name: 'Premium', price: 99 },
  sponsored: { name: 'Sponsored', price: 199 },
}

export async function createPortalSession(customerId: string, returnUrl: string): Promise<string> {
  const stripe = getStripe()
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
  return session.url
}

export async function findStripeCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const stripe = getStripe()
  const result = await stripe.customers.list({ email, limit: 1 })
  return result.data[0] ?? null
}

export async function getActiveSubscription(customerId: string): Promise<Stripe.Subscription | null> {
  const stripe = getStripe()
  const result = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 1,
  })
  return result.data[0] ?? null
}
