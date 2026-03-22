import Link from 'next/link'
import { getOwnedBusinesses, PARTNER_CTA_LABELS } from '@/data/businesses'
import { Waves, Wind, Home, Compass, UtensilsCrossed, ArrowRight, Phone } from 'lucide-react'
import type { BusinessCategory } from '@erg/shared'

const CATEGORY_ICONS: Record<BusinessCategory, React.ComponentType<{ className?: string }>> = {
  rafting: Waves,
  zipline: Wind,
  'vacation-rentals': Home,
  scenic: Compass,
  dining: UtensilsCrossed,
  hiking: Compass,
  'rock-climbing': Compass,
  camping: Compass,
  helicopter: Wind,
  railroad: Compass,
}

export function BookDirectBanner() {
  const partners = getOwnedBusinesses()

  if (partners.length === 0) return null

  return (
    <section
      className="my-12 overflow-hidden rounded-2xl border border-gold/25"
      style={{ background: 'linear-gradient(135deg, rgba(212,168,83,0.07) 0%, rgba(13,17,23,1) 60%)' }}
      aria-label="Book direct with partner businesses"
    >
      {/* Gold accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#D4A853] via-[#B8912E] to-transparent" />

      <div className="px-6 py-5">
        {/* Header */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              Book Direct — No Third-Party Fees
            </p>
            <p className="mt-0.5 text-sm text-muted">
              Reserve directly with Royal Gorge&apos;s top adventure and dining partners
            </p>
          </div>
          <Link
            href="/directory"
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-gold/30 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/10"
          >
            Full directory
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        {/* Partner cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((b) => {
            const Icon = CATEGORY_ICONS[b.category] ?? Compass
            const ctaLabel = PARTNER_CTA_LABELS[b.slug] ?? 'Book Now'

            return (
              <div
                key={b.slug}
                className="group relative flex flex-col gap-3 rounded-xl border border-white/6 bg-white/[0.03] p-4 transition-colors hover:border-gold/25 hover:bg-white/[0.05]"
              >
                {/* Icon + name */}
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gold/15">
                    <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/directory/${b.slug}`}
                      className="block text-xs font-bold leading-tight text-foreground transition-colors group-hover:text-gold line-clamp-2"
                    >
                      {b.name}
                    </Link>
                    <p className="mt-0.5 text-[10px] text-muted/70 capitalize">
                      {b.category.replace('-', ' ')}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-2">
                  {b.website && (
                    <a
                      href={b.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[32px] w-full items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-bold text-background transition-opacity hover:opacity-90"
                      style={{ background: '#D4A853' }}
                      aria-label={`${ctaLabel} at ${b.name}`}
                    >
                      {ctaLabel}
                    </a>
                  )}
                  {b.phone && (
                    <a
                      href={`tel:${b.phone}`}
                      className="flex min-h-[32px] w-full items-center justify-center gap-1.5 rounded-lg border border-white/8 px-2 py-1.5 text-[11px] text-muted transition-colors hover:border-gold/30 hover:text-foreground"
                      aria-label={`Call ${b.name}`}
                    >
                      <Phone className="h-3 w-3" aria-hidden="true" />
                      {b.phone}
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
