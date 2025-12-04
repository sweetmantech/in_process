export interface CollectionsResponse {
  status: "success" | "error";
  collections: Array<{
    id: number;
    address: string;
    chain_id: number;
    uri: string;
    created_at: string;
    default_admin: {
      username: string | null;
      address: string;
    };
  }>;
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
  message?: string;
}

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

