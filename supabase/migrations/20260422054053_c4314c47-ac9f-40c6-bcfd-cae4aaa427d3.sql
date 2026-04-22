
CREATE TABLE public.conversas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id text NOT NULL UNIQUE,
  agent_id text,
  start_time_unix_secs bigint,
  duration_secs integer,
  summary text,
  intent text,
  topic_area text,
  customer_type text,
  product_name text,
  budget text,
  ready_to_buy boolean DEFAULT false,
  outcome text,
  order_number text,
  satisfaction text,
  transcript jsonb,
  raw jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX conversas_start_time_idx ON public.conversas (start_time_unix_secs DESC);

ALTER TABLE public.conversas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read conversas"
  ON public.conversas FOR SELECT
  USING (true);

-- No INSERT/UPDATE/DELETE policies → only service_role (which bypasses RLS) can write.

ALTER TABLE public.conversas REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversas;
