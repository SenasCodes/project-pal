// Mapas de tradução PT + cores semânticas para a página /relatorios

const lower = (v: unknown) => String(v ?? "").trim().toLowerCase();

export const intentLabel = (raw: unknown): string => {
  const v = lower(raw);
  const map: Record<string, string> = {
    purchase: "Intenção de compra",
    purchase_intent: "Intenção de compra",
    buy: "Intenção de compra",
    info: "Pedido de informação",
    information: "Pedido de informação",
    pricing: "Consulta de preço",
    price: "Consulta de preço",
    support: "Apoio ao cliente",
    complaint: "Reclamação",
    appointment: "Marcação",
    booking: "Marcação",
    tracking: "Tracking de encomenda",
    order_status: "Estado de encomenda",
    cancel: "Cancelamento",
    return: "Devolução",
    other: "Outro",
  };
  return map[v] ?? (raw ? String(raw) : "—");
};

export const topicAreaLabel = (raw: unknown): string => {
  const v = lower(raw);
  const map: Record<string, string> = {
    products: "Produtos",
    product: "Produtos",
    orders: "Encomendas",
    order: "Encomendas",
    shipping: "Envios",
    delivery: "Entregas",
    pricing: "Preços",
    stock: "Stock",
    promotions: "Promoções",
    payment: "Pagamento",
    account: "Conta",
    technical: "Técnico",
    general: "Geral",
    other: "Outro",
  };
  return map[v] ?? (raw ? String(raw) : "Geral");
};

export const customerTypeLabel = (raw: unknown): string => {
  const v = lower(raw);
  const map: Record<string, string> = {
    new: "Novo cliente",
    new_customer: "Novo cliente",
    returning: "Cliente recorrente",
    returning_customer: "Cliente recorrente",
    vip: "Cliente VIP",
    professional: "Profissional",
    pro: "Profissional",
    b2b: "B2B",
    unknown: "—",
  };
  return map[v] ?? (raw ? String(raw) : "—");
};

export const outcomeLabel = (raw: unknown): string => {
  const v = lower(raw);
  const map: Record<string, string> = {
    resolved: "Resolvido",
    success: "Resolvido",
    escalated: "Escalado",
    handoff: "Escalado",
    abandoned: "Abandonado",
    failed: "Abandonado",
    purchase_intent: "Intenção de compra",
    converted: "Convertido",
    pending: "Pendente",
    unknown: "Desconhecido",
  };
  return map[v] ?? (raw ? String(raw) : "Desconhecido");
};

// Tom de cor (mapeia para classes / estilos)
export type Tone = "green" | "red" | "gold" | "muted";

export const outcomeTone = (raw: unknown): Tone => {
  const v = lower(raw);
  if (["resolved", "success", "converted"].includes(v)) return "green";
  if (["escalated", "handoff", "failed"].includes(v)) return "red";
  if (["purchase_intent"].includes(v)) return "gold";
  return "muted";
};

export const intentTone = (raw: unknown): Tone => {
  const v = lower(raw);
  if (["purchase", "purchase_intent", "buy"].includes(v)) return "gold";
  if (["complaint"].includes(v)) return "red";
  if (["support", "tracking", "order_status"].includes(v)) return "green";
  return "muted";
};

export const customerTypeTone = (raw: unknown): Tone => {
  const v = lower(raw);
  if (["vip", "professional", "pro", "b2b"].includes(v)) return "gold";
  if (["returning", "returning_customer"].includes(v)) return "green";
  if (["new", "new_customer"].includes(v)) return "muted";
  return "muted";
};

export const satisfactionDot = (raw: unknown): { color: string; label: string } => {
  const v = lower(raw);
  if (["positive", "high", "satisfied", "happy", "5", "4"].includes(v))
    return { color: "hsl(var(--brand-green-light))", label: "Satisfeito" };
  if (["negative", "low", "unsatisfied", "angry", "1", "2"].includes(v))
    return { color: "hsl(var(--brand-red-light))", label: "Insatisfeito" };
  if (["neutral", "3", "medium"].includes(v))
    return { color: "hsl(var(--gold))", label: "Neutro" };
  return { color: "hsl(var(--text-dim))", label: "—" };
};

export const formatTimestamp = (unix: number): string => {
  if (!unix) return "—";
  const d = new Date(unix * 1000);
  return d.toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDuration = (secs: number): string => {
  if (!secs || secs < 0) return "0s";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

export const formatBudget = (v: unknown): string | null => {
  if (v === null || v === undefined || v === "") return null;
  const num = typeof v === "number" ? v : parseFloat(String(v).replace(/[^\d.,]/g, "").replace(",", "."));
  if (Number.isFinite(num)) return `até €${Math.round(num)}`;
  return String(v);
};

export const isReadyToBuy = (v: unknown): boolean => {
  if (v === true) return true;
  const s = lower(v);
  return ["true", "yes", "sim", "1", "ready"].includes(s);
};
