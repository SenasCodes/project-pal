

## Diagnóstico

O ElevenLabs já envia um `transcript_summary` no post-call webhook (resumo gerado automaticamente pelo agente). Não precisamos de chamar Anthropic nem Lovable AI — eliminamos uma dependência, uma chave API e latência na edge function.

## Plano

### 1. Tabela Supabase `conversas`

Schema com os campos pedidos. RLS activa:
- **SELECT público** (anon + authenticated) — a página `/relatorios` é pública.
- **INSERT só via service role** (a edge function usa service role key).
- Realtime activo (`REPLICA IDENTITY FULL` + adicionar à publicação `supabase_realtime`).

### 2. Edge Function `elevenlabs-webhook`

`supabase/functions/elevenlabs-webhook/index.ts`, **public** (`verify_jwt = false`) — o ElevenLabs não envia JWT.

Fluxo:
1. Recebe POST do ElevenLabs com payload do tipo:
   ```
   { conversation_id, duration_secs, transcript,
     analysis: { transcript_summary, data_collection_results: {...} } }
   ```
2. Lê o resumo directamente de `analysis.transcript_summary` (sem chamar AI).
3. Extrai `data_collection_results` (cada campo vem como `{ value, rationale }` — pegar `.value`).
4. `INSERT` na tabela `conversas` via service role client.
5. Devolve `200 OK`.

Validação opcional do header `ElevenLabs-Signature` (HMAC) — adicionada se o utilizador fornecer o webhook secret depois; por agora aceita qualquer POST.

### 3. Página `/relatorios`

`src/pages/Relatorios.tsx` (default export) + rota em `App.tsx`.

Estrutura:
- Navbar local "BARBERALIA · Relatórios IA" (mesma estética da Navbar principal).
- Header: label mono "CONVERSAS — HISTÓRICO", título Cormorant "Relatórios de *Conversa*", contador mono.
- Lista de cards (mais recente primeiro), cada card com:
  - Topo: timestamp + 3 badges (outcome, topic_area traduzido, customer_type traduzido).
  - Corpo: intenção legível, produto, orçamento (`até €X`), 🔥 "Pronto para comprar" se aplicável, ponto de satisfação colorido.
  - Click → expande (animação `max-height` + fade) revelando: resumo IA (italic, DM Sans 13px), `order_number`, duração em segundos.
- Realtime: subscrição Supabase `postgres_changes` INSERT → prepend ao state, classe CSS `pulse-gold` 2s.
- Estado vazio: ícone microfone SVG + textos pedidos.

Mapas de tradução (intent, topic_area, customer_type, outcome, satisfaction → cor) num módulo helper.

### 4. Bloco na página principal

`src/components/barberalia/RelatoriosTeaser.tsx`, inserido em `Index.tsx` **entre `DemoSection` e `Dashboard`**:
- Label "06 — Relatórios"
- Título Cormorant "Cada conversa, *registada*"
- Descrição
- Botão `<a href="/relatorios" target="_blank" rel="noopener">` "Ver Relatórios →" com border/texto `#B8955A`, fundo transparente, hover `rgba(184,149,90,0.08)`.

Renumerar secções subsequentes se usarem labels "06/07…" (verificar Dashboard/Roadmap/Projecao).

### 5. Setup necessário

Após criar o backend mostro o URL do webhook para configurar no painel ElevenLabs:
```
https://<PROJECT-REF>.supabase.co/functions/v1/elevenlabs-webhook
```
No painel de cada agente: **Post-call webhook** → colar URL → activar campos `transcript`, `analysis`, `data_collection_results`.

## Ficheiros a criar/alterar

- **Migração SQL**: criar tabela `conversas` + RLS + realtime.
- **`supabase/functions/elevenlabs-webhook/index.ts`** (novo).
- **`supabase/config.toml`**: registar função com `verify_jwt = false`.
- **`src/pages/Relatorios.tsx`** (novo, default export).
- **`src/lib/conversas-i18n.ts`** (novo, mapas de tradução + cores).
- **`src/components/barberalia/RelatoriosTeaser.tsx`** (novo).
- **`src/App.tsx`**: adicionar `<Route path="/relatorios" element={<Relatorios />} />`.
- **`src/pages/Index.tsx`**: inserir `<RelatoriosTeaser />` após `<DemoSection />`.
- **`src/index.css`**: keyframes `pulse-gold` + animação fade-in para novos cards.

## Notas

- **Sem chave Anthropic/Lovable AI necessária** — usamos o resumo do próprio ElevenLabs.
- **RLS**: SELECT anónimo é seguro porque a página é pública por design; nenhum dado pessoal sensível é guardado (só intenções/produtos/satisfação). Se preferires acesso restrito depois, mudamos.
- **Sem alterações** à Navbar principal, Hero, DemoSection, Dashboard, Roadmap, Projecao, Footer.

