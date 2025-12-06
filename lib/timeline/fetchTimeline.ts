import { TimelineResponse, FetchTimelineParams } from "@/types/timeline";

export async function fetchTimeline({
  page = 1,
  limit = 20,
  artistAddress,
  collection,
  includeHidden = false,
  type,
  chainId,
}: FetchTimelineParams = {}): Promise<TimelineResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (artistAddress) params.append("artist", artistAddress);
  if (collection) params.append("collection", collection);
  params.append("hidden", includeHidden ? "true" : "false");
  if (chainId) params.append("chain_id", String(chainId));
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
