import { getDb } from '@/lib/db'
import { listingRequests } from '@/db/schema'
import { desc } from 'drizzle-orm'

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function AdminRequestsPage() {
  const db = getDb()
  const requests = await db
    .select()
    .from(listingRequests)
    .orderBy(desc(listingRequests.createdAt))
    .limit(100)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Admin</p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">Listing Requests</h1>
        <p className="mt-1 text-sm text-muted">{requests.length} total requests</p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <p className="text-muted">No listing requests yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted">Business</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted hidden sm:table-cell">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted">Tier</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{r.businessName}</div>
                    {r.businessWebsite && (
                      <a
                        href={r.businessWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted hover:text-foreground"
                      >
                        {r.businessWebsite.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="text-foreground/80">{r.contactName}</div>
                    <a href={`mailto:${r.contactEmail}`} className="text-xs text-gold hover:opacity-80">
                      {r.contactEmail}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize rounded-full border border-border bg-background px-2 py-0.5 text-xs text-muted">
                      {r.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        r.status === 'approved'
                          ? 'border border-green-500/20 bg-green-500/10 text-green-400'
                          : r.status === 'rejected'
                          ? 'border border-red-500/20 bg-red-500/10 text-red-400'
                          : 'border border-gold/20 bg-gold/10 text-gold/80'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-muted">
                    {formatDate(r.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
