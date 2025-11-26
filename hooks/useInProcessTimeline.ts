import { useQuery } from "@tanstack/react-query";
import { getInProcessTimelineApi } from "@/lib/moment/getInProcessTimelineApi";

const useInProcessTimeline = () => {
  const query = useQuery({
    queryKey: ["in-process-timeline"],
    queryFn: getInProcessTimelineApi,
    staleTime: 60_000, // 1 minute
    refetchOnWindowFocus: false,
  });

  return {
    moments: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error instanceof Error ? query.error : null,
  };
};

export default useInProcessTimeline;
