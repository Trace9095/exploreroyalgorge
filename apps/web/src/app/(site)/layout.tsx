import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[100dvh] pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}
