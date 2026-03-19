import { defineCollection, z } from 'astro:content';

const me = defineCollection({
	schema: z.object({
		list: z.array(z.object({
			name: z.string(),
			icon: z.string()
		})),
	})
});
