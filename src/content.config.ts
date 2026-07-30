import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 새 글 추가 = 해당 폴더에 md 파일 하나. 그걸로 끝.
const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    status: z.enum(['live', 'wip', 'archived']).default('archived'),
    url: z.string().url().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/now' }),
  schema: z.object({}),
});

export const collections = { works, notes, now };
