import fetchMetadata from "@/lib/arweave/fetchMetadata";
import { useQuery } from "@tanstack/react-query";

export function useMetadata(uri: string) {
  return useQuery({
    queryKey: ["metadata", uri],
    queryFn: () => fetchMetadata(uri),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(uri),
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
