import type { Metadata } from 'next'
import { InvestorKitPage } from './InvestorKitPage'

export const metadata: Metadata = {
  title: 'RGVR Investor Kit — Royal Gorge Vacation Rentals FY2025',
  description:
    '6-property vacation rental portfolio in Canon City, Colorado. FY2025: $555K gross revenue, $255K NOI, 46.1% operating margin. Investment prospectus and financial summary.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Royal Gorge Vacation Rentals — Investor Kit FY2025',
    description:
      '$555K gross revenue · $255K NOI · 46.1% margin · 6 properties in Canon City, CO',
  },
}

export default function RgvrInvestorKitPage() {
  return <InvestorKitPage />
}
