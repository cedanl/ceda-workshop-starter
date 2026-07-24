import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://astrodeck.dev',
  server: { host: '0.0.0.0' },
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: { host: '0.0.0.0', allowedHosts: ['localhost', '127.0.0.1', '.localhost'] },
  },
});
