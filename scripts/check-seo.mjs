/**
 * On-page SEO and accessibility audit of dist/: titles, descriptions, H1s,
 * canonicals, image alts, JSON-LD validity and approximate word counts.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const files = [];
async function walk(dir) {
  for (const f of await readdir(dir)) {
    const p = join(dir, f);
    if ((await stat(p)).isDirectory()) await walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
}
await walk(DIST);
files.sort();

const dec = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const titles = new Map(), descs = new Map(), h1s = new Map();
let problems = 0;
const flag = (f, msg) => { problems++; console.log(`✗ ${f}: ${msg}`); };
const rows = [];

for (const f of files) {
  const html = await readFile(f, 'utf8');
  const name = f.slice(DIST.length);
  const title = dec(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = dec(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => dec(m[1].replace(/<[^>]+>/g, '').trim()));
  if (!title) flag(name, 'missing title');
  if (title.length > 60) flag(name, `title ${title.length} chars: ${title}`);
  if (desc.length > 155) flag(name, `description ${desc.length} chars`);
  if (desc.length < 70) flag(name, `description short (${desc.length})`);
  if (h1.length !== 1) flag(name, `${h1.length} H1s`);
  const canon = html.match(/<link rel="canonical" href="(https?:\/\/[^"]+)"/)?.[1];
  const route = name.replace(/\.html$/, '').replace(/^\/index$/, '/');
  if (!canon) flag(name, 'no canonical');
  else if (new URL(canon).pathname !== route) flag(name, `canonical ${canon} does not match route ${route}`);
  if (!/<html lang="en-GB"/.test(html)) flag(name, 'lang not en-GB');
  for (const [map, val, label] of [[titles, title, 'title'], [descs, desc, 'description'], [h1s, h1[0], 'H1']]) {
    if (map.has(val)) flag(name, `duplicate ${label} with ${map.get(val)}`);
    else map.set(val, name);
  }
  // images
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\salt="/.test(tag)) flag(name, `img without alt: ${tag.slice(0, 80)}`);
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag)) flag(name, `img without dimensions: ${tag.slice(0, 80)}`);
  }
  // JSON-LD
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const d = JSON.parse(m[1]);
      if (!d['@context'] || !d['@type']) flag(name, 'JSON-LD missing @context/@type');
      if (['Review', 'AggregateRating'].includes(d['@type']) || JSON.stringify(d).includes('aggregateRating')) flag(name, 'review schema present');
    } catch (e) { flag(name, `invalid JSON-LD: ${e.message}`); }
  }
  const types = [...html.matchAll(/"@type":"(\w+)"/g)].map((m) => m[1]);
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
  const words = main.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<template[\s\S]*?<\/template>/g, '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
  rows.push({ page: name, words, title: title.length, desc: desc.length, schema: [...new Set(types.filter((t) => ['HomeAndConstructionBusiness', 'Service', 'BreadcrumbList', 'FAQPage', 'Article', 'WebSite'].includes(t)))].join(' ') });
}
console.table(rows);
console.log(`${files.length} pages audited, ${problems} problems`);
process.exit(problems ? 1 : 0);
