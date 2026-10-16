import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { images } from '@/data/images';

const imageKey = z.enum(Object.keys(images) as [keyof typeof images, ...(keyof typeof images)[]]);
const faq = z.object({ q: z.string(), a: z.string() });

/** Service pages: /kitchen-design, /wet-rooms, ... (Markdown body = page copy). */
const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: z.object({
    category: z.enum(['kitchens', 'bathrooms']),
    name: z.string(), // short name for cards and links
    serviceType: z.string(),
    order: z.number(),
    title: z.string().max(60),
    description: z.string().max(155),
    keyword: z.string(),
    h1: z.string(),
    lead: z.string(),
    summary: z.string(), // card blurb
    image: imageKey,
    facts: z.object({ price: z.string(), duration: z.string(), includes: z.array(z.string()) }),
    projects: z.array(z.string()).default([]),
    gallery: z.array(imageKey).default([]),
    faqs: z.array(faq),
    related: z.array(z.string()),
    areas: z.array(z.string()),
  }),
});

/** Area pages: /kitchen-bathroom-fitters-<town>. */
const areas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/areas' }),
  schema: z.object({
    town: z.string(),
    order: z.number(),
    title: z.string().max(60),
    description: z.string().max(155),
    keyword: z.string(),
    h1: z.string(),
    lead: z.string(),
    image: imageKey,
    travel: z.string(),
    neighbourhoods: z.array(z.string()),
    project: z.object({ title: z.string(), text: z.string(), image: imageKey, href: z.string().optional() }),
    nearby: z.array(z.string()),
    faqs: z.array(faq).default([]),
  }),
});

/** Case studies: /projects/<slug>. */
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(60),
    description: z.string().max(155),
    category: z.enum(['kitchens', 'bathrooms', 'wet-rooms']),
    location: z.string(),
    property: z.string(),
    duration: z.string(),
    budget: z.string(),
    summary: z.string(),
    before: imageKey,
    after: imageKey,
    gallery: z.array(imageKey),
    materials: z.array(z.object({ item: z.string(), detail: z.string() })),
    services: z.array(z.string()),
    order: z.number(),
  }),
});

/** Advice articles: /advice/<slug>. */
const advice = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/advice' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(60),
    description: z.string().max(155),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: imageKey,
    readingTime: z.string(),
    related: z.array(z.string()),
  }),
});

export const collections = { services, areas, projects, advice };
