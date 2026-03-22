import type React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Waves,
  Zap,
  TreePine,
  Mountain,
  Wind,
  Camera,
  Tent,
  UtensilsCrossed,
  Home,
  Train,
  Star,
  MapPin,
  ChevronRight,
  CheckCircle,
  Phone,
  ExternalLink,
  Award,
} from 'lucide-react'
import { getFeaturedBusinesses, getBusinessesByCategory, getOwnedBusinesses, PARTNER_CTA_LABELS } from '@/data/businesses'
import { getLatestBlogPosts } from '@/data/blog'
import type { BusinessCategory } from '@erg/shared'
import { CATEGORY_LABELS } from '@erg/shared'

const CATEGORIES: { id: BusinessCategory; icon: React.ElementType; color: string }[] = [
  { id: 'rafting', icon: Waves, color: 'rgba(14,165,233,0.15)' },
  { id: 'zipline', icon: Zap, color: 'rgba(212,168,83,0.15)' },
  { id: 'hiking', icon: TreePine, color: 'rgba(63,185,80,0.15)' },
  { id: 'rock-climbing', icon: Mountain, color: 'rgba(248,81,73,0.15)' },
  { id: 'helicopter', icon: Wind, color: 'rgba(139,148,158,0.15)' },
  { id: 'scenic', icon: Camera, color: 'rgba(212,168,83,0.15)' },
  { id: 'camping', icon: Tent, color: 'rgba(63,185,80,0.15)' },
  { id: 'dining', icon: UtensilsCrossed, color: 'rgba(248,81,73,0.15)' },
  { id: 'vacation-rentals', icon: Home, color: 'rgba(14,165,233,0.15)' },
  { id: 'railroad', icon: Train, color: 'rgba(139,148,158,0.15)' },
]

export default function HomePage() {
  const featured = getFeaturedBusinesses()
  const recentPosts = getLatestBlogPosts(3)
  const raftingCount = getBusinessesByCategory('rafting').length
  const totalListings = 18
  const partners = getOwnedBusinesses()

  return (
    <div className="bg-background">
      <Hero />
      <StatsBar totalListings={totalListings} raftingCount={raftingCount} />
      <PartnerSection partners={partners} />
      <CategoryGrid />
      <FeaturedSection featured={featured} />
      <BlogSection posts={recentPosts} />
      <CtaBand />
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative flex min-h-[90dvh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,168,83,0.12) 0%, rgba(212,168,83,0.04) 50%, transparent 70%)',
        }}
      />
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,168,83,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-5xl space-y-8">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold uppercase tracking-widest">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            Canon City, Colorado
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            The Royal Gorge
            <br />
            <span className="text-gold" style={{ textShadow: '0 0 60px rgba(212,168,83,0.35)' }}>
              Adventure Hub
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Rafting, ziplines, hiking, rock climbing, glamping, and more — your complete guide to
            outdoor adventure in the Royal Gorge region.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/adventures"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl px-8 py-3 text-base font-semibold text-background transition-all hover:opacity-90 sm:w-auto"
            style={{ background: '#D4A853', boxShadow: '0 0 32px rgba(212,168,83,0.3)' }}
          >
            <Waves className="h-4 w-4" aria-hidden="true" />
            Explore Adventures
          </Link>
          <Link
            href="/directory"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-8 py-3 text-base font-semibold text-foreground transition-colors hover:border-gold/40 hover:bg-surface-hover sm:w-auto"
          >
            Browse Directory
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-2 text-sm text-muted">
          <div className="flex items-center gap-1.5">
            <Mountain className="h-4 w-4 text-gold" aria-hidden="true" />
            <span>956 ft deep gorge</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" aria-hidden="true" />
          <div className="flex items-center gap-1.5">
            <Waves className="h-4 w-4 text-gold" aria-hidden="true" />
            <span>Class III–V rapids</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" aria-hidden="true" />
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-gold" aria-hidden="true" />
            <span>18+ listed businesses</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" aria-hidden="true" />
      </div>
    </section>
  )
}

// ─── Stats Bar ────────────────────────────────────────────────────────────

function StatsBar({ totalListings, raftingCount }: { totalListings: number; raftingCount: number }) {
  const stats = [
    { value: '956 ft', label: 'Gorge depth' },
    { value: '5.5 mi', label: 'Canyon length' },
    { value: String(totalListings) + '+', label: 'Listed businesses' },
    { value: String(raftingCount) + '+', label: 'Rafting outfitters' },
    { value: '10', label: 'Activity categories' },
  ]

  return (
    <section className="border-y border-border bg-surface py-8" aria-label="Royal Gorge facts">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gold">{stat.value}</div>
              <div className="mt-1 text-xs text-muted uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Partner Section ──────────────────────────────────────────────────────

function PartnerSection({ partners }: { partners: ReturnType<typeof getOwnedBusinesses> }) {
  return (
    <section className="border-t border-border py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold uppercase tracking-widest">
              <Award className="h-3 w-3" aria-hidden="true" />
              Book Direct
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Adventures — Book Direct
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted">
            Skip the middleman. Book directly with the Royal Gorge region&apos;s premier adventure
            operators — local experts with decades of experience.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((business) => {
            const ctaLabel = PARTNER_CTA_LABELS[business.slug] ?? 'Book Now'
            return (
              <div
                key={business.slug}
                className="relative overflow-hidden rounded-2xl border border-gold/25 bg-surface flex flex-col"
              >
                {/* Gold shimmer top border */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                {/* Subtle radial glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-25"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,83,0.18) 0%, transparent 60%)',
                  }}
                />

                {/* Hero image */}
                {business.imageUrl && (
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={business.imageUrl}
                      alt={business.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      quality={90}
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
                      aria-hidden="true"
                      style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,17,23,0.6))' }}
                    />
                  </div>
                )}

                <div className="relative flex flex-1 flex-col p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/35 bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold capitalize">
                        <Star className="h-2.5 w-2.5 fill-gold" aria-hidden="true" />
                        Featured Partner
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-muted capitalize">
                      {business.category.replace('-', ' ')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">{business.name}</h3>
                  <p className="mt-1 text-sm text-muted">{business.tagline}</p>

                  {/* Top highlight */}
                  {business.highlights[0] && (
                    <div className="mt-3 flex items-start gap-2 text-xs text-muted">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                      {business.highlights[0]}
                    </div>
                  )}
                  {business.highlights[1] && (
                    <div className="mt-1.5 flex items-start gap-2 text-xs text-muted">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                      {business.highlights[1]}
                    </div>
                  )}

                  {/* Address */}
                  {business.address && (
                    <div className="mt-3 flex items-start gap-1.5 text-xs text-muted">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted/60" aria-hidden="true" />
                      {business.address}
                    </div>
                  )}

                  <div className="mt-auto pt-5 space-y-2">
                    {/* Primary CTA */}
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                      style={{ background: '#D4A853' }}
                    >
                      {ctaLabel}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>

                    {/* Phone + listing link row */}
                    <div className="flex gap-2">
                      {business.phone && (
                        <a
                          href={`tel:${business.phone.replace(/\D/g, '')}`}
                          className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-background/60 px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-gold/30 hover:text-foreground"
                        >
                          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                          {business.phone}
                        </a>
                      )}
                      <Link
                        href={`/directory/${business.slug}`}
                        className="inline-flex min-h-[40px] items-center justify-center gap-1 rounded-xl border border-border bg-background/60 px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-gold/30 hover:text-foreground"
                      >
                        Details
                        <ChevronRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Category Grid ────────────────────────────────────────────────────────

function CategoryGrid() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">What to Do</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            10 ways to explore the gorge
          </h2>
          <p className="mt-4 text-lg text-muted">
            From heart-pounding Class V rapids to serene scenic drives — something for every adventurer.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ id, icon: Icon, color }) => (
            <Link
              key={id}
              href={`/adventures/${id}`}
              className="group relative overflow-hidden rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
              style={{ background: color }}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/60">
                  <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-foreground leading-tight">
                  {CATEGORY_LABELS[id]}
                </span>
              </div>
              <ChevronRight
                className="absolute right-3 top-3 h-3.5 w-3.5 text-muted opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Featured Section ─────────────────────────────────────────────────────

function FeaturedSection({ featured }: { featured: ReturnType<typeof getFeaturedBusinesses> }) {
  return (
    <section className="border-t border-border py-20 px-4 bg-surface">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Featured</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Top-rated Royal Gorge adventures
          </h2>
          <p className="mt-4 text-lg text-muted">
            Verified, loved by thousands of visitors every season.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((business) => (
            <Link
              key={business.slug}
              href={`/directory/${business.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-[0_4px_24px_rgba(212,168,83,0.1)]"
            >
              {business.tier === 'sponsored' && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,83,0.15) 0%, transparent 60%)',
                  }}
                />
              )}

              <div className="relative space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-muted capitalize">
                    {business.category.replace('-', ' ')}
                  </span>
                  {business.tier === 'sponsored' && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                      <Star className="h-3 w-3 fill-gold" aria-hidden="true" />
                      Featured
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-foreground group-hover:text-gold transition-colors">
                    {business.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{business.tagline}</p>
                </div>

                <ul className="space-y-1">
                  {business.highlights.slice(0, 2).map((h) => (
                    <li key={h} className="flex items-center gap-1.5 text-xs text-muted">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1.5 pt-1 text-xs font-semibold text-gold">
                  View listing
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/directory"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-gold/40 hover:bg-surface"
          >
            View all listings
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Blog Section ─────────────────────────────────────────────────────────

function BlogSection({ posts }: { posts: ReturnType<typeof getLatestBlogPosts> }) {
  return (
    <section className="border-t border-border py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">Guides</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Plan your Royal Gorge adventure
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden min-h-[44px] shrink-0 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground sm:inline-flex"
          >
            All guides
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-gold/30 hover:-translate-y-0.5"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted capitalize">
                  {post.category.replace('-', ' ')}
                </span>
                <span className="text-xs text-muted">{post.readingTime} min read</span>
              </div>
              <h3 className="mb-2 font-bold leading-snug text-foreground group-hover:text-gold transition-colors">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-gold">
                Read guide
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-foreground"
          >
            All guides
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Band ─────────────────────────────────────────────────────────────

function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t border-border py-20 px-4">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(135deg, rgba(212,168,83,0.14) 0%, rgba(212,168,83,0.06) 50%, rgba(212,168,83,0.12) 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 border-y border-gold/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mb-4 flex justify-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: '#D4A853', boxShadow: '0 0 40px rgba(212,168,83,0.5)' }}
          >
            <Mountain className="h-7 w-7 text-background" aria-hidden="true" />
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your business belongs here.
        </h2>
        <p className="mb-8 text-lg text-muted">
          Reach thousands of adventure seekers visiting the Royal Gorge every season. List your business
          on the region&apos;s premier outdoor directory.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/request-listing"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl px-8 py-3 text-base font-semibold text-background transition-all hover:opacity-90 sm:w-auto"
            style={{ background: '#D4A853', boxShadow: '0 0 32px rgba(212,168,83,0.4)' }}
          >
            <Mountain className="h-4 w-4" aria-hidden="true" />
            Request a Listing
          </Link>
          <Link
            href="/pricing"
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-8 py-3 text-base font-semibold text-foreground transition-colors hover:border-gold/40 hover:bg-surface sm:w-auto"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
