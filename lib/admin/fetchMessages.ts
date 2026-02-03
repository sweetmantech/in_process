import { IN_PROCESS_API } from "@/lib/consts";
import { MessagesResponse } from "@/types/message";

export interface FetchMessagesParams {
  page?: number;
  limit?: number;
  messageId?: string;
  moment?: string;
  accessToken: string;
}

export async function fetchMessages({
  page = 1,
  limit = 10,
  messageId,
  moment,
  accessToken,
}: FetchMessagesParams): Promise<MessagesResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (messageId) params.append("messageId", messageId);
  if (moment) params.append("moment", moment);

  const res = await fetch(`${IN_PROCESS_API}/messages?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}
