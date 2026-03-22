'use client'

import { useState } from 'react'
import { Mail, CreditCard, CheckCircle, AlertCircle, Clock, ExternalLink, Loader2 } from 'lucide-react'

type SubscriptionData = {
  found: boolean
  businessSlug?: string | null
  tier?: string
  tierName?: string
  price?: number
  status?: string
  currentPeriodEnd?: string | null
  hasCustomer?: boolean
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  active: { label: 'Active', color: 'text-green-400', icon: <CheckCircle className="w-4 h-4" /> },
  trialing: { label: 'Trial', color: 'text-blue-400', icon: <Clock className="w-4 h-4" /> },
  past_due: { label: 'Past Due', color: 'text-yellow-400', icon: <AlertCircle className="w-4 h-4" /> },
  cancelled: { label: 'Cancelled', color: 'text-red-400', icon: <AlertCircle className="w-4 h-4" /> },
  paid: { label: 'Active', color: 'text-green-400', icon: <CheckCircle className="w-4 h-4" /> },
}

export default function ManagePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [data, setData] = useState<SubscriptionData | null>(null)
  const [error, setError] = useState('')

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setData(null)

    try {
      const res = await fetch('/api/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? 'Something went wrong')
        return
      }

      setData(json)
    } catch {
      setError('Failed to look up subscription. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleManageBilling() {
    setPortalLoading(true)
    setError('')

    try {
      const res = await fetch('/api/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? 'Failed to open billing portal')
        return
      }

      window.location.href = json.url
    } catch {
      setError('Failed to open billing portal. Please try again.')
    } finally {
      setPortalLoading(false)
    }
  }

  const statusInfo = data?.status ? (STATUS_CONFIG[data.status] ?? STATUS_CONFIG['active']) : null

  const billingDate = data?.currentPeriodEnd
    ? new Date(data.currentPeriodEnd).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <div className="min-h-screen bg-[#0D1117] py-16 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4A853]/10 border border-[#D4A853]/30 mb-4">
            <CreditCard className="w-6 h-6 text-[#D4A853]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Listing</h1>
          <p className="text-gray-400">
            Enter your email to view your subscription and manage billing.
          </p>
        </div>

        {/* Lookup Form */}
        <form onSubmit={handleLookup} className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-[#161B22] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A853]/50 focus:ring-1 focus:ring-[#D4A853]/30 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="px-5 py-3 bg-[#D4A853] text-black font-semibold rounded-lg hover:bg-[#D4A853]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Looking up...' : 'Look Up'}
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* No subscription found */}
        {data && !data.found && (
          <div className="bg-[#161B22] border border-white/10 rounded-xl p-6 text-center">
            <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-300 font-medium mb-1">No subscription found</p>
            <p className="text-gray-500 text-sm">
              No active listing found for <span className="text-gray-400">{email}</span>.
            </p>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#D4A853] text-black text-sm font-semibold rounded-lg hover:bg-[#D4A853]/90 transition-colors"
            >
              View Listing Plans
            </a>
          </div>
        )}

        {/* Subscription Card */}
        {data && data.found && (
          <div className="bg-[#161B22] border border-white/10 rounded-xl overflow-hidden">
            {/* Gold top bar */}
            <div className="h-1 bg-gradient-to-r from-[#D4A853] to-[#B8912E]" />

            <div className="p-6">
              {/* Plan + Status */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Current Plan</p>
                  <p className="text-white text-xl font-bold">{data.tierName}</p>
                  {data.price && (
                    <p className="text-[#D4A853] text-sm font-medium">${data.price}/month</p>
                  )}
                </div>
                {statusInfo && (
                  <div className={`flex items-center gap-1.5 ${statusInfo.color} bg-white/5 px-3 py-1.5 rounded-full text-sm font-medium`}>
                    {statusInfo.icon}
                    {statusInfo.label}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                {data.businessSlug && (
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400 text-sm">Business</span>
                    <a
                      href={`/directory/${data.businessSlug}`}
                      className="text-[#D4A853] text-sm font-medium flex items-center gap-1 hover:underline"
                    >
                      {data.businessSlug}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400 text-sm">Email</span>
                  <span className="text-white text-sm">{email}</span>
                </div>
                {billingDate && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400 text-sm">
                      {data.status === 'cancelled' ? 'Access Until' : 'Next Billing'}
                    </span>
                    <span className="text-white text-sm">{billingDate}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              {data.hasCustomer && data.status !== 'cancelled' && (
                <button
                  onClick={handleManageBilling}
                  disabled={portalLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#D4A853] text-black font-semibold rounded-lg hover:bg-[#D4A853]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {portalLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CreditCard className="w-4 h-4" />
                  )}
                  {portalLoading ? 'Opening Portal...' : 'Manage Billing'}
                </button>
              )}

              {data.status === 'cancelled' && (
                <a
                  href="/pricing"
                  className="block w-full text-center py-3 bg-[#D4A853] text-black font-semibold rounded-lg hover:bg-[#D4A853]/90 transition-colors"
                >
                  Reactivate Listing
                </a>
              )}
            </div>
          </div>
        )}

        {/* Help */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Need help?{' '}
          <a href="mailto:hello@exploreroyalgorge.com" className="text-[#D4A853] hover:underline">
            hello@exploreroyalgorge.com
          </a>
        </p>
      </div>
    </div>
  )
}
