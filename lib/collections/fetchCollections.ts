import { CollectionsResponse } from "@/types/collections";

export async function fetchCollections(
  page = 1,
  limit = 100,
  artist?: string
): Promise<CollectionsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (artist) params.append("artist", artist);
  const res = await fetch(`/api/collections?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch collections");
  return res.json();
}
