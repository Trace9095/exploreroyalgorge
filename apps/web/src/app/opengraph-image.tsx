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
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(212,168,83,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gold radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(212,168,83,0.16) 0%, transparent 70%)',
          }}
        />

        {/* Canyon silhouette — bottom decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            display: 'flex',
          }}
        >
          {/* Left cliff */}
          <div
            style={{
              width: 260,
              height: 120,
              background: 'rgba(212,168,83,0.08)',
              borderTopRightRadius: 80,
            }}
          />
          <div style={{ flex: 1 }} />
          {/* Right cliff */}
          <div
            style={{
              width: 260,
              height: 120,
              background: 'rgba(212,168,83,0.08)',
              borderTopLeftRadius: 80,
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          {/* Canyon logo badge */}
          <div
            style={{
              width: 76,
              height: 76,
              background: '#D4A853',
              borderRadius: 20,
              boxShadow: '0 0 56px rgba(212,168,83,0.55)',
              display: 'flex',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Left canyon wall (dark on gold) */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 22,
                height: 76,
                background: '#0D1117',
              }}
            />
            {/* Right canyon wall */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 22,
                height: 76,
                background: '#0D1117',
              }}
            />
            {/* Bridge */}
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 26,
                width: 36,
                height: 8,
                background: '#0D1117',
                borderRadius: 4,
              }}
            />
          </div>

          {/* Label */}
          <div
            style={{
              fontSize: 13,
              color: '#D4A853',
              letterSpacing: '5px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Canon City, Colorado
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#E6EDF3',
              letterSpacing: '-2.5px',
              lineHeight: 1.05,
              textAlign: 'center',
            }}
          >
            Explore Royal Gorge
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 22,
              color: '#8B949E',
              letterSpacing: '0.3px',
              textAlign: 'center',
            }}
          >
            Your complete adventure &amp; dining directory
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {['Whitewater Rafting', 'Zipline Tours', 'Vacation Rentals', 'Dining', 'Camping'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '7px 18px',
                  background: 'rgba(212,168,83,0.12)',
                  border: '1px solid rgba(212,168,83,0.28)',
                  borderRadius: 100,
                  fontSize: 13,
                  color: '#D4A853',
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            fontSize: 15,
            color: '#30363D',
            letterSpacing: '1.5px',
            fontWeight: 500,
          }}
        >
          exploreroyalgorge.com
        </div>
      </div>
    ),
    { ...size },
  )
}
