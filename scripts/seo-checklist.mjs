/**
 * Writes docs/seo-checklist.md from the built site (dist/) plus target keywords.
 * Service/area/advice keywords come from content frontmatter; others are listed here.
 * Run after a build: `npm run docs:seo`.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';

const manual = {
  '/': 'kitchen and bathroom fitters Swindon',
  '/kitchens': 'fitted kitchens Swindon',
  '/bathrooms': 'bathroom fitters Swindon',
  '/projects': 'kitchen and bathroom projects Swindon',
  '/our-process': 'kitchen fitting process',
  '/about': 'Kennet Kitchens & Bathrooms (brand)',
  '/reviews': 'Kennet Kitchens reviews (brand)',
  '/faqs': 'kitchen and bathroom fitting FAQs',
  '/get-a-quote': 'kitchen quote Swindon / bathroom quote Swindon',
  '/contact': 'Kennet Kitchens contact (brand)',
  '/advice': 'kitchen and bathroom advice',
  '/privacy': '(none: legal)',
  '/cookies': '(none: legal)',
  '/404': '(none: noindex)',
  '/projects/sage-shaker-kitchen-old-town-swindon': 'sage shaker kitchen Swindon',
  '/projects/family-bathroom-wroughton': 'bathroom renovation Wroughton',
  '/projects/accessible-wet-room-royal-wootton-bassett': 'accessible wet room Royal Wootton Bassett',
  '/advice/how-much-does-a-new-kitchen-cost-swindon': 'new kitchen cost Swindon',
  '/advice/wet-room-vs-walk-in-shower': 'wet room vs walk-in shower',
  '/advice/how-long-does-a-bathroom-installation-take': 'how long does a bathroom installation take',
};

const keywords = { ...manual };
for (const dir of ['services', 'areas']) {
  for (const f of await readdir(`src/content/${dir}`)) {
    const md = await readFile(`src/content/${dir}/${f}`, 'utf8');
    const kw = md.match(/^keyword: (.+)$/m)?.[1];
    if (kw) keywords['/' + f.replace(/\.md$/, '')] = kw.replace(/^'|'$/g, '');
  }
}

const dec = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const cell = (s) => s.replace(/\|/g, '\\|');
const rows = [];
for (const route of Object.keys(keywords).sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))) {
  const file = route === '/' ? 'dist/index.html' : `dist${route}.html`;
  const html = await readFile(file, 'utf8');
  const title = dec(html.match(/<title>([^<]*)<\/title>/)[1]);
  const desc = dec(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  const h1 = dec(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]+>/g, '').trim());
  rows.push(`| \`${route}\` | ${cell(keywords[route])} | ${cell(title)} (${title.length}) | ${cell(desc)} (${desc.length}) | ${cell(h1)} |`);
}

const md = `# SEO checklist

Generated from the built site by \`npm run docs:seo\`. Character counts in brackets (titles ≤ 60, descriptions ≤ 155).

**Keyword strategy:** the homepage owns the head term *kitchen and bathroom fitters Swindon*. Each service page targets *service + Swindon*; each area page targets *service + town*, with the Swindon area page aimed at neighbourhood-level searches so it doesn’t compete with the homepage.

| URL | Target keyword | Title | Meta description | H1 |
| --- | --- | --- | --- | --- |
${rows.join('\n')}

## Site-wide checks

- [x] Unique title, description and H1 on every page (\`npm run check:seo\`)
- [x] Canonical tag on every page; one trailing-slash policy (none)
- [x] \`lang="en-GB"\` and \`og:locale\` en_GB
- [x] Open Graph and Twitter cards, share image per page type (\`public/og/\`)
- [x] \`sitemap-index.xml\` (auto) and \`robots.txt\` (endpoint, references the sitemap)
- [x] JSON-LD: HomeAndConstructionBusiness (home, contact), Service (service pages and hubs), BreadcrumbList (inner pages), FAQPage (pages with FAQs), Article (advice posts), WebSite (home)
- [x] No Review or AggregateRating schema (reviews are samples)
- [x] NAP identical in footer, contact page and schema (all read from \`src/config.ts\`)
- [x] No broken internal links (\`npm run check:links\`)
- [x] Descriptive anchor text, no “click here”
- [x] Every image has alt text and explicit dimensions
- [x] Demo mode: \`noindex, nofollow\` on every page. Set \`PUBLIC_IS_DEMO=false\` to remove it.

## Before going live with a real client

- [ ] Replace business details in \`src/config.ts\`, including real coordinates
- [ ] Set \`SITE_URL\` to the live domain and \`PUBLIC_IS_DEMO=false\`
- [ ] Add real photos (see \`docs/image-list.md\`) and real reviews; only add review schema for genuine, first-party reviews
- [ ] Validate structured data at validator.schema.org and Google’s Rich Results Test
- [ ] Create and verify the Google Business Profile with matching NAP
- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools
`;
await writeFile('docs/seo-checklist.md', md);
console.log('Wrote docs/seo-checklist.md');
