

## Objetivo

Integrar **dois widgets reais ElevenLabs** na `DemoSection`:
- **Agente de Texto** (`agent_2401kprqge5vfjstncfjqzczmncn`) → separador "Chat WhatsApp"
- **Agente de Voz** (`agent_2701kpsk2vq6e0yas1293het2n94`) → separador "Agente de Voz"

Ambos são agentes públicos do ElevenLabs, portanto **não precisam de backend, API key nem Lovable Cloud**. Basta o Web Component oficial.

## Implementação

**1. Carregar o script do widget (uma vez)**
- Adicionar em `index.html`, antes do `</body>`:
  ```html
  <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
  ```
- Carregar uma única vez evita duplicação entre separadores.

**2. Tipar o custom element para TypeScript**
- Em `src/vite-env.d.ts`, declarar `<elevenlabs-convai>` no namespace JSX para o TS aceitar a tag e o atributo `agent-id`.

**3. Substituir `VoiceDemo` em `DemoSection.tsx`**
- Remover o placeholder decorativo (microfone animado + snippet de código em texto).
- Renderizar `<elevenlabs-convai agent-id="agent_2701kpsk2vq6e0yas1293het2n94">` dentro do cartão dourado.
- Manter o título, copy e a lista de features à volta do widget.
- Ajustar `min-h` do container para acomodar a altura do widget (~520px).

**4. Substituir o `WhatsAppDemo` (chat simulado) pelo agente de texto**
- Remover a lógica de simulação (`replyFor`, regex, mensagens hardcoded, input falso).
- Renderizar `<elevenlabs-convai agent-id="agent_2401kprqge5vfjstncfjqzczmncn">` dentro do mesmo "telemóvel" verde do WhatsApp.
- Manter o **header verde** (avatar Barberalia, nome, "online") como moldura visual à volta do widget para preservar o look WhatsApp.
- Ajustar dimensões do "ecrã" do telemóvel para o widget caber bem (largura ~360px, altura ~560px).

**5. Tema dos widgets**
- O widget ElevenLabs herda o tema do site automaticamente em muitos casos; se ficar com cores destoantes, aplico atributos de cor suportados (`avatar-image-url`, variant) ou `::part()` em CSS para alinhar ao dourado/escuro da Barberalia.

## Notas importantes

- **Allowed origins**: confirma no painel ElevenLabs de **cada agente** → Settings → Security → adiciona `https://*.lovable.app` e o futuro domínio final. Sem isto, o widget bloqueia por CORS e não carrega.
- **Sem custos de infraestrutura no Lovable**: tudo corre no browser do visitante, ligado direto ao ElevenLabs.
- **Microfone**: o widget de voz pede permissão automaticamente quando o utilizador clica em "Start".
- O design exterior (tabs, cartões, copy, badges, KPIs no Dashboard) **não muda** — só o miolo dos dois demos passa a ser real.

## Ficheiros a alterar

- `index.html` — adicionar script do widget
- `src/vite-env.d.ts` — declarar tipo do custom element
- `src/components/barberalia/DemoSection.tsx` — substituir `VoiceDemo` e `WhatsAppDemo` pelos widgets reais

