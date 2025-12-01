import { TimelineMoment } from "@/types/moment";

export interface TimelineResponse {
  status: "success" | "error";
  moments: TimelineMoment[];
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
  message?: string;
}

export async function fetchTimeline(
  page = 1,
  limit = 20,
  artistAddress?: string,
  includeHidden = false,
  type?: "mutual" | "default"
): Promise<TimelineResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (artistAddress) params.append("artist", artistAddress);
  if (includeHidden) params.append("hidden", "true");
  // When type is undefined, don't append type param (gets both mutual + default)
  if (type === "mutual") {
    params.append("type", "mutual");
  } else if (type === "default") {
    params.append("type", "default");
  }
  const res = await fetch(`/api/timeline?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch timeline");
  return res.json();
}
