import type { Metadata } from 'next'
import Link from 'next/link'
import { BUSINESSES } from '@/data/businesses'
import { CATEGORY_LABELS } from '@erg/shared'
import type { BusinessCategory } from '@erg/shared'
import { ArrowRight, Star, Globe, Phone, CheckCircle, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Adventure Directory',
  description:
    'Browse all adventure businesses, attractions, and services in the Royal Gorge region near Canon City, Colorado.',
  openGraph: {
    title: 'Royal Gorge Adventure Directory',
    description: 'Find rafting, ziplines, hiking, rock climbing, dining, and more near Canon City, CO.',
  },
}

const ALL_CATEGORIES = Object.entries(CATEGORY_LABELS) as [BusinessCategory, string][]

export default function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  // We'll use URL params via a client filter component below
  const sorted = [...BUSINESSES].sort((a, b) => {
    const order = { sponsored: 0, premium: 1, free: 2 }
    return order[a.tier] - order[b.tier]
  })

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Directory</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Royal Gorge Adventure Directory
          </h1>
          <p className="mt-3 text-lg text-muted">
            {BUSINESSES.length} businesses and attractions in the Royal Gorge region.
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2" role="navigation" aria-label="Filter by category">
          <Link
            href="/directory"
            className="min-h-[44px] inline-flex items-center rounded-lg border border-gold/40 bg-gold/15 px-4 py-2 text-sm font-semibold text-gold transition-colors"
          >
            All ({BUSINESSES.length})
          </Link>
          {ALL_CATEGORIES.map(([id, label]) => {
            const count = BUSINESSES.filter((b) => b.category === id).length
            if (count === 0) return null
            return (
              <Link
                key={id}
                href={`/adventures/${id}`}
                className="min-h-[44px] inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-gold/30 hover:text-foreground"
              >
                {label} ({count})
              </Link>
            )
          })}
        </div>

        {/* Listing grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((business) => (
            <article
              key={business.slug}
              className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                business.tier === 'sponsored'
                  ? 'border-gold/30 bg-surface hover:border-gold/50 hover:shadow-[0_4px_24px_rgba(212,168,83,0.12)]'
                  : 'border-border bg-surface hover:border-gold/20 hover:bg-surface-hover'
              }`}
            >
              {business.tier === 'sponsored' && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-30"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,83,0.2) 0%, transparent 60%)',
                  }}
                />
              )}

              <div className="relative space-y-3">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted capitalize">
                    {CATEGORY_LABELS[business.category]}
                  </span>
                  {business.tier === 'sponsored' && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                      <Star className="h-2.5 w-2.5 fill-gold" aria-hidden="true" />
                      Sponsored
                    </span>
                  )}
                  {business.tier === 'premium' && (
                    <span className="rounded-full border border-gold/20 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold/80">
                      Premium
                    </span>
                  )}
                </div>

                {/* Name + tagline */}
                <div>
                  <h2 className="font-bold text-foreground">{business.name}</h2>
                  <p className="mt-0.5 text-sm text-muted">{business.tagline}</p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {business.city}, {business.state}
                </div>

                {/* Highlights */}
                <ul className="space-y-1">
                  {business.highlights.slice(0, 2).map((h) => (
                    <li key={h} className="flex items-center gap-1.5 text-xs text-muted">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
                  <Link
                    href={`/directory/${business.slug}`}
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-opacity hover:opacity-80"
                  >
                    View listing
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  {business.website && (
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                      aria-label={`Visit ${business.name} website (opens in new tab)`}
                    >
                      <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                      Website
                    </a>
                  )}
                  {business.phone && (
                    <a
                      href={`tel:${business.phone}`}
                      className="min-h-[44px] inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                      aria-label={`Call ${business.name}`}
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      Call
                    </a>
                  )}
                  {!business.claimed && (
                    <Link
                      href={`/claim/${business.slug}`}
                      className="ml-auto min-h-[44px] inline-flex items-center rounded-lg border border-border px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-gold/30 hover:text-gold"
                    >
                      Claim listing
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Don't see yours */}
        <div className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="text-xl font-bold text-foreground">Don&apos;t see your business?</h2>
          <p className="mt-2 text-muted">
            We&apos;re always expanding the directory. Submit your listing and we&apos;ll add it within 1–2 business days.
          </p>
          <Link
            href="/request-listing"
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-background"
            style={{ background: '#D4A853' }}
          >
            Request a Listing
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
