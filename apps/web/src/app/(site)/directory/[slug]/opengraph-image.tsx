import { ImageResponse } from 'next/og'
import { getBusinessBySlug } from '@/data/businesses'
import { CATEGORY_LABELS } from '@erg/shared'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'


export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const business = getBusinessBySlug(slug)

  const name = business?.name ?? 'Royal Gorge'
  const tagline = business?.tagline ?? 'Adventure Directory'
  const category = business ? CATEGORY_LABELS[business.category] : 'Adventure'
  const tier = business?.tier ?? 'free'

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630, background: '#0D1117',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          fontFamily: 'sans-serif', position: 'relative',
        }}
      >
        {/* Background glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(212,168,83,0.12) 0%, transparent 70%)' }} />

        {/* Tier accent line */}
        {tier === 'sponsored' && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #D4A853, #f0c878, #D4A853)' }} />
        )}

        <div style={{ position: 'relative', padding: '60px 72px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Site badge */}
          <div style={{ fontSize: 13, color: '#D4A853', letterSpacing: '3px', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
            exploreroyalgorge.com
          </div>

          {/* Category badge */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
            <div style={{ padding: '4px 14px', background: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 100, fontSize: 14, color: '#D4A853', fontWeight: 600 }}>
              {category}
            </div>
            {tier === 'sponsored' && (
              <div style={{ padding: '4px 14px', background: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.4)', borderRadius: 100, fontSize: 14, color: '#D4A853', fontWeight: 700 }}>
                ★ Sponsored
              </div>
            )}
          </div>

          {/* Business name */}
          <div style={{ fontSize: 54, fontWeight: 800, color: '#E6EDF3', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            {name}
          </div>

          {/* Tagline */}
          <div style={{ fontSize: 22, color: '#8B949E', marginTop: 4 }}>
            {tagline}
          </div>

          {/* Location */}
          <div style={{ marginTop: 8, fontSize: 16, color: '#6E7681' }}>
            Canon City, Colorado · Royal Gorge Region
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
