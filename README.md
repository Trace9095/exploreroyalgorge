# ExploreRoyalGorge.com

The Royal Gorge adventure directory — rafting, ziplines, hiking, rock climbing, helicopter tours, camping, and more near Canon City, Colorado.

**Live:** [exploreroyalgorge.com](https://exploreroyalgorge.com) · **Vercel:** `exploreroyalgorge`

---

## Stack

- **Framework:** Next.js 16.1.6 App Router (Turbopack)
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Payments:** Stripe ($99/mo minimum listings)
- **Monorepo:** Turborepo (npm workspaces)
- **Deployment:** Vercel (rootDirectory: `apps/web`)

## Quick Start

```bash
npm install
npm run dev:web          # Next.js dev server

# Database
cd apps/web
npx drizzle-kit push     # push schema
npx tsx scripts/seed.ts  # seed data
```

## Structure

```
apps/web/    — Next.js 16 (Vercel root dir)
apps/mobile/ — Expo (scaffold)
packages/shared/ — @erg/shared
```

## CEO Rules

- $99/mo minimum for listings — NO free tier
- No emojis — Lucide icons only
- No Epic AI branding visitor-facing
- Real photos only — no stock photos
- The Edge Zip is NOT listed on any directory site
- No sunset helicopter tours — Royal Gorge Heli Tours doesn't offer them
- Every business verified real and OPEN before listing
