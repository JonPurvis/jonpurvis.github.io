// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { fetchMyHerdUnique, herdCountPayload } from './scripts/elephpant-herd.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jonathanpurvis.co.uk',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [
      {
        name: 'elephpant-herd-count-dev',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.split('?')[0] !== '/elephpant-herd-unique.json') {
              next();
              return;
            }

            const env = loadEnv(server.config.mode, server.config.root, '');
            const token = env.ELEPHPANT_API_TOKEN?.trim();
            if (!token) {
              res.statusCode = 500;
              res.end('ELEPHPANT_API_TOKEN not set');
              return;
            }

            const unique = await fetchMyHerdUnique(token);
            if (unique === null) {
              res.statusCode = 502;
              res.end('GET /api/me/herd did not return HTTP 200');
              return;
            }

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            res.statusCode = 200;
            res.end(herdCountPayload(unique));
          });
        },
      },
    ],
  },
  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
