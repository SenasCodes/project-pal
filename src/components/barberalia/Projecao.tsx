import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./Shared";

const REFS = [
  { big: "+34%", label: "Aumento de conversão pós-venda", desc: "Lojas online de peças e componentes com atendimento automatizado 24/7 em WhatsApp registam em média +34% de conversão entre clientes que recebem resposta imediata fora do horário comercial.", source: "Tidio E-commerce AI Report 2024", sub: "E-commerce Especializado" },
  { big: "−62%", label: "Redução de contactos repetidos", desc: "Distribuidores B2B/B2C que implementaram assistentes IA para tracking, compatibilidade de peças e FAQ reduziram em 62% os contactos repetidos para a mesma questão, libertando a equipa para vendas e assistência.", source: "Salesforce State of Service 2024", sub: "Retalho de peças com chatbot" },
  { big: "+28%", label: "Aumento de ticket médio", desc: "Lojas com assistente que sugere peças e acessórios compatíveis durante a conversa registam um aumento médio de 28% no valor do ticket, por via de upsell contextual (filtros, kits, consumíveis).", source: "McKinsey AI in Retail 2023", sub: "Voz + WhatsApp combinados" },
];

const PROJ = [
  { metric: "Taxa de resposta fora horário", a: 0, b: 100, aLabel: "~0%", bLabel: "100%", delta: "+100%" },
  { metric: "Tempo médio primeira resposta", a: 100, b: 1, aLabel: "4–8h", bLabel: "< 2s", delta: "−99%" },
  { metric: "Contactos resolvidos sem humano", a: 0, b: 85, aLabel: "0%", bLabel: "~85%", delta: "+85pp" },
  { metric: "Custo por interação de suporte", a: 100, b: 2, aLabel: "€4–8", bLabel: "< €0.10", delta: "−98%" },
  { metric: "Clientes recorrentes", a: 40, b: 65, aLabel: "base", bLabel: "+18–25%", delta: "+€72–100k/ano" },
  { metric: "Upsell por recomendação IA", a: 0, b: 55, aLabel: "0", bLabel: "+8–12%", delta: "+€32–48k/ano" },
];

export function Projecao() {
  const [anim, setAnim] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setAnim(true), { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="projecao" className="relative border-y border-brand bg-dark-2 px-5 py-20 sm:px-8 md:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          num="05"
          label="Projeção"
          title={<>Impacto <em>esperado</em> nas vendas</>}
          desc="Com base em implementações comparáveis em e-commerce B2B e retalho especializado, estas são as melhorias esperadas para a Barberalia."
        />

        <div className="reveal mb-20 grid grid-cols-1 gap-px border bg-brand-line border-brand md:grid-cols-2 lg:grid-cols-3" data-delay="220">
          {REFS.map((r, i) => (
            <article key={i} className="flex flex-col bg-dark px-7 pb-8 pt-9">
              <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                {r.sub}
              </div>
              <div className="mb-3 font-serif text-[72px] font-light leading-none -tracking-[0.02em] text-gold-light">
                {r.big}
              </div>
              <div className="mb-4 max-w-[20ch] text-sm text-ink">{r.label}</div>
              <p className="m-0 mb-5 flex-1 text-[12.5px] leading-[1.65] text-ink-muted">
                {r.desc}
              </p>
              <div className="border-t border-brand pt-3.5 font-mono text-[10px] tracking-wider text-ink-dim">
                Fonte: {r.source}
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mb-8" data-delay="300">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
            BARBERALIA — PROJEÇÃO A 12 MESES
          </div>
          <p className="m-0 max-w-[64ch] text-sm text-ink-muted">
            Baseada em faturação actual de ~€400k/ano e volume estimado de 100 contactos WhatsApp + 50 chamadas/dia.
          </p>
        </div>

        <div ref={ref} className="reveal mb-20 border border-brand bg-dark-2 px-7 py-6" data-delay="340">
          <div className="mb-1 grid grid-cols-1 gap-5 border-b border-brand pb-3.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-dim md:grid-cols-[1.6fr_2fr_2fr_0.8fr]">
            <span>Métrica</span>
            <span className="hidden md:inline">Actual</span>
            <span className="hidden md:inline">Com IA</span>
            <span className="hidden md:inline">Variação</span>
          </div>
          {PROJ.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-1 items-center gap-2 border-b border-dashed border-brand py-4 last:border-b-0 md:grid-cols-[1.6fr_2fr_2fr_0.8fr] md:gap-5"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-[13px] text-ink">{p.metric}</div>
              <div className="relative flex h-5 items-center border border-brand bg-dark-3 pr-2.5">
                <div
                  className="absolute inset-y-0 left-0 transition-[width] duration-1000 ease-out"
                  style={{
                    width: anim ? `${p.a}%` : "0%",
                    background: "linear-gradient(90deg, hsl(var(--dark-4)), hsl(var(--ink-muted) / 0.3))",
                  }}
                />
                <span className="relative z-10 ml-auto font-mono text-[11px]">{p.aLabel}</span>
              </div>
              <div className="relative flex h-5 items-center border border-brand bg-dark-3 pr-2.5">
                <div
                  className="absolute inset-y-0 left-0 transition-[width] duration-1000 ease-out"
                  style={{
                    width: anim ? `${p.b}%` : "0%",
                    background: "linear-gradient(90deg, hsl(var(--gold) / 0.4), hsl(var(--gold)))",
                  }}
                />
                <span className="relative z-10 ml-auto font-mono text-[11px] text-gold-light">{p.bLabel}</span>
              </div>
              <div className="text-right font-mono text-xs text-gold-light">{p.delta}</div>
            </div>
          ))}
        </div>

        <div className="reveal mb-6 grid grid-cols-1 gap-px border bg-brand border-brand-bright md:grid-cols-3" data-delay="400" style={{ borderColor: "hsl(var(--gold) / 0.35)" }}>
          {[
            { big: "€104k – €148k", label: "Receita adicional estimada/ano", sub: "Recorrência + upsell + reativação de inativos" },
            { big: "€18k – €22k", label: "Poupança em suporte/ano", sub: "Redução de horas de atendimento humano" },
            { big: "< 6 meses", label: "Payback estimado", sub: "Investimento inicial de €20–25k" },
          ].map((s, i) => (
            <div key={i} className="bg-dark-2 px-8 py-12 text-center">
              <div className="mb-4 font-serif text-[52px] font-light leading-none -tracking-[0.02em] text-gold-light">
                {s.big}
              </div>
              <div className="mb-2.5 text-sm text-ink">{s.label}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-dim">{s.sub}</div>
            </div>
          ))}
        </div>

        <p className="mt-4 font-mono text-[10px] tracking-wider text-ink-dim">
          * Estimativas conservadoras baseadas em implementações comparáveis. Resultados reais dependem do volume de tráfego, sazonalidade e adoção pelos clientes.
        </p>
      </div>
    </section>
  );
}
