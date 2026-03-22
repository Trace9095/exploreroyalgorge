import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { listingRequests } from '@/db/schema'
import { sendListingRequestNotification, sendListingRequestConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { businessName, contactName, contactEmail, contactPhone, businessWebsite, tier, message } = body

    if (!businessName || !contactName || !contactEmail) {
      return NextResponse.json({ error: 'Business name, your name, and email are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const validTiers = ['premium', 'sponsored']
    const safeTier = validTiers.includes(tier) ? tier : 'premium'

    const db = getDb()
    await db.insert(listingRequests).values({
      businessName,
      contactName,
      contactEmail,
      contactPhone: contactPhone || null,
      businessWebsite: businessWebsite || null,
      tier: safeTier as 'premium' | 'sponsored',
      message: message || null,
    })

    await Promise.allSettled([
      sendListingRequestNotification({ businessName, contactName, contactEmail, tier: safeTier }),
      sendListingRequestConfirmation({ businessName, contactName, contactEmail, tier: safeTier }),
    ])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
