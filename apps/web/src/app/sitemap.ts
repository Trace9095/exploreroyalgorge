import type { MetadataRoute } from 'next'
import { BUSINESSES } from '@/data/businesses'
import { BLOG_POSTS } from '@/data/blog'

const APP_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://exploreroyalgorge.com'
const now = new Date().toISOString()

const ADVENTURE_CATEGORIES = [
  'rafting', 'zipline', 'hiking', 'rock-climbing',
  'helicopter', 'scenic', 'camping', 'dining', 'vacation-rentals', 'railroad',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: APP_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${APP_URL}/directory`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${APP_URL}/adventures`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${APP_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${APP_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${APP_URL}/request-listing`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = ADVENTURE_CATEGORIES.map((cat) => ({
    url: `${APP_URL}/adventures/${cat}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const businessRoutes: MetadataRoute.Sitemap = BUSINESSES.map((b) => ({
    url: `${APP_URL}/directory/${b.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: b.tier === 'sponsored' ? 0.9 : b.tier === 'premium' ? 0.8 : 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${APP_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...businessRoutes, ...blogRoutes]
}
