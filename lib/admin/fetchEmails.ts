import { IN_PROCESS_API } from "@/lib/consts";
import { EmailsResponse } from "@/types/email";

export async function fetchEmails(
  accessToken: string,
  cursor?: string,
  limit = 20
): Promise<EmailsResponse> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);

  const res = await fetch(`${IN_PROCESS_API}/emails?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch emails");
  return res.json();
}
