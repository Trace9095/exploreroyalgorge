'use client'

import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  BarChart3,
  AlertCircle,
  ChevronRight,
  Building2,
  Percent,
  CreditCard,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────

const PROPERTIES = [
  {
    name: 'Tiny Home Village',
    revenue: 33356,
    opex: 6971,
    interest: 0,
    netIncome: 26385,
    niPct: 79.1,
    noi: 26385,
    noiPct: 79.1,
    hasDebt: false,
    icon: Home,
    note: 'Zero debt — pure cashflow',
  },
  {
    name: 'River Ranch',
    revenue: 73495,
    opex: 21117,
    interest: 30374,
    netIncome: 22004,
    niPct: 29.8,
    noi: 52378,
    noiPct: 71.3,
    hasDebt: true,
    icon: Home,
    note: 'Strong NOI, manageable debt load',
  },
  {
    name: 'Valley Ranch',
    revenue: 124574,
    opex: 54458,
    interest: 41253,
    netIncome: 6863,
    niPct: 5.8,
    noi: 70116,
    noiPct: 56.3,
    hasDebt: true,
    icon: Home,
    note: 'Solid NOI, high debt service',
  },
  {
    name: 'Parkdale Ranch',
    revenue: 30918,
    opex: 14938,
    interest: 20860,
    netIncome: -4081,
    niPct: -13.2,
    noi: 15980,
    noiPct: 51.7,
    hasDebt: true,
    icon: Home,
    note: 'Debt exceeds NOI — refinance or paydown candidate',
  },
  {
    name: 'Beach',
    revenue: 287218,
    opex: 151501,
    interest: 110918,
    netIncome: 24799,
    niPct: 8.6,
    noi: 135717,
    noiPct: 47.3,
    hasDebt: true,
    icon: Home,
    note: 'Revenue anchor — 52% of portfolio gross',
  },
  {
    name: 'Royal Ranch',
    revenue: 25741,
    opex: 50412,
    interest: 15124,
    netIncome: -9708,
    niPct: -37.7,
    noi: -24671,
    noiPct: -95.8,
    hasDebt: true,
    icon: Home,
    note: 'OPEX exceeds revenue — restructure candidate',
  },
]

// Ranked by NOI%
const RANKED = [...PROPERTIES].sort((a, b) => b.noiPct - a.noiPct)

const TOTALS = {
  revenue: 555302,
  opex: 299392,
  interest: 218514,
  netIncome: 67396,
  niPct: 12.1,
  noi: 255910,
  noiPct: 46.1,
}

// Seasonality index (typical Colorado VR, 100 = avg month)
const SEASONALITY = [
  { month: 'Jan', idx: 52 },
  { month: 'Feb', idx: 58 },
  { month: 'Mar', idx: 68 },
  { month: 'Apr', idx: 75 },
  { month: 'May', idx: 92 },
  { month: 'Jun', idx: 118 },
  { month: 'Jul', idx: 148 },
  { month: 'Aug', idx: 140 },
  { month: 'Sep', idx: 112 },
  { month: 'Oct', idx: 88 },
  { month: 'Nov', idx: 60 },
  { month: 'Dec', idx: 72 },
]

// ─── Helpers ───────────────────────────────────────────────────────────────

function fmt(n: number, compact = false): string {
  if (compact && Math.abs(n) >= 1000) {
    return (n < 0 ? '-' : '') + '$' + Math.round(Math.abs(n) / 1000) + 'K'
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

function fmtPct(n: number): string {
  return (n >= 0 ? '' : '') + n.toFixed(1) + '%'
}

// ─── Main Component ────────────────────────────────────────────────────────

export function InvestorKitPage() {
  const [showDebt, setShowDebt] = useState(false)

  return (
    <div className="bg-background">
      <Hero />
      <ToggleBar showDebt={showDebt} setShowDebt={setShowDebt} />
      <FinancialSummary showDebt={showDebt} />
      <PropertyCards showDebt={showDebt} />
      <ChartsSection />
      <Highlights />
      <Disclaimer />
    </div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-20">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(212,168,83,0.10) 0%, rgba(212,168,83,0.03) 50%, transparent 70%)',
        }}
      />
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,168,83,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
            <Building2 className="h-3 w-3" aria-hidden="true" />
            Investment Prospectus · FY2025
          </span>
        </div>

        {/* Headline */}
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Royal Gorge
            <br />
            <span className="text-gold" style={{ textShadow: '0 0 60px rgba(212,168,83,0.3)' }}>
              Vacation Rentals
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted sm:text-xl">
            6-Property Portfolio · Canon City, Colorado · FY2025 Financials
          </p>
        </div>

        {/* Big 3 stats */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'Gross Revenue', value: '$555K', sub: 'FY2025 total', icon: DollarSign },
            { label: 'Net Operating Income', value: '$255K', sub: '46.1% NOI margin', icon: TrendingUp },
            { label: 'Net Income', value: '$67K', sub: '12.1% after debt service', icon: Percent },
          ].map(({ label, value, sub, icon: Icon }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-2xl border border-gold/25 bg-surface p-7 text-center"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                aria-hidden="true"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.6), transparent)' }}
              />
              <div
                className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: 'rgba(212,168,83,0.15)' }}
              >
                <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
              </div>
              <div className="text-3xl font-extrabold text-gold">{value}</div>
              <div className="mt-1 text-sm font-semibold text-foreground">{label}</div>
              <div className="mt-0.5 text-xs text-muted">{sub}</div>
            </div>
          ))}
        </div>

        {/* Secondary row */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: '6 Properties', sub: 'Canon City region' },
            { label: '$255,910 NOI', sub: 'Revenue minus OPEX' },
            { label: '46.1% Margin', sub: 'Free & clear view' },
            { label: '3 / 6 Positive', sub: 'After debt service' },
          ].map(({ label, sub }) => (
            <div key={label} className="rounded-xl border border-border bg-background/60 px-4 py-3 text-center">
              <div className="text-sm font-bold text-foreground">{label}</div>
              <div className="mt-0.5 text-xs text-muted">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Toggle Bar ────────────────────────────────────────────────────────────

function ToggleBar({ showDebt, setShowDebt }: { showDebt: boolean; setShowDebt: (v: boolean) => void }) {
  return (
    <section className="sticky top-0 z-10 border-y border-border bg-surface/95 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <p className="text-xs text-muted">
          <span className="font-semibold text-foreground">Financial view:</span>{' '}
          {showDebt ? 'Showing net income after debt service' : 'Showing NOI — revenue minus operating expenses'}
        </p>
        <div className="flex items-center gap-1 rounded-xl border border-border bg-background p-1">
          <button
            onClick={() => setShowDebt(false)}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              !showDebt
                ? 'bg-gold text-background shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            NOI — Free &amp; Clear
          </button>
          <button
            onClick={() => setShowDebt(true)}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              showDebt
                ? 'bg-gold text-background shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            With Debt Service
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Financial Summary Table ───────────────────────────────────────────────

function FinancialSummary({ showDebt }: { showDebt: boolean }) {
  return (
    <section className="border-b border-border px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Portfolio Financials</p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {showDebt ? 'Net Income After Debt Service' : 'Net Operating Income — Free & Clear'}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {showDebt
              ? 'Revenue minus operating expenses minus interest/debt payments'
              : 'Revenue minus operating expenses only — before any debt service'}
          </p>
        </div>

        {/* Table wrapper */}
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted">Property</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted">Revenue</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted">OPEX</th>
                {showDebt && (
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted">Interest</th>
                )}
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gold">
                  {showDebt ? 'Net Income' : 'NOI'}
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gold">
                  {showDebt ? 'NI%' : 'NOI%'}
                </th>
              </tr>
            </thead>
            <tbody>
              {RANKED.map((p, i) => {
                const value = showDebt ? p.netIncome : p.noi
                const pct = showDebt ? p.niPct : p.noiPct
                const positive = value >= 0
                return (
                  <tr
                    key={p.name}
                    className={`border-b border-border transition-colors hover:bg-surface/60 ${
                      i % 2 === 0 ? 'bg-background' : 'bg-surface/30'
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold"
                          style={{ background: 'rgba(212,168,83,0.15)', color: '#D4A853' }}
                        >
                          {i + 1}
                        </div>
                        <span className="font-medium text-foreground">{p.name}</span>
                        {!p.hasDebt && (
                          <span className="rounded-full border border-gold/30 bg-gold/10 px-1.5 py-0.5 text-xs font-semibold text-gold">
                            Debt-free
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-foreground">{fmt(p.revenue)}</td>
                    <td className="px-5 py-4 text-right font-mono text-muted">{fmt(p.opex)}</td>
                    {showDebt && (
                      <td className="px-5 py-4 text-right font-mono text-muted">{fmt(p.interest)}</td>
                    )}
                    <td className={`px-5 py-4 text-right font-mono font-semibold ${positive ? 'text-gold' : 'text-destructive'}`}>
                      {fmt(value)}
                    </td>
                    <td className={`px-5 py-4 text-right font-mono font-bold ${positive ? 'text-gold' : 'text-destructive'}`}>
                      {fmtPct(pct)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gold/30 bg-surface">
                <td className="px-5 py-4 font-bold text-foreground">Portfolio Total</td>
                <td className="px-5 py-4 text-right font-mono font-bold text-foreground">{fmt(TOTALS.revenue)}</td>
                <td className="px-5 py-4 text-right font-mono font-bold text-muted">{fmt(TOTALS.opex)}</td>
                {showDebt && (
                  <td className="px-5 py-4 text-right font-mono font-bold text-muted">{fmt(TOTALS.interest)}</td>
                )}
                <td className="px-5 py-4 text-right font-mono font-bold text-gold">
                  {showDebt ? fmt(TOTALS.netIncome) : fmt(TOTALS.noi)}
                </td>
                <td className="px-5 py-4 text-right font-mono font-bold text-gold">
                  {showDebt ? fmtPct(TOTALS.niPct) : fmtPct(TOTALS.noiPct)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* NOI callout */}
        {!showDebt && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-gold/20 bg-gold/5 px-5 py-4">
            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <p className="text-sm text-muted">
              <span className="font-semibold text-foreground">NOI View</span> shows income potential before any financing.
              This is the metric buyers use to evaluate unlevered return on a property. Total portfolio NOI:{' '}
              <span className="font-bold text-gold">$255,910 (46.1%)</span>.
            </p>
          </div>
        )}
        {showDebt && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-surface px-5 py-4">
            <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
            <p className="text-sm text-muted">
              <span className="font-semibold text-foreground">Debt Service View</span> reflects actual cash position
              after interest payments. Portfolio carries <span className="font-semibold text-foreground">$218,514</span> in
              annual interest. 3 of 6 properties are net-positive after debt service.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Property Cards ────────────────────────────────────────────────────────

function PropertyCards({ showDebt }: { showDebt: boolean }) {
  return (
    <section className="border-b border-border bg-surface/40 px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Portfolio Properties</p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            6 Properties — Ranked by NOI Margin
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RANKED.map((p, i) => {
            const displayValue = showDebt ? p.netIncome : p.noi
            const displayPct = showDebt ? p.niPct : p.noiPct
            const positive = displayValue >= 0
            const isTop = i === 0
            const isBottom = i === RANKED.length - 1

            return (
              <div
                key={p.name}
                className={`relative overflow-hidden rounded-2xl border bg-surface p-6 ${
                  isTop ? 'border-gold/40' : isBottom ? 'border-destructive/30' : 'border-border'
                }`}
              >
                {/* Top shimmer for #1 */}
                {isTop && (
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    aria-hidden="true"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,83,0.7), transparent)' }}
                  />
                )}

                {/* Rank badge */}
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold"
                    style={{
                      background: isTop ? '#D4A853' : 'rgba(212,168,83,0.12)',
                      color: isTop ? '#0D1117' : '#D4A853',
                    }}
                  >
                    {i + 1}
                  </div>
                  {isTop && (
                    <span className="rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
                      Top Performer
                    </span>
                  )}
                  {isBottom && (
                    <span className="rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                      Restructure
                    </span>
                  )}
                  {!p.hasDebt && i !== 0 && (
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-xs font-semibold text-gold">
                      Debt-free
                    </span>
                  )}
                </div>

                {/* Property name */}
                <h3 className="text-base font-bold text-foreground">{p.name}</h3>
                <p className="mt-0.5 text-xs text-muted">{p.note}</p>

                {/* Key metrics */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Revenue</span>
                    <span className="font-mono text-sm font-semibold text-foreground">{fmt(p.revenue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">OPEX</span>
                    <span className="font-mono text-sm text-muted">{fmt(p.opex)}</span>
                  </div>
                  {showDebt && p.interest > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">Interest</span>
                      <span className="font-mono text-sm text-muted">{fmt(p.interest)}</span>
                    </div>
                  )}
                  <div className="mt-1 border-t border-border pt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                      {showDebt ? 'Net Income' : 'NOI'}
                    </span>
                    <div className="flex items-center gap-2">
                      {positive ? (
                        <TrendingUp className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-destructive" aria-hidden="true" />
                      )}
                      <span className={`font-mono text-base font-bold ${positive ? 'text-gold' : 'text-destructive'}`}>
                        {fmt(displayValue, true)}
                      </span>
                      <span className={`text-xs font-semibold ${positive ? 'text-gold' : 'text-destructive'}`}>
                        {fmtPct(displayPct)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* NOI bar */}
                <div className="mt-4">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.max(0, Math.min(100, Math.abs(p.noiPct)))}%`,
                        background: p.noiPct >= 0 ? '#D4A853' : '#F85149',
                      }}
                    />
                  </div>
                  <div className="mt-1 text-right text-xs text-muted">
                    NOI margin: <span className={p.noiPct >= 0 ? 'text-gold font-semibold' : 'text-destructive font-semibold'}>{fmtPct(p.noiPct)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Charts Section ────────────────────────────────────────────────────────

function ChartsSection() {
  const maxRevenue = Math.max(...PROPERTIES.map((p) => p.revenue))
  const maxNoi = Math.max(...PROPERTIES.map((p) => Math.abs(p.noi)))
  const maxSeasonality = Math.max(...SEASONALITY.map((s) => s.idx))

  // Seasonality SVG line chart
  const chartW = 480
  const chartH = 120
  const padX = 36
  const padY = 12
  const innerW = chartW - padX * 2
  const innerH = chartH - padY * 2

  const points = SEASONALITY.map((s, i) => {
    const x = padX + (i / (SEASONALITY.length - 1)) * innerW
    const y = padY + innerH - ((s.idx / maxSeasonality) * innerH)
    return { x, y, ...s }
  })

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const fillD = `${pathD} L ${points[points.length - 1].x} ${(padY + innerH).toFixed(1)} L ${padX} ${(padY + innerH).toFixed(1)} Z`

  return (
    <section className="border-b border-border px-4 py-14">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Section heading */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Visual Analytics</p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Portfolio Performance Charts</h2>
        </div>

        {/* Revenue by property */}
        <div>
          <h3 className="mb-5 text-base font-bold text-foreground">Revenue by Property</h3>
          <div className="space-y-3">
            {[...PROPERTIES]
              .sort((a, b) => b.revenue - a.revenue)
              .map((p) => (
                <div key={p.name} className="flex items-center gap-4">
                  <div className="w-28 shrink-0 text-right text-xs font-medium text-muted truncate">{p.name}</div>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="h-8 flex-1 overflow-hidden rounded-md bg-surface">
                      <div
                        className="h-full rounded-md transition-all"
                        style={{
                          width: `${(p.revenue / maxRevenue) * 100}%`,
                          background: 'linear-gradient(90deg, #B8923F, #D4A853)',
                        }}
                      />
                    </div>
                    <span className="w-16 shrink-0 font-mono text-xs font-semibold text-foreground">
                      {fmt(p.revenue, true)}
                    </span>
                    <span className="w-10 shrink-0 font-mono text-xs text-muted">
                      {((p.revenue / TOTALS.revenue) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* NOI Margin by property */}
        <div>
          <h3 className="mb-5 text-base font-bold text-foreground">NOI Margin by Property</h3>
          <div className="space-y-3">
            {RANKED.map((p) => (
              <div key={p.name} className="flex items-center gap-4">
                <div className="w-28 shrink-0 text-right text-xs font-medium text-muted truncate">{p.name}</div>
                <div className="flex flex-1 items-center gap-3">
                  <div className="h-8 flex-1 overflow-hidden rounded-md bg-surface">
                    <div
                      className="h-full rounded-md transition-all"
                      style={{
                        width: `${(Math.abs(p.noiPct) / 100) * 100}%`,
                        background: p.noiPct >= 0
                          ? 'linear-gradient(90deg, #B8923F, #D4A853)'
                          : 'linear-gradient(90deg, #c0392b, #F85149)',
                      }}
                    />
                  </div>
                  <span
                    className={`w-16 shrink-0 font-mono text-xs font-bold ${
                      p.noiPct >= 0 ? 'text-gold' : 'text-destructive'
                    }`}
                  >
                    {fmtPct(p.noiPct)}
                  </span>
                  <span className="w-16 shrink-0 font-mono text-xs text-muted">
                    {fmt(p.noi, true)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonality trend */}
        <div>
          <h3 className="mb-2 text-base font-bold text-foreground">Colorado VR Seasonal Demand Index</h3>
          <p className="mb-5 text-xs text-muted">Typical monthly demand pattern for Colorado vacation rentals (100 = annual average). Summer peak June–August; shoulder seasons April–May and September–October.</p>
          <div
            className="overflow-hidden rounded-2xl border border-border bg-surface p-4"
            role="img"
            aria-label="Seasonal demand index chart showing peak in summer months"
          >
            <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" aria-hidden="true">
              {/* Grid lines */}
              {[50, 75, 100, 125, 150].map((v) => {
                const y = padY + innerH - ((v / maxSeasonality) * innerH)
                return (
                  <g key={v}>
                    <line x1={padX} y1={y} x2={padX + innerW} y2={y} stroke="#30363D" strokeWidth="1" />
                    <text x={padX - 4} y={y + 4} fill="#8B949E" fontSize="9" textAnchor="end">{v}</text>
                  </g>
                )
              })}
              {/* 100 line label */}
              <text x={padX + innerW + 4} y={padY + innerH - ((100 / maxSeasonality) * innerH) + 4} fill="#8B949E" fontSize="8">avg</text>

              {/* Fill */}
              <path d={fillD} fill="rgba(212,168,83,0.08)" />
              {/* Line */}
              <path d={pathD} fill="none" stroke="#D4A853" strokeWidth="2" strokeLinejoin="round" />
              {/* Dots */}
              {points.map((p) => (
                <circle key={p.month} cx={p.x} cy={p.y} r="3.5" fill="#0D1117" stroke="#D4A853" strokeWidth="2" />
              ))}
              {/* Month labels */}
              {points.map((p) => (
                <text key={p.month} x={p.x} y={padY + innerH + 14} fill="#8B949E" fontSize="9" textAnchor="middle">
                  {p.month}
                </text>
              ))}
            </svg>
          </div>
          <p className="mt-2 text-right text-xs text-muted">Source: Colorado VR market data, typical seasonal pattern</p>
        </div>
      </div>
    </section>
  )
}

// ─── Highlights ────────────────────────────────────────────────────────────

function Highlights() {
  const items = [
    {
      icon: TrendingUp,
      title: 'Tiny Home Village — 79% NOI Margin',
      body: 'Zero debt service. Revenue minus OPEX goes straight to the bottom line. Pure cashflow machine with the highest margin in the portfolio.',
      positive: true,
    },
    {
      icon: BarChart3,
      title: 'Beach Property — Revenue Anchor',
      body: '$287,218 gross — 52% of total portfolio revenue. Dominant top-of-funnel asset. High capex/opex, but critical to portfolio scale.',
      positive: true,
    },
    {
      icon: TrendingUp,
      title: '$255K NOI at 46% Margin',
      body: 'On a free-and-clear basis, the portfolio generates $255,910 NOI. Eliminate or refinance high-debt properties to unlock portfolio potential.',
      positive: true,
    },
    {
      icon: AlertCircle,
      title: 'Royal Ranch & Parkdale — Restructure Candidates',
      body: 'Royal Ranch OPEX exceeds revenue. Parkdale interest exceeds NOI. Both are candidates for refinancing, repositioning, or disposition.',
      positive: false,
    },
    {
      icon: ChevronRight,
      title: 'River Ranch — Best Risk-Adjusted Return',
      body: '71% NOI margin at $73K revenue with moderate debt. After interest, still nets $22K. Strong case for paydown to capture full NOI.',
      positive: true,
    },
    {
      icon: ChevronRight,
      title: 'Valley Ranch — Upside via Debt Paydown',
      body: '$70K NOI drops to $6.8K after $41K in interest. This property has excellent underlying economics — primary lever is financing cost.',
      positive: true,
    },
  ]

  return (
    <section className="border-b border-border bg-surface/40 px-4 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Key Insights</p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Investment Highlights</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, body, positive }) => (
            <div
              key={title}
              className={`rounded-2xl border p-6 ${
                positive ? 'border-border bg-background' : 'border-destructive/20 bg-destructive/5'
              }`}
            >
              <div
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: positive ? 'rgba(212,168,83,0.15)' : 'rgba(248,81,73,0.12)' }}
              >
                <Icon
                  className={`h-4.5 w-4.5 ${positive ? 'text-gold' : 'text-destructive'}`}
                  aria-hidden="true"
                />
              </div>
              <h3 className={`mb-2 text-sm font-bold ${positive ? 'text-foreground' : 'text-foreground'}`}>{title}</h3>
              <p className="text-xs leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Disclaimer ────────────────────────────────────────────────────────────

function Disclaimer() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
            <div>
              <h3 className="mb-2 text-sm font-bold text-foreground">Disclaimer</h3>
              <p className="text-xs leading-relaxed text-muted">
                This document contains forward-looking financial information based on FY2025 actual results for Royal Gorge Vacation Rentals, operated by Epic Adventures, LLC. All figures are presented for informational purposes only and do not constitute an offer to sell or solicitation of an offer to buy any security or investment interest. Past performance is not indicative of future results. Potential investors should conduct their own due diligence and consult with qualified financial, legal, and tax advisors before making any investment decisions. Revenue, operating expenses, and net income figures are unaudited. Interest figures reflect actual debt service payments for FY2025. NOI is defined as Revenue minus Operating Expenses before debt service and non-cash charges.
              </p>
              <p className="mt-3 text-xs text-muted">
                &copy; {new Date().getFullYear()} Epic Adventures, LLC · Canon City, Colorado · All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
