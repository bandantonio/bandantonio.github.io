import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	site: 'https://mister-gold.pro',
	markdown: {
		shikiConfig: {
			theme: 'rose-pine-moon',
			wrap: true,
		},
	},
	integrations: [tailwind(), mdx()],
});
