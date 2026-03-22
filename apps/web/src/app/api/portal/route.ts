import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { claimSubmissions } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { createPortalSession, findStripeCustomerByEmail } from '@/lib/stripe'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://exploreroyalgorge.com'

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

    let customerId = record?.stripeCustomerId ?? null

    // Fallback: search Stripe directly
    if (!customerId) {
      const customer = await findStripeCustomerByEmail(email)
      customerId = customer?.id ?? null
    }

    if (!customerId) {
      return NextResponse.json({ error: 'No active subscription found for this email' }, { status: 404 })
    }

    const url = await createPortalSession(customerId, `${APP_URL}/manage`)
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ error: 'Failed to create billing portal session' }, { status: 500 })
  }
}
