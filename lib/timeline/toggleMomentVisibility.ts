import { Moment } from "@/hooks/useTimeline";

export async function toggleMomentVisibility(
  moment: Moment
): Promise<{ success: boolean; updated?: number; message?: string }> {
  const response = await fetch("/api/token/hide", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ moment }),
  });
  return response.json();
}
