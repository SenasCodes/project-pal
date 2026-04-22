import { SectionHeading, Tag } from "./Shared";

const ROADMAP: { n: string; title: string; tag: string; tagTone: "gold" | "green" | "muted"; desc: string }[] = [
  { n: "01", title: "Qualificação automática B2B/B2C", tag: "Alta prioridade", tagTone: "gold",
    desc: "Identifica automaticamente se o cliente é barbeiro profissional ou consumidor final. Adapta o tom, preços e condições. Regista o tipo no sistema para seguimento personalizado e campanhas segmentadas." },
  { n: "02", title: "Agendamento de contacto de retorno", tag: "Alta prioridade", tagTone: "gold",
    desc: "Quando o cliente pede para ser contactado, o assistente regista automaticamente o pedido com nome, contacto e contexto. A equipa recebe notificação imediata com tudo o que precisa para a chamada." },
  { n: "03", title: "Notificações proativas de encomenda", tag: "Rápido de implementar", tagTone: "green",
    desc: "O sistema envia automaticamente mensagens WhatsApp quando uma encomenda é confirmada, enviada e entregue. Reduz drasticamente as dúvidas de pós-venda sem qualquer intervenção manual." },
  { n: "04", title: "Follow-up automático pós-compra", tag: "Rápido de implementar", tagTone: "green",
    desc: "48h após a entrega, o assistente pergunta se tudo correu bem. Se houver problema, abre automaticamente o processo de devolução. Aumenta retenção e reputação sem esforço." },
  { n: "05", title: "Resumo diário para a equipa", tag: "Médio prazo", tagTone: "muted",
    desc: "Todas as manhãs a equipa recebe por WhatsApp e email: contactos do dia anterior, encomendas em aberto, escaladas pendentes e métricas de atendimento. Zero esforço de reporte." },
  { n: "06", title: "Reativação de clientes inativos", tag: "Médio prazo", tagTone: "muted",
    desc: "O sistema identifica clientes que não compram há mais de 60 dias e envia automaticamente mensagem personalizada com produtos relevantes ao seu histórico. Aumenta recorrência sem custo de aquisição." },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="relative px-5 py-20 sm:px-8 md:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          num="04"
          label="Roadmap"
          title={<>O que podemos <em>acrescentar</em></>}
          desc="Funcionalidades prontas a implementar que aumentam a conversão e poupam tempo à equipa."
        />
        <div className="reveal grid grid-cols-1 gap-px border bg-brand-line border-brand md:grid-cols-2 lg:grid-cols-3" data-delay="240">
          {ROADMAP.map((r) => (
            <article
              key={r.n}
              className="relative flex min-h-[300px] flex-col bg-dark px-8 pb-8 pt-10 transition-colors hover:bg-dark-3"
            >
              <div className="mb-6 font-serif text-[56px] font-light leading-none text-ink-dim">
                {r.n}
              </div>
              <h3 className="m-0 mb-3.5 font-serif text-[22px] font-normal leading-tight text-ink">
                {r.title}
              </h3>
              <p className="m-0 mb-5 flex-1 text-[13px] leading-[1.65] text-ink-muted">
                {r.desc}
              </p>
              <Tag tone={r.tagTone}>{r.tag}</Tag>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
