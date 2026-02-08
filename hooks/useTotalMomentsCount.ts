import { useQuery } from "@tanstack/react-query";
import { fetchTotalMoments } from "@/lib/moment/fetchTotalMoments";

/**
 * Fetches total moments count from API.
 * Fallback to initialCount (from props) if API fails.
 */
export function useTotalMomentsCount() {
  return useQuery({
    queryKey: ["total-moments-count"],
    queryFn: fetchTotalMoments,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
