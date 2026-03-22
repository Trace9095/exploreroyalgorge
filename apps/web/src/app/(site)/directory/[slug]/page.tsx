import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BUSINESSES, getBusinessBySlug, getBusinessesByCategory } from '@/data/businesses'
import { CATEGORY_LABELS } from '@erg/shared'
import { ArrowLeft, Globe, Phone, MapPin, Clock, CheckCircle, Star, ArrowRight, ExternalLink } from 'lucide-react'

export async function generateStaticParams() {
  return BUSINESSES.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const business = getBusinessBySlug(slug)
  if (!business) return {}

  const title = `${business.name} | Royal Gorge Adventure Directory`
  const description = business.description ?? business.tagline
  return {
    title,
    description,
    openGraph: {
      title: `${business.name} — ${CATEGORY_LABELS[business.category]}`,
      description,
      url: `https://exploreroyalgorge.com/directory/${slug}`,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

function buildJsonLd(business: ReturnType<typeof getBusinessBySlug>) {
  if (!business) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description ?? business.tagline,
    url: business.website ?? `https://exploreroyalgorge.com/directory/${business.slug}`,
    ...(business.phone && { telephone: business.phone }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.city,
      addressRegion: business.state,
      addressCountry: 'US',
    },
    areaServed: 'Royal Gorge Region, Canon City, Colorado',
    ...(business.hours && {
      openingHours: Object.entries(business.hours)
        .map(([day, h]) => `${day.slice(0, 2)} ${h}`)
        .join(', '),
    }),
  }
}

export default async function BusinessDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const business = getBusinessBySlug(slug)
  if (!business) notFound()

  const jsonLd = buildJsonLd(business)
  const related = getBusinessesByCategory(business.category)
    .filter((b) => b.slug !== business.slug)
    .slice(0, 3)

  const categoryLabel = CATEGORY_LABELS[business.category]

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Back nav */}
          <Link
            href="/directory"
            className="mb-8 inline-flex min-h-[44px] items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to directory
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero card */}
              <div
                className={`relative overflow-hidden rounded-2xl border p-8 ${
                  business.tier === 'sponsored'
                    ? 'border-gold/30 bg-surface'
                    : 'border-border bg-surface'
                }`}
              >
                {business.tier === 'sponsored' && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    aria-hidden="true"
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,83,0.18) 0%, transparent 60%)',
                    }}
                  />
                )}

                <div className="relative">
                  {/* Badges */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted capitalize">
                      {categoryLabel}
                    </span>
                    {business.tier === 'sponsored' && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
                        <Star className="h-3 w-3 fill-gold" aria-hidden="true" />
                        Sponsored
                      </span>
                    )}
                    {business.tier === 'premium' && (
                      <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-medium text-gold/80">
                        Premium
                      </span>
                    )}
                    {!business.claimed && (
                      <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted/60">
                        Unclaimed
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {business.name}
                  </h1>
                  <p className="mt-2 text-lg text-muted">{business.tagline}</p>

                  <div className="mt-4 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {business.city}, {business.state}
                  </div>

                  {/* CTA buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {business.website && (
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                        style={{ background: '#D4A853' }}
                        aria-label={`Visit ${business.name} website (opens in new tab)`}
                      >
                        <Globe className="h-4 w-4" aria-hidden="true" />
                        Visit Website
                        <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                      </a>
                    )}
                    {business.phone && (
                      <a
                        href={`tel:${business.phone}`}
                        className="min-h-[44px] inline-flex items-center gap-2 rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-gold/30"
                        aria-label={`Call ${business.name}`}
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {business.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              {business.description && (
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="mb-3 text-lg font-bold text-foreground">About</h2>
                  <p className="leading-relaxed text-muted">{business.description}</p>
                </div>
              )}

              {/* Highlights */}
              {business.highlights.length > 0 && (
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">Highlights</h2>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {business.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Amenities */}
              {business.amenities && business.amenities.length > 0 && (
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">Amenities & Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {business.amenities.map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Info card */}
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
                <h2 className="text-base font-bold text-foreground">Business Info</h2>

                {business.address && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold">Address</p>
                    <p className="text-sm text-muted">{business.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        business.address + ' ' + business.city + ' ' + business.state
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex min-h-[44px] items-center gap-1 text-xs text-gold hover:opacity-80"
                      aria-label="Get directions (opens Google Maps)"
                    >
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      Get Directions
                      <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                    </a>
                  </div>
                )}

                {business.phone && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold">Phone</p>
                    <a
                      href={`tel:${business.phone}`}
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-muted hover:text-foreground"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      {business.phone}
                    </a>
                  </div>
                )}

                {business.website && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold">Website</p>
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-muted hover:text-foreground break-all"
                      aria-label={`Visit ${business.name} (opens in new tab)`}
                    >
                      <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {business.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}

                {business.hours && Object.keys(business.hours).length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold">Hours</p>
                    <ul className="space-y-1">
                      {Object.entries(business.hours).map(([day, hours]) => (
                        <li key={day} className="flex items-start gap-1.5 text-xs text-muted">
                          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/60" aria-hidden="true" />
                          <span className="font-medium text-foreground/70">{day}:</span>
                          <span>{hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Claim card for unclaimed businesses */}
              {!business.claimed && (
                <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6 space-y-3">
                  <h2 className="text-base font-bold text-foreground">Is this your business?</h2>
                  <p className="text-sm text-muted">
                    Claim your listing to add photos, update info, respond to inquiries, and get featured placement.
                  </p>
                  <Link
                    href={`/claim/${business.slug}`}
                    className="min-h-[44px] inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                    style={{ background: '#D4A853' }}
                  >
                    Claim This Listing
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <p className="text-center text-xs text-muted">
                    Starting at $99/mo — No long-term contracts
                  </p>
                </div>
              )}

              {/* Category browse */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="mb-3 text-base font-bold text-foreground">Browse Category</h2>
                <Link
                  href={`/adventures/${business.category}`}
                  className="min-h-[44px] inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-gold/30 hover:text-foreground"
                >
                  All {categoryLabel} listings
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Related businesses */}
          {related.length > 0 && (
            <section className="mt-16" aria-label="Related businesses">
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                More {categoryLabel} in the Royal Gorge
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/directory/${b.slug}`}
                    className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-gold/20 hover:bg-surface-hover"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
                        {CATEGORY_LABELS[b.category]}
                      </span>
                      {b.tier === 'sponsored' && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                          <Star className="h-2.5 w-2.5 fill-gold" aria-hidden="true" />
                          Sponsored
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-gold transition-colors">
                      {b.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{b.tagline}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-gold font-medium">
                      View listing
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
