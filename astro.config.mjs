// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jonathanpurvis.co.uk',
  trailingSlash: 'always',
  integrations: [sitemap()],
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
