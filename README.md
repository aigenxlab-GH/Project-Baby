# pregnancysprout.com

Next.js pregnancy & baby content site (AdSense + affiliate revenue).

📖 **AI assistants & developers:** read [CONTEXT.md](CONTEXT.md) for stack, deploy process, and current state.

## Quick facts
- **Framework:** Next.js 15.3.3 (pinned — do not upgrade to 15.5.x)
- **Deploy:** push to GitHub `main` → GitHub Actions → Cloudflare Workers (auto-deploy). A change is live only after `git push`.
- **Content:** MDX files in `/content`
- **CMS:** Sanity (`pregnancysprout.sanity.studio`) — products managed there; live site currently reads from MDX/JSON
- **Live:** https://pregnancysprout.com

## Content standards

This site has hard rules about fabricated claims, credentials, dosing and invented
metrics, enforced by two committed validators. **Read
[docs/CONTENT-STANDARDS.md](docs/CONTENT-STANDARDS.md) before changing content or
either validator.**

```bash
npm run check:fabrication   # 15 categories, repo + all live Sanity products
npm run check:links         # 4 categories; add -- --live to sweep production
```

Both must report 0 before shipping.
