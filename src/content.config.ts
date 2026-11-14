import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Posts do blog "Ações". Cada arquivo .md em src/content/acoes é um post.
const acoes = defineCollection({
  loader: glob({ base: './src/content/acoes', pattern: '**/*.md' }),
  schema: z.object({
    titulo: z.string(),
    data: z.coerce.date(),
    resumo: z.string().optional(),
    capa: z.string().nullish(),
    capaDescricao: z.string().nullish(),
    rascunho: z.boolean().optional().default(false),
  }),
});

export const collections = { acoes };
