import { getDb } from '@/lib/db'
import { listingRequests, claimSubmissions, users } from '@/db/schema'
import { eq, count } from 'drizzle-orm'
import { BUSINESSES } from '@/data/businesses'
import { Building2, FileText, DollarSign, CheckCircle } from 'lucide-react'

export default async function AdminPage() {
  const db = getDb()
  const [requestsResult, claimsResult, usersResult] = await Promise.all([
    db.select({ count: count() }).from(listingRequests),
    db.select({ count: count() }).from(claimSubmissions).where(eq(claimSubmissions.status, 'approved')),
    db.select({ count: count() }).from(users),
  ])

  const pendingRequests = await db
    .select({ count: count() })
    .from(listingRequests)
    .where(eq(listingRequests.status, 'pending'))

  const totalRequests = requestsResult[0]?.count ?? 0
  const approvedClaims = claimsResult[0]?.count ?? 0
  const totalUsers = usersResult[0]?.count ?? 0
  const pending = pendingRequests[0]?.count ?? 0

  const sponsored = BUSINESSES.filter((b) => b.tier === 'sponsored').length
  const premium = BUSINESSES.filter((b) => b.tier === 'premium').length

  const STATS = [
    { label: 'Total Businesses', value: BUSINESSES.length, icon: Building2 },
    { label: 'Listing Requests', value: totalRequests, icon: FileText },
    { label: 'Approved Claims', value: approvedClaims, icon: CheckCircle },
    { label: 'Pending Reviews', value: pending, icon: DollarSign },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">Overview</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">{label}</p>
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'rgba(212,168,83,0.15)' }}
                aria-hidden="true"
              >
                <Icon className="h-4 w-4 text-gold" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      {/* Tier breakdown */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="mb-4 text-base font-bold text-foreground">Listing Tier Breakdown</h2>
        <div className="space-y-3">
          {[
            { label: 'Sponsored', count: sponsored, color: '#D4A853' },
            { label: 'Premium', count: premium, color: '#D4A853' },
            { label: 'Unclaimed', count: BUSINESSES.length - sponsored - premium, color: '#6E7681' },
          ].map(({ label, count: c, color }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: color }} aria-hidden="true" />
                <span className="text-sm text-muted">{label}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="mb-4 text-base font-bold text-foreground">Quick Links</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'View Directory', href: '/directory' },
            { label: 'Pricing Page', href: '/pricing' },
            { label: 'Review Requests', href: '/admin/requests' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="min-h-[44px] inline-flex items-center rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-gold/30 hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted">
        Admin users: {totalUsers}
      </div>
    </div>
  )
}
