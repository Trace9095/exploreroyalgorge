import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { claimSubmissions } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { findStripeCustomerByEmail, getActiveSubscription, TIER_LABELS } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const db = getDb()

    // Try DB first
    const [record] = await db
      .select()
      .from(claimSubmissions)
      .where(eq(claimSubmissions.contactEmail, email))
      .limit(1)

    if (record?.stripeSubscriptionId) {
      const tierLabel = TIER_LABELS[record.tier] ?? { name: record.tier, price: 0 }
      return NextResponse.json({
        found: true,
        businessSlug: record.businessSlug,
        tier: record.tier,
        tierName: tierLabel.name,
        price: tierLabel.price,
        status: record.subscriptionStatus ?? record.status,
        currentPeriodEnd: record.currentPeriodEnd?.toISOString() ?? null,
        hasCustomer: !!record.stripeCustomerId,
      })
    }

    // Fallback: query Stripe directly
    let customerId = record?.stripeCustomerId ?? null

    if (!customerId) {
      const customer = await findStripeCustomerByEmail(email)
      customerId = customer?.id ?? null
    }

    if (!customerId) {
      return NextResponse.json({ found: false })
    }

    const subscription = await getActiveSubscription(customerId)

    if (!subscription) {
      return NextResponse.json({ found: false })
    }

    const tierFromMeta = (subscription.metadata as Record<string, string>)?.tier ?? record?.tier ?? 'premium'
    const tierLabel = TIER_LABELS[tierFromMeta] ?? { name: tierFromMeta, price: 0 }

    return NextResponse.json({
      found: true,
      businessSlug: record?.businessSlug ?? null,
      tier: tierFromMeta,
      tierName: tierLabel.name,
      price: tierLabel.price,
      status: subscription.status,
      currentPeriodEnd: new Date((subscription as { current_period_end: number }).current_period_end * 1000).toISOString(),
      hasCustomer: true,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to look up subscription' }, { status: 500 })
  }
}
