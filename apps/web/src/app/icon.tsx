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
          background: '#D4A853',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: '#0D1117',
            fontFamily: 'sans-serif',
            lineHeight: 1,
          }}
        >
          E
        </div>
      </div>
    ),
    { ...size },
  )
}
