import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const featureImageCredit = z
  .object({
    name: z.string(),
    profile_url: z.string().url(),
    unsplash_url: z.string().url(),
  })
  .optional();

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    feature_image: z.string().optional(),
    feature_image_credit: featureImageCredit,
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
    photo_album: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date().optional(),
    excerpt: z.string().optional(),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/photos' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    cover: z.string().optional(),
    images: z.array(
      z.object({
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      }),
    ),
    related_post: z.string().optional(),
  }),
});

export const collections = { blog, pages, photos };
