/**
 * Royal Gorge canyon + bridge SVG logomark.
 * Use on gold backgrounds (the dark walls read clearly on gold).
 * Also works standalone when wrapped in a gold container.
 */
export function CanyonMark({ size = 16 }: { size?: number }) {
  const s = size / 16
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left canyon wall */}
      <rect x={0} y={0} width={Math.round(5 * s)} height={16} fill="#0D1117" rx={0} />
      {/* Right canyon wall */}
      <rect x={Math.round(11 * s)} y={0} width={Math.round(5 * s)} height={16} fill="#0D1117" />
      {/* Bridge span */}
      <rect x={Math.round(4.5 * s)} y={Math.round(5 * s)} width={Math.round(7 * s)} height={Math.round(1.5 * s)} rx={Math.round(0.75 * s)} fill="#0D1117" />
    </svg>
  )
}

/**
 * Full logomark badge: gold background with canyon glyph inside.
 * Drop-in replacement for simple icon usage.
 */
export function LogoBadge({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.22),
        background: '#D4A853',
        boxShadow: '0 0 16px rgba(212,168,83,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <CanyonMark size={Math.round(size * 0.5)} />
    </div>
  )
}
