import { IN_PROCESS_API } from "@/lib/consts";
import { ArtistsResponse } from "@/types/artist";

export interface FetchArtistsParams {
  accessToken: string;
  page?: number;
  limit?: number;
  type?: "human" | "bot";
}

export async function fetchArtists({
  accessToken,
  page = 1,
  limit = 50,
  type = "human",
}: FetchArtistsParams): Promise<ArtistsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    type,
  });

  const res = await fetch(`${IN_PROCESS_API}/artists?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch artists");
  return res.json();
}
