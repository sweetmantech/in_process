import { useQuery } from "@tanstack/react-query";
import { fetchTimeline } from "@/lib/timeline/fetchTimeline";

export const useHasMutualMoments = (artistAddress?: string) => {
  const address = artistAddress?.toLowerCase() || "";

  const { data: mutualData } = useQuery({
    queryKey: ["mutual-check", address],
    queryFn: () => fetchTimeline(1, 1, address, false, true),
    enabled: Boolean(address),
    staleTime: 1000 * 60 * 5,
  });

  const hasMutualMoments = (mutualData?.moments?.length ?? 0) > 0;

  return hasMutualMoments;
};
