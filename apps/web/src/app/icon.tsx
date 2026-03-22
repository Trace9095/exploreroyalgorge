import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0D1117',
          borderRadius: 7,
          overflow: 'hidden',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Left canyon wall */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 10,
            height: 32,
            background: '#D4A853',
          }}
        />
        {/* Right canyon wall */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 10,
            height: 32,
            background: '#D4A853',
          }}
        />
        {/* Bridge */}
        <div
          style={{
            position: 'absolute',
            left: 9,
            top: 9,
            width: 14,
            height: 2,
            background: '#D4A853',
            borderRadius: 1,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
