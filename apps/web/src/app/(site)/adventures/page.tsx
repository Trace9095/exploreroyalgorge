import type { Metadata } from 'next'
import Link from 'next/link'
import { BUSINESSES } from '@/data/businesses'
import { CATEGORY_LABELS } from '@erg/shared'
import type { BusinessCategory } from '@erg/shared'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Adventures Near Royal Gorge',
  description:
    'Explore all adventure categories in the Royal Gorge region — rafting, ziplines, hiking, rock climbing, camping, dining, and more near Canon City, Colorado.',
  openGraph: {
    title: 'Royal Gorge Adventures — Browse by Category',
    description: 'Find the perfect adventure in Canon City, Colorado.',
  },
}

const CATEGORY_ICONS: Record<BusinessCategory, string> = {
  rafting: '🛶',
  zipline: '🪂',
  hiking: '⛰',
  'rock-climbing': '🧗',
  helicopter: '🚁',
  scenic: '🏔',
  camping: '⛺',
  dining: '🍽',
  'vacation-rentals': '🏡',
  railroad: '🚂',
}

const ALL_CATEGORIES = Object.entries(CATEGORY_LABELS) as [BusinessCategory, string][]

export default function AdventuresPage() {
  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
            Browse by Category
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Royal Gorge Adventures
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            The Royal Gorge region is home to Colorado&apos;s most thrilling outdoor experiences — from
            Class V whitewater to sunset ziplines with canyon views 1,000 feet deep.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_CATEGORIES.map(([id, label]) => {
            const count = BUSINESSES.filter((b) => b.category === id).length
            if (count === 0) return null
            const featured = BUSINESSES.filter((b) => b.category === id && b.tier === 'sponsored').slice(0, 1)[0]
            return (
              <Link
                key={id}
                href={`/adventures/${id}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-[0_4px_24px_rgba(212,168,83,0.08)]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                  style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,83,0.06) 0%, transparent 70%)' }}
                />
                <div className="relative space-y-3">
                  <div className="text-3xl" aria-hidden="true">{CATEGORY_ICONS[id]}</div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                      {label}
                    </h2>
                    {featured && (
                      <p className="mt-1 text-sm text-muted">{featured.tagline}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-medium text-muted">
                      {count} listing{count !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-gold">
                      Browse
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
