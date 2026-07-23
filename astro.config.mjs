import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Deployed to GitHub Pages as a project site:
// https://meadowgarderner.github.io/ceda-workshop-starter
export default defineConfig({
  site: 'https://meadowgarderner.github.io',
  base: '/ceda-workshop-starter',
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
  },
});
