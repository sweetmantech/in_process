import { Database } from "@/lib/supabase/types";
import { IN_PROCESS_API } from "@/lib/consts";
import { InProcessPayment } from "@/types/payments";

export type InProcessNotification = {
  id: string;
  payment: InProcessPayment;
  artist: Database["public"]["Tables"]["in_process_artists"]["Row"];
  viewed: boolean;
  created_at: string | null;
};

export interface NotificationsResponse {
  status: "success" | "error";
  notifications: InProcessNotification[];
  message?: string;
}

export async function fetchNotifications(
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
