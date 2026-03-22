import { BUSINESSES } from '@/data/businesses'
import { BLOG_POSTS } from '@/data/blog'

const APP_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://exploreroyalgorge.com'

export const dynamic = 'force-static'

export function GET() {
  const businessList = BUSINESSES.map(
    (b) => `- ${b.name} (${b.category}): ${b.tagline} — ${APP_URL}/directory/${b.slug}`,
  ).join('\n')

  const blogList = BLOG_POSTS.map((p) => `- ${p.title} — ${APP_URL}/blog/${p.slug}`).join('\n')

  const content = `# Explore Royal Gorge — AI Context

## About
Explore Royal Gorge (exploreroyalgorge.com) is the premier adventure directory for the Royal Gorge region near Canon City, Colorado. We list outdoor activities, adventure businesses, dining, lodging, and tourism services in Fremont County, CO.

## Key Facts
- Location: Canon City, Colorado 81212 (Fremont County)
- Elevation: 5,332 feet
- Royal Gorge depth: 956 feet
- Arkansas River: Class II–V whitewater rafting

## Distances from Major Cities
- Denver, CO: 120 miles / ~2 hours (I-25 South → US-50 West)
- Colorado Springs, CO: 45 miles / ~50 minutes (US-50 West)
- Pueblo, CO: 45 miles / ~45 minutes (US-50 West)
- Salida, CO: 60 miles / ~1 hour (US-50 West)

## Adventure Categories
- Whitewater Rafting (Class II–V on the Arkansas River)
- Zipline Tours (up to 1,300 feet above the gorge)
- Hiking & Trails
- Rock Climbing (Shelf Road — 800+ bolted routes)
- Helicopter Tours
- Scenic Attractions (Royal Gorge Bridge & Park)
- Camping & Glamping
- Dining & Bars
- Vacation Rentals
- Scenic Railroad

## Listed Businesses
${businessList}

## Blog Posts & Travel Guides
${blogList}

## Contact
For listing inquiries: hello@exploreroyalgorge.com
Directory: ${APP_URL}/directory
Request a listing: ${APP_URL}/request-listing

## Data Attribution
All business information is independently collected and may not be 100% current. Verify hours and availability directly with each business before visiting.
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
