import { useQuery } from "@tanstack/react-query";
import { fetchTimeline } from "@/lib/timeline/fetchTimeline";
import { Address } from "viem";

export function useHasMutualMoments(artistAddress?: Address) {
  const { data, isLoading } = useQuery({
    queryKey: ["mutual-moments-check", artistAddress],
    queryFn: () =>
      fetchTimeline({
        page: 1,
        limit: 1,
        artistAddress,
        includeHidden: true,
        type: "mutual",
      }),
    enabled: !!artistAddress,
    staleTime: 1000 * 60 * 5,
  });

  return {
    hasMutualMoments: (data?.moments?.length ?? 0) > 0,
    isLoading,
  };
}
