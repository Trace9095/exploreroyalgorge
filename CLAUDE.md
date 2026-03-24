# ExploreRoyalGorge.com — Royal Gorge Adventure Directory

> AGENTS: Read this file BEFORE touching any code. Check git log. Do NOT redo completed work.
> Last updated: 2026-03-24 (Session 133)
> **MONOREPO:** Web is at `apps/web/`, mobile at `apps/mobile/` (scaffold). Vercel rootDirectory = `apps/web`.

## Project Overview

ExploreRoyalGorge.com is a Colorado tourism directory site for Royal Gorge adventures near Canon City, CO — rafting, ziplines, hiking, rock climbing, helicopter tours, camping, and more. Part of the Wave 8 directory site build sprint (S129).

- **Location in APPS:** `~/Documents/APPS/_new-projects/exploreroyalgorge/`
- **GitHub:** https://github.com/Trace9095/exploreroyalgorge
- **Branch:** main
- **Production URL:** exploreroyalgorge.com
- **Vercel Slug:** `exploreroyalgorge`
- **Version:** 0.1.0
- **Admin:** CEO@epicai.ai / Trace87223!

## Current Status

- **Build:** ✅ READY
- **Deployment:** On Vercel, rootDirectory = `apps/web`
- **Neon DB:** Connected via Vercel Storage integration
- **Drizzle schema:** Pushed
- **GA4:** Wired (gtag.js in head)
- **Google Search Console:** Verification meta tag configured
- **Vercel Analytics + Speed Insights:** Wired in layout.tsx
- **DNS:** exploreroyalgorge.com — A: 76.76.21.21, CNAME www: cname.vercel-dns.com (configured S129)
- **Last commit:** `660f023` — fix: remove free tier and enforce $99/mo minimum on claim form

## Monorepo Structure

```
exploreroyalgorge/
├── apps/
│   ├── web/           ← Next.js 16.1.6 (Vercel root directory)
│   │   ├── src/app/   ← App Router pages
│   │   └── drizzle.config.ts
│   └── mobile/        ← Expo (scaffold only)
├── packages/
│   └── shared/        ← Shared types (@erg/shared)
├── turbo.json
└── package.json
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router, Turbopack) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 |
| Database | Neon PostgreSQL + Drizzle ORM |
| Auth | JWT (jose) + bcryptjs |
| Payments | Stripe ($99/mo minimum listings) |
| Email | Resend |
| Fonts | Geist (via geist package) |
| Icons | Lucide React |
| Analytics | GA4 + Vercel Analytics + Speed Insights |

## Root Directory & Build Command

```bash
# Monorepo: web app is at apps/web/
# Vercel rootDirectory = apps/web
# Build command:
npx next build
# Dev:
npm run dev:web
# Mobile:
npm run dev:mobile
# DB migrations:
cd apps/web && npx drizzle-kit push
# DB seed:
cd apps/web && npx tsx scripts/seed.ts
```

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing — hero + featured adventures + categories |
| `/(site)/adventures` | Adventures/activities directory |
| `/(site)/directory` | Full directory listing |
| `/(site)/blog` | Blog / content |
| `/(site)/pricing` | Business listing pricing ($99/mo minimum) |
| `/(site)/request-listing` | Business listing request form |
| `/(site)/claim` | Claim a listing |
| `/(site)/manage` | Business management |
| `/admin` | Admin dashboard |
| `/login` | Admin login |
| `/api/` | API routes |
| `/llms.txt` | AI crawler instructions |
| `/sitemap.ts` | Dynamic sitemap |
| `/robots.ts` | Robots config |

## Brand Identity

- **Theme:** Dark #0D1117 background, Adventure gold color scheme
- **Font:** Geist Sans + Geist Mono
- **Icons:** Lucide React (no emojis)
- **Style:** Adventure/outdoor directory — bold, canyon-inspired, Royal Gorge region

## CEO Rules for This Project (Wave 8 Directives)

1. **$99/mo minimum** for business listings — NO free tier ever
2. Sister businesses appear as ACTUAL directory entries (not just banners)
3. Every business verified as real and OPEN before listing
4. Every external URL tested before deploy
5. Real photos from real businesses only — no stock photos
6. Adventure gold color scheme — must look independent from other directory sites
7. **The Edge Zip is NOT listed** on any directory site (permanent exclusion)
8. **No sunset helicopter tours** — Royal Gorge Heli Tours doesn't offer them
9. GA4 + Google Ads conversion tracking wired
10. Separate Neon DB (no sharing between sites)
11. No emojis anywhere — use Lucide icons
12. De-branding: Must NOT show "Epic AI" to visitors

## Recent Commits

```
660f023 fix: remove free tier and enforce $99/mo minimum on claim form
5c3894f fix: remove unsplash references — no stock photos
36629f3 fix: remove Fritz Restaurant (permanently closed) per CEO directive
f84774d fix: add gtag.js to head for GSC verification
090075a chore: trigger redeploy for GA4 activation
1c42a8a feat: add Google Search Console verification meta tag
24e4107 feat: wire GA4 tracking + Google Search Console verification slot
```

## Completed Work (DO NOT REDO)

- ✅ Full directory site built (adventures, directory, pricing, blog)
- ✅ Neon DB connected, Drizzle schema pushed
- ✅ GA4 + Vercel Analytics + Speed Insights wired
- ✅ Google Search Console verification meta tag
- ✅ Free tier removed — $99/mo minimum enforced
- ✅ Stock photos removed — gradient fallbacks used
- ✅ Fritz Restaurant removed (permanently closed)
- ✅ DNS configured (exploreroyalgorge.com → Vercel)

## Known Issues / TODO

1. Replace remaining photo placeholders with gradient fallbacks + "Claim this listing" CTA
2. Final visual QA sweep — every page, every button, every link
3. Google Ads conversion tracking (GA4 is wired, but Ads tag may need verification)
4. Submit sitemap to Google Search Console (Trace must verify domain ownership first)

## Environment Variables

```
DATABASE_URL=                # Neon PostgreSQL (via Vercel Storage integration)
NEXT_PUBLIC_APP_URL=         # https://exploreroyalgorge.com
NEXT_PUBLIC_GA_ID=           # GA4 Measurement ID
STRIPE_SECRET_KEY=           # Stripe secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Stripe publishable
JWT_SECRET=                  # Auth JWT secret
RESEND_API_KEY=              # Resend for emails
```

## GitHub & Remote

- **Repo:** https://github.com/Trace9095/exploreroyalgorge
- **Branch:** main (auto-deploy to Vercel)
