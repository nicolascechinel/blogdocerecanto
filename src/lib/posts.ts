import { getCollection } from 'astro:content';

// Posts publicados (sem rascunhos), do mais recente para o mais antigo.
export async function postsPublicados() {
  const posts = await getCollection('acoes', ({ data }) => !data.rascunho);
  return posts.sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf());
}
