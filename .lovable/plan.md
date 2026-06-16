## Objetivo

Reaproveitar o site demo atual (Barberalia · Sistema IA) e transformá-lo numa demo para a **Friparque** (peças e acessórios de eletrodomésticos — friparque.pt). Mantém-se toda a arquitetura, secções, dashboards e os agentes ElevenLabs existentes. Só muda o que é apresentação: copy, marca, paleta de cores e dados ilustrativos.

---

## 1. Branding & identidade

- Nome em toda a app: **Barberalia → Friparque**
- Tagline: **"Sistema IA · Activo"** mantém-se, mas o subtítulo passa a referir peças e eletrodomésticos.
- Footer: morada/localização passa de "Albufeira, Faro" para a morada Friparque (Lisboa, conforme site oficial). "Powered by Waldyn" mantém-se.
- Logótipo placeholder: o "B" dourado no header do chat passa a "F".
- `index.html`: title, meta description, OG/Twitter tags atualizados para Friparque.
- Favicon: pedir/gerar novo (ou manter placeholder).

## 2. Nova paleta (azul + laranja industrial/técnico)

Substituir em `src/index.css` os tokens `--gold*` (cor principal) e os `--dark*` (fundo) por:

```text
Primária   (laranja Friparque): ~#E8631A
Secundária (azul técnico):       ~#1E3A8A / acento #3B82F6
Neutros:   fundo claro #F7F7F5, dark slate #0F172A, cinza #475569
Estado verde/vermelho: manter (semáforos do dashboard)
```

Decisão a tomar contigo: **fundo escuro com acentos laranja/azul** (mantém o "feel" premium atual) **ou** **fundo claro estilo retalho/loja online** (mais próximo do site real Friparque). Por defeito proponho **manter dark + acentos laranja/azul** para preservar o impacto visual da demo.

Tokens novos a renomear semanticamente: `--gold` → `--brand` (laranja), introduzir `--accent-blue`. Todos os usos `gold/gold-light/gold-pale` nos componentes passam a `brand/brand-light/...` via find-replace controlado.

## 3. Conteúdo por secção

- **Hero** (`Hero.tsx`): título e subtítulo para "Sistema IA para peças de eletrodomésticos", métricas adaptadas (categorias, referências, marcas suportadas).
- **WhatWorks** (`WhatWorks.tsx`): exemplos de casos passam de barbearia (cortes, marcação, produtos) para Friparque (consulta de stock por modelo/referência, compatibilidade de peças, prazos de entrega, devoluções, faturação B2B).
- **DemoSection** (`DemoSection.tsx`):
  - Header do chat: "Friparque Atendimento", letra "F".
  - Painel lateral "Dados em tempo real": cliente, intenção ("Procura peça · resistência forno Bosch"), referência (`#FP-2025-…`), estado ("Em stock · envio 24h"), escalada.
  - Contextual update enviado ao agente ElevenLabs: texto adaptado ao domínio Friparque (continuar a indicar modo chat de texto e que pode enviar URLs do catálogo `pecas.friparque.pt`).
  - Bloco final: "base de conhecimento Friparque — catálogo, compatibilidades, encomendas e devoluções indexados".
- **Dashboard** (`Dashboard.tsx`): KPIs e legendas adaptados (ex.: "Pedidos de compatibilidade", "Procuras sem stock", "Conversões → checkout"). Mantém-se gráficos e estrutura.
- **Roadmap** (`Roadmap.tsx`): fases reescritas para o contexto Friparque (integração catálogo, OCR de chapa de características, recomendação de peças compatíveis, integração ERP).
- **Projecao** (`Projecao.tsx`): números de projeção reescritos para volumes plausíveis de e-commerce de peças.
- **Navbar** (`Navbar.tsx`): label "BARBERALIA" → "FRIPARQUE".

## 4. Agentes ElevenLabs

- IDs **mantêm-se** (reutilizar os atuais) conforme pedido.
- Só muda o `sendContextualUpdate` no `DemoSection.tsx` para descrever o negócio Friparque, catálogo em `pecas.friparque.pt` e regras (envio de links de produto/checkout permitido).

## 5. SEO

- `<title>` e `<meta description>` em `index.html` reescritos (≤60 / ≤160 chars) com foco em "Friparque · Atendimento IA para peças de eletrodomésticos".
- OG/Twitter image: manter placeholder ou gerar nova imagem laranja/azul.
- Canonical relativo (`/`) — sem domínio fixo.

## 6. Ficheiros tocados (resumo)

```text
src/index.css                              tokens de cor (gold→brand, dark mantém-se)
tailwind.config.ts                         aliases de cor, se necessário
src/components/barberalia/Navbar.tsx       label
src/components/barberalia/Hero.tsx         copy + métricas
src/components/barberalia/WhatWorks.tsx    casos de uso
src/components/barberalia/DemoSection.tsx  header chat, painel lateral, contextual update
src/components/barberalia/Dashboard.tsx    KPIs e legendas
src/components/barberalia/Roadmap.tsx      fases
src/components/barberalia/Projecao.tsx     números
src/components/barberalia/Footer.tsx       nome + morada
index.html                                 SEO + favicon
```

Não se mexe em: estrutura de componentes, integração ElevenLabs, integração Supabase/Cloud, lógica de scroll/animations.

## 7. Fora de âmbito (para confirmares depois)

- Ligação real ao catálogo `pecas.friparque.pt` (scraping/Firecrawl) — só se quiseres mais tarde.
- Criação de novos agentes ElevenLabs específicos Friparque.
- Mudança para tema claro (atualmente proposto manter dark).
- Domínio personalizado e logo definitivo.

Se aprovares, começo pelo branding (tokens + Navbar + Footer + index.html) e depois desço secção a secção pelo copy.