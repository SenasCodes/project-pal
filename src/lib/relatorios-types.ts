// Tipos para o payload da API ElevenLabs Conversational AI

export type ConversationListItem = {
  conversation_id: string;
  agent_id: string;
  start_time_unix_secs: number;
  call_duration_secs: number;
  status?: string;
  message_count?: number;
  call_successful?: "success" | "failure" | "unknown";
};

export type ConversationListResponse = {
  conversations: ConversationListItem[];
  next_cursor?: string | null;
  has_more?: boolean;
};

export type DataCollectionField = {
  data_collection_id?: string;
  value?: string | number | boolean | null;
  rationale?: string;
  json_schema?: unknown;
};

export type ConversationAnalysis = {
  evaluation_criteria_results?: Record<string, unknown>;
  data_collection_results?: Record<string, DataCollectionField>;
  call_successful?: "success" | "failure" | "unknown";
  transcript_summary?: string;
};

export type ConversationDetail = {
  conversation_id: string;
  agent_id: string;
  status?: string;
  start_time_unix_secs?: number;
  call_duration_secs?: number;
  transcript?: Array<{
    role: "user" | "agent";
    message?: string;
    time_in_call_secs?: number;
  }>;
  metadata?: Record<string, unknown>;
  analysis?: ConversationAnalysis;
};

// Modelo normalizado usado pela UI
export type ConversaCard = {
  id: string;
  startUnix: number;
  durationSecs: number;
  summary?: string;
  intent?: string;
  topicArea?: string;
  customerType?: string;
  productName?: string;
  budget?: string | number;
  readyToBuy?: boolean;
  outcome?: string;
  orderNumber?: string;
  satisfaction?: string;
};
