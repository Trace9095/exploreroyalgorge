import { ImageResponse } from 'next/og'
import { CATEGORY_LABELS } from '@erg/shared'
import type { BusinessCategory } from '@erg/shared'
import { BUSINESSES } from '@/data/businesses'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as BusinessCategory[]

export async function generateStaticParams() {
  return ALL_CATEGORIES.map((category) => ({ category }))
}

export default async function OgImage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = category as BusinessCategory
  const label = CATEGORY_LABELS[cat] ?? 'Adventures'
  const count = BUSINESSES.filter((b) => b.category === cat).length

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630, background: '#0D1117',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'sans-serif', position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,168,83,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 14, color: '#D4A853', letterSpacing: '4px', fontWeight: 700, textTransform: 'uppercase' }}>Adventure Directory</div>
          <div style={{ fontSize: 60, fontWeight: 800, color: '#E6EDF3', letterSpacing: '-2px', textAlign: 'center', lineHeight: 1.1 }}>
            {label}
          </div>
          <div style={{ fontSize: 22, color: '#8B949E' }}>
            {count} listing{count !== 1 ? 's' : ''} · Royal Gorge, Colorado
          </div>
          <div style={{ marginTop: 8, padding: '8px 20px', background: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 100, fontSize: 15, color: '#D4A853', fontWeight: 600 }}>
            exploreroyalgorge.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
