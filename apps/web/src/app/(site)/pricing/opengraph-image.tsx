import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630, background: '#0D1117',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'sans-serif', position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,168,83,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 14, color: '#D4A853', letterSpacing: '4px', fontWeight: 700, textTransform: 'uppercase' }}>Listing Plans</div>
          <div style={{ fontSize: 58, fontWeight: 800, color: '#E6EDF3', letterSpacing: '-2px', textAlign: 'center', lineHeight: 1.1 }}>
            Get Your Business Found
          </div>
          <div style={{ fontSize: 20, color: '#8B949E', textAlign: 'center', maxWidth: 600 }}>
            Premium $99/mo · Sponsored $199/mo — no contracts
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {['No contracts', 'Cancel anytime', 'Same-day setup'].map(tag => (
              <div key={tag} style={{ padding: '6px 16px', background: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 100, fontSize: 13, color: '#D4A853', fontWeight: 600 }}>{tag}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
