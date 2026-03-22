'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function RequestListingPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      businessName: (form.elements.namedItem('businessName') as HTMLInputElement).value,
      contactName: (form.elements.namedItem('contactName') as HTMLInputElement).value,
      contactEmail: (form.elements.namedItem('contactEmail') as HTMLInputElement).value,
      contactPhone: (form.elements.namedItem('contactPhone') as HTMLInputElement).value,
      businessWebsite: (form.elements.namedItem('businessWebsite') as HTMLInputElement).value,
      tier: (form.elements.namedItem('tier') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/request-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? 'Something went wrong. Please try again.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-24 px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.3)' }}
            >
              <CheckCircle className="h-8 w-8 text-gold" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Request Received!</h1>
          <p className="mt-3 text-muted">
            Thanks for submitting your listing. We&apos;ll review it and add you to the directory within
            1–2 business days. You&apos;ll receive a confirmation email shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">List Your Business</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Request a Listing</h1>
          <p className="mt-3 text-muted">
            Fill out the form below and we&apos;ll add your business to the Royal Gorge Adventure Directory
            within 1–2 business days.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="businessName" className="mb-1.5 block text-sm font-medium text-foreground">
                Business Name <span className="text-gold" aria-hidden="true">*</span>
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                placeholder="Royal Gorge Rafting Co."
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label htmlFor="contactName" className="mb-1.5 block text-sm font-medium text-foreground">
                Your Name <span className="text-gold" aria-hidden="true">*</span>
              </label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                required
                placeholder="Jane Smith"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contactEmail" className="mb-1.5 block text-sm font-medium text-foreground">
                Email <span className="text-gold" aria-hidden="true">*</span>
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                required
                placeholder="jane@yourbusiness.com"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label htmlFor="contactPhone" className="mb-1.5 block text-sm font-medium text-foreground">
                Phone
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                placeholder="(719) 555-0100"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="businessWebsite" className="mb-1.5 block text-sm font-medium text-foreground">
                Website
              </label>
              <input
                id="businessWebsite"
                name="businessWebsite"
                type="url"
                placeholder="https://yourbusiness.com"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label htmlFor="tier" className="mb-1.5 block text-sm font-medium text-foreground">
                Listing Plan
              </label>
              <select
                id="tier"
                name="tier"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
                defaultValue="premium"
              >
                <option value="premium">Premium — $99/mo</option>
                <option value="sponsored">Sponsored — $199/mo</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
              Additional Info
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your business, what makes it special, and anything else you'd like us to know..."
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
          </div>

          {status === 'error' && (
            <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="min-h-[44px] inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: '#D4A853' }}
          >
            {status === 'loading' ? 'Submitting…' : 'Submit Listing Request'}
            {status !== 'loading' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>

          <p className="text-center text-xs text-muted">
            Listings are reviewed and activated within 1–2 business days. Secure checkout powered by Stripe.
          </p>
        </form>
      </div>
    </div>
  )
}
