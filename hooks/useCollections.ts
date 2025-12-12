import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "@/lib/collections/fetchCollections";

export function useCollections(artistAddress?: string) {
  const query = useQuery({
    queryKey: ["collections", artistAddress],
    queryFn: () => fetchCollections(1, 100, artistAddress),
    enabled: Boolean(artistAddress),
    staleTime: 60_000,
  });

  return {
    collections: query.data?.collections ?? [],
    isLoading: query.isLoading || query.isPending,
    error: query.error instanceof Error ? query.error : null,
  };
}
