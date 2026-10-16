/**
 * Brand asset pipeline. Run after any branding change: `npm run assets`.
 *
 * Builds the Kennet logo (mark + wordmark) with all text converted to vector
 * outlines, so it renders identically everywhere without web fonts, then exports:
 *   public/brand/*.svg      logo lockups and mark (primary, reversed, mono)
 *   public/favicon.svg|ico, apple-touch-icon.png, logo.png (schema)
 *   public/og/*.png         Open Graph share images per page type
 */
import opentype from 'opentype.js';
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------- tokens
const C = {
  teal: '#0f5f5c',
  ink: '#1f2933',
  inkSoft: '#4a5560',
  brass: '#b08d57',
  brassText: '#7a5e32',
  brassLight: '#c9a46a',
  bg: '#faf8f5',
  white: '#ffffff',
};

// ---------------------------------------------------------------- fonts → outlines
const load = async (p) => {
  const b = await readFile(new URL(`../node_modules/${p}`, import.meta.url));
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.length));
};
const serif = await load('@fontsource/fraunces/files/fraunces-latin-600-normal.woff');
const sans = await load('@fontsource/manrope/files/manrope-latin-700-normal.woff');

/** Text → SVG path data. `tracking` is letter-spacing as a fraction of size. */
function outline(font, str, x, y, size, tracking = 0) {
  let d = '';
  let cx = x;
  for (const ch of str) {
    const g = font.charToGlyph(ch);
    d += g.getPath(cx, y, size).toPathData(1);
    cx += (g.advanceWidth / font.unitsPerEm) * size + tracking * size;
  }
  return { d, width: cx - x - tracking * size };
}
/** Letter-spacing that makes `str` exactly `target` wide. */
function trackingToFit(font, str, size, target) {
  const base = outline(font, str, 0, 0, size).width;
  return (target - base) / (([...str].length - 1) * size);
}

// ---------------------------------------------------------------- the mark
// An arched doorway (also an arched mirror, a nod to period homes), a K
// monogram, and a brass wave for the River Kennet. Drawn on a 40 × 52 grid.
const markShapes = ({ arch, k, wave }) =>
  `<path d="M2 20A18 18 0 0 1 38 20V46A4 4 0 0 1 34 50H6A4 4 0 0 1 2 46Z" fill="${arch}"/>` +
  `<path d="M14 16.5V36.5M14 28L26 16M18.4 24.4L27 36.5" fill="none" stroke="${k}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="M8.5 43.4c2.5-1.9 5-1.9 7.5 0s5 1.9 7.5 0 5-1.9 7.5 0" fill="none" stroke="${wave}" stroke-width="2.1" stroke-linecap="round"/>`;

const THEMES = {
  primary: { arch: C.teal, k: C.white, wave: C.brassLight, word: C.ink, sub: C.brassText },
  reversed: { arch: C.white, k: C.teal, wave: C.brass, word: C.white, sub: C.brassLight },
  mono: { arch: C.ink, k: C.white, wave: C.white, word: C.ink, sub: C.ink },
};

// ---------------------------------------------------------------- lockups
const TAGLINE = 'KITCHENS & BATHROOMS';
const word = outline(serif, 'Kennet', 52, 31, 31, -0.005);
const tagSize = 7.4;
const tag = outline(sans, TAGLINE, 53, 45.5, tagSize, trackingToFit(sans, TAGLINE, tagSize, word.width - 2));
const H_W = Math.ceil(52 + word.width + 1);

const horizontal = (t) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${H_W} 52" width="${H_W * 4}" height="208" role="img" aria-label="Kennet Kitchens &amp; Bathrooms">` +
  `<title>Kennet Kitchens &amp; Bathrooms</title>${markShapes(t)}<path d="${word.d}" fill="${t.word}"/><path d="${tag.d}" fill="${t.sub}"/></svg>`;

const sWordProbe = outline(serif, 'Kennet', 0, 0, 40, -0.005);
const S_W = Math.ceil(sWordProbe.width + 8);
const sTrack = trackingToFit(sans, TAGLINE, 9.4, sWordProbe.width);
const sTagProbe = outline(sans, TAGLINE, 0, 0, 9.4, sTrack);
const stacked = (t) => {
  const w1 = outline(serif, 'Kennet', (S_W - sWordProbe.width) / 2, 98, 40, -0.005);
  const w2 = outline(sans, TAGLINE, (S_W - sTagProbe.width) / 2, 117, 9.4, sTrack);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S_W} 122" width="${S_W * 3}" height="366" role="img" aria-label="Kennet Kitchens &amp; Bathrooms">` +
    `<title>Kennet Kitchens &amp; Bathrooms</title><g transform="translate(${(S_W - 40) / 2} 2)">${markShapes(t)}</g>` +
    `<path d="${w1.d}" fill="${t.word}"/><path d="${w2.d}" fill="${t.sub}"/></svg>`
  );
};

/** Square mark. `pad` adds breathing room; `bg` paints a background (for app icons). */
const markSquare = (t, { pad = 2, bg, size = 512 } = {}) => {
  const s = 52 + pad * 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-6 - pad} ${-pad} ${s} ${s}" width="${size}" height="${size}">` +
    (bg ? `<rect x="${-6 - pad}" y="${-pad}" width="${s}" height="${s}" fill="${bg}"/>` : '') +
    `${markShapes(t)}</svg>`
  );
};

// ---------------------------------------------------------------- write brand files
await mkdir(new URL('../public/brand/', import.meta.url), { recursive: true });
await mkdir(new URL('../public/og/', import.meta.url), { recursive: true });
const out = (p) => fileURLToPath(new URL(`../public/${p}`, import.meta.url));

const brand = {
  'brand/kennet-logo-horizontal.svg': horizontal(THEMES.primary),
  'brand/kennet-logo-horizontal-reversed.svg': horizontal(THEMES.reversed),
  'brand/kennet-logo-horizontal-mono.svg': horizontal(THEMES.mono),
  'brand/kennet-logo-stacked.svg': stacked(THEMES.primary),
  'brand/kennet-logo-stacked-reversed.svg': stacked(THEMES.reversed),
  'brand/kennet-mark.svg': markSquare(THEMES.primary, { pad: 0 }),
  'brand/kennet-mark-reversed.svg': markSquare(THEMES.reversed, { pad: 0 }),
};
for (const [p, svg] of Object.entries(brand)) await writeFile(out(p), svg + '\n');

// PNG exports for documents, email signatures and social profiles
await sharp(Buffer.from(horizontal(THEMES.primary))).resize({ width: 1200 }).png().toFile(out('brand/kennet-logo-horizontal.png'));
await sharp(Buffer.from(markSquare(THEMES.primary, { pad: 8, bg: C.bg }))).resize(800).png().toFile(out('brand/kennet-profile-800.png'));

// Favicons and schema logo
await writeFile(out('favicon.svg'), markSquare(THEMES.primary, { pad: 0, size: 32 }) + '\n');
await sharp(Buffer.from(markSquare(THEMES.primary, { pad: 6, bg: C.bg, size: 180 }))).png().toFile(out('apple-touch-icon.png'));
await sharp(Buffer.from(markSquare(THEMES.primary, { pad: 6, bg: C.white, size: 512 }))).png().toFile(out('logo.png'));
const png32 = await sharp(Buffer.from(markSquare(THEMES.primary, { pad: 0, size: 32 }))).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0); ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6); ico.writeUInt8(32, 7); ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png32.length, 14); ico.writeUInt32LE(22, 18);
await writeFile(out('favicon.ico'), Buffer.concat([ico, png32]));

// ---------------------------------------------------------------- Open Graph images
const waves = [420, 490, 560]
  .map((y) => `<path d="M760 ${y}c73-48 147-48 220 0s147 48 220 0" stroke="#fff" stroke-opacity="0.08" stroke-width="18" fill="none"/>`)
  .join('');
const og = (eyebrow, lines) => {
  const eb = outline(sans, eyebrow.toUpperCase(), 80, 120, 21, 0.14);
  const title = lines.map((l, i) => `<path d="${outline(serif, l, 80, 248 + i * 68, 56).d}" fill="${C.ink}"/>`).join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">` +
    `<rect width="1200" height="630" fill="${C.bg}"/><rect x="760" width="440" height="630" fill="${C.teal}"/>${waves}` +
    `<g transform="translate(908 120) scale(3.6)">${markShapes(THEMES.reversed)}</g>` +
    `<path d="${eb.d}" fill="${C.brassText}"/><rect x="80" y="142" width="60" height="3" fill="${C.brass}"/>${title}` +
    `<g transform="translate(80 492) scale(1.55)">${markShapes(THEMES.primary)}<path d="${word.d}" fill="${C.ink}"/><path d="${tag.d}" fill="${C.brassText}"/></g>` +
    `</svg>`
  );
};
const pages = {
  default: ['Swindon & Wiltshire', ['Kitchen and bathroom', 'fitters in Swindon']],
  kitchens: ['Kitchens', ['Fitted kitchens,', 'designed in 3D']],
  bathrooms: ['Bathrooms', ['Bathrooms, en-suites', 'and wet rooms']],
  projects: ['Projects', ['Kitchens and bathrooms', 'we’ve fitted']],
  advice: ['Advice', ['Straight answers on', 'costs and timelines']],
  areas: ['Areas we cover', ['Local fitters for', 'Swindon and Wiltshire']],
};
for (const [name, [eyebrow, lines]] of Object.entries(pages)) {
  await sharp(Buffer.from(og(eyebrow, lines))).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(out(`og/${name}.png`));
}

console.log(`Brand assets written. Horizontal logo viewBox: 0 0 ${H_W} 52; stacked: 0 0 ${S_W} 122.`);
