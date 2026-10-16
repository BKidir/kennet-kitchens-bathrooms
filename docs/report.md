# Build and quality report

Kennet Kitchens & Bathrooms demo site, checked on 15 October 2026 against the production build (`npm run build`, served with `astro preview`).

## Lighthouse 13.5 scores

Mobile uses Lighthouse’s default emulation: a mid-range phone on throttled 4G with 4× CPU slowdown.

> **Update after adding photos (15 October 2026).** All 40 image slots now hold optimised Unsplash photos. The tables below were re-run with real images; the figures under “Placeholder build” further down are from before the photos were added.

### With real photos (current build, demo mode)

| Page | Device | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home `/` | Mobile | 100 | 100 | 100 | 69* | 0.8 s | 1.7 s | 0 | 0 ms |
| Service `/kitchen-installation` | Mobile | 100 | 100 | 100 | 69* | 0.8 s | 1.5 s | 0 | 0 ms |
| Area `/kitchen-bathroom-fitters-swindon` | Mobile | 100 | 100 | 100 | 69* | 0.8 s | 1.5 s | 0 | 0 ms |
| `/projects` | Mobile | 100 | 100 | 100 | 69* | 0.8 s | 1.6 s | 0 | 0 ms |
| `/advice/how-much-does-a-new-kitchen-cost-swindon` | Mobile | 100 | 100 | 100 | 69* | 0.8 s | 1.5 s | 0 | 20 ms |
| Home `/` | Desktop | 100 | 100 | 100 | 69* | – | 0.4 s | 0 | 0 ms |
| Service `/kitchen-installation` | Desktop | 100 | 100 | 100 | 69* | – | 0.4 s | 0 | 0 ms |
| Area `/kitchen-bathroom-fitters-swindon` | Desktop | 100 | 100 | 100 | 69* | – | 0.4 s | 0 | 0 ms |

\* Only “Page is blocked from indexing”, the intended demo-mode `noindex`. SEO is 100 with `PUBLIC_IS_DEMO=false`.

**Homepage weight, scrolled to the bottom so every lazy image loads:** 356 KiB on a 390 px phone at 3× density (269 KiB of images), 207 KiB on a 1440 px desktop at 1×, and 427 KiB at 2×. Every photo was served as AVIF. Budget: under 1 MB ✅

**How the images are optimised**

- Sources cropped to each slot’s aspect ratio and size, then re-encoded (MozJPEG q82, progressive, metadata stripped): 11 MB down to 6.5 MB for all 40.
- `astro:assets` builds AVIF and WebP at 400, 640, 800, 1024, 1280, 1600, 2000 and 2400 px (never larger than the source), plus JPEG fallbacks. `sizes` matches each layout slot.
- The hero is preloaded as AVIF with `fetchpriority="high"`, eager loading and sync decoding. Everything else is `loading="lazy"` and `decoding="async"`, with explicit width and height.
- A Lighthouse “image delivery” hint on the Swindon page (16 KiB) was fixed by adding the 640 and 800 px steps.

### Placeholder build (before photos)

### Demo mode (`IS_DEMO=true`, the default)

| Page | Device | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT | Page weight |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home `/` | Mobile | 100 | 100 | 100 | 66* | 0.8 s | 1.4 s | 0 | 30 ms | 86 KiB |
| Service `/kitchen-installation` | Mobile | 100 | 100 | 100 | 66* | 0.8 s | 1.4 s | 0 | 0 ms | 83 KiB |
| Area `/kitchen-bathroom-fitters-swindon` | Mobile | 100 | 100 | 100 | 66* | 0.8 s | 1.4 s | 0 | 0 ms | 82 KiB |
| Home `/` | Desktop | 100 | 100 | 100 | 66* | 0.2 s | 0.3 s | 0 | 0 ms | 86 KiB |
| Service `/kitchen-installation` | Desktop | 100 | 100 | 100 | 66* | 0.2 s | 0.3 s | 0 | 0 ms | 83 KiB |
| Area `/kitchen-bathroom-fitters-swindon` | Desktop | 100 | 100 | 100 | 66* | 0.2 s | 0.3 s | 0 | 0 ms | 82 KiB |

\* The only failing SEO audit is “Page is blocked from indexing”. That is the intended `noindex, nofollow` in demo mode.

Also checked on mobile, all scoring 100 / 100 / 100: `/projects`, `/projects/family-bathroom-wroughton`, `/advice/wet-room-vs-walk-in-shower`, `/get-a-quote`, `/contact`, `/faqs`, `/kitchens`.

### Live mode (`PUBLIC_IS_DEMO=false`)

| Page | Device | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home `/` | Mobile | 100 | 100 | 100 | **100** | 1.4 s | 0 |
| Service `/kitchen-installation` | Mobile | 100 | 100 | 100 | **100** | 1.4 s | 0 |
| Area `/kitchen-bathroom-fitters-swindon` | Mobile | 100 | 100 | 100 | **100** | 1.4 s | 0 |

### Against the targets

| Target | Result |
| --- | --- |
| LCP < 2.0 s (mobile) | 1.4–1.5 s ✅ |
| CLS < 0.05 | 0 on every page ✅ |
| INP < 150 ms | TBT 0–30 ms; event handlers are tiny and synchronous ✅ (lab proxy; confirm with field data once live) |
| Performance ≥ 95 | 100 ✅ |
| Accessibility 100 | 100 ✅ |
| Best Practices 100 | 100 ✅ |
| SEO 100 (with `IS_DEMO=false`) | 100 ✅ |
| JS < 30 KB gzipped per page | Homepage ~1 KB inline; quote page ~3 KB total ✅ |
| Homepage < 1 MB | 86 KiB today (fonts 61 KiB). Real photos will add roughly 250–400 KiB at mobile sizes ✅ |

## Other checks

| Check | Result |
| --- | --- |
| `astro check` (TypeScript) | 0 errors, 0 warnings, 0 hints |
| `astro build` | 37 pages, no warnings |
| Internal links (`npm run check:links`) | 3,559 links and anchors, 0 broken |
| On-page SEO (`npm run check:seo`) | Unique title, description and H1 on all 37 pages; one H1 each; canonical on each; all images have alt text and dimensions; all JSON-LD parses; no review schema |
| Horizontal overflow at 360, 768, 1024 and 1440 px | 0 pages overflow (all 37 pages × 4 widths) |
| Console errors | None on any page |
| Reduced motion | With `prefers-reduced-motion: reduce`, all scroll reveals render in place, transitions are ~0 ms, smooth scrolling and view transitions are off |
| Keyboard: desktop dropdowns | Enter/Space opens, Tab enters the menu, Escape closes and returns focus to the toggle |
| Keyboard: mobile menu | Opens and closes, rest of the page is `inert` while open, Escape closes and returns focus |
| Keyboard: quote form | Per-step validation with messages linked via `aria-describedby`, focus moves to the first invalid field or the new step heading, success state receives focus |
| Keyboard: before/after slider | Native range input: arrows, Home/End, PageUp/PageDown; `aria-valuetext` updates |
| Keyboard: gallery and lightbox | Filter buttons use `aria-pressed` with a live “Showing N projects” status; native `<dialog>` with ←/→ navigation, Escape to close, focus returns to the opening tile |

## Issues found and fixed during testing

1. **Header overflowed at 1024 px and wrapped at 1440 px.** Added `white-space: nowrap`, tightened nav padding at lg/xl, used a shorter button label (“Get a quote”) between 1024 and 1279 px, and showed the phone number only from 1280 px.
2. **Stats strip overflowed at 360 px.** Now one column on small phones, two from 640 px.
3. **Markdown tables widened the advice pages at 360 px.** Prose tables now scroll horizontally on small screens, and the article column has `min-width: 0`.
4. **Logo link failed “label content name mismatch”.** Removed the overriding `aria-label`; the SVG’s accessible name plus a visually hidden “, home” now forms the link name.
5. **“At a glance” definition list was invalid.** Icons were direct children of the `<dl>` groups; they now sit inside each `<dt>`.
6. **Gallery tiles: placeholder caption leaked into the button name.** The placeholder file-name label is now drawn with CSS `content: attr()`, so it’s never read out.
7. **Comparison table had an empty header cell** (`td-has-header`). Added a “Feature” header.
8. **Email validation accepted `name@domain` with no domain ending.** Both forms now require a dot in the domain, with a clear error message.
9. **The Swindon area page duplicated the homepage title and H1.** It now targets neighbourhood-level searches so it doesn’t compete with the homepage.

## Known limitations and next steps

- **Structured data has not been put through validator.schema.org or Google’s Rich Results Test.** The JSON-LD parses, uses the correct types and passes the build-time checks, but pasting code into an external validator needs doing by hand. It takes about two minutes per page type: home, a service page, an area page, an advice post and `/faqs`.
- **Photos are stock, not real projects.** They are free Unsplash images. The before/after pairs show different rooms. For a real client, swap in their own project photos; see `docs/image-credits.md`.
- **Forms use the stub endpoint.** Set `PUBLIC_FORM_ENDPOINT` to make them send. Without JavaScript and without an endpoint, the forms can’t submit.
- **Lighthouse’s informational “network dependency tree” insight** on `/get-a-quote` and `/contact` notes the form script imports a shared module (two requests, ~2 KB total). It doesn’t affect the score; inlining it would save one small request.
- **Native view transitions** (`@view-transition`) work in Chromium and Safari 18.2+. Firefox currently navigates without the cross-fade.
