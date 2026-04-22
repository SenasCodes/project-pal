

## Diagnóstico

O widget ElevenLabs aparece como **bolha flutuante no canto inferior direito** (visível no screenshot — "Need help? · Start a chat") em vez de embebido nas zonas pretas dos demos. Por isso:
- O "ecrã" do chat WhatsApp e o cartão dourado de voz aparecem **vazios**.
- A bolha tem cores azul/branco que **destoam** do tema dourado/escuro Barberalia.
- Há **uma só bolha partilhada** entre os dois separadores (o último a renderizar ganha).

## Solução

Usar o atributo oficial `variant="expanded"` para forçar o widget a renderizar **em modo aberto e inline** dentro dos containers, em vez de bolha flutuante. Combinar com atributos visuais (`avatar-orb-color-1/2`, `action-text`, `start-call-text`, etc.) para alinhar tudo ao tema Barberalia em português.

## Alterações em `src/components/barberalia/DemoSection.tsx`

**Widget de Texto (Chat WhatsApp)** — dentro da moldura escura/dourada existente:
```jsx
<elevenlabs-convai
  agent-id={TEXT_AGENT_ID}
  variant="expanded"
  avatar-orb-color-1="#B8955A"   // gold
  avatar-orb-color-2="#D4B483"   // gold-light
  action-text="Falar com a Barberalia"
  start-call-text="Iniciar conversa"
  end-call-text="Terminar"
  listening-text="A ouvir…"
  speaking-text="A responder…"
  expand-text="Abrir chat"
/>
```
Wrapper passa a `min-h-[600px]` com `w-full` para o widget preencher a área preta do "ecrã do telemóvel".

**Widget de Voz** — dentro do cartão dourado:
- Mesmos atributos visuais + `variant="expanded"`.
- Remover o `border-dashed` (parece placeholder), usar borda sólida `border-brand-bright` com o mesmo gradiente radial dourado do ChatDemo.
- Substituir o texto "Agente real · ElevenLabs · voz" por uma legenda mais discreta no rodapé.

**Tabs (chat/voz)**: já é o caminho certo — o `key={tab}` no Fragment força re-mount, garantindo que apenas um widget existe no DOM de cada vez (resolve o conflito da bolha partilhada).

## Estilização CSS adicional em `src/index.css`

Adicionar regras para o custom element preencher o container e harmonizar com o tema escuro:
```css
elevenlabs-convai {
  width: 100%;
  height: 100%;
  display: block;
  --el-accent: hsl(var(--gold));
  --el-bg: hsl(var(--dark-2));
  --el-text: hsl(var(--text));
}
```
*(O widget expõe shadow DOM; só as variáveis CSS suportadas pelo widget e os atributos HTML têm efeito garantido. Cor primária e textos PT cobrem 90% da percepção visual.)*

## Layout final esperado

```text
┌─ Chat WhatsApp ─────────────────────┬─ Dados em tempo real ─┐
│ [Header dourado: B · Barberalia]    │ Cliente: João M.      │
│                                     │ Intenção: Pós-venda   │
│   ┌─ widget ElevenLabs ─┐           │ Encomenda: #BC-…      │
│   │ orb dourado          │           │ Estado: Em trânsito   │
│   │ "Iniciar conversa"   │           │ Escalada: Não nec.    │
│   │ histórico mensagens  │           │                       │
│   └──────────────────────┘           │                       │
└──────────────────────────────────────┴───────────────────────┘
```

Mesmo princípio para o separador Voz: cartão dourado preenchido pelo widget expandido.

## Notas

- **Atributos suportados**: `variant`, `avatar-orb-color-1/2`, `action-text`, `start-call-text`, `end-call-text`, `listening-text`, `speaking-text`, `expand-text` são oficiais (confirmado na doc). Não tematização total do interior do widget é possível sem o SDK React `@elevenlabs/react`, mas estes atributos + o cartão à volta dão a sensação "parte da app".
- **Allowed origins**: confirma no painel ElevenLabs que `*.lovable.app` está autorizado para os 2 agentes — sem isto o widget não carrega.
- **Sem alterações** ao Hero, Dashboard, Roadmap, Footer ou tabs.

## Ficheiros a alterar

- `src/components/barberalia/DemoSection.tsx` — adicionar atributos `variant="expanded"` + tematização nos dois `<elevenlabs-convai>`, ajustar containers para o widget preencher (full width/height).
- `src/index.css` — regras globais para o custom element ocupar 100% do container.

