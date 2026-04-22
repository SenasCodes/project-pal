

## Plano — Webhook ElevenLabs (push em vez de polling)

### Arquitectura

1. **Lovable Cloud activado** (necessário para edge function pública + tabela).
2. **Tabela `conversas`** (Supabase): guarda o que o webhook envia.
   - Campos: `id` (uuid), `conversation_id` (text unique), `agent_id`, `start_time_unix_secs`, `duration_secs`, `summary`, `intent`, `topic_area`, `customer_type`, `product_name`, `budget`, `ready_to_buy`, `outcome`, `order_number`, `satisfaction`, `transcript` (jsonb), `raw` (jsonb), `created_at`.
   - **RLS**: SELECT público (página é pública); INSERT só via service role.
   - **Realtime activado** (REPLICA IDENTITY FULL + publication).
3. **Edge function `elevenlabs-webhook`** (`verify_jwt = false`):
   - Recebe POST do ElevenLabs.
   - Valida header `ElevenLabs-Signature` (HMAC-SHA256) com o secret partilhado.
   - Extrai `transcript_summary` + `data_collection_results` + `transcript`.
   - `UPSERT` na tabela `conversas` por `conversation_id` (idempotente — se reenviarem, não duplica).
   - Devolve `200 OK`.
4. **Página `/relatorios`**: já criada — só troco a fonte de dados:
   - Remover `useConversas` (polling ElevenLabs).
   - Novo `useConversasDb` que faz `select` inicial à tabela + subscrição realtime `postgres_changes` (INSERT/UPDATE).
   - `pulse-gold` 2s para novos cards.
5. **Apagar** `src/lib/elevenlabs-config.ts` (chave já não exposta no frontend ✅).

### Configuração ElevenLabs (passos para ti, no fim)

No painel ElevenLabs:
- **Workspace → Webhooks → Create a Webhook**
  - Name: `Barberalia Conversas`
  - Callback URL: `https://<PROJECT-REF>.supabase.co/functions/v1/elevenlabs-webhook` (dou-te o URL exacto após criar a função)
  - Auth Method: **HMAC** → ele gera um secret → copias e cola-lo quando eu pedir (`ELEVENLABS_WEBHOOK_SECRET`)
- **No agente de voz** (`agent_2701kpsk2vq6e0yas1293het2n94`) → Settings → Post-call webhook → seleccionar o webhook criado → activar `transcript`, `analysis`, `data_collection_results`.

### Vantagens vs polling

- ✅ Sem chave API exposta no frontend
- ✅ Push em tempo real (não 30s de delay)
- ✅ Sem rate-limit ElevenLabs
- ✅ Histórico persistente próprio (não dependes da retenção deles)
- ✅ Idempotente (UPSERT por `conversation_id`)

### Ficheiros a alterar/criar

- **Activar Lovable Cloud** (região: Europe).
- **Migração SQL**: criar tabela `conversas` + RLS + realtime.
- **`supabase/functions/elevenlabs-webhook/index.ts`** (novo).
- **`supabase/config.toml`**: registar função com `verify_jwt = false`.
- **Secret**: `ELEVENLABS_WEBHOOK_SECRET` (peço-te depois).
- **`src/hooks/use-conversas.ts`** → reescrever para usar Supabase client (select + realtime).
- **`src/lib/elevenlabs-config.ts`** → apagar.
- **`src/lib/relatorios-types.ts`** → simplificar (manter só `ConversaCard`).
- **Sem alterações** ao `Relatorios.tsx`, `RelatoriosCard.tsx`, `RelatoriosTeaser.tsx`, `i18n` — interface mantém-se igual.

### Ordem de execução

1. Activar Lovable Cloud (precisa da tua aprovação no botão).
2. Criar tabela + edge function + reescrever hook.
3. Dou-te o URL do webhook + peço o secret HMAC.
4. Configuras no painel ElevenLabs e fazes uma chamada de teste.

Confirma que avanço com a activação do Lovable Cloud.

