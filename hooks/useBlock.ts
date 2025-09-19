import { useQuery } from "@tanstack/react-query";
import { getBlockTimestamp } from "@/lib/payments/getBlockTimestamp";

export function useBlock(blockNumber: string, chainId: number) {
  return useQuery({
    queryKey: ["block", blockNumber, chainId],
    queryFn: () => getBlockTimestamp(blockNumber, chainId),
    enabled: Boolean(blockNumber && chainId),
    staleTime: 1000 * 60 * 60, // 1 hour - block timestamps don't change
    retry: (failureCount) => failureCount < 2,
  });
}
