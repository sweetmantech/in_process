import { useQuery } from "@tanstack/react-query";
import { fetchTotalMoments } from "@/lib/moment/fetchTotalMoments";

export function useTotalMomentsCount() {
  return useQuery({
    queryKey: ["total-moments-count"],
    queryFn: fetchTotalMoments,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
