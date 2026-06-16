import { SectionHeading, Tag } from "./Shared";

const ROADMAP: { n: string; title: string; tag: string; tagTone: "gold" | "green" | "muted"; desc: string }[] = [
  { n: "01", title: "Identificação de peça por foto", tag: "Alta prioridade", tagTone: "gold",
    desc: "O cliente envia foto da chapa de características (marca, modelo, número de série) ou da peça partida. O sistema lê com OCR/visão IA e procura automaticamente a referência correcta no catálogo Friparque." },
  { n: "02", title: "Recomendação de peças compatíveis", tag: "Alta prioridade", tagTone: "gold",
    desc: "A partir de marca e modelo do eletrodoméstico, o assistente sugere todas as peças e acessórios compatíveis disponíveis — resistências, filtros, juntas, escovas — com link directo para o produto." },
  { n: "03", title: "Notificações proativas de encomenda", tag: "Rápido de implementar", tagTone: "green",
    desc: "Mensagens WhatsApp automáticas quando a encomenda é confirmada, expedida e entregue. Reduz drasticamente os contactos repetidos de pós-venda." },
  { n: "04", title: "Qualificação B2B vs particular", tag: "Rápido de implementar", tagTone: "green",
    desc: "Distingue assistência técnica/profissional de cliente particular e adapta automaticamente condições, preços e formato de fatura. Regista o tipo de cliente para campanhas segmentadas." },
  { n: "05", title: "Integração ERP / stock em tempo real", tag: "Médio prazo", tagTone: "muted",
    desc: "Ligação ao sistema interno da Friparque para consulta de stock, preços e prazos de entrega ao segundo. Elimina respostas desactualizadas e erros de disponibilidade." },
  { n: "06", title: "Reativação de clientes inativos", tag: "Médio prazo", tagTone: "muted",
    desc: "Identifica clientes que pesquisaram peça e não compraram, ou que não voltam há mais de 90 dias, e envia mensagem personalizada com sugestões. Aumenta recorrência sem custo de aquisição." },
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
