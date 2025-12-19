import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import { useQuery } from "@tanstack/react-query";

export function useMetadata(uri: string) {
  return useQuery({
    queryKey: ["metadata", uri],
    queryFn: () => fetchTokenMetadata(uri),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(uri),
    refetchOnMount: true,
  });
}
