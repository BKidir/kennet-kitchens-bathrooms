/**
 * Crawls dist/ and checks every internal link and in-page anchor resolves.
 * Run after `npm run build`: `npm run check:links`.
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

const routeOf = (file) => {
  let r = '/' + file.slice(DIST.length + 1).replace(/\.html$/, '');
  if (r === '/index') r = '/';
  return r.replace(/\/index$/, '');
};
const pages = new Map();
for (const f of files) pages.set(routeOf(f), await readFile(f, 'utf8'));
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

let broken = 0, checked = 0;
const publicFiles = new Set();
async function exists(path) {
  try { await stat(join(DIST, path)); return true; } catch { return false; }
}
for (const [route, html] of pages) {
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    checked++;
    const [pathPart, hash] = href.split('#');
    const path = (pathPart.split('?')[0] || route);
    let ok = pages.has(path) || publicFiles.has(path) || (await exists(path)) ;
    if (ok && pathPart && !pages.has(path)) publicFiles.add(path);
    if (ok && hash && pages.has(path) && !ids(pages.get(path)).has(decodeURIComponent(hash))) ok = false;
    if (!ok) { broken++; console.log(`✗ ${route} → ${href}`); }
    if (path !== '/' && path.endsWith('/')) { broken++; console.log(`✗ trailing slash: ${route} → ${href}`); }
  }
}
console.log(`${pages.size} pages, ${checked} internal links checked, ${broken} broken`);
process.exit(broken ? 1 : 0);
