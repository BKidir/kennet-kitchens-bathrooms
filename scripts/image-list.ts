/**
 * Generates docs/image-list.md from the image registry (src/data/images.ts).
 * Run with `npm run docs:images` (Node 22.18+ strips TypeScript types natively).
 */
import { writeFileSync } from 'node:fs';
import { images } from '../src/data/images.ts';

const label: Record<string, string> = { '16/9': '16:9', '3/2': '3:2', '4/3': '4:3', '4/5': '4:5 portrait', '1/1': '1:1', '21/9': '21:9' };

const rows = Object.entries(images).map(([key, i]) => {
  const [w, h] = i.ratio.split('/').map(Number);
  const dims = `${label[i.ratio]}, at least ${i.width} × ${Math.round((i.width * h) / w)}`;
  return `### \`${i.file}.jpg\`

- **Registry key:** \`${key}\`
- **Used on:** ${i.usedOn.join(', ')}
- **Aspect ratio / size:** ${dims} px
- **Alt text:** ${i.alt}
- **Pexels / Unsplash search:** \`${i.search}\`
- **AI prompt:** ${i.prompt}
`;
});

const md = `# Image list

Every photo the site uses, generated from \`src/data/images.ts\` by \`npm run docs:images\`.
${Object.keys(images).length} images in total.

## How to add a photo

1. Find or generate the image (see the search terms and prompts below).
2. Crop it to the aspect ratio listed. The source should be at least the width listed; larger is fine because Astro generates the smaller sizes.
3. Save it as \`src/assets/images/<file name>.jpg\` (\`.png\`, \`.webp\` and \`.avif\` also work), using the exact file name below.
4. Record the source in \`docs/image-credits.md\`.
5. Rebuild. The placeholder is replaced automatically with responsive AVIF and WebP versions.

**Consistent style:** natural daylight, warm neutral tones, modern British homes. Avoid visible brand logos and identifiable faces (hands and backs are fine). Keep the camera roughly level and avoid heavy filters so the set feels like one photographer shot it.

**Before/after pairs** (\`*-before\` / \`*-after\`) should be framed from the same position at the same aspect ratio, so the comparison slider lines up.

---

${rows.join('\n')}`;

writeFileSync(new URL('../docs/image-list.md', import.meta.url), md);
console.log(`Wrote docs/image-list.md (${Object.keys(images).length} images)`);
