// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL || 'https://kennet-kitchens.vercel.app';

export default defineConfig({
  site,
  // One trailing-slash policy everywhere: /kitchens, never /kitchens/
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Inline all CSS into each page: no render-blocking stylesheet request.
    inlineStylesheets: 'always',
  },
  prefetch: false,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
