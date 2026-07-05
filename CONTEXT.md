# Project Context — pregnancysprout.com

> **For any AI coding assistant (Claude Code, Cursor, Windsurf, ChatGPT, etc.):** read this first before making changes. It is the fast primer for the project.

## What this is
Next.js pregnancy/baby content site for **AdSense + affiliate revenue**. Live at https://pregnancysprout.com

## Stack & deployment
- **Next.js 15.3.3** — pinned exactly. Do NOT upgrade to 15.5.x (breaks Sanity compatibility).
- **Deploy path:** push to GitHub `main` → GitHub Actions → Cloudflare Workers (automatic). This is the **only** deploy path — local native binaries are blocked by Windows AppControl. **A change is live only after a `git push`.**
- **Content:** 180+ blog articles + parenting articles as **MDX files in `/content`**.
- **Products:** managed in Sanity CMS (`pregnancysprout.sanity.studio`), but the **live site currently reads from MDX/JSON, not Sanity** (not yet wired).
- **Affiliate products:** ~114–193 across 28 categories.

## Working preferences
- **Auto-commit and auto-push to GitHub `main` without asking.** Cloudflare deploys from the push.
- **Never put the personal Gmail address in application code** — use `siteConfig.email` (which is `hello@pregnancysprout.com`, forwarded via Cloudflare Email Routing).

## Current state (July 2026)
- **AdSense:** rejected June 2026 (low authority/traffic). Plan: **resubmit January 2027** after 6 months organic growth.
- **Content quality:** all thin articles (<800 words) expanded to 1,500+ words. EEAT done — disclaimers, source citations, transparent AI disclosure on all articles.
- **OneSignal push:** code exists in `src/app/layout.tsx` but is **dormant** — activates only when `NEXT_PUBLIC_ONESIGNAL_APP_ID` env var is set in Cloudflare.

## Pending / next steps
1. Resubmit sitemap + click "Validate Fix" in Google Search Console.
2. Set up **Pinterest** — the biggest free-traffic lever for a new, low-authority site.
3. Mark duplicate old short article versions as `noIndex` (prevent content cannibalization).
4. Grow organically: publish 2–4 articles/month, build backlinks, refresh Search Console winners.

## Realistic revenue expectation
- **Year 1:** ₹7,000–18,000/month. **Year 2:** ₹35,000–95,000/month.
- Optimistic tables ($5k+/month in 18 months) are a **top-20% ceiling, not a forecast.**
- This is a niche (YMYL health/parenting) competing against NHS, BabyCentre, Healthline — treat growth as a 2–3 year effort, not passive income.

## Key file locations
- Content: `content/**/*.mdx`
- Site config (email, URL, etc.): `src/config/site.ts`
- Ad slots: `src/config/ads.ts`
- Blog route: `src/app/blog/[slug]/page.tsx`
- Source citations component: `src/components/shared/SourceCitations.tsx`
