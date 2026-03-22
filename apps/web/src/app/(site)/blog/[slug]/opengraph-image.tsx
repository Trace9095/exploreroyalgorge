import { ImageResponse } from 'next/og'
import { getBlogPostBySlug } from '@/data/blog'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'


export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  const title = post?.title ?? 'Royal Gorge Travel Guide'
  const excerpt = post?.excerpt ?? 'Adventure guides and trip planning for the Royal Gorge region.'
  const category = post?.category ?? 'travel-guide'

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630, background: '#0D1117',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          fontFamily: 'sans-serif', position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(212,168,83,0.1) 0%, transparent 70%)' }} />

        <div style={{ position: 'relative', padding: '60px 72px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
            <div style={{ padding: '4px 14px', background: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 100, fontSize: 13, color: '#D4A853', fontWeight: 600, textTransform: 'capitalize' }}>
              {category.replace('-', ' ')}
            </div>
            <div style={{ padding: '4px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, fontSize: 13, color: '#8B949E' }}>
              exploreroyalgorge.com
            </div>
          </div>

          <div style={{ fontSize: 46, fontWeight: 800, color: '#E6EDF3', letterSpacing: '-1px', lineHeight: 1.15, maxWidth: 900 }}>
            {title}
          </div>

          <div style={{ fontSize: 20, color: '#8B949E', maxWidth: 800, lineHeight: 1.4 }}>
            {excerpt.slice(0, 120)}{excerpt.length > 120 ? '…' : ''}
          </div>

          <div style={{ marginTop: 8, fontSize: 14, color: '#6E7681' }}>
            Royal Gorge Region · Canon City, Colorado
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
