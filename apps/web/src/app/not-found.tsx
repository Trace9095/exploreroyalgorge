import Link from 'next/link'
import { Mountain } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{ background: '#D4A853' }}
        aria-hidden="true"
      >
        <Mountain className="h-8 w-8 text-background" />
      </div>
      <h1 className="text-5xl font-extrabold text-foreground">404</h1>
      <p className="mt-3 text-xl font-semibold text-foreground">Page Not Found</p>
      <p className="mt-2 text-muted max-w-sm">
        The trail you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to base camp.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="min-h-[44px] inline-flex items-center rounded-xl px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          style={{ background: '#D4A853' }}
        >
          Go Home
        </Link>
        <Link
          href="/directory"
          className="min-h-[44px] inline-flex items-center rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/30"
        >
          Browse Directory
        </Link>
      </div>
    </div>
  )
}
