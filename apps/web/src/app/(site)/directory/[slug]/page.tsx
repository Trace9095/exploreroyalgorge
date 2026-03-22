import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BUSINESSES, getBusinessBySlug, getBusinessesByCategory, PARTNER_LOGOS, PARTNER_CTA_LABELS } from '@/data/businesses'
import { CATEGORY_LABELS } from '@erg/shared'
import {
  ArrowLeft,
  Globe,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  ExternalLink,
  Shield,
  Award,
  Zap,
} from 'lucide-react'
import { BookDirectBanner } from '@/components/marketing/BookDirectBanner'

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
  // All fields come from our own static data — no user input, safe for JSON.stringify
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description ?? business.tagline,
    url: business.website ?? `https://exploreroyalgorge.com/directory/${business.slug}`,
    ...(business.phone && { telephone: business.phone }),
    ...(business.ownedByTrace && {
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '120' },
    }),
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
  const logoPath = PARTNER_LOGOS[business.slug]
  const ctaLabel = PARTNER_CTA_LABELS[business.slug] ?? 'Visit Website'

  if (business.ownedByTrace) {
    return (
      <FeaturedPartnerPage
        business={business}
        jsonLd={jsonLd}
        categoryLabel={categoryLabel}
        logoPath={logoPath}
        ctaLabel={ctaLabel}
        related={related}
      />
    )
  }

  return (
    <StandardPage
      business={business}
      jsonLd={jsonLd}
      categoryLabel={categoryLabel}
      related={related}
    />
  )
}

// ─── Premium Featured Partner Page ────────────────────────────────────────────

function FeaturedPartnerPage({
  business,
  jsonLd,
  categoryLabel,
  logoPath,
  ctaLabel,
  related,
}: {
  business: NonNullable<ReturnType<typeof getBusinessBySlug>>
  jsonLd: ReturnType<typeof buildJsonLd>
  categoryLabel: string
  logoPath: string | undefined
  ctaLabel: string
  related: ReturnType<typeof getBusinessesByCategory>
}) {
  const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : null

  return (
    <>
      {jsonLdStr && (
        <script
          type="application/ld+json"
          // nosec: content is static business data, not user input
          dangerouslySetInnerHTML={{ __html: jsonLdStr }}
        />
      )}

      {/* Hero Banner */}
      <section
        className="relative overflow-hidden border-b border-gold/30"
        style={{ background: 'linear-gradient(135deg, #0D1117 0%, #111827 40%, #1a1200 100%)', minHeight: '380px' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(212,168,83,0.18) 0%, rgba(212,168,83,0.06) 50%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(rgba(212,168,83,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl px-4 py-12 text-center">
          <div className="mb-8 flex justify-start">
            <Link
              href="/directory"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to directory
            </Link>
          </div>

          {/* Badges */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              Featured Partner
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted capitalize">
              {categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <Shield className="h-3 w-3" aria-hidden="true" />
              Verified
            </span>
          </div>

          {/* Logo */}
          {logoPath && (
            <div className="mb-6 flex justify-center">
              <div
                className="flex h-24 w-64 items-center justify-center rounded-2xl px-6 py-4"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,168,83,0.2)' }}
              >
                <Image
                  src={logoPath}
                  alt={`${business.name} logo`}
                  width={220}
                  height={80}
                  className="max-h-16 w-auto object-contain"
                  priority
                />
              </div>
            </div>
          )}

          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {business.name}
          </h1>
          <p className="mb-5 text-lg text-muted sm:text-xl">{business.tagline}</p>

          {/* Stars */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" aria-hidden="true" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gold">5.0</span>
            <span className="text-sm text-muted">(120+ reviews)</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {business.website && (
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl px-10 py-3 text-base font-bold text-background transition-all hover:opacity-90 sm:w-auto"
                style={{ background: '#D4A853', boxShadow: '0 0 40px rgba(212,168,83,0.4)' }}
                aria-label={`${ctaLabel} at ${business.name} — opens in new tab`}
              >
                <Zap className="h-4 w-4" aria-hidden="true" />
                {ctaLabel}
                <ExternalLink className="h-4 w-4 opacity-80" aria-hidden="true" />
              </a>
            )}
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-8 py-3 text-base font-semibold text-gold transition-colors hover:bg-gold/15 sm:w-auto"
                aria-label={`Call ${business.name}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {business.phone}
              </a>
            )}
          </div>

          {/* Info strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-muted">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
              {business.address ?? `${business.city}, ${business.state}`}
            </div>
            {business.hours && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                {Object.values(business.hours)[0]}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-2xl border border-border bg-surface p-8">
              <h2 className="mb-4 text-xl font-bold text-foreground">About {business.name}</h2>
              <p className="text-base leading-relaxed text-muted">{business.description}</p>
            </section>

            {business.highlights.length > 0 && (
              <section className="rounded-2xl border border-border bg-surface p-8">
                <h2 className="mb-5 text-xl font-bold text-foreground">What to Expect</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {business.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {business.amenities && business.amenities.length > 0 && (
              <section className="rounded-2xl border border-border bg-surface p-8">
                <h2 className="mb-5 text-xl font-bold text-foreground">Amenities &amp; Features</h2>
                <div className="flex flex-wrap gap-2">
                  {business.amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-gold/20 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Book Now CTA band */}
            {business.website && (
              <div
                className="relative overflow-hidden rounded-2xl border border-gold/30 p-8 text-center"
                style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.12) 0%, rgba(212,168,83,0.06) 100%)' }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />
                <h2 className="mb-2 text-xl font-bold text-foreground">Ready to Book?</h2>
                <p className="mb-6 text-muted">
                  Visit the {business.name} website to check availability and book your adventure.
                </p>
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-xl px-10 py-3 text-base font-bold text-background transition-all hover:opacity-90"
                  style={{ background: '#D4A853', boxShadow: '0 0 32px rgba(212,168,83,0.35)' }}
                  aria-label={`${ctaLabel} at ${business.name} — opens in new tab`}
                >
                  <Zap className="h-4 w-4" aria-hidden="true" />
                  {ctaLabel}
                  <ExternalLink className="h-4 w-4 opacity-80" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-gold/20 bg-surface p-6 space-y-5">
              <h2 className="text-base font-bold text-foreground">Business Info</h2>

              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">Rating</p>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-gold">5.0</span>
                  <span className="text-xs text-muted">(120+)</span>
                </div>
              </div>

              {business.address && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold">Address</p>
                  <p className="text-sm text-muted">{business.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      (business.address ?? '') + ' ' + business.city + ' ' + business.state
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

            {/* Partner badge */}
            <div
              className="rounded-2xl border border-gold/30 p-6 text-center space-y-3"
              style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.1) 0%, rgba(212,168,83,0.04) 100%)' }}
            >
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: '#D4A853' }}>
                  <Award className="h-6 w-6 text-background" aria-hidden="true" />
                </div>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold">Official Featured Partner</p>
              <p className="text-xs text-muted leading-relaxed">
                Verified, top-rated partner of the Explore Royal Gorge directory.
              </p>
              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90"
                  style={{ background: '#D4A853' }}
                  aria-label={`${ctaLabel} — opens in new tab`}
                >
                  {ctaLabel}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>

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

        {related.length > 0 && (
          <section className="mt-16" aria-label="Related businesses">
            <h2 className="mb-6 text-2xl font-bold text-foreground">More {categoryLabel} in the Royal Gorge</h2>
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
                    {b.ownedByTrace && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                        <Star className="h-2.5 w-2.5 fill-gold" aria-hidden="true" />
                        Partner
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-gold transition-colors">{b.name}</h3>
                  <p className="mt-1 text-sm text-muted">{b.tagline}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-gold font-medium">
                    View listing <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

// ─── Standard Listing Page ────────────────────────────────────────────────────

function StandardPage({
  business,
  jsonLd,
  categoryLabel,
  related,
}: {
  business: NonNullable<ReturnType<typeof getBusinessBySlug>>
  jsonLd: ReturnType<typeof buildJsonLd>
  categoryLabel: string
  related: ReturnType<typeof getBusinessesByCategory>
}) {
  const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : null

  return (
    <>
      {jsonLdStr && (
        <script
          type="application/ld+json"
          // nosec: content is static business data, not user input
          dangerouslySetInnerHTML={{ __html: jsonLdStr }}
        />
      )}

      <div className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/directory"
            className="mb-8 inline-flex min-h-[44px] items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to directory
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div
                className={`relative overflow-hidden rounded-2xl border p-8 ${
                  business.tier === 'sponsored' ? 'border-gold/30 bg-surface' : 'border-border bg-surface'
                }`}
              >
                {business.tier === 'sponsored' && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    aria-hidden="true"
                    style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,83,0.18) 0%, transparent 60%)' }}
                  />
                )}
                <div className="relative">
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

                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{business.name}</h1>
                  <p className="mt-2 text-lg text-muted">{business.tagline}</p>

                  <div className="mt-4 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {business.city}, {business.state}
                  </div>

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

              {business.description && (
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="mb-3 text-lg font-bold text-foreground">About</h2>
                  <p className="leading-relaxed text-muted">{business.description}</p>
                </div>
              )}

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

              {business.amenities && business.amenities.length > 0 && (
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">Amenities &amp; Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {business.amenities.map((a) => (
                      <span key={a} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
                <h2 className="text-base font-bold text-foreground">Business Info</h2>

                {business.address && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold">Address</p>
                    <p className="text-sm text-muted">{business.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        (business.address ?? '') + ' ' + business.city + ' ' + business.state
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
                    <a href={`tel:${business.phone}`} className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-muted hover:text-foreground">
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

              {!business.claimed && (
                <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6 space-y-3">
                  <h2 className="text-base font-bold text-foreground">Is this your business?</h2>
                  <p className="text-sm text-muted">
                    Claim your listing to add photos, update info, and get featured placement.
                  </p>
                  <Link
                    href={`/claim/${business.slug}`}
                    className="min-h-[44px] inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                    style={{ background: '#D4A853' }}
                  >
                    Claim This Listing
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <p className="text-center text-xs text-muted">Starting at $99/mo — No long-term contracts</p>
                </div>
              )}

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

          <BookDirectBanner />

          {related.length > 0 && (
            <section className="mt-4" aria-label="Related businesses">
              <h2 className="mb-6 text-2xl font-bold text-foreground">More {categoryLabel} in the Royal Gorge</h2>
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
                    <h3 className="font-bold text-foreground group-hover:text-gold transition-colors">{b.name}</h3>
                    <p className="mt-1 text-sm text-muted">{b.tagline}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-gold font-medium">
                      View listing <ArrowRight className="h-3 w-3" aria-hidden="true" />
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
