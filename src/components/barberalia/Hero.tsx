import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/use-barberalia";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-dark p-7">
      <div className="font-serif text-[40px] font-light leading-none -tracking-[0.01em] text-gold-light">
        {value}
      </div>
      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
        {label}
      </div>
    </div>
  );
}

export function Hero() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.3 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const n1 = useCountUp(100, inView);
  const n2 = useCountUp(50, inView);

  return (
    <header
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-0 pb-20 pt-[120px]"
    >
      <div
        className="pointer-events-none absolute -right-[200px] -top-[200px] h-[720px] w-[720px] rounded-full"
        style={{
          filter: "blur(120px)",
          background:
            "radial-gradient(circle, hsl(var(--gold) / 0.08), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-[200px] -left-[200px] h-[720px] w-[720px] rounded-full"
        style={{
          filter: "blur(120px)",
          background:
            "radial-gradient(circle, hsl(var(--brand-green-light) / 0.06), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div
          className="mb-10 h-[60px] w-px opacity-0 [animation:fade-up_0.9s_ease_forwards]"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(var(--gold)))",
            animationDelay: "0.25s",
          }}
        />

        <div
          className="mb-7 inline-flex items-center gap-3.5 font-mono text-[10px] uppercase tracking-[0.25em] text-gold opacity-0 [animation:fade-up_0.9s_ease_forwards]"
          style={{ animationDelay: "0.45s" }}
        >
          <span className="text-gold-light">00</span>
          <span className="h-px w-9 bg-gold opacity-40" />
          <span>Sistema de Inteligência Artificial</span>
        </div>

        <h1
          className="m-0 mb-7 font-serif text-[clamp(56px,8.6vw,128px)] font-light leading-[0.98] -tracking-[0.02em] text-ink opacity-0 [animation:fade-up_0.9s_ease_forwards]"
          style={{ animationDelay: "0.65s" }}
        >
          Friparque
          <br />
          <em className="mt-1.5 block">Atendimento Automatizado</em>
        </h1>

        <p
          className="m-0 mb-14 max-w-[60ch] text-base text-ink-muted opacity-0 [animation:fade-up_0.9s_ease_forwards]"
          style={{ animationDelay: "0.9s" }}
        >
          IA para peças de eletrodomésticos — WhatsApp · Voz · Dashboard em tempo real
        </p>

        <div
          className="mb-10 mt-10 flex items-center gap-[18px] opacity-0 [animation:fade-up_0.9s_ease_forwards]"
          style={{ animationDelay: "1.15s" }}
        >
          <span
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.35), transparent)",
            }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted">
            Demo da solução
          </span>
          <span
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.35), transparent)",
            }}
          />
        </div>

        <div
          className="mt-4 grid grid-cols-2 gap-px border bg-brand-line border-brand opacity-0 [animation:fade-up_0.9s_ease_forwards] md:grid-cols-4"
          style={{ animationDelay: "1.4s" }}
        >
          <Stat value={`${n1}/dia`} label="Contactos WhatsApp" />
          <Stat value={`${n2}/dia`} label="Chamadas de voz" />
          <Stat value="24/7" label="Disponibilidade" />
          <Stat value="< 2s" label="Tempo de resposta" />
        </div>

        <div
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 opacity-0 [animation:fade-up_0.9s_ease_forwards] md:flex"
          style={{ animationDelay: "1.9s" }}
        >
          <span className="h-[5px] w-[5px] animate-bounce rounded-full bg-gold" />
          <span
            className="h-7 w-px"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--gold)), transparent)",
            }}
          />
        </div>
      </div>
    </header>
  );
}
