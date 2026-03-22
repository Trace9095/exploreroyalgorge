import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getDb } from '@/lib/db'
import { claimSubmissions } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 })
  }

  let event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = getDb()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      if (session.metadata?.slug) {
        await db
          .update(claimSubmissions)
          .set({ status: 'approved', contactEmail: session.customer_email ?? '' })
          .where(eq(claimSubmissions.stripeSessionId, session.id))
      }
      break
    }
    case 'customer.subscription.deleted': {
      // Future: downgrade listing tier when subscription is cancelled
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
