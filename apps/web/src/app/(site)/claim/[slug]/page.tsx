'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Star } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const TIERS = [
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    features: [
      'Priority placement in category pages',
      'Highlights & amenities showcase',
      'Hours of operation display',
      'Premium badge on listing',
      'Monthly analytics report',
    ],
  },
  {
    id: 'sponsored',
    name: 'Sponsored',
    price: 199,
    features: [
      'Top placement in ALL category pages',
      'Featured on the homepage',
      'Gold highlighted listing card',
      'Sponsored badge',
      'Featured in blog posts',
      'Weekly performance reports',
    ],
    highlighted: true,
  },
]

export default function ClaimPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [selectedTier, setSelectedTier] = useState<'premium' | 'sponsored'>('premium')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const businessName = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  async function handleClaim() {
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, tier: selectedTier }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? 'Failed to start checkout')
      }
      const { url } = await res.json()
      if (url) {
        trackEvent('claim_listing', { tier: selectedTier, city: 'Royal Gorge' })
        window.location.href = url
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/directory/${slug}`}
          className="mb-8 inline-flex min-h-[44px] items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to listing
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Claim Listing</p>
          <h1 className="text-2xl font-bold text-foreground">Claim {businessName}</h1>
          <p className="mt-2 text-muted">
            Choose a plan to activate your listing and start reaching adventure-seekers in the Royal Gorge
            region.
          </p>
        </div>

        {/* Tier selector */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id as 'premium' | 'sponsored')}
              className={`relative overflow-hidden rounded-2xl border p-6 text-left transition-all ${
                selectedTier === tier.id
                  ? 'border-gold/50 bg-gold/5'
                  : 'border-border bg-surface hover:border-gold/20'
              }`}
            >
              {tier.highlighted && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  aria-hidden="true"
                  style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,83,0.3) 0%, transparent 60%)' }}
                />
              )}
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{tier.name}</span>
                    {tier.highlighted && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
                        <Star className="h-2.5 w-2.5 fill-gold" aria-hidden="true" />
                        Popular
                      </span>
                    )}
                  </div>
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      selectedTier === tier.id ? 'border-gold bg-gold' : 'border-muted/40 bg-transparent'
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-2 text-2xl font-extrabold text-foreground">
                  ${tier.price}<span className="text-base font-normal text-muted">/mo</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          ))}
        </div>

        {status === 'error' && (
          <p role="alert" className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {errorMsg}
          </p>
        )}

        <button
          onClick={handleClaim}
          disabled={status === 'loading'}
          className="min-h-[44px] inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: '#D4A853' }}
        >
          {status === 'loading'
            ? 'Redirecting to checkout…'
            : `Continue to Checkout — $${TIERS.find((t) => t.id === selectedTier)?.price}/mo`}
          {status !== 'loading' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>

        <p className="mt-4 text-center text-xs text-muted">
          Secure checkout powered by Stripe. Cancel anytime. No long-term contracts.
        </p>
      </div>
    </div>
  )
}
