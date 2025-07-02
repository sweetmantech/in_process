// Fetches the first user matching the query from the /api/artist/search endpoint

import { Database } from "./supabase/types";

export type SearchByQueryResponse = {
  artist: Database["public"]["Tables"]["in_process_artists"]["Row"] | null;
};

/**
 * Calls the /api/artist/search endpoint with the given query.
 * Returns the first artist found, or null if none.
 */
export async function searchByQuery(
  query: string
): Promise<SearchByQueryResponse> {
  if (!query) return { artist: null };
  try {
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) return { artist: null };
    return res.json();
  } catch (error) {
    console.error("Error searching artists:", error);
    return { artist: null };
  }
}
