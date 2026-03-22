import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { Mountain, LayoutDashboard, Building2, FileText, LogOut } from 'lucide-react'

async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return null
  return getSession(token)
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()
  if (!session) redirect('/login')

  const NAV = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/businesses', label: 'Businesses', icon: Building2 },
    { href: '/admin/requests', label: 'Requests', icon: FileText },
  ]

  return (
    <div className="flex min-h-[100dvh]">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-border bg-surface lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ background: '#D4A853' }}
            aria-hidden="true"
          >
            <Mountain className="h-4 w-4 text-background" />
          </div>
          <span className="text-sm font-bold text-foreground">ERG Admin</span>
        </div>

        <nav className="flex-1 space-y-1 p-4" aria-label="Admin navigation">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <div className="mb-3 px-3 text-xs text-muted truncate">{session.email}</div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
