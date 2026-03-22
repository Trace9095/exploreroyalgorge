import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BUSINESSES, getBusinessesByCategory } from '@/data/businesses'
import { CATEGORY_LABELS } from '@erg/shared'
import type { BusinessCategory } from '@erg/shared'
import {
  ArrowRight,
  Globe,
  Phone,
  CheckCircle,
  MapPin,
  Award,
  ArrowLeft,
  Waves,
  Wind,
  Mountain,
  Radio,
  Eye,
  Tent,
  UtensilsCrossed,
  Home,
  Train,
} from 'lucide-react'
import { BookDirectBanner } from '@/components/marketing/BookDirectBanner'
import type { ReactNode } from 'react'

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as BusinessCategory[]

const CATEGORY_GRADIENTS: Record<BusinessCategory, string> = {
  rafting: 'linear-gradient(135deg, #0c1a2e 0%, #1a3a5c 100%)',
  zipline: 'linear-gradient(135deg, #1a0d2e 0%, #2d1b5c 100%)',
  hiking: 'linear-gradient(135deg, #0d1a0d 0%, #1a3a1a 100%)',
  'rock-climbing': 'linear-gradient(135deg, #1a0d0d 0%, #3a1a1a 100%)',
  helicopter: 'linear-gradient(135deg, #0d1117 0%, #111827 100%)',
  scenic: 'linear-gradient(135deg, #1a1500 0%, #2d2500 100%)',
  camping: 'linear-gradient(135deg, #0d1a0d 0%, #1a2d1a 100%)',
  dining: 'linear-gradient(135deg, #1a0d0d 0%, #2d1500 100%)',
  'vacation-rentals': 'linear-gradient(135deg, #0d1a1a 0%, #1a2d2d 100%)',
  railroad: 'linear-gradient(135deg, #1a1a0d 0%, #2d2d1a 100%)',
}

const CATEGORY_ICON_MAP: Record<BusinessCategory, ReactNode> = {
  rafting: <Waves className="h-16 w-16" />,
  zipline: <Wind className="h-16 w-16" />,
  hiking: <Mountain className="h-16 w-16" />,
  'rock-climbing': <Mountain className="h-16 w-16" />,
  helicopter: <Radio className="h-16 w-16" />,
  scenic: <Eye className="h-16 w-16" />,
  camping: <Tent className="h-16 w-16" />,
  dining: <UtensilsCrossed className="h-16 w-16" />,
  'vacation-rentals': <Home className="h-16 w-16" />,
  railroad: <Train className="h-16 w-16" />,
}

export function generateStaticParams() {
  return ALL_CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  if (!ALL_CATEGORIES.includes(category as BusinessCategory)) return {}
  const label = CATEGORY_LABELS[category as BusinessCategory]
  const title = `${label} near Royal Gorge, Colorado`
  const description = `Find the best ${label.toLowerCase()} experiences in the Royal Gorge region near Canon City, Colorado.`
  return {
    title,
    description,
    openGraph: { title: `Royal Gorge ${label}`, description },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (!ALL_CATEGORIES.includes(category as BusinessCategory)) notFound()

  const cat = category as BusinessCategory
  const label = CATEGORY_LABELS[cat]
  const businesses = getBusinessesByCategory(cat)

  if (businesses.length === 0) notFound()

  const sorted = [...businesses].sort((a, b) => {
    const order = { sponsored: 0, premium: 1, free: 2 }
    return order[a.tier] - order[b.tier]
  })

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/adventures"
          className="mb-8 inline-flex min-h-[44px] items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All adventures
        </Link>

        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Adventure Category</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{label}</h1>
          <p className="mt-3 text-lg text-muted">
            {businesses.length} listing{businesses.length !== 1 ? 's' : ''} in the Royal Gorge region.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((business) => (
            <article
              key={business.slug}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 ${
                business.tier === 'sponsored'
                  ? 'border-gold/30 bg-surface hover:border-gold/50 hover:shadow-[0_4px_24px_rgba(212,168,83,0.12)]'
                  : 'border-border bg-surface hover:border-gold/20 hover:bg-surface-hover'
              }`}
            >
              {/* Sponsored glow overlay */}
              {business.tier === 'sponsored' && (
                <div
                  className="pointer-events-none absolute inset-0 z-[1] opacity-20"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,83,0.25) 0%, transparent 60%)',
                  }}
                />
              )}

              {/* Image / Gradient fallback */}
              <div className="relative h-44 w-full overflow-hidden">
                {business.imageUrl ? (
                  <Image
                    src={business.imageUrl}
                    alt={business.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={90}
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center"
                    style={{ background: CATEGORY_GRADIENTS[business.category] }}
                    aria-hidden="true"
                  >
                    <span className="text-gold/25">{CATEGORY_ICON_MAP[business.category]}</span>
                  </div>
                )}
                {/* Bottom fade */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
                  aria-hidden="true"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,17,23,0.6))' }}
                />
              </div>

              {/* Card content */}
              <div className="relative z-[2] space-y-3 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  {business.ownedByTrace && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                      <Award className="h-2.5 w-2.5" aria-hidden="true" />
                      Featured Partner
                    </span>
                  )}
                  {business.tier === 'premium' && !business.ownedByTrace && (
                    <span className="rounded-full border border-gold/20 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-gold/80">
                      Premium
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="font-bold text-foreground">{business.name}</h2>
                  <p className="mt-0.5 text-sm text-muted">{business.tagline}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {business.city}, {business.state}
                </div>

                <ul className="space-y-1">
                  {business.highlights.slice(0, 2).map((h) => (
                    <li key={h} className="flex items-center gap-1.5 text-xs text-muted">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>

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
                      aria-label={`Visit ${business.name} website`}
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

        <BookDirectBanner />

        {/* CTA */}
        <div className="mt-4 rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="text-xl font-bold text-foreground">Don&apos;t see your business?</h2>
          <p className="mt-2 text-muted">Submit your listing and we&apos;ll add it within 1–2 business days.</p>
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
