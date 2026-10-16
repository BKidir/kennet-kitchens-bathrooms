/**
 * The public, clean path of the current page. With `build.format: 'file'`,
 * Astro.url reports the built file (`/kitchens.html`, `/index.html`), but the
 * site is served without extensions, so strip them: `/kitchens`, `/`.
 */
export function cleanPath(url: URL): string {
  const p = url.pathname
    .replace(/\.html$/, '')
    .replace(/\/index$/, '/')
    .replace(/\/$/, '');
  return p || '/';
}
