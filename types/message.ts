import { Database } from "@/lib/supabase/types";

type MessageRole = Database["public"]["Enums"]["message_role"];
type MessageClient = Database["public"]["Enums"]["message_client"];

interface MessageMetadata {
  id: string;
  artist_address: string | null;
  client: MessageClient;
  created_at: string;
}

export interface Message {
  id: string;
  metadata: MessageMetadata;
  parts: unknown[];
  role: MessageRole;
  moment?: unknown;
}

export interface MessagesResponse {
  messages: Message[];
  count: number;
}
