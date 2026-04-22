import { LiveDot } from "./Shared";

export function Footer() {
  return (
    <footer className="border-t border-brand bg-dark py-14">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-8 px-8">
        <div>
          <div className="mb-1.5 font-serif text-[28px] font-light -tracking-[0.01em] text-ink">
            Barberalia <em>· Sistema IA</em>
          </div>
          <div className="font-mono text-ink-dim">
            barberalia.com · Albufeira, Faro · Portugal
          </div>
        </div>
        <div className="flex flex-col items-end gap-2.5 text-right">
          <span className="inline-flex items-center gap-2 rounded-sm border border-brand-green-light/30 bg-brand-green-light/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-green-light">
            <LiveDot /> Demo activa
          </span>
          <div className="font-mono text-ink-dim">
            Desenvolvido por Waldyn · waldyn.pt
          </div>
        </div>
      </div>
    </footer>
  );
}
