import { SectionLabel } from "./Shared";

export function RelatoriosTeaser() {
  return (
    <section
      id="relatorios-teaser"
      className="relative bg-dark px-5 py-20 sm:px-8 md:py-[120px]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="border border-brand bg-dark-2 p-10 md:p-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionLabel n="06">Relatórios</SectionLabel>
              <h2 className="reveal m-0 mb-5 font-serif text-[clamp(34px,4.4vw,56px)] font-light leading-[1.05] -tracking-[0.01em]" data-delay="80">
                Cada conversa, <em>registada</em>
              </h2>
              <p className="reveal m-0 max-w-[52ch] text-[15px] leading-[1.65] text-ink-muted" data-delay="160">
                Cada chamada com o agente de voz é analisada e arquivada — intenção,
                produto, orçamento, satisfação e desfecho. Vê o histórico completo
                em tempo real.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <a
                href="/relatorios"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-sm border border-gold bg-transparent px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-light transition hover:bg-gold/10"
              >
                Ver Relatórios de Conversa →
              </a>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                Abre numa nova janela
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
