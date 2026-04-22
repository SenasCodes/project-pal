import { useConversas } from "@/hooks/use-conversas";
import { RelatoriosCard } from "@/components/barberalia/RelatoriosCard";
import { LiveDot } from "@/components/barberalia/Shared";

function Navbar() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-[100] border-b border-brand backdrop-blur-md"
      style={{ background: "hsl(var(--dark) / 0.72)" }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-8 py-[18px]">
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em]">
          <LiveDot />
          <span className="font-normal text-ink">BARBERALIA</span>
          <span className="mx-0.5 text-ink-dim">·</span>
          <span className="hidden text-ink-muted normal-case tracking-[0.08em] sm:inline">
            Relatórios IA
          </span>
        </div>
        <a
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-gold-light"
        >
          ← Voltar
        </a>
      </div>
    </nav>
  );
}

function MicIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

export default function Relatorios() {
  const { conversas, loading, error, newIds } = useConversas();

  return (
    <div className="min-h-screen bg-dark text-ink">
      <Navbar />
      <main className="mx-auto max-w-[1100px] px-5 pb-24 pt-32 sm:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-7 inline-flex items-center gap-3.5 font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
            <span className="text-gold-light">CONVERSAS</span>
            <span className="h-px w-9 bg-gold opacity-40" />
            <span>HISTÓRICO</span>
          </div>
          <h1 className="m-0 mb-5 font-serif text-[clamp(40px,5.6vw,72px)] font-light leading-[1.02] -tracking-[0.01em]">
            Relatórios de <em>Conversa</em>
          </h1>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            <LiveDot />
            <span>
              {loading
                ? "A carregar…"
                : `${conversas.length} ${conversas.length === 1 ? "conversa" : "conversas"} · actualizado a cada 30s`}
            </span>
          </div>
          {error && (
            <p className="mt-4 font-mono text-[11px] text-brand-red-light">{error}</p>
          )}
        </div>

        {/* Lista */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-[120px] animate-pulse border border-brand bg-dark-2"
              />
            ))}
          </div>
        ) : conversas.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 border border-brand bg-dark-2 px-6 py-24 text-center">
            <div className="text-ink-dim">
              <MicIcon />
            </div>
            <div className="font-serif text-[28px] font-light italic text-gold-light">
              Ainda sem conversas
            </div>
            <p className="m-0 max-w-[44ch] font-mono text-[11px] uppercase tracking-[0.15em] text-ink-dim">
              As conversas aparecem aqui automaticamente após cada chamada com o agente de voz
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {conversas.map((c) => (
              <RelatoriosCard key={c.id} c={c} isNew={newIds.has(c.id)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
