import { useState } from "react";
import type { ConversaCard } from "@/lib/relatorios-types";
import {
  customerTypeLabel,
  customerTypeTone,
  formatBudget,
  formatDuration,
  formatTimestamp,
  intentLabel,
  intentTone,
  outcomeLabel,
  outcomeTone,
  satisfactionDot,
  topicAreaLabel,
  type Tone,
} from "@/lib/conversas-i18n";

const toneClasses: Record<Tone, string> = {
  green: "bg-brand-green-light/10 text-brand-green-light border-brand-green-light/25",
  red: "bg-brand-red-light/10 text-brand-red-light border-brand-red-light/30",
  gold: "bg-gold/10 text-gold-light border-gold/35",
  muted: "bg-ink-muted/5 text-ink-muted border-ink-muted/20",
};

function Badge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export function RelatoriosCard({
  c,
  isNew,
}: {
  c: ConversaCard;
  isNew?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const sat = satisfactionDot(c.satisfaction);
  const budget = formatBudget(c.budget);

  return (
    <article
      onClick={() => setOpen((o) => !o)}
      className={`group cursor-pointer border bg-dark-2 px-6 py-5 transition-all hover:border-brand-bright ${
        isNew ? "animate-[pulse-gold_2s_ease]" : ""
      }`}
      style={{
        borderColor: isNew ? "hsl(var(--gold) / 0.5)" : undefined,
      }}
    >
      {/* Topo: timestamp + badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
          {formatTimestamp(c.startUnix)}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={outcomeTone(c.outcome)}>{outcomeLabel(c.outcome)}</Badge>
          <Badge tone="muted">{topicAreaLabel(c.topicArea)}</Badge>
          {c.customerType && (
            <Badge tone={customerTypeTone(c.customerType)}>
              {customerTypeLabel(c.customerType)}
            </Badge>
          )}
        </div>
      </div>

      {/* Corpo */}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-ink">
        <span className="font-serif text-[18px] italic text-gold-light">
          {intentLabel(c.intent)}
        </span>
        {c.productName && (
          <span className="text-ink-muted">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
              produto ·{" "}
            </span>
            {c.productName}
          </span>
        )}
        {budget && (
          <span className="text-ink-muted">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
              orçamento ·{" "}
            </span>
            {budget}
          </span>
        )}
        {c.readyToBuy && (
          <span className="font-mono text-[11px] text-gold-light">
            🔥 Pronto para comprar
          </span>
        )}
        <span
          className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim"
          title={`Satisfação: ${sat.label}`}
        >
          <span
            className="inline-block h-[8px] w-[8px] rounded-full"
            style={{ background: sat.color, boxShadow: `0 0 8px ${sat.color}` }}
          />
          {sat.label}
        </span>
      </div>

      {/* Expansão */}
      <div
        className="grid overflow-hidden transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          marginTop: open ? "1.25rem" : 0,
        }}
      >
        <div className="min-h-0">
          <div className="border-t border-brand pt-4">
            {c.summary ? (
              <p className="m-0 font-sans text-[13px] italic leading-[1.7] text-ink-muted">
                {c.summary}
              </p>
            ) : (
              <p className="m-0 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
                Sem resumo disponível
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">
              {c.orderNumber && (
                <span>
                  encomenda · <span className="text-ink-muted">{c.orderNumber}</span>
                </span>
              )}
              <span>
                duração · <span className="text-ink-muted">{formatDuration(c.durationSecs)}</span>
              </span>
              <span>
                id · <span className="text-ink-muted normal-case">{c.id.slice(0, 12)}…</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
