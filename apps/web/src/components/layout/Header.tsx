'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Mountain, Search } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Adventures', href: '/adventures' },
  { label: 'Directory', href: '/directory' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/95" style={{ backdropFilter: 'none' }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 min-h-[44px]" aria-label="Explore Royal Gorge — Home">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: '#D4A853', boxShadow: '0 0 12px rgba(212,168,83,0.4)' }}
            aria-hidden="true"
          >
            <Mountain className="h-4 w-4 text-background" />
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-bold tracking-tight text-foreground">Explore Royal Gorge</span>
            <span className="ml-2 hidden text-xs text-muted lg:inline">Canon City, CO</span>
          </div>
          <span className="text-base font-bold tracking-tight text-foreground sm:hidden">Explore RG</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`min-h-[44px] inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'text-gold bg-gold/10'
                    : 'text-muted hover:text-foreground hover:bg-surface-hover'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/directory"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            aria-label="Search directory"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/request-listing"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-background transition-colors hover:opacity-90"
            style={{ background: '#D4A853', boxShadow: '0 0 16px rgba(212,168,83,0.25)' }}
          >
            List Your Business
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background px-4 pb-6 pt-2 md:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`min-h-[44px] flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'text-gold bg-gold/10'
                      : 'text-muted hover:text-foreground hover:bg-surface-hover'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="mt-3 border-t border-border pt-3">
              <Link
                href="/request-listing"
                onClick={() => setMobileOpen(false)}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-background"
                style={{ background: '#D4A853' }}
              >
                List Your Business
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
