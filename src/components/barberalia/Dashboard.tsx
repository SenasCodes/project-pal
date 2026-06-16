import { ReactNode, useEffect, useRef, useState } from "react";
import { Icon, IconName } from "./Icon";
import { SectionHeading, Tag } from "./Shared";

interface Conv {
  name: string;
  ch: "chat" | "mic";
  msg: string;
  time: string;
  status: "curso" | "escalado" | "resolvido" | "aguarda";
  color: string;
}

const KPIS = [
  { id: "conv", value: "47", label: "Conversas hoje", delta: "+12% vs ontem", deltaTone: "green" as const },
  { id: "esc", value: "3", label: "Escaladas pendentes", delta: "Acção requerida", deltaTone: "red" as const, pulse: true },
  { id: "ord", value: "12", label: "Encomendas em aberto", delta: "+2 novas hoje", deltaTone: "muted" as const },
  { id: "res", value: "89%", label: "Resolução automática", delta: "+3pp vs semana", deltaTone: "green" as const },
];

const CONVS: Conv[] = [
  { name: "João Silva", ch: "chat", msg: "Onde está a encomenda #FP-2025-0312?", time: "14:32", status: "curso", color: "#E8631A" },
  { name: "Maria Ferreira", ch: "mic", msg: "Quero devolver a resistência Bosch", time: "14:15", status: "escalado", color: "#C0504D" },
  { name: "Carlos Mendes", ch: "chat", msg: "Têm filtros Rowenta RO6885 em stock?", time: "13:58", status: "resolvido", color: "#4D9A72" },
  { name: "Ana Costa", ch: "chat", msg: "Qual o prazo de entrega para Braga?", time: "13:41", status: "resolvido", color: "#3B82F6" },
  { name: "Pedro Rodrigues", ch: "mic", msg: "Preciso de fatura da encomenda de março", time: "13:20", status: "aguarda", color: "#8A8578" },
  { name: "Assistência Norte", ch: "chat", msg: "Condições para conta de assistência técnica?", time: "12:55", status: "resolvido", color: "#F4904A" },
];

const STATUS_MAP: Record<Conv["status"], { label: string; tone: "green" | "red" | "gold" | "muted" }> = {
  resolvido: { label: "Resolvido", tone: "green" },
  escalado: { label: "Escalado", tone: "red" },
  curso: { label: "Em curso", tone: "gold" },
  aguarda: { label: "Aguarda resposta", tone: "muted" },
};

const HOURLY = [
  { h: "09h", v: 3 }, { h: "10h", v: 7 }, { h: "11h", v: 12 },
  { h: "12h", v: 9 }, { h: "13h", v: 11 }, { h: "14h", v: 14 },
  { h: "15h", v: 8 }, { h: "16h", v: 4 },
];

function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: ReactNode; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[500] [animation:drawer-in_0.3s_ease]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col border-l border-brand-bright bg-dark-2 [animation:slide-in_0.35s_cubic-bezier(0.2,0.8,0.2,1)]">
        <div className="flex items-center justify-between border-b border-brand px-7 py-5">
          <div className="font-serif text-[22px] font-normal text-ink">{title}</div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-sm border border-brand text-[13px] text-ink-muted transition-all hover:border-brand-bright hover:text-gold"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-7 py-6">{children}</div>
      </div>
    </div>
  );
}

function KpiDetail({ id, onResolveEscalation }: { id: string; onResolveEscalation: (i: number) => void }) {
  if (id === "conv") {
    return (
      <div className="flex flex-col gap-0.5">
        {CONVS.slice(0, 8).map((c, i) => (
          <div key={i} className="flex items-center gap-3 border border-brand bg-dark p-3">
            <div className="w-12 font-mono text-ink-dim">{c.time}</div>
            <div className="text-gold"><Icon name={c.ch} size={13} /></div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] text-ink">{c.name}</div>
              <div className="mt-0.5 truncate text-[11px] text-ink-muted">{c.msg}</div>
            </div>
            <Tag tone={STATUS_MAP[c.status].tone}>{STATUS_MAP[c.status].label}</Tag>
          </div>
        ))}
      </div>
    );
  }
  if (id === "esc") {
    const items = CONVS.filter((c) => c.status === "escalado").concat([
      { name: "Rui Tavares", ch: "chat", msg: "Peça chegou partida — reclamação", time: "14:02", status: "escalado", color: "#C0504D" },
      { name: "Sofia Lopes", ch: "mic", msg: "Problema com pagamento de encomenda B2B", time: "13:48", status: "escalado", color: "#C0504D" },
    ]);
    return (
      <div className="flex flex-col gap-0.5">
        {items.map((c, i) => (
          <div key={i} className="flex items-center gap-3 border border-brand-red-light/25 bg-dark p-3">
            <div className="w-12 font-mono text-ink-dim">{c.time}</div>
            <div className="text-gold"><Icon name={c.ch} size={13} /></div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] text-ink">{c.name}</div>
              <div className="mt-0.5 truncate text-[11px] text-ink-muted">{c.msg}</div>
            </div>
            <button
              onClick={() => onResolveEscalation(i)}
              className="rounded-sm border border-brand-green-light/30 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-brand-green-light transition-all hover:bg-brand-green-light/10"
            >
              Marcar resolvido
            </button>
          </div>
        ))}
      </div>
    );
  }
  if (id === "ord") {
    const rows = [
      ["#FP-2025-0312", "João Silva", "Resistência forno Bosch HBA13B150E", "Em trânsito"],
      ["#FP-2025-0311", "Maria Ferreira", "Filtro HEPA Rowenta RO6885", "Devolução"],
      ["#FP-2025-0310", "Carlos Mendes", "Junta tampa máquina Whirlpool", "A aguardar envio"],
      ["#FP-2025-0309", "Ana Costa", "Termostato esquentador Vulcano", "Entregue"],
      ["#FP-2025-0308", "Pedro Rodrigues", "Kit escovas aspirador Moulinex", "Em trânsito"],
      ["#FP-2025-0307", "Assistência Norte", "Encomenda B2B (32 referências)", "A aguardar envio"],
    ];
    return (
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr>
            {["Nº", "Cliente", "Produto", "Estado"].map((h) => (
              <th key={h} className="border-b border-brand p-2 text-left font-mono text-[9px] font-normal uppercase tracking-[0.18em] text-ink-dim">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="border-b border-brand p-3 font-mono text-ink">{r[0]}</td>
              <td className="border-b border-brand p-3 text-ink">{r[1]}</td>
              <td className="border-b border-brand p-3 text-ink-muted">{r[2]}</td>
              <td className="border-b border-brand p-3"><Tag tone="gold">{r[3]}</Tag></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (id === "res") {
    const bars: [string, number][] = [["Pré-venda", 94], ["Pós-venda", 82], ["Devoluções", 71]];
    return (
      <div className="flex flex-col gap-5">
        {bars.map(([l, v]) => (
          <div key={l}>
            <div className="mb-2 flex justify-between">
              <span>{l}</span>
              <span className="font-mono text-gold-light">{v}%</span>
            </div>
            <div className="h-1.5 overflow-hidden border border-brand bg-dark-3">
              <div
                className="h-full transition-[width] duration-700 ease-out"
                style={{ width: `${v}%`, background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold-light)))" }}
              />
            </div>
          </div>
        ))}
        <p className="mt-2 text-xs text-ink-muted">
          Taxa de resolução automática por tipo de interacção — últimos 30 dias.
        </p>
      </div>
    );
  }
  return null;
}

function ConversationDetail({ conv }: { conv: Conv }) {
  const tline: { who: "c" | "a"; t: string; text: string }[] = [
    { who: "c", t: conv.time, text: conv.msg },
    { who: "a", t: conv.time, text: "Claro, estou a verificar a sua questão — um momento." },
    { who: "c", t: conv.time, text: "Obrigado, aguardo." },
    { who: "a", t: conv.time, text: "Encontrei a informação. A sua encomenda está em rota via Nacex, tracking NX20250402PT3120." },
  ];
  return (
    <>
      <div className="mb-5 flex gap-6 border-b border-brand pb-[18px] text-[13px]">
        {[
          ["Cliente", conv.name],
          ["Canal", conv.ch === "mic" ? "Voz" : "WhatsApp"],
          ["Início", conv.time],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-dim">{k}</div>
            <div className={k === "Início" ? "font-mono" : ""}>{v}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3.5">
        {tline.map((m, i) => (
          <div key={i} className={`flex max-w-[82%] flex-col ${m.who === "c" ? "self-end" : "self-start"}`}>
            <div
              className={`rounded-lg border border-brand px-3.5 py-2.5 text-[13px] ${
                m.who === "c"
                  ? "rounded-tr-sm border-brand-bright bg-gold/10"
                  : "rounded-tl-sm bg-dark-3"
              }`}
            >
              {m.text}
            </div>
            <div className={`mt-1 font-mono text-[9px] text-ink-dim ${m.who === "c" ? "self-end" : "self-start"}`}>
              {m.t}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-2.5 border-t border-brand pt-[18px]">
        <button className="rounded-sm border border-brand-red-light/30 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-red-light transition-all hover:bg-brand-red-light/10">
          Escalar para equipa
        </button>
        <button className="rounded-sm border border-brand-green-light/30 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-brand-green-light transition-all hover:bg-brand-green-light/10">
          Marcar resolvido
        </button>
      </div>
    </>
  );
}

export function Dashboard() {
  const [openKpi, setOpenKpi] = useState<string | null>(null);
  const [openConv, setOpenConv] = useState<Conv | null>(null);
  const [hoverBar, setHoverBar] = useState<number | null>(null);
  const [animBars, setAnimBars] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barsRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setAnimBars(true),
      { threshold: 0.3 },
    );
    io.observe(barsRef.current);
    return () => io.disconnect();
  }, []);

  const maxV = Math.max(...HOURLY.map((h) => h.v));
  const deltaTone: Record<string, string> = {
    green: "text-brand-green-light",
    red: "text-brand-red-light",
    muted: "text-ink-muted",
  };

  return (
    <section id="dashboard" className="relative border-y border-brand bg-dark-2 px-5 py-20 sm:px-8 md:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          num="03"
          label="Dashboard"
          title={<>Gestão em <em>tempo real</em></>}
          desc="Tudo o que acontece no sistema, visível num único painel. Clica em qualquer métrica para ver o detalhe."
        />

        <div className="reveal mb-px grid grid-cols-2 gap-px border bg-brand-line border-brand md:grid-cols-4" data-delay="220">
          {KPIS.map((k) => (
            <button
              key={k.id}
              onClick={() => setOpenKpi(k.id)}
              className="group relative flex cursor-pointer flex-col gap-2.5 bg-dark p-7 text-left transition-colors hover:bg-dark-3"
            >
              <div className="font-serif text-[56px] font-light leading-none -tracking-[0.02em] text-ink">
                {k.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                {k.label}
              </div>
              <div className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider ${deltaTone[k.deltaTone]}`}>
                {k.pulse && <span className="h-[7px] w-[7px] rounded-full bg-brand-red-light animate-pulse-red" />}
                {k.delta}
              </div>
              <span className="absolute right-5 top-5 text-sm text-ink-dim transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold">
                ↗
              </span>
            </button>
          ))}
        </div>

        <div className="reveal grid grid-cols-1 gap-px border border-t-0 bg-brand-line border-brand lg:grid-cols-[1.2fr_1fr]" data-delay="280">
          {/* Feed */}
          <div className="min-w-0 bg-dark p-7">
            <div className="mb-5 border-b border-brand pb-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              FEED DE CONVERSAS RECENTES
            </div>
            <div className="flex flex-col">
              {CONVS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setOpenConv(c)}
                  className="flex w-full cursor-pointer items-center gap-3.5 border-b border-brand p-3 text-left transition-colors last:border-b-0 hover:bg-dark-3"
                >
                  <div
                    className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full font-serif text-base font-medium text-dark"
                    style={{ background: c.color }}
                  >
                    {c.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center gap-2">
                      <span className="text-[13px] text-ink">{c.name}</span>
                      <span className="inline-flex text-gold"><Icon name={c.ch as IconName} size={11} /></span>
                      <span className="ml-auto font-mono text-[10px] text-ink-dim">{c.time}</span>
                    </div>
                    <div className="truncate text-xs text-ink-muted">{c.msg}</div>
                  </div>
                  <Tag tone={STATUS_MAP[c.status].tone}>{STATUS_MAP[c.status].label}</Tag>
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="min-w-0 bg-dark p-7">
            <div className="mb-5 border-b border-brand pb-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              ACTIVIDADE POR HORA
            </div>
            <div ref={barsRef} className="mb-5 border border-brand bg-dark-2 p-4">
              <svg viewBox="0 0 320 180" className="block h-auto w-full" preserveAspectRatio="none">
                {[1, 0.75, 0.5, 0.25].map((f, i) => (
                  <line key={i} x1="0" x2="320" y1={20 + (1 - f) * 120} y2={20 + (1 - f) * 120}
                    stroke="hsl(var(--gold) / 0.15)" strokeDasharray="2 4" />
                ))}
                {HOURLY.map((h, i) => {
                  const bw = 26;
                  const gap = (320 - HOURLY.length * bw) / (HOURLY.length + 1);
                  const x = gap + i * (bw + gap);
                  const fullH = (h.v / maxV) * 120;
                  const barH = animBars ? fullH : 0;
                  const opacity = 0.5 + (h.v / maxV) * 0.5;
                  return (
                    <g key={i} onMouseEnter={() => setHoverBar(i)} onMouseLeave={() => setHoverBar(null)}>
                      <rect
                        x={x} y={140 - barH} width={bw} height={barH}
                        fill="hsl(var(--gold))"
                        opacity={hoverBar === i ? 1 : opacity}
                        style={{ transition: "height 0.9s ease, opacity 0.2s", transitionDelay: `${i * 80}ms` }}
                      />
                      <text x={x + bw / 2} y={160} textAnchor="middle" fill="hsl(var(--text-dim))" fontSize="9"
                        style={{ fontFamily: "DM Mono, monospace", letterSpacing: "0.1em" }}>{h.h}</text>
                      {hoverBar === i && (
                        <text x={x + bw / 2} y={140 - barH - 6} textAnchor="middle"
                          fill="hsl(var(--gold-light))" fontSize="10"
                          style={{ fontFamily: "DM Mono, monospace" }}>{h.v}</text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="grid grid-cols-1 gap-px border bg-brand-line border-brand md:grid-cols-3">
              {[
                { v: "1.8s", l: "Tempo médio de resposta" },
                { v: <>4.7<span className="text-sm text-ink-muted">/5.0</span></>, l: "Satisfação estimada" },
                { v: "234", l: "Msg hoje · WA 189 · Voz 45" },
              ].map((s, i) => (
                <div key={i} className="bg-dark p-4">
                  <div className="mb-1.5 font-serif text-2xl leading-none text-gold-light">{s.v}</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink-muted">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Drawer
        open={!!openKpi}
        onClose={() => setOpenKpi(null)}
        title={openKpi && KPIS.find((k) => k.id === openKpi)?.label}
      >
        {openKpi && <KpiDetail id={openKpi} onResolveEscalation={() => setOpenKpi(null)} />}
      </Drawer>
      <Drawer
        open={!!openConv}
        onClose={() => setOpenConv(null)}
        title={openConv && `Conversa · ${openConv.name}`}
      >
        {openConv && <ConversationDetail conv={openConv} />}
      </Drawer>
    </section>
  );
}
