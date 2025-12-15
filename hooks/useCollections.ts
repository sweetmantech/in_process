import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "@/lib/collections/fetchCollections";
import { useUserProvider } from "@/providers/UserProvider";

export function useCollections() {
  const { artistWallet } = useUserProvider();
  const query = useQuery({
    queryKey: ["collections", artistWallet],
    queryFn: () => fetchCollections(1, 100, artistWallet),
    enabled: Boolean(artistWallet),
    staleTime: 10_000,
  });

  return {
    collections: query.data?.collections ?? [],
    isLoading: query.isLoading || query.isPending,
    error: query.error instanceof Error ? query.error : null,
  };
}
