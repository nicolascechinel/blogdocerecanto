import { defineConfig } from 'astro/config';

// SITE_URL e BASE_PATH dependem da hospedagem escolhida.
// Ex. GitHub Pages sem domínio próprio:
//   SITE_URL=https://nicolascechinel.github.io BASE_PATH=/blogdocerecanto
// Com domínio próprio, basta SITE_URL=https://seudominio.org.br
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
});
