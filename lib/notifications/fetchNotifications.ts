import type { InProcessNotification } from "@/lib/supabase/in_process_notifications/selectNotifications";

export interface NotificationsResponse {
  status: "success" | "error";
  notifications: InProcessNotification[];
  message?: string;
}

export async function fetchNotifications(
  page = 1,
  limit = 20,
  artist?: string,
  viewed?: boolean,
): Promise<NotificationsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (artist) params.append("artist", artist);
  if (viewed !== undefined) params.append("viewed", String(viewed));

  const res = await fetch(`/api/notifications?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}
