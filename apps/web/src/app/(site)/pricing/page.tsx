import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Listing Pricing — Get Featured in the Royal Gorge Directory',
  description:
    'Choose a listing plan for your Royal Gorge area business. Premium featured placement at $99/mo, or Sponsored top positioning at $199/mo.',
  openGraph: {
    title: 'Royal Gorge Directory — Listing Plans & Pricing',
    description: 'Get your business featured in the Royal Gorge adventure directory.',
  },
}

const PLANS = [
  {
    name: 'Premium',
    price: 99,
    description: 'Enhanced listing with priority placement',
    tier: 'premium',
    features: [
      'Business name, category & description',
      'Address, phone number & website link',
      'Priority placement in category pages',
      'Highlights & amenities showcase',
      'Hours of operation display',
      'Premium badge on listing',
      'Monthly analytics report',
    ],
    cta: 'Get Premium',
    href: '/request-listing?tier=premium',
    highlighted: false,
  },
  {
    name: 'Sponsored',
    price: 199,
    description: 'Top placement across the entire directory',
    tier: 'sponsored',
    features: [
      'Everything in Premium',
      'Top placement in ALL category pages',
      'Featured on the homepage',
      'Gold highlighted listing card',
      'Sponsored badge',
      'Featured in blog posts',
      'Weekly performance reports',
    ],
    cta: 'Become Sponsored',
    href: '/request-listing?tier=sponsored',
    highlighted: true,
  },
]

export default function PricingPage() {
  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Listing Plans</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get Your Business Found
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Thousands of visitors search for Royal Gorge adventures every month. Starting at $99/mo — no long-term
            contracts, cancel anytime.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-2xl border p-8 flex flex-col ${
                plan.highlighted
                  ? 'border-gold/40 bg-surface'
                  : 'border-border bg-surface'
              }`}
            >
              {plan.highlighted && (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 opacity-30"
                    aria-hidden="true"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,83,0.2) 0%, transparent 60%)' }}
                  />
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <div className="mb-4 inline-flex items-center gap-1 self-start rounded-full border border-gold/40 bg-gold/15 px-3 py-0.5 text-xs font-semibold text-gold">
                    <Star className="h-3 w-3 fill-gold" aria-hidden="true" />
                    Most Popular
                  </div>
                </>
              )}

              <div className="relative flex-1">
                <h2 className="text-lg font-bold text-foreground">{plan.name}</h2>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>

                <div className="mt-6">
                  {plan.price ? (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-foreground">${plan.price}</span>
                      <span className="mb-1 text-muted">/mo</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-extrabold text-foreground">Free</div>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.href}
                className={`relative mt-8 min-h-[44px] inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                  plan.highlighted
                    ? 'text-background'
                    : 'border border-border text-foreground hover:border-gold/30'
                }`}
                style={plan.highlighted ? { background: '#D4A853' } : undefined}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ section */}
        <div className="mt-16 rounded-2xl border border-border bg-surface p-8">
          <h2 className="mb-6 text-xl font-bold text-foreground">Common Questions</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                q: 'How long does listing approval take?',
                a: 'New listings are reviewed and activated within 1–2 business days after payment. You\'ll receive a confirmation email once your listing is live.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Premium and Sponsored plans are month-to-month with no long-term contracts. Cancel anytime from your account dashboard.',
              },
              {
                q: 'What happens to my listing if I cancel?',
                a: 'Your listing will be removed from the directory when your subscription ends. Reactivate anytime by resubscribing — all your listing data is preserved.',
              },
              {
                q: 'Do you offer annual billing?',
                a: 'Annual plans are available with 2 months free. Contact us at hello@exploreroyalgorge.com for details.',
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="font-semibold text-foreground text-sm">{q}</h3>
                <p className="mt-1 text-sm text-muted">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-muted">
            Have questions?{' '}
            <a
              href="mailto:hello@exploreroyalgorge.com"
              className="text-gold underline underline-offset-2 hover:no-underline"
            >
              hello@exploreroyalgorge.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
