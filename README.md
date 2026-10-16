# Kennet Kitchens & Bathrooms: demo website

A complete, production-quality website for a **fictional** kitchen and bathroom fitting company in Swindon, built as a portfolio piece by [Bunyamin Kidir](https://bkidir.vercel.app). It shows best practice in local SEO, performance and accessibility, and is structured so it can be reused for a real client in an afternoon.

- **Astro 7** static output, zero framework JavaScript
- **Tailwind CSS 4** with design tokens as CSS custom properties
- **~2 KB of JavaScript** per page (gzipped, inlined): mobile menu, header shrink, scroll reveal, slider, gallery and forms
- 37 pages, about 20,000 words of original UK-English copy
- JSON-LD for LocalBusiness, Service, BreadcrumbList, FAQPage and Article

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # type-checks, then builds to dist/
npm run preview      # serve the production build
```

Requires Node 22.12+ (Node 22.18+ for `npm run docs:images`).

### Quality scripts (run after `npm run build`)

| Command | What it does |
| --- | --- |
| `npm run check:links` | Crawls `dist/` and checks every internal link and `#anchor` |
| `npm run check:seo` | Title/description length and uniqueness, one H1, canonicals, image alt and dimensions, JSON-LD validity, word counts |
| `npm run docs:seo` | Regenerates `docs/seo-checklist.md` |
| `npm run docs:images` | Regenerates `docs/image-list.md` from the image registry |
| `npm run assets` | Rebuilds the logo files in `public/brand/` (text converted to vector outlines), favicons, `logo.png` and Open Graph images |

## Project structure

```
src/
  config.ts              Business details, IS_DEMO flag, navigation, areas. Start here.
  content.config.ts      Content collection schemas (validated at build time)
  content/
    services/*.md        10 service pages  -> /kitchen-design, /wet-rooms, ...
    areas/*.md           7 area pages      -> /kitchen-bathroom-fitters-<town>
    projects/*.md        3 case studies    -> /projects/<slug>
    advice/*.md          3 articles        -> /advice/<slug>
  data/
    content.ts           Shared copy: process steps, differentiators, sample reviews, FAQs
    images.ts            Image registry: every photo, its alt text, ratio and brief
    gallery.ts           Projects page gallery
  components/            Header, Footer, BeforeAfter, Gallery, FaqList, forms/, ui/ ...
  layouts/BaseLayout.astro   <head>, SEO, fonts, schema, header/footer
  pages/                 Routes. [slug].astro renders both service and area pages
  scripts/               Small client scripts (reveal, form validation)
  styles/global.css      Tokens, fonts, base styles, components
public/                  Fonts, favicons, OG images
scripts/                 Build-time tools (link checker, SEO audit, docs, assets)
docs/                    Brand notes, image list, image credits, SEO checklist, report
```

## Editing content

- **Business name, phone, address, hours, areas:** `src/config.ts`. The footer, contact page and JSON-LD all read from here, so NAP always matches.
- **Service, area, case study and advice pages:** edit the Markdown file. The frontmatter holds the title, meta description, H1, FAQs, pricing facts and related links; the body is the page copy. The schema in `src/content.config.ts` rejects titles over 60 characters and descriptions over 155 at build time.
- **New service or area page:** copy an existing `.md` file, rename it (the file name becomes the URL) and edit. Add areas to `AREAS` in `src/config.ts` and services to `KITCHEN_LINKS` / `BATHROOM_LINKS` so they appear in navigation.
- **FAQs, process steps, reviews:** `src/data/content.ts`.

## Adding images

All 40 image slots are filled with free Unsplash photos (credited in `docs/image-credits.md`), cropped to their slot’s ratio and compressed. Any slot without a file falls back to a neutral placeholder at the right aspect ratio. To add or replace a photo:

1. Look up the file name in `docs/image-list.md` (each entry has a Pexels/Unsplash search term and an AI prompt).
2. Save the photo as `src/assets/images/<file-name>.jpg`.
3. Rebuild. `<Img>` finds it automatically and outputs `<picture>` with AVIF and WebP, a responsive `srcset`, explicit `width`/`height`, and lazy loading (or `fetchpriority="high"` plus a preload for hero images).
4. Credit it in `docs/image-credits.md`.

To add a new image slot, add an entry to `src/data/images.ts` and use `<Img image="yourKey" />`.

## Demo mode (`IS_DEMO`)

Demo mode is **on by default**. It:

- adds `<meta name="robots" content="noindex, nofollow">` to every page
- shows the “Concept website designed by Bunyamin Kidir: fictional business” line in the footer

To turn it off, set the environment variable `PUBLIC_IS_DEMO=false` (in Vercel: Project → Settings → Environment Variables), or change the default in `src/config.ts`. Everything else is already fully optimised for search.

`robots.txt` deliberately allows crawling in both modes: crawlers must fetch a page to see its `noindex` tag.

## Forms

The quote and contact forms work without a backend. With no endpoint set, they validate, wait briefly and show the success state.

To make them send for real, set `PUBLIC_FORM_ENDPOINT`:

- **Formspree / Basin / Getform:** set it to the form URL, e.g. `https://formspree.io/f/abc123`. Forms POST `multipart/form-data` with `Accept: application/json`.
- **Vercel function:** add `api/quote.js` (or switch Astro to `output: 'server'` with the Vercel adapter) and set the endpoint to `/api/quote`.

Both forms include a honeypot field (`company_website`) and a required consent checkbox linking to the privacy policy. Photo upload is UI-only until an endpoint that accepts files is configured.

## Deploying to Vercel

1. Push this folder to a Git repository and import it in Vercel. The Astro preset is detected automatically.
2. Set `SITE_URL` to the production URL (used for canonical tags, the sitemap and OG images). Default: `https://kennet-kitchens-bathrooms.vercel.app`.
3. Deploy. `vercel.json` sets clean URLs (no `.html`, no trailing slash), long-lived immutable caching for hashed assets and fonts, and security headers.

## Reusing for a real client

1. Duplicate the repo. Update `src/config.ts`: name, phone, email, address, geo coordinates, hours, areas, trades.
2. Redesign the logo in `scripts/generate-assets.mjs` (mark shapes, wordmark text, colours) and run `npm run assets`. That regenerates every logo file in `public/brand/`, plus the favicons and share images. See `docs/brand.md`.
3. Adjust colours and fonts in `src/styles/global.css` (`@theme` block) and swap the two `.woff2` files in `public/fonts/`.
4. Rewrite the Markdown content. Keep each page genuinely unique.
5. Add real photos and real reviews. Only add `Review`/`AggregateRating` schema for genuine first-party reviews.
6. Set `PUBLIC_IS_DEMO=false`, `SITE_URL` and `PUBLIC_FORM_ENDPOINT`.
7. Run `npm run build && npm run check:links && npm run check:seo`, then follow the go-live list in `docs/seo-checklist.md`.

## Design decisions worth knowing

- **Page transitions** use the native cross-document View Transitions API (`@view-transition` in CSS) instead of Astro’s `<ClientRouter />`. Same cross-fade, zero JavaScript, and scripts never need re-initialising. Browsers without support navigate normally.
- **CSS is inlined** into each page (`inlineStylesheets: 'always'`), about 10 KB gzipped, so there is no render-blocking stylesheet request.
- **Animations** use only `transform` and `opacity`, the hero has no entrance animation (so nothing delays LCP), and everything respects `prefers-reduced-motion`.
- **No third-party requests.** The area map is an inline SVG with a link to Google Maps rather than an iframe. There are no cookies, so no cookie banner is needed.
- **Progressive enhancement.** Without JavaScript the quote form shows as one long form, FAQs still open and close (native `<details>`), and all content is visible.
