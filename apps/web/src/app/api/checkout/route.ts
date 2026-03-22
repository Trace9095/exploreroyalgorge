import { NextRequest, NextResponse } from 'next/server'
import { getStripe, TIER_PRICES } from '@/lib/stripe'
import { getDb } from '@/lib/db'
import { claimSubmissions } from '@/db/schema'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://exploreroyalgorge.com'

export async function POST(req: NextRequest) {
  try {
    const { slug, tier } = await req.json()

    if (!slug || !tier) {
      return NextResponse.json({ error: 'slug and tier are required' }, { status: 400 })
    }

    if (!['premium', 'sponsored'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const priceId = TIER_PRICES[tier]
    if (!priceId) {
      return NextResponse.json({ error: 'Stripe price not configured for this tier' }, { status: 500 })
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${APP_URL}/directory/${slug}?claimed=true`,
      cancel_url: `${APP_URL}/claim/${slug}`,
      metadata: { slug, tier },
    })

    const db = getDb()
    await db.insert(claimSubmissions).values({
      businessSlug: slug,
      contactName: '',
      contactEmail: '',
      tier: tier as 'premium' | 'sponsored',
      stripeSessionId: session.id,
    })

    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
