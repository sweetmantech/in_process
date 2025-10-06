export interface MarkNotificationsAsViewedResponse {
  status: "success" | "error";
  updated: number;
  message?: string;
}

export async function markNotificationsAsViewed(
  artist?: string
): Promise<MarkNotificationsAsViewedResponse> {
  const params = new URLSearchParams();
  if (artist) params.append("artist", artist);

  const res = await fetch(`/api/notifications?${params.toString()}`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Failed to mark notifications as viewed");
  }

  return res.json();
}
