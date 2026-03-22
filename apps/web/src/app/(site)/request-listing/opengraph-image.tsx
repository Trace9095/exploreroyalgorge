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
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,168,83,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 14, color: '#D4A853', letterSpacing: '4px', fontWeight: 700, textTransform: 'uppercase' }}>Join the Directory</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: '#E6EDF3', letterSpacing: '-2px', textAlign: 'center', lineHeight: 1.1 }}>
            List Your Business
          </div>
          <div style={{ fontSize: 22, color: '#8B949E', textAlign: 'center', maxWidth: 560 }}>
            Reach thousands of adventure-seekers visiting the Royal Gorge region
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {['Free listing', '1–2 day approval', 'No long-term contracts'].map(tag => (
              <div key={tag} style={{ padding: '6px 16px', background: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 100, fontSize: 13, color: '#D4A853', fontWeight: 600 }}>{tag}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
