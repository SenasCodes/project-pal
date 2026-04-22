import { Icon, IconName } from "./Icon";
import { SectionHeading, Tag } from "./Shared";

const FEATURES: {
  icon: IconName;
  title: string;
  desc: string;
  tag: string;
  tone: "green" | "gold";
}[] = [
  { icon: "chat", title: "Atendimento WhatsApp 24/7", desc: "O assistente responde automaticamente a clientes no WhatsApp em português europeu. Detecta intenção (pré-venda ou pós-venda), consulta produtos e encomendas, e responde de forma personalizada.", tag: "✓ Activo na demo", tone: "green" },
  { icon: "mic", title: "Agente de Voz natural", desc: "Voz portuguesa natural por IA conversacional. O agente conduz conversas completas, responde sobre produtos, encomendas e devoluções, e escala para humano quando necessário.", tag: "✓ Activo na demo", tone: "green" },
  { icon: "db", title: "Base de conhecimento inteligente", desc: "Toda a informação da Barberalia indexada — catálogo, políticas de devolução, encomendas activas, prazos e condições. Responde apenas com dados reais da empresa, nunca com informação genérica.", tag: "✓ Indexado", tone: "green" },
  { icon: "box", title: "Pós-venda automatizado", desc: '"Onde está a minha encomenda?" — o assistente responde com estado real, tracking e estimativa de entrega. Cobre devoluções, trocas, produtos danificados e faturação.', tag: "✓ Activo", tone: "green" },
  { icon: "monitor", title: "Dashboard em tempo real", desc: "Painel visual com conversas recentes, métricas de atendimento, encomendas em aberto e escaladas pendentes. Actualiza automaticamente.", tag: "✓ Online", tone: "green" },
  { icon: "alert", title: "Escalada automática para humano", desc: 'Quando o cliente usa palavras como "reclamação" ou "urgente", ou quando a situação é complexa, o sistema escala imediatamente para a equipa com contexto completo da conversa.', tag: "✓ Configurado", tone: "gold" },
];

export function WhatWorks() {
  return (
    <section id="funcionalidades" className="relative px-5 py-20 sm:px-8 md:py-[120px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          num="01"
          label="Activo na demo"
          title={<>O que <em>já funciona </em> hoje</>}
          desc="O sistema está configurado e a responder em tempo real nos canais demonstrados."
        />

        <div
          className="reveal grid grid-cols-1 gap-px border bg-brand-line border-brand md:grid-cols-2 lg:grid-cols-3"
          data-delay="240"
        >
          {FEATURES.map((f, i) => (
            <article
              key={i}
              className="relative flex min-h-[280px] flex-col bg-dark px-8 pb-8 pt-10 transition-colors hover:bg-dark-3"
            >
              <div className="mb-7 text-gold">
                <Icon name={f.icon} size={22} />
              </div>
              <h3 className="m-0 mb-3.5 font-serif text-[22px] font-normal leading-tight text-ink">
                {f.title}
              </h3>
              <p className="m-0 mb-5 flex-1 text-[13px] leading-[1.65] text-ink-muted">
                {f.desc}
              </p>
              <Tag tone={f.tone}>{f.tag}</Tag>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
