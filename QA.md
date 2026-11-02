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
| Lighthouse (headless Chrome, default mobile profile, local preview): /, /work/, /work/triton/, /work/water/ | Performance, Accessibility, Best Practices, SEO all 100; LCP 0.8 s, CLS 0.001–0.037, TBT 0–20 ms. Lab data on localhost, not field data |
| Bundle | 5.5 KB gzip CSS; only JS is the inline theme toggle; fonts self-hosted |

## Not done / not verified

- **Lighthouse on the other 5 pages and on a deployed URL, Lighthouse CI in the pipeline, Playwright e2e, keyboard walkthrough, VoiceOver smoke test, 200% zoom check**: not run. Do these before launch.
- **LCP / INP / CLS**: not measured on a deployed URL.
- **OG image**: `public/og/default.svg` only. X/LinkedIn/Facebook need a 1200x630 PNG; add `public/og/default.png` and update `Base.astro`.
- **Résumé PDF**: none exists. Drop `Ansar_Tleubayev_Resume.pdf` into `public/resume/` and the download button appears automatically.
- **Experience, recognition, photo/monogram**: no verified data was available, so those sections are hidden. Fill `experience` and `recognition` in `src/data/site.ts`.
- **ClearMind case study**: excluded until its repository passes readiness checks (CI, dependency audit, staging).
- **Responsive screenshots at 390/768/1440** and the keyboard test: not captured.
- **External links** (GitHub repos) were not crawled; internal links only.
- **Cards** show result + "My part" but not the problem statement (shown on the case-study page instead).
- **Fonts**: Manrope + Inter only; mono uses the system monospace stack instead of a third webfont, to stay within "2 families".

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
