import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/data/blog'
import { ArrowRight, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog & Travel Guides',
  description:
    'Royal Gorge travel guides, trip planning tips, and distance guides from Denver, Colorado Springs, and Pueblo to the Royal Gorge region.',
  openGraph: {
    title: 'Royal Gorge Travel Guides & Blog',
    description: 'Plan your Royal Gorge adventure with expert guides and tips.',
  },
}

export default function BlogPage() {
  return (
    <div className="py-12 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Travel Guides</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Royal Gorge Blog & Guides
          </h1>
          <p className="mt-3 text-lg text-muted">
            Plan your trip, find hidden gems, and discover the best adventures near Canon City, Colorado.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/20 hover:bg-surface-hover"
            >
              <div className="space-y-3">
                {post.category && (
                  <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted capitalize">
                    {post.category}
                  </span>
                )}
                <h2 className="text-lg font-bold text-foreground group-hover:text-gold transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.readingTime} min read
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-gold">
                    Read guide
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
