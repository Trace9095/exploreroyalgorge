'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
      <p className="mt-2 text-muted max-w-sm">
        An unexpected error occurred. Please try again or head back home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={reset}
          className="min-h-[44px] inline-flex items-center rounded-xl px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          style={{ background: '#D4A853' }}
        >
          Try Again
        </button>
        <Link
          href="/"
          className="min-h-[44px] inline-flex items-center rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/30"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
