import { Icon, IconName } from "./Icon";
import { SectionHeading, Tag } from "./Shared";

const FEATURES: {
  icon: IconName;
  title: string;
  desc: string;
  tag: string;
  tone: "green" | "gold";
}[] = [
  { icon: "chat", title: "Atendimento WhatsApp 24/7", desc: "O assistente responde a clientes que procuram peças e acessórios para eletrodomésticos. Identifica modelo e referência, confirma compatibilidade e envia o link directo para o produto no catálogo.", tag: "✓ Activo na demo", tone: "green" },
  { icon: "mic", title: "Agente de Voz natural", desc: "Voz portuguesa natural por IA. O agente ajuda o cliente a descrever a peça que precisa (marca, modelo, número de série), verifica stock e indica prazos de entrega, sem fila de espera.", tag: "✓ Activo na demo", tone: "green" },
  { icon: "db", title: "Catálogo Friparque indexado", desc: "Todo o catálogo pecas.friparque.pt indexado — categorias, marcas (Bosch, Rowenta, Moulinex, Whirlpool…), compatibilidades, preços e disponibilidade. Respostas só com dados reais.", tag: "✓ Indexado", tone: "green" },
  { icon: "box", title: "Pós-venda automatizado", desc: '"Onde está a minha encomenda?", "como instalo esta peça?", "posso trocar?" — o assistente responde com estado real, tracking, instruções e política de devolução.', tag: "✓ Activo", tone: "green" },
  { icon: "monitor", title: "Dashboard em tempo real", desc: "Painel com pedidos de compatibilidade, procuras sem stock, conversas em curso e escaladas. A equipa vê em tempo real onde precisa de intervir.", tag: "✓ Online", tone: "green" },
  { icon: "alert", title: "Escalada automática para humano", desc: 'Reclamações, peças não encontradas no catálogo ou pedidos B2B complexos são encaminhados imediatamente para a equipa Friparque com contexto completo da conversa.', tag: "✓ Configurado", tone: "gold" },
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
