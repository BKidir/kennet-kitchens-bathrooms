import type { APIRoute } from 'astro';
import { IS_DEMO } from '@/config';

/**
 * Crawling stays allowed even in demo mode: crawlers must be able to fetch pages
 * to see their `noindex` meta tag. Blocking here could leave URLs indexed without content.
 */
export const GET: APIRoute = ({ site }) => {
  const body = [
    IS_DEMO ? '# Demo site: every page carries <meta name="robots" content="noindex, nofollow">' : '',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('/sitemap-index.xml', site).href}`,
    '',
  ]
    .filter((l, i) => l !== '' || i > 0)
    .join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
