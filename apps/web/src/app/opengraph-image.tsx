import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0D1117',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Gold radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,168,83,0.18) 0%, transparent 70%)',
          }}
        />
        {/* Grid texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(212,168,83,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          {/* Logo mark */}
          <div
            style={{
              width: 72,
              height: 72,
              background: '#D4A853',
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 48px rgba(212,168,83,0.5)',
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 900, color: '#0D1117' }}>E</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: '#E6EDF3', letterSpacing: '-2px', lineHeight: 1.1 }}>
              Explore Royal Gorge
            </div>
            <div style={{ fontSize: 22, color: '#8B949E', letterSpacing: '0.5px' }}>
              Canon City, Colorado — Adventure Directory
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {['Rafting', 'Zipline', 'Hiking', 'Rock Climbing', 'Camping'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '6px 16px',
                  background: 'rgba(212,168,83,0.15)',
                  border: '1px solid rgba(212,168,83,0.3)',
                  borderRadius: 100,
                  fontSize: 14,
                  color: '#D4A853',
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 16,
            color: '#30363D',
            letterSpacing: '1px',
          }}
        >
          exploreroyalgorge.com
        </div>
      </div>
    ),
    { ...size },
  )
}
