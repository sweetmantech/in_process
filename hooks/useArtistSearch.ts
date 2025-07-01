import { useQuery } from "@tanstack/react-query";
import { searchByQuery, SearchByQueryResponse } from "@/lib/searchByQuery";

/**
 * React Query hook to search artist by query.
 * @param query - The query string.
 * @returns Query result: { data, isLoading, error }
 */
export function useArtistSearch(query: string) {
  return useQuery<SearchByQueryResponse>({
    queryKey: ["artistSearch", query],
    queryFn: () => searchByQuery(query),
    enabled: !!query, // Only run if query is non-empty
    staleTime: 1000 * 30, // 30 seconds (adjust as needed)
  });
}
