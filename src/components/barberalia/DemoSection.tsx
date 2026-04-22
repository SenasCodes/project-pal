import { Fragment, useState } from "react";
import { Icon } from "./Icon";
import { LiveDot, SectionHeading } from "./Shared";

const TEXT_AGENT_ID = "agent_2401kprqge5vfjstncfjqzczmncn";
const VOICE_AGENT_ID = "agent_2701kpsk2vq6e0yas1293het2n94";


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
          className="relative flex min-h-[600px] w-full flex-1 flex-col bg-dark-2 p-4"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, hsl(var(--gold) / 0.04), transparent 40%), hsl(var(--dark-2))",
          }}
        >
          <div className="flex-1 w-full">
            <elevenlabs-convai
              agent-id={TEXT_AGENT_ID}
              variant="expanded"
              avatar-orb-color-1="#B8955A"
              avatar-orb-color-2="#D4B483"
              action-text="Falar com a Barberalia"
              start-call-text="Iniciar conversa"
              end-call-text="Terminar"
              listening-text="A ouvir…"
              speaking-text="A responder…"
              expand-text="Abrir chat"
            ></elevenlabs-convai>
          </div>
          <div className="pointer-events-none mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
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
