import { useEffect, useRef, useState } from "react";
import { LiveDot } from "./Shared";

const LINKS: [string, string][] = [
  ["Demo", "demo"],
  ["Funcionalidades", "funcionalidades"],
  ["Dashboard", "dashboard"],
  ["Roadmap", "roadmap"],
  ["Projeção", "projecao"],
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 100 && y > lastY.current) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] border-b border-brand backdrop-blur-md transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ background: "hsl(var(--dark) / 0.72)" }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-8 py-[18px]">
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em]">
          <LiveDot />
          <span className="font-normal text-ink">FRIPARQUE</span>
          <span className="mx-0.5 text-ink-dim">·</span>
          <span className="hidden text-ink-muted normal-case tracking-[0.08em] sm:inline">
            Sistema IA · Activo
          </span>
        </div>
        <div className="hidden gap-7 md:flex">
          {LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-0 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-gold-light"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
