import Link from 'next/link'
import { Mountain, MapPin } from 'lucide-react'

const FOOTER_LINKS = {
  Adventures: [
    { label: 'Whitewater Rafting', href: '/adventures/rafting' },
    { label: 'Zipline Tours', href: '/adventures/zipline' },
    { label: 'Hiking & Trails', href: '/adventures/hiking' },
    { label: 'Rock Climbing', href: '/adventures/rock-climbing' },
    { label: 'Helicopter Tours', href: '/adventures/helicopter' },
  ],
  Directory: [
    { label: 'All Listings', href: '/directory' },
    { label: 'Scenic Attractions', href: '/adventures/scenic' },
    { label: 'Camping & Glamping', href: '/adventures/camping' },
    { label: 'Dining & Bars', href: '/adventures/dining' },
    { label: 'Vacation Rentals', href: '/adventures/vacation-rentals' },
  ],
  Resources: [
    { label: 'Blog & Guides', href: '/blog' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'List Your Business', href: '/request-listing' },
    { label: 'Claim a Listing', href: '/pricing' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Top row */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: '#D4A853' }}
                aria-hidden="true"
              >
                <Mountain className="h-4 w-4 text-background" />
              </div>
              <span className="text-sm font-bold text-foreground">Explore Royal Gorge</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted">
              The definitive adventure directory for the Royal Gorge region. Discover rafting, ziplines,
              hiking, rock climbing, and more near Canon City, Colorado.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              <span>Canon City, Colorado 81212</span>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">{heading}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="min-h-[44px] inline-flex items-center text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Also Explore — Royal Gorge Region */}
        <div className="pb-6">
          <p className="text-[#6B7280] text-xs uppercase tracking-wider font-medium mb-3">
            Also Explore the Royal Gorge Region
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="https://gorgetourism.com" target="_blank" rel="noopener noreferrer" className="text-[#8B949E] text-sm hover:text-[#D4A853] transition-colors">
              Gorge Tourism
            </a>
            <a href="https://royalgorge.org" target="_blank" rel="noopener noreferrer" className="text-[#8B949E] text-sm hover:text-[#D4A853] transition-colors">
              Royal Gorge Guide
            </a>
            <a href="https://visitcanoncity.net" target="_blank" rel="noopener noreferrer" className="text-[#8B949E] text-sm hover:text-[#D4A853] transition-colors">
              Visit Canon City
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Explore Royal Gorge &mdash; An independent tourism directory for the
            Royal Gorge region.
          </p>
          <p className="text-xs text-muted/60 text-center sm:text-right max-w-sm">
            exploreroyalgorge.com is an independent directory. We are not affiliated with the Royal Gorge Bridge &amp;
            Park or any listed business unless noted.
          </p>
        </div>
      </div>
    </footer>
  )
}
