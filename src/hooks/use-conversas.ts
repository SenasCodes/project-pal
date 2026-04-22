import { useEffect, useRef, useState } from "react";
import {
  ELEVENLABS_BASE_URL,
  VOICE_AGENT_ID,
  XI_API_KEY,
} from "@/lib/elevenlabs-config";
import type {
  ConversaCard,
  ConversationDetail,
  ConversationListResponse,
  DataCollectionField,
} from "@/lib/relatorios-types";

const POLL_MS = 30_000;

const pickValue = (f?: DataCollectionField): string | undefined => {
  if (!f) return undefined;
  const v = f.value;
  if (v === null || v === undefined || v === "") return undefined;
  return String(v);
};

function normalize(detail: ConversationDetail, fallbackStart?: number, fallbackDuration?: number): ConversaCard {
  const dcr = detail.analysis?.data_collection_results ?? {};
  const get = (key: string) => pickValue(dcr[key]);

  return {
    id: detail.conversation_id,
    startUnix: detail.start_time_unix_secs ?? fallbackStart ?? 0,
    durationSecs: detail.call_duration_secs ?? fallbackDuration ?? 0,
    summary: detail.analysis?.transcript_summary,
    intent: get("intent") ?? get("user_intent"),
    topicArea: get("topic_area") ?? get("topic"),
    customerType: get("customer_type"),
    productName: get("product_name") ?? get("product"),
    budget: get("budget"),
    readyToBuy: (() => {
      const f = dcr["ready_to_buy"];
      if (!f) return false;
      const v = f.value;
      if (v === true) return true;
      const s = String(v ?? "").toLowerCase();
      return ["true", "yes", "sim", "1", "ready"].includes(s);
    })(),
    outcome: get("outcome") ?? detail.analysis?.call_successful,
    orderNumber: get("order_number") ?? get("order"),
    satisfaction: get("satisfaction") ?? get("customer_satisfaction"),
  };
}

async function fetchList(): Promise<{ id: string; start: number; duration: number }[]> {
  const url = `${ELEVENLABS_BASE_URL}/convai/conversations?agent_id=${VOICE_AGENT_ID}&page_size=100`;
  const res = await fetch(url, { headers: { "xi-api-key": XI_API_KEY } });
  if (!res.ok) throw new Error(`List failed: ${res.status}`);
  const data: ConversationListResponse = await res.json();
  return (data.conversations ?? []).map((c) => ({
    id: c.conversation_id,
    start: c.start_time_unix_secs,
    duration: c.call_duration_secs,
  }));
}

async function fetchDetail(id: string): Promise<ConversationDetail> {
  const res = await fetch(`${ELEVENLABS_BASE_URL}/convai/conversations/${id}`, {
    headers: { "xi-api-key": XI_API_KEY },
  });
  if (!res.ok) throw new Error(`Detail ${id} failed: ${res.status}`);
  return res.json();
}

export function useConversas() {
  const [conversas, setConversas] = useState<ConversaCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const seenIds = useRef<Set<string>>(new Set());
  const cache = useRef<Map<string, ConversaCard>>(new Map());

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const isPlaceholder = !XI_API_KEY || XI_API_KEY.includes("COLA_AQUI");

    const tick = async (isFirst: boolean) => {
      if (isPlaceholder) {
        if (!cancelled) {
          setError(
            "Chave ElevenLabs não configurada. Edita src/lib/elevenlabs-config.ts.",
          );
          setLoading(false);
        }
        return;
      }
      try {
        const list = await fetchList();
        // Buscar detalhes só de conversas novas (não em cache)
        const toFetch = list.filter((c) => !cache.current.has(c.id));
        const fetched = await Promise.all(
          toFetch.map(async (c) => {
            try {
              const d = await fetchDetail(c.id);
              return normalize(d, c.start, c.duration);
            } catch {
              return {
                id: c.id,
                startUnix: c.start,
                durationSecs: c.duration,
              } as ConversaCard;
            }
          }),
        );
        if (cancelled) return;

        fetched.forEach((c) => cache.current.set(c.id, c));

        const all = list
          .map((c) => cache.current.get(c.id)!)
          .filter(Boolean)
          .sort((a, b) => b.startUnix - a.startUnix);

        // Detecta IDs novos (não no primeiro fetch)
        if (!isFirst) {
          const fresh = all.filter((c) => !seenIds.current.has(c.id)).map((c) => c.id);
          if (fresh.length) {
            setNewIds((prev) => {
              const next = new Set(prev);
              fresh.forEach((id) => next.add(id));
              return next;
            });
            // limpa o pulse após 2s
            setTimeout(() => {
              if (cancelled) return;
              setNewIds((prev) => {
                const next = new Set(prev);
                fresh.forEach((id) => next.delete(id));
                return next;
              });
            }, 2100);
          }
        }
        all.forEach((c) => seenIds.current.add(c.id));

        setConversas(all);
        setError(null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Erro ao carregar conversas");
      } finally {
        if (!cancelled && isFirst) setLoading(false);
      }
    };

    tick(true);
    timer = window.setInterval(() => tick(false), POLL_MS);

    return () => {
      cancelled = true;
      if (timer) window.clearInterval(timer);
    };
  }, []);

  return { conversas, loading, error, newIds };
}
