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
      const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
      const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id

      if (session.id) {
        await db
          .update(claimSubmissions)
          .set({
            status: 'paid',
            stripeCustomerId: customerId ?? null,
            stripeSubscriptionId: subscriptionId ?? null,
            subscriptionStatus: 'active',
            contactEmail: session.customer_email ?? '',
          })
          .where(eq(claimSubmissions.stripeSessionId, session.id))
      }
      break
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object
      const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id

      if (customerId) {
        const currentPeriodEnd = new Date((sub as { current_period_end: number }).current_period_end * 1000)
        await db
          .update(claimSubmissions)
          .set({
            subscriptionStatus: sub.status,
            currentPeriodEnd,
          })
          .where(eq(claimSubmissions.stripeCustomerId, customerId))
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object
      const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id

      if (customerId) {
        await db
          .update(claimSubmissions)
          .set({
            subscriptionStatus: 'cancelled',
            status: 'cancelled',
          })
          .where(eq(claimSubmissions.stripeCustomerId, customerId))
      }
      break
    }

    case 'invoice.paid': {
      const invoice = event.data.object
      const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
      const subscriptionId =
        typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id

      if (customerId) {
        await db
          .update(claimSubmissions)
          .set({
            subscriptionStatus: 'active',
            stripeSubscriptionId: subscriptionId ?? undefined,
          })
          .where(eq(claimSubmissions.stripeCustomerId, customerId))
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object
      const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id

      if (customerId) {
        await db
          .update(claimSubmissions)
          .set({ subscriptionStatus: 'past_due' })
          .where(eq(claimSubmissions.stripeCustomerId, customerId))
      }
      break
    }

    default:
      break
  }

  return NextResponse.json({ received: true })
}
