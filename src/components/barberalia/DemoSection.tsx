import { useCallback, useEffect, useRef, useState } from "react";
import { useConversation, ConversationProvider } from "@elevenlabs/react";
import { Icon } from "./Icon";
import { LiveDot, SectionHeading } from "./Shared";

const TEXT_AGENT_ID = "agent_2401kprqge5vfjstncfjqzczmncn";
const VOICE_AGENT_ID = "agent_2701kpsk2vq6e0yas1293het2n94";

type ChatMsg = { role: "user" | "agent"; text: string; id: string };

function ChatDemoInner() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [starting, setStarting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    textOnly: true,
    onMessage: (message: any) => {
      if (message?.source === "user" && message?.message) {
        setMessages((m) => [
          ...m,
          { id: crypto.randomUUID(), role: "user", text: message.message },
        ]);
      } else if (message?.source === "ai" && message?.message) {
        setMessages((m) => [
          ...m,
          { id: crypto.randomUUID(), role: "agent", text: message.message },
        ]);
      }
    },
    onError: (err: any) => {
      console.error("Chat error", err);
    },
  });

  const status = conversation.status;
  const connected = status === "connected";

  const ensureConnected = useCallback(async () => {
    if (connected || starting) return;
    setStarting(true);
    try {
      await conversation.startSession({
        agentId: TEXT_AGENT_ID,
        connectionType: "websocket",
      });
    } catch (e) {
      console.error("Failed to start chat", e);
    } finally {
      setStarting(false);
    }
  }, [conversation, connected, starting]);

  useEffect(() => {
    return () => {
      try { void conversation.endSession(); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", text },
    ]);
    await ensureConnected();
    try {
      conversation.sendUserMessage(text);
    } catch (e) {
      console.error("send failed", e);
    }
  };

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
              <LiveDot /> {connected ? "Online · agente real" : starting ? "A ligar…" : "Pronto · escreve para começar"}
            </div>
          </div>
          <div className="font-mono text-[10px] text-ink-dim">#demo</div>
        </div>

        <div
          ref={scrollRef}
          className="relative flex min-h-[480px] w-full flex-1 flex-col gap-3 overflow-y-auto p-5"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, hsl(var(--gold) / 0.04), transparent 40%), hsl(var(--dark-2))",
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] rounded-lg px-4 py-2.5 text-[13px] leading-relaxed ${
                  m.role === "user"
                    ? "bg-gold/15 text-ink border border-gold/30"
                    : "bg-dark-3 text-ink border border-brand"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {connected && conversation.isSpeaking && (
            <div className="flex justify-start">
              <div className="rounded-lg border border-brand bg-dark-3 px-4 py-2.5 text-[13px] text-ink-muted">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold [animation-delay:300ms]" />
                </span>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2 border-t border-brand bg-dark-3 px-4 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escreve uma mensagem…"
            className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-ink-dim outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-gold-light transition hover:bg-gold/20 disabled:opacity-40"
          >
            Enviar
          </button>
        </form>
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

function VoiceDemoInner() {
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const conversation = useConversation({
    onError: (err: any) => {
      console.error("Voice error", err);
      setError("Não foi possível ligar. Verifica permissões do microfone.");
    },
  });

  const status = conversation.status;
  const connected = status === "connected";
  const speaking = conversation.isSpeaking;

  const start = useCallback(async () => {
    setError(null);
    setStarting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: VOICE_AGENT_ID,
        connectionType: "websocket",
      });
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Falha ao iniciar conversa.");
    } finally {
      setStarting(false);
    }
  }, [conversation]);

  const stop = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  useEffect(() => {
    return () => {
      try { void conversation.endSession(); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            Clica em iniciar e fala directamente com o assistente
          </p>
        </div>
        <div>
          <div
            className="relative flex min-h-[420px] w-full flex-col items-center justify-center gap-8 rounded border border-brand-bright p-10"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, hsl(var(--gold) / 0.08), transparent 60%), hsl(var(--dark-2))",
            }}
          >
            {/* Orb */}
            <div className="relative flex h-44 w-44 items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br from-gold to-dark-4 transition-all duration-500 ${
                  connected ? "opacity-100" : "opacity-50"
                } ${speaking ? "scale-110 blur-[2px]" : "scale-100"}`}
                style={{
                  boxShadow: connected
                    ? "0 0 60px hsl(var(--gold) / 0.4), 0 0 120px hsl(var(--gold) / 0.2)"
                    : "0 0 30px hsl(var(--gold) / 0.15)",
                }}
              />
              {connected && (
                <>
                  <div className="absolute inset-0 animate-ping rounded-full border border-gold/30" style={{ animationDuration: "2.5s" }} />
                  <div className="absolute -inset-4 animate-ping rounded-full border border-gold/20" style={{ animationDuration: "3.5s" }} />
                </>
              )}
              <div className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-dark">
                {speaking ? "A falar" : connected ? "A ouvir" : "Standby"}
              </div>
            </div>

            {/* Status */}
            <div className="text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                {starting
                  ? "A ligar…"
                  : connected
                  ? speaking
                    ? "Agente a responder"
                    : "À tua espera"
                  : "Pronto para conversar"}
              </div>
              {error && (
                <div className="mt-2 font-mono text-[10px] text-brand-red-light">{error}</div>
              )}
            </div>

            {/* Controls */}
            {!connected ? (
              <button
                onClick={start}
                disabled={starting}
                className="inline-flex items-center gap-2.5 rounded-sm border border-gold bg-gold/10 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-light transition hover:bg-gold/20 disabled:opacity-50"
              >
                <Icon name="mic" size={14} />
                {starting ? "A ligar…" : "Iniciar conversa"}
              </button>
            ) : (
              <button
                onClick={stop}
                className="inline-flex items-center gap-2.5 rounded-sm border border-brand-red-light/50 bg-brand-red/20 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-red-light transition hover:bg-brand-red/30"
              >
                Terminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatDemo() {
  return (
    <ConversationProvider textOnly>
      <ChatDemoInner />
    </ConversationProvider>
  );
}

function VoiceDemo() {
  return (
    <ConversationProvider>
      <VoiceDemoInner />
    </ConversationProvider>
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
          <div key={tab} className="[animation:demo-fade_0.3s_ease]">
            {tab === "chat" ? <ChatDemo /> : <VoiceDemo />}
          </div>
        </div>
      </div>
    </section>
  );
}
