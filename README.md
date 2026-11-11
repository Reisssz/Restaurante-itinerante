# Gastronomia Itinerante — site

Site de página única do restaurante e café Gastronomia Itinerante, na Zona Portuária do Rio de Janeiro.
Conceito: **"O carrinho que percorre o dia"**. O scroll acompanha a panela-carrinho da logo da manhã ao fim da tarde.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger + SplitText) · Lenis.

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm start          # serve o build
npm run typecheck
```

Requer Node 20.9+. Copie `.env.example` para `.env.local` e defina `NEXT_PUBLIC_SITE_URL` com o domínio final (é usado em SEO, sitemap e JSON-LD).

## Onde editar

| O quê | Arquivo |
| --- | --- |
| WhatsApp, endereço, horários, Instagram, Google Maps, PDF do cardápio | `data/site.ts` |
| Itens e preços do cardápio | `data/menu.ts` |
| Prato do dia | `data/prato-do-dia.json` |
| Fotos | `data/fotos.ts` + arquivos em `public/fotos/` |
| Textos (hero, manifesto, estações do dia, sobre) | `data/content.ts` |

### Cardápio e preços
Em `data/menu.ts`, cada item é uma linha:

```ts
{ id: "bolinho-bacalhau", nome: "Bolinho de bacalhau", preco: 38.0 },
```

- Para mudar o preço, altere `preco` (use **ponto**: `38.90`).
- Para adicionar um item, copie uma linha e troque `id` (único, sem espaço), `nome` e `preco`. `descricao` é opcional.
- `foto: "chave"` transforma o item em card de destaque com foto.
- `aPartirDe: true` exibe "a partir de" antes do preço.

O cardápio é texto real: aparece para o Google (JSON-LD `hasMenu`) e para leitores de tela.

### Prato do dia
Edite `data/prato-do-dia.json`:

```json
{ "ativo": true, "nome": "Feijoada", "descricao": "Com arroz, couve e farofa", "preco": 35.0, "foto": "" }
```

Com `"ativo": false`, a lousa mostra o cardápio executivo. Depois de editar, faça um novo deploy (na Vercel, basta dar commit).

### Fotos
1. Salve a foto em `public/fotos/` (JPG, 1600px ou mais no maior lado).
2. Em `data/fotos.ts`, preencha `src` (ex.: `"/fotos/waffle-cafe.jpg"`) e confira `largura` e `altura`.

Enquanto `src` estiver vazio, o site mostra um placeholder ilustrado da marca. O Next converte as fotos para AVIF/WebP automaticamente.

> **Atenção:** hoje todas as fotos apontam para `public/fotos/prato-ficticio.jpg`, uma imagem de banco provisória usada só na apresentação. Troque pelas fotos reais antes de publicar.

### Horários
Em `data/site.ts`, `horarios` usa `dia` de 0 (domingo) a 6 (sábado). O status "Aberto agora / Fechado agora" é calculado no navegador, sempre no fuso de São Paulo.

## Publicar (Vercel)
1. Suba o projeto para um repositório no GitHub.
2. Em vercel.com, use **Add New → Project** e importe o repositório. O framework é detectado sozinho.
3. Em **Settings → Environment Variables**, adicione `NEXT_PUBLIC_SITE_URL`.
4. Conecte o domínio em **Settings → Domains**.

## Estrutura

```
app/            layout, página, globals.css (design system), ícones, OG, sitemap, robots, manifest
components/
  marca/        CarrinhoMascote (logo em SVG), Utensilios, Calda (formas e gerador de gotas)
  secoes/       Hero, Manifesto, DiaNoCarrinho, Cardapio, PratoDoDia, Galeria, ZonaPortuaria, Visite
  cardapio/     ItemLinha, CardDestaque, BotaoAdicionar
  layout/       Header, MenuMobile, IndicadorSecao, WhatsAppFlutuante, Comanda, Rodape
  experiencia/  PreLoader, RolagemSuave (Lenis)
  efeitos/      TransicaoCalda, MarqueeUtensilios, EfeitoEstacao
  ui/           Foto, BotaoWhatsApp, Magnetico, TituloRevelado, StatusAberto, Icones
data/           conteúdo editável pelo cliente
lib/            gsap, rolagem, horário, links, formatação, pedido (comanda)
```

## Decisões técnicas
- **Movimento:** easing `expo.out` / `cubic-bezier(0.22, 1, 0.36, 1)`, e só `transform`, `opacity` e `clip-path` são animados. Com `prefers-reduced-motion`, ficam desligados pré-loader, Lenis, parallax, scroll horizontal e morph das caldas.
- **Transições "calda":** o path SVG é gerado por função (`caminhoCalda`) e mantém a mesma estrutura em qualquer progresso, então o morph é só interpolação de números. Não depende do plugin MorphSVG.
- **"O dia no carrinho":** no desktop, a seção fica fixa e o conteúdo corre na horizontal. No celular e com movimento reduzido, vira cartões empilhados com `position: sticky`.
- **Pré-loader:** vem no HTML do servidor e um script no `<head>` o esconde antes da primeira pintura em visitas repetidas da sessão. Se o JS falhar, uma animação CSS o remove depois de 3,2 s.
- **Mapa:** o Google Maps só carrega quando a pessoa clica, por performance e privacidade.
- **Framer Motion não foi usado.** O GSAP já cobre as microinterações, e uma biblioteca a menos deixa o bundle mobile menor.
