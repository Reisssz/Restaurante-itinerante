# PREENCHER — o que depende do cliente

Os dados abaixo **não estavam visíveis** nos prints enviados ou **aparecem em conflito**. Nada foi inventado: os campos estão vazios ou marcados no código.

## Obrigatório antes de publicar

| Campo | Onde | Situação |
| --- | --- | --- |
| **[NÚMERO WHATSAPP com DDI+DDD]** | `data/site.ts` → `whatsapp` (ex.: `"5521999999999"`) | Não aparece nos prints. Enquanto estiver vazio, os botões abrem o WhatsApp **sem destinatário**. |
| **[HORÁRIO DE FUNCIONAMENTO]** | `data/site.ts` → `horarios` | **Conflito:** o story diz *Seg–Sex 8:30–16:00 · Sáb 10:00–16:00 · Dom fechado* (é o que está no site). A bio diz *Seg–Sáb 8h–17h*. Confirmar qual vale. |
| **[@INSTAGRAM]** | `data/site.ts` → `instagram.usuario` e `instagram.url` | O print mostra só "gastronomiaitinerant…" (cortado). Enquanto estiver vazio, os links levam ao Linktree `linktr.ee/itineranterio`. |
| **[LINK GOOGLE MAPS]** | `data/site.ts` → `googleMapsUrl` | Hoje usa uma busca pelo endereço da bio. Trocar pelo link da ficha oficial no Google. |
| **[BAIRRO] e [CEP]** | `data/site.ts` → `endereco.bairro`, `endereco.cep` | Só "Avenida Rodrígues Alves 173 A, Rio de Janeiro" aparece na bio. |
| **Domínio** | `.env.local` / Vercel → `NEXT_PUBLIC_SITE_URL` | Necessário para SEO, sitemap e JSON-LD. |

## Fotos (prioridade alta)
O site está pronto para receber as fotos. **Hoje todas usam a mesma foto de banco provisória** (`public/fotos/prato-ficticio.jpg`), só para a apresentação: ela não mostra comida do cliente e precisa ser trocada antes de publicar. Pedir fotos **originais em alta** (não prints do cardápio), de preferência em luz natural:

1. Waffle de pão de queijo com requeijão, goiabada e café → `waffle-cafe`
2. Misto quente de waffle de pão de queijo → `misto-waffle`
3. Fritas com cheddar e bacon → `fritas-cheddar`
4. Aipim com carne seca → `aipim-carne-seca`
5. Pão australiano gratinado com fritas → `australiano-frango`
6. Pão australiano com linguiça, cheddar e bacon → `australiano-linguica`
7. Pratos do almoço nas travessas de barro → `pratos-almoco`

Extras desejáveis: fachada/balcão, o carrinho/logo físico, equipe (com autorização) e o prato do dia. Veja "Fotos" no README para ativar cada uma.

## Textos sugeridos (validar com o cliente)
Foram escritos **apenas** a partir do cardápio e da bio. Estão em `data/content.ts`, marcados com `sugerido: true`:

- Hero: "Comida de verdade, no ritmo do porto."
- Manifesto: "Pão na chapa de manhã, picadinho no almoço, aipim com carne seca no fim da tarde…"
- Selos: "Do café ao almoço", "Molho Itinerante", "Pão australiano gratinado"
- Textos das estações Manhã / Meio-dia / Tarde
- "Uma panela com rodas." (seção Sobre)
- "Passa aqui." (seção Visite)

## Opcionais
- **Cardápio em PDF:** coloque o arquivo em `public/cardapio.pdf` e preencha `cardapioPdf: "/cardapio.pdf"`.
- **Telefone fixo:** `data/site.ts` → `telefone`.
- **Selos "Mais pedido" / "Pra dividir":** só ligar (`exibirSelos: true`) se o cliente confirmar quais itens merecem.
- **Logo vetorial oficial:** a panela-carrinho foi redesenhada em SVG a partir da imagem. Se existir o arquivo original (AI/SVG), vale comparar os traços.
- **Sobremesas, sorvetes e picolés:** hoje aparece só a nota "consulte o atendente". Se quiserem listar, basta enviar itens e preços.
