import { Fragment, useState } from "react";
import { Icon } from "./Icon";
import { LiveDot, SectionHeading } from "./Shared";

const TEXT_AGENT_ID = "agent_2401kprqge5vfjstncfjqzczmncn";
const VOICE_AGENT_ID = "agent_2701kpsk2vq6e0yas1293het2n94";

const INITIAL_MSGS: Msg[] = [
  { from: "me", text: "Olá, boa tarde", time: "14:28" },
  { from: "them", text: "Olá! Boa tarde 👋 Sou o assistente da Barberalia. Posso ajudá-lo com informações sobre produtos, encomendas, devoluções ou qualquer outra questão. Como posso ajudar?", time: "14:28" },
  { from: "me", text: "Tenho uma encomenda que fiz há 3 dias e ainda não recebi", time: "14:29" },
  { from: "them", text: "Encontrei a sua encomenda! 🔍\n\nEncomenda *#BC-2025-0312* (Kit Aluno Barbeiro + Navalha Dovo + Creme Taylor — €342,00) saiu do nosso armazém em Albufeira no dia 3 de Abril e está em rota para Lisboa via Nacex.\n\nTracking: *NX20250402PT3120*\nPrevisão de entrega: hoje ou amanhã.\n\nPosso ajudar com mais alguma coisa?", time: "14:29" },
];

const SUG_GROUP_A = ["Onde está a minha encomenda?", "Quero devolver um produto", "Qual o preço das tesouras?", "Têm a Wahl Magic Clip?"];
const SUG_GROUP_B = ["Como funciona a garantia?", "Qual o prazo de entrega?", "Podem emitir fatura?", "Têm descontos para profissionais?"];

function replyFor(text: string) {
  const t = text.toLowerCase();
  if (/reclam|queixa|inaceit|urgente/.test(t))
    return "Lamento muito esta situação. Vou escalar imediatamente para a nossa equipa que entrará em contacto consigo em menos de 2 horas.\n\nReferência: *#ESC-2025-047*";
  if (/encomenda|onde|chegou|tracking/.test(t))
    return "Verifiquei a sua encomenda *#BC-2025-0312*. 📦\n\nSaiu do armazém de Albufeira, em rota via Nacex (tracking *NX20250402PT3120*), entrega prevista em 24h. Quer notificação quando chegar?";
  if (/devolv|trocar/.test(t))
    return "O processo de devolução é simples: ↩️\n\n1️⃣ Fotografe o produto e a embalagem\n2️⃣ Contacte-nos em 48h após recepção\n3️⃣ Recolha marcada, custos por nossa conta\n\nPrazo máximo: 14 dias. Reembolso ou substituição total.";
  if (/wahl|magic clip|clipper|m[aá]quina/.test(t))
    return "A *Wahl Magic Clip Cordless* está disponível em stock. ✂️\n\nPreço: *€129,00*\nEntrega: 48h em Portugal continental\n\nQuer que reserve uma unidade?";
  if (/pre[çc]o|quanto|custa|tesoura/.test(t))
    return "Aqui estão as tesouras mais pedidas:\n\n• *Jaguar Pre Style* — €64,90\n• *Kamisori Excalibur* — €139,00\n• *Dovo Bergischer* — €87,00\n\nQuer ficha técnica de alguma?";
  if (/garant/.test(t))
    return "As condições de garantia são:\n\n• *Consumidores:* 2 anos\n• *Profissionais:* 6 meses\n\nAplica-se a defeitos de fabrico. Desgaste natural excluído.";
  if (/prazo|entrega|quando/.test(t))
    return "Prazos de entrega:\n\n• Portugal continental: *24–48h*\n• Ilhas: 3–5 dias úteis\n• Envio *grátis* acima de €75\n\nPara Braga: normalmente 24h via Nacex.";
  if (/fatur|factura|nif/.test(t))
    return "Para emissão de fatura, envie por favor:\n\n📧 *clientes@barberalia.com*\n\nCom o nº da encomenda + NIF + nome/razão social. Emitimos e enviamos em poucos minutos.";
  if (/desconto|profissional|barbeiro|barbearia|pro/.test(t))
    return "Temos *Conta PRO Barberalia* para profissionais. 💈\n\n• Preços especiais\n• Condições de pagamento\n• Catálogo alargado\n\nPosso pedir à equipa que entre em contacto? Basta dizer o nome e o melhor horário.";
  if (/obrigad|percebo|^ok$|perfeito/.test(t))
    return "Fico à disposição! Se precisar de mais alguma coisa é só escrever. 😊";
  if (/ol[aá]|bom dia|boa tarde|boa noite/.test(t)) {
    const h = new Date().getHours();
    const g = h < 12 ? "Bom dia" : h < 19 ? "Boa tarde" : "Boa noite";
    return `${g}! 👋 Sou o assistente da Barberalia — como posso ajudar?`;
  }
  return "Registei o seu pedido. Posso ajudar com: estado de encomendas, devoluções, preços de produtos, facturação ou falar com a equipa. Qual destes temas?";
}

function renderRich(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((p, i) =>
    p.startsWith("*") && p.endsWith("*") ? (
      <strong key={i} className="font-medium text-gold-light">
        {p.slice(1, -1)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

function ChatDemo() {
  return (
    <div className="grid min-h-[640px] grid-cols-1 gap-px border bg-brand-line border-brand lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      {/* Chat frame */}
      <div className="flex min-h-0 flex-col bg-dark-2">
        <div className="flex items-center gap-3.5 border-b border-brand bg-dark-3 px-5 py-[18px]">
          <div className="grid h-[38px] w-[38px] place-items-center rounded-full bg-gradient-to-br from-gold to-dark-4 font-serif text-xl font-semibold text-dark">
            B
          </div>
          <div className="flex-1">
            <div className="text-sm text-ink">Barberalia Atendimento</div>
            <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] text-ink-muted">
              <LiveDot /> Online · responde em segundos
            </div>
          </div>
          <div className="font-mono text-[10px] text-ink-dim">#demo</div>
        </div>

        <div
          className="relative flex min-h-[560px] flex-1 flex-col items-center justify-center bg-dark-2 p-6"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, hsl(var(--gold) / 0.04), transparent 40%), hsl(var(--dark-2))",
          }}
        >
          <elevenlabs-convai agent-id={TEXT_AGENT_ID}></elevenlabs-convai>
          <div className="pointer-events-none mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            Agente real · ElevenLabs · texto
          </div>
        </div>
      </div>

      {/* Side panel */}
      <aside className="flex min-w-0 flex-col gap-5 bg-dark-2 px-6 py-7">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
          DADOS EM TEMPO REAL
        </div>
        {[
          { k: "Cliente", v: <>João M. <span className="font-mono text-ink-dim">· VIP</span></> },
          { k: "Intenção detectada", v: <span className="font-serif text-[15px] italic text-gold-light">Pós-venda · tracking</span> },
          { k: "Encomenda", v: <span className="font-mono text-[11px]">#BC-2025-0312</span> },
          { k: "Estado", v: <><span className="mr-1 inline-block h-[7px] w-[7px] rounded-full bg-brand-green-light shadow-[0_0_8px_hsl(var(--brand-green-light)/0.5)]" /> Em trânsito · Nacex</> },
          { k: "Escalada", v: <span className="text-ink-muted">Não necessária</span> },
        ].map((row, i) => (
          <div key={i} className="flex items-baseline justify-between gap-3 border-b border-dashed border-brand pb-3.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
              {row.k}
            </div>
            <div className="text-right text-[13px] text-ink">{row.v}</div>
          </div>
        ))}
        <div className="mt-auto border-t border-brand pt-[18px] font-mono text-[10px] leading-[1.7] tracking-wider text-ink-dim">
          Respostas geradas a partir da base de conhecimento Barberalia — stock,
          encomendas, políticas e FAQ indexados.
        </div>
      </aside>
    </div>
  );
}

function VoiceDemo() {
  return (
    <div className="border border-brand bg-dark-2 p-10 md:p-14">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-5">
          <h3 className="m-0 font-serif text-[44px] font-light leading-none">
            Agente de <em>Voz</em>
          </h3>
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            Powered by ElevenLabs Conversational AI
          </p>
          <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
            {[
              "Responde em português europeu com voz natural",
              "Consulta stock e encomendas em tempo real",
              "Escala para humano quando necessário",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3.5 text-sm text-ink-muted">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-dim">
            Clica no widget e fala directamente com o assistente
          </p>
        </div>
        <div>
          <div className="relative flex min-h-[520px] flex-col items-center justify-center rounded border border-dashed border-brand-bright bg-gold/5 px-8 py-12 text-center">
            <elevenlabs-convai agent-id={VOICE_AGENT_ID}></elevenlabs-convai>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
              Agente real · ElevenLabs · voz
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemoSection() {
  const [tab, setTab] = useState<"chat" | "voice">("chat");
  return (
    <section id="demo" className="relative bg-dark px-5 py-20 sm:px-8 md:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          num="02"
          label="Demo ao vivo"
          title={<>Experimenta <em>agora</em></>}
          desc="Fala com o assistente ou escreve uma mensagem. Experimenta diferentes perguntas — o sistema reconhece dezenas de intenções."
        />

        <div
          className="reveal mb-10 inline-flex rounded-sm border border-brand bg-dark-2 p-1"
          data-delay="220"
        >
          {([
            ["chat", "chat", "Chat WhatsApp"],
            ["voice", "mic", "Agente de Voz"],
          ] as const).map(([key, icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key as "chat" | "voice")}
              className={`inline-flex items-center gap-2 rounded-sm px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-all ${
                tab === key
                  ? "bg-dark-3 text-gold-light shadow-[inset_0_0_0_1px_hsl(var(--gold)/0.35)]"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <Icon name={icon as "chat" | "mic"} size={14} /> {label}
            </button>
          ))}
        </div>

        <div className="reveal" data-delay="300">
          <Fragment key={tab}>
            <div className="[animation:demo-fade_0.3s_ease]">
              {tab === "chat" ? <ChatDemo /> : <VoiceDemo />}
            </div>
          </Fragment>
        </div>
      </div>
    </section>
  );
}
