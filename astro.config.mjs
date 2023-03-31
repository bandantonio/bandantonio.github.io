import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from "@astrojs/partytown";
export default defineConfig({
  site: 'https://mister-gold.pro',
  markdown: {
    shikiConfig: {
      theme: 'rose-pine-moon',
      wrap: true
    }
  },
  integrations: [
    tailwind(), 
    mdx(), 
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    })
  ]
});