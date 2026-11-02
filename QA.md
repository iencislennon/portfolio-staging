# QA report, deployment guide and rollback

Date: 2026-11-02. Scope: the Astro portfolio only. Nothing here has been deployed or pushed.

## Checks run (all on this machine)

| Check | Result |
|---|---|
| `npm run validate` (banned words, 10 required case-study blocks) | pass |
| Content schema (zod): featured needs cover+alt, architecture+alt, contribution, links, sourced metrics, limitations | pass; it failed correctly once when `contribution` was missing |
| `astro check` (TypeScript) | 0 errors, 0 warnings, 2 deprecation hints (zod `.url()`) |
| `astro build` | 9 pages |
| `npm run links` (internal links and assets in dist) | 0 broken |
| axe-core 4.x, tags wcag2a/aa, wcag21aa, wcag22aa, best-practice, 9 pages x light and dark | 0 violations (after fixing 2 real issues: low-contrast chip text, skipped heading level) |
| Horizontal overflow at 320, 375, 390, 768, 1024, 1280, 1440, 1920 px | none (after fixing 2 real issues) |
| Lighthouse CI (`npm run lhci`, assertions: all categories >= 95, LCP <= 2.5 s, CLS <= 0.1), all 9 pages, local static server, default mobile profile | pass; every category scored 100; LCP 0.8-1.5 s across runs. Lab data, not field data |
| Playwright (`npm run e2e`, Google Chrome): 54 tests | 54 pass: smoke on 9 routes (one h1, no console errors, unique titles, canonical), content without JavaScript, sourced metrics and alt text on each case study, all 10 case-study blocks, theme persistence, rel=noopener, reduced motion, axe (WCAG 2.2 AA tags) on 9 routes x 2 themes, keyboard walkthrough with visible 2px focus ring on every stop, 44 px targets in header/footer, no overflow at 8 widths, reflow at 200% and 400% zoom |
| Bundle | 5.5 KB gzip CSS; only JS is the inline theme toggle; fonts self-hosted |

## Not done / not verified

- **VoiceOver smoke test**: cannot be automated here; do a manual pass (landmarks, heading list, diagram `title` text, theme button label).
- **Real-user Core Web Vitals** (LCP/INP/CLS): only lab data exists; measure on the deployed URL.
- **Lighthouse and Playwright on a deployed URL**: run after staging exists.
- **Résumé PDF**: none exists. Drop `Ansar_Tleubayev_Resume.pdf` into `public/resume/` and the download button appears automatically.
- **Experience, recognition, photo/monogram**: no verified data was available, so those sections are hidden. Fill `experience` and `recognition` in `src/data/site.ts`.
- **ClearMind case study**: excluded until its repository passes readiness checks (CI, dependency audit, staging).
- **External links** (GitHub repos) were not crawled; internal links only.
- **Cards** show result + "My part" but not the problem statement (shown on the case-study page instead).
- **Fonts**: Manrope + Inter only; mono uses the system monospace stack instead of a third webfont, to stay within "2 families". The OG image is rendered with fallback fonts.
- **Social preview**: `public/og/default.png` (1200x630) is a simple generated card; replace with a designed image if wanted.

## Content that depends on unmerged repo work

Case studies describe the repositories after the `polish/showcase` branches are merged (CrisisNet tests and `VITE_API_URL`, PM2.5 chronological split and tests, Nanoparticle not featured). Do not publish the site before those branches land on `main`.

## Claims to confirm before publishing

- Triton: official team name, roster, and which kernels were personally written (history shows 24 of 53 commits, tooling/measurement/submission).
- CrisisNet: team credits on the lablab.ai page.
- Triton Kaggle notebook visibility is unverified, so it is not linked.

## Deploy (staging first)

```bash
npm ci
NOINDEX=1 SITE_URL=https://<staging-host> npm run build   # staging: robots Disallow + noindex meta
npm run preview                                           # local smoke test
```

Host `dist/` on GitHub Pages, Cloudflare Pages or Vercel. Production: `SITE_URL=https://<final-domain> npm run build` (no `NOINDEX`). The sitemap and canonical URLs use `SITE_URL`.

## Rollback

The site is static. Roll back by redeploying the previous commit's `dist/` (Pages/Vercel keep prior deployments; or `git revert <sha> && npm run build`). No database or backend is involved.

## Staging (deployed 2026-11-02)

- URL: https://iencislennon.github.io/portfolio-staging/ (repo `iencislennon/portfolio-staging`, GitHub Pages via `.github/workflows/deploy-staging.yml`).
- Built with `BASE_PATH=/portfolio-staging NOINDEX=1`: `<meta name="robots" content="noindex, nofollow">` on every page and `robots.txt` = `Disallow: /`. Verified live.
- All 9 routes, sitemap, robots, OG image and favicon return 200; unknown paths return 404.
- Lighthouse on the live URL (home, Triton case study): Performance 98, Accessibility 100, Best Practices 100, SEO 63. The SEO score is low only because staging is deliberately noindex; production builds without `NOINDEX` (verified 100 locally).
- Rollback: revert the commit on `main` (the workflow redeploys) or delete the Pages deployment; no backend or database.
- Production: set repo variable/secret-free env in the workflow (`SITE_URL`, no `NOINDEX`, matching `BASE_PATH`) and deploy to the final domain only after approval.
