import { IN_PROCESS_API } from "@/lib/consts";
import { NotificationsResponse } from "@/types/notification";

export async function getNotifications(
  page = 1,
  limit = 20,
  artist?: string,
  viewed?: boolean
): Promise<NotificationsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (artist) params.append("artist", artist);
  if (viewed !== undefined) params.append("viewed", String(viewed));

  const res = await fetch(`${IN_PROCESS_API}/notifications?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}
