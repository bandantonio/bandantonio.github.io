import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://mister-gold.pro',
  markdown: {
    shikiConfig: {
      theme: 'rose-pine-moon',
      wrap: true,
    }
  },
  integrations: [tailwind(), sitemap()]
});