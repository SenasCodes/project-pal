import { ReactNode } from "react";

export function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="reveal mb-7 inline-flex items-center gap-3.5 font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
      <span className="text-gold-light">{n}</span>
      <span className="h-px w-9 bg-gold opacity-40" />
      <span>{children}</span>
    </div>
  );
}

export function Divider() {
  return (
    <div
      aria-hidden="true"
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.35), transparent)",
      }}
    />
  );
}

export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-[7px] w-[7px] rounded-full bg-brand-green-light animate-pulse ${className}`}
    />
  );
}

export function SectionHeading({
  label,
  num,
  title,
  desc,
}: {
  label: string;
  num: string;
  title: ReactNode;
  desc?: ReactNode;
}) {
  return (
    <>
      <SectionLabel n={num}>{label}</SectionLabel>
      <h2
        className="reveal m-0 mb-5 max-w-[14ch] font-serif text-[clamp(40px,5.6vw,72px)] font-light leading-[1.02] -tracking-[0.01em]"
        data-delay="80"
      >
        {title}
      </h2>
      {desc && (
        <p
          className="reveal mb-16 mt-0 max-w-[56ch] text-[15px] leading-[1.65] text-ink-muted"
          data-delay="160"
        >
          {desc}
        </p>
      )}
    </>
  );
}

export function Tag({
  tone,
  children,
}: {
  tone: "green" | "gold" | "muted" | "red";
  children: ReactNode;
}) {
  const styles: Record<string, string> = {
    green:
      "bg-brand-green-light/10 text-brand-green-light border border-brand-green-light/25",
    gold: "bg-gold/10 text-gold-light border border-gold/35",
    muted: "bg-ink-muted/5 text-ink-muted border border-ink-muted/20",
    red: "bg-brand-red-light/10 text-brand-red-light border border-brand-red-light/30",
  };
  return (
    <span
      className={`self-start rounded-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
