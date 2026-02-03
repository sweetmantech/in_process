import { Database } from "@/lib/supabase/types";

export type MessageRole = Database["public"]["Enums"]["message_role"];
export type MessageClient = Database["public"]["Enums"]["message_client"];

export interface MessageMetadata {
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
