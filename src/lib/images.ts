import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { images, type ImageKey } from '@/data/images';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const name = path.split('/').pop()!.replace(/\.[a-z]+$/i, '');
  byName.set(name, mod.default);
}

/** The real image for a registry key, or undefined while it is still a placeholder. */
export function resolveImage(key: ImageKey): ImageMetadata | undefined {
  return byName.get(images[key].file);
}

export const RESPONSIVE_WIDTHS = [400, 640, 800, 1024, 1280, 1600, 2000, 2400];

export function widthsFor(src: ImageMetadata, max = 2400) {
  const list = RESPONSIVE_WIDTHS.filter((w) => w <= Math.min(src.width, max));
  return list.length ? list : [src.width];
}

/** Preload hints for the LCP hero image (AVIF). Returns null for placeholders. */
export async function heroPreload(key: ImageKey, sizes: string) {
  const src = resolveImage(key);
  if (!src) return null;
  const img = await getImage({ src, format: 'avif', widths: widthsFor(src), sizes });
  return { href: img.src, srcset: img.srcSet.attribute, sizes };
}

/** Absolute URL of a real image (for Open Graph / schema), or undefined. */
export async function imageUrl(key: ImageKey, width = 1200) {
  const src = resolveImage(key);
  if (!src) return undefined;
  const img = await getImage({ src, format: 'jpg', width: Math.min(width, src.width) });
  return img.src;
}
