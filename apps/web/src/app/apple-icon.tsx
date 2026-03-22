import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#0D1117',
          borderRadius: 40,
          overflow: 'hidden',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,168,83,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Left canyon wall */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 58,
            height: 180,
            background: '#D4A853',
          }}
        />
        {/* Right canyon wall */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 58,
            height: 180,
            background: '#D4A853',
          }}
        />
        {/* Bridge */}
        <div
          style={{
            position: 'absolute',
            left: 54,
            top: 52,
            width: 72,
            height: 12,
            background: '#D4A853',
            borderRadius: 6,
          }}
        />
        {/* Bridge cable posts (small details) */}
        <div
          style={{
            position: 'absolute',
            left: 82,
            top: 40,
            width: 8,
            height: 12,
            background: '#D4A853',
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 98,
            top: 40,
            width: 8,
            height: 12,
            background: '#D4A853',
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
