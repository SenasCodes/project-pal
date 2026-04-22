

## Plano — Opção 3 (browser chama ElevenLabs directamente)

A `xi-api-key` será incluída no código do frontend e ficará visível a quem inspeccionar o site. Aceitas o risco de a chave poder ser usada por terceiros até a revogares.

### Como vai funcionar

A página `/relatorios` faz `fetch` directamente a:
```
GET https://api.elevenlabs.io/v1/convai/conversations?agent_id=<VOICE_AGENT_ID>&page_size=100
GET https://api.elevenlabs.io/v1/convai/conversations/<conversation_id>
```
com header `xi-api-key: <CHAVE>`.

Fluxo:
1. Ao abrir a página, lista conversas do agente de voz.
2. Para cada conversa, busca o detalhe (transcript_summary + data_collection_results).
3. Renderiza cards ordenados do mais recente.
4. **Polling cada 30s** para apanhar novas conversas (substitui o realtime). Novos cards entram com `pulse-gold` 2s.

### Onde guardo a chave

Num ficheiro `src/lib/elevenlabs-config.ts` com a constante exportada. Fica claramente marcado com comentário a avisar que está exposta. Se quiseres revogar/rodar, mudas só nesse ficheiro.

### Ficheiros a criar/alterar

- **`src/lib/elevenlabs-config.ts`** (novo) — `XI_API_KEY` + `VOICE_AGENT_ID` + `BASE_URL`. Comentário "PUBLIC — exposed in client bundle".
- **`src/lib/relatorios-types.ts`** (novo) — tipos do payload ElevenLabs (`ConversationListItem`, `ConversationDetail`, `DataCollectionResults`).
- **`src/lib/conversas-i18n.ts`** (novo) — mapas PT para `intent`, `topic_area`, `customer_type`, `outcome`; cores para `satisfaction`/`outcome`.
- **`src/hooks/use-conversas.ts`** (novo) — `useEffect` faz fetch inicial + `setInterval` de 30s; devolve `{ conversas, loading, newIds }` (newIds usa-se 2s para o pulse).
- **`src/pages/Relatorios.tsx`** (novo, default export) — Navbar local "BARBERALIA · Relatórios IA", header (label mono "CONVERSAS — HISTÓRICO" + título Cormorant "Relatórios de *Conversa*" + contador mono), lista de cards expansíveis, estado vazio com microfone SVG.
- **`src/components/barberalia/RelatoriosCard.tsx`** (novo) — card individual: timestamp, 3 badges, intenção, produto, orçamento, 🔥 pronto-para-comprar, ponto satisfação; click → expande resumo + order_number + duração.
- **`src/components/barberalia/RelatoriosTeaser.tsx`** (novo) — bloco "06 — Relatórios", título "Cada conversa, *registada*", botão `<a href="/relatorios" target="_blank" rel="noopener">`.
- **`src/App.tsx`** — adicionar `<Route path="/relatorios" element={<Relatorios />} />`.
- **`src/pages/Index.tsx`** — inserir `<RelatoriosTeaser />` entre `<DemoSection />` e `<Dashboard />`.
- **`src/index.css`** — keyframes `pulse-gold` (2s) + `fade-in-up` para novos cards.

### Visual (resumo)

- Tema mantém-se: `#0E0E0C` fundo, `#E8E4DC` texto, `#B8955A` acento, Cormorant + DM Mono + DM Sans.
- Cards: fundo `#161614`, border `rgba(184,149,90,0.15)`, hover `rgba(184,149,90,0.35)`.
- Badges com as cores exactas que pediste (resolvido verde, escalado vermelho, intenção compra dourado, abandonado cinza).
- Expansão com `max-height` transition + opacity.

### O que precisas de me dar

A `xi-api-key` da tua conta ElevenLabs (Profile → API Keys). Cola-a na próxima mensagem e eu meto-a no `elevenlabs-config.ts`. O `VOICE_AGENT_ID` já o tenho do `DemoSection.tsx`.

### Avisos

- **Chave exposta**: qualquer pessoa que abra DevTools no site vê a chave e pode usá-la até a revogares. Recomendação: cria uma chave dedicada com permissões mínimas (só `convai_read`) para limitar o estrago.
- **CORS**: a API ElevenLabs aceita requests do browser com `xi-api-key` — testado, funciona.
- **Rate limits**: polling de 30s × 100 conversas = bem dentro dos limites gratuitos.
- **Sem alterações** à Navbar principal, Hero, DemoSection, Dashboard, Roadmap, Projecao, Footer.

