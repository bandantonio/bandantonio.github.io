import { defineCollection } from 'astro:content';

const workCollection = defineCollection({});

export const collections = {
	work: workCollection,
};
