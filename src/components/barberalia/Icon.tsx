type IconName =
  | "chat" | "mic" | "db" | "box" | "monitor" | "alert" | "send"
  | "user" | "waves" | "arrow" | "dot" | "cloud" | "cpu" | "check"
  | "search" | "plug" | "scissors";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (name) {
    case "chat":
      return <svg {...common}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4 3.5v-3.5H6.5A2.5 2.5 0 0 1 4 14.5z" /></svg>;
    case "mic":
      return <svg {...common}><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>;
    case "db":
      return <svg {...common}><ellipse cx="12" cy="5" rx="8" ry="2.5" /><path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" /><path d="M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" /></svg>;
    case "box":
      return <svg {...common}><path d="M3 7.5 12 3l9 4.5v9L12 21 3 16.5z" /><path d="M3 7.5 12 12l9-4.5" /><path d="M12 12v9" /></svg>;
    case "monitor":
      return <svg {...common}><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /><path d="M7 12l3-3 2 2 4-5" /></svg>;
    case "alert":
      return <svg {...common}><path d="M12 3 2 20h20z" /><path d="M12 10v5M12 17.5v.5" /></svg>;
    case "send":
      return <svg {...common}><path d="M4 12 20 4l-6 16-3-7z" /></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" /></svg>;
    case "waves":
      return <svg {...common}><path d="M4 12h1M7 8v8M10 5v14M13 8v8M16 10v4M19 12h1" /></svg>;
    case "arrow":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "dot":
      return <svg {...common}><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>;
    case "cloud":
      return <svg {...common}><path d="M7 18a4 4 0 0 1-.5-7.97 6 6 0 0 1 11.66 1.34A3.5 3.5 0 0 1 17.5 18z" /></svg>;
    case "cpu":
      return <svg {...common}><rect x="6" y="6" width="12" height="12" rx="1.5" /><rect x="9" y="9" width="6" height="6" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></svg>;
    case "check":
      return <svg {...common}><path d="M5 12l4 4L19 6" /></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.3-4.3" /></svg>;
    case "plug":
      return <svg {...common}><path d="M9 2v6M15 2v6M7 8h10v4a5 5 0 0 1-10 0zM12 17v5" /></svg>;
    case "scissors":
      return <svg {...common}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.12 15.88M14.47 14.47 20 20M8.12 8.12 12 12" /></svg>;
    default:
      return null;
  }
}

export type { IconName };
