import { defineCollection, z } from 'astro:content';

const resume = defineCollection({});
const me = defineCollection({
	schema: z.object({
		list: z.array(z.object({
			name: z.string(),
			icon: z.string()
		})),
	})
});

export const collections = {
	'resume': resume,
	'me': me
};
