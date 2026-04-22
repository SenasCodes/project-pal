

## Diagnóstico

Pela screenshot:
- O **widget de chat** abre como bolha branca flutuante no canto, sobreposta ao painel "Dados em tempo real" — devia estar **embebido na zona escura à esquerda** (o "ecrã" do telemóvel).
- O **widget de voz** também aparece como bolha no canto — devia estar **dentro do cartão dourado** à direita.
- Há **duas bolhas visíveis ao mesmo tempo** (ícone laranja + telefone) → os dois widgets estão montados em simultâneo, mesmo só um separador estar visível.
- As cores brancas da bolha **destoam** completamente do tema dourado/escuro.

A razão técnica: `variant="expanded"` não força inline em todos os browsers/versões do widget — o widget continua a renderizar-se como floating bubble, ancorado ao `<body>`, ignorando o container pai. Além disso, ambos os `<elevenlabs-convai>` (chat e voz) ficam no DOM porque o `Fragment key={tab}` não desmonta o widget interno (é um custom element com estado próprio).

## Solução

**1. Forçar verdadeiro embed inline com `<iframe>`**

Em vez do custom element `<elevenlabs-convai>` (que renderiza floating), usar o **iframe oficial do ElevenLabs**:
```
https://elevenlabs.io/app/talk-to?agent_id=AGENT_ID
```
O iframe respeita 100% as dimensões do container pai, não tem bolha flutuante, e pode ser estilizado com border/background à volta. Isto resolve definitivamente o problema visual.

**2. Montar apenas o widget do separador activo**

Renderização condicional dura: o `<iframe>` do chat só existe quando `tab === "chat"`, idem para voz. Sem `Fragment key`, sem ambos no DOM. Garante zero bolhas duplicadas.

**3. Remover o script global do widget bubble**

O `<script src="https://unpkg.com/@elevenlabs/convai-widget-embed">` no `index.html` deixa de ser necessário (já não usamos o custom element). Remover evita que ele continue a injectar bolhas no body.

**4. Posicionamento e cores**

- **Chat (separador WhatsApp)**: iframe ocupa 100% da zona escura à esquerda do grid, com `min-h-[640px]`. Painel "Dados em tempo real" mantém-se intocado à direita.
- **Voz**: iframe dentro do cartão dourado à direita do grid, `min-h-[560px]`, com a mesma borda dourada e gradiente radial. Lista de features mantém-se à esquerda.
- Borda dourada (`border-brand`) + fundo `dark-2` à volta do iframe → moldura coerente com o resto da página.
- Adicionar `allow="microphone"` no iframe de voz (essencial para o microfone funcionar).

## Layout final

```text
┌─ Tab: Chat WhatsApp ────────────────┬─ Dados em tempo real ─┐
│ [Header: B · Barberalia · Online]    │ Cliente: João M.      │
│ ┌─ iframe ElevenLabs ────────────┐   │ Intenção: Pós-venda   │
│ │  conversa real, fundo escuro   │   │ Encomenda: #BC-…      │
│ │  ocupa toda a área             │   │ Estado: Em trânsito   │
│ │                                │   │ Escalada: Não nec.    │
│ └────────────────────────────────┘   │                       │
└──────────────────────────────────────┴───────────────────────┘

┌─ Tab: Agente de Voz ────────────────────────────────────────┐
│  Agente de Voz                  ┌─ iframe ElevenLabs ─────┐ │
│  • voz natural PT               │  orb + botão microfone  │ │
│  • stock em tempo real          │  conversa por voz       │ │
│  • escala para humano           │                         │ │
│                                 └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Ficheiros a alterar

- **`index.html`** — remover o `<script>` do `convai-widget-embed` (já não é preciso).
- **`src/components/barberalia/DemoSection.tsx`** — substituir os dois `<elevenlabs-convai>` por `<iframe src="https://elevenlabs.io/app/talk-to?agent_id=...">`, com renderização condicional rígida (sem Fragment partilhado), `allow="microphone"` no de voz, e moldura visual coerente.
- **`src/vite-env.d.ts`** — remover a declaração do custom element `elevenlabs-convai` (deixa de ser usada).
- **`src/index.css`** — remover as regras `elevenlabs-convai { ... }` adicionadas anteriormente.

## Notas

- **Allowed origins**: confirma novamente no painel ElevenLabs de cada agente que `https://*.lovable.app` está autorizado — o iframe respeita as mesmas regras CORS do widget.
- **Sem bolhas flutuantes**: garantido — o iframe é um elemento DOM normal, não injecta nada no `body`.
- **Tema do interior**: o conteúdo do iframe é controlado pelo ElevenLabs (não conseguimos mudar fontes/cores internas sem usar o SDK React). O que ganhamos é controlo total do **enquadramento** — borda dourada, fundo escuro, posicionamento perfeito — que era o problema principal.
- **Sem alterações** ao Hero, Dashboard, Roadmap, Footer, Navbar ou tabs.

