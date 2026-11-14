# Site da Associação Doce Recanto

Site institucional da Associação Doce Recanto (AASDR-SJ), de São Joaquim/SC: blog de ações, página sobre a entidade, transparência e doações por PIX.

Feito com ferramentas de código aberto:

- [Astro](https://astro.build): gera o site estático (HTML e CSS puros, sem banco de dados).
- [Pages CMS](https://pagescms.org): painel de edição para quem não programa. A configuração fica em `.pages.yml`.

## Como editar o conteúdo (sem programar)

1. Acesse <https://app.pagescms.org> e entre com a conta do GitHub que tem acesso a este repositório.
2. Abra o repositório `blogdocerecanto`.
3. Use o menu:
   - **Ações (blog)**: criar, editar e apagar posts.
   - **Dados da associação**: CNPJ, contatos, chave PIX e diretoria.
   - **Transparência**: documentos (PDF), receitas e despesas por ano e parcerias com o poder público.

Cada vez que algo é salvo, o painel grava a alteração neste repositório. Com a hospedagem configurada, o site é atualizado sozinho.

### Cuidados ao publicar

Não publique nomes, rostos ou informações que identifiquem crianças e adolescentes acolhidos (ECA, arts. 17 e 100; LGPD, art. 14). Prefira fotos de costas, de mãos, do ambiente ou ilustrações. Imagens de jovens maiores de idade só com autorização por escrito.

## Onde fica cada coisa

| Conteúdo | Arquivo |
|---|---|
| Posts do blog | `src/content/acoes/*.md` |
| Dados da associação e PIX | `src/data/site.json` |
| Transparência | `src/data/transparencia.json` |
| Fotos e PDFs enviados | `public/uploads/` |
| Páginas | `src/pages/` |
| Visual (cores, fontes) | `src/styles/global.css` |

O QR Code e o código "copia e cola" do PIX são gerados automaticamente a partir da chave informada em **Dados da associação**. Enquanto a chave estiver vazia, a página mostra um aviso no lugar.

## Rodar no computador

Requer [Node.js](https://nodejs.org) 22 ou mais recente.

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera o site na pasta dist/
```

## Hospedagem

O resultado de `npm run build` (pasta `dist/`) pode ser publicado em qualquer hospedagem de site estático, como GitHub Pages, Cloudflare Pages ou Netlify.

### GitHub Pages

O arquivo `.github/workflows/pages.yml` publica o site no GitHub Pages a cada alteração no branch `main`. Para ativar, vá em **Settings → Pages** no repositório e escolha **GitHub Actions** em *Source*. Em contas gratuitas, o repositório precisa ser público.

### Outras hospedagens

Duas variáveis de ambiente ajustam os endereços no momento do build:

- `SITE_URL`: endereço do site, por exemplo `https://docerecanto.org.br`.
- `BASE_PATH`: só é necessária se o site ficar em uma subpasta, como no GitHub Pages sem domínio próprio (`/blogdocerecanto`).
