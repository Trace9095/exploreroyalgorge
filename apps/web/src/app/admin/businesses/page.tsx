import Link from 'next/link'
import { BUSINESSES } from '@/data/businesses'
import { CATEGORY_LABELS } from '@erg/shared'
import { Star, Globe, ExternalLink } from 'lucide-react'

export default function AdminBusinessesPage() {
  const sorted = [...BUSINESSES].sort((a, b) => {
    const order = { sponsored: 0, premium: 1, free: 2 }
    return order[a.tier] - order[b.tier]
  })

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Admin</p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">Businesses</h1>
        <p className="mt-1 text-sm text-muted">{BUSINESSES.length} total listings</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted">Business</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted hidden sm:table-cell">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted">Tier</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted hidden md:table-cell">Claimed</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted">Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((b) => (
              <tr key={b.slug} className="hover:bg-background/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{b.name}</div>
                  <div className="text-xs text-muted">{b.city}, {b.state}</div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-muted capitalize">
                  {CATEGORY_LABELS[b.category]}
                </td>
                <td className="px-4 py-3">
                  {b.tier === 'sponsored' && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
                      <Star className="h-2.5 w-2.5 fill-gold" aria-hidden="true" />
                      Sponsored
                    </span>
                  )}
                  {b.tier === 'premium' && (
                    <span className="rounded-full border border-gold/20 bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold/80">
                      Premium
                    </span>
                  )}
                  {b.tier === 'free' && (
                    <span className="rounded-full border border-border bg-background px-2 py-0.5 text-xs text-muted">
                      Free
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs font-medium ${b.claimed ? 'text-green-400' : 'text-muted'}`}>
                    {b.claimed ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/directory/${b.slug}`}
                      className="min-h-[44px] inline-flex items-center text-xs text-gold hover:opacity-80"
                      target="_blank"
                    >
                      View
                      <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
                    </Link>
                    {b.website && (
                      <a
                        href={b.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] inline-flex items-center text-xs text-muted hover:text-foreground"
                        aria-label={`Visit ${b.name}`}
                      >
                        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
