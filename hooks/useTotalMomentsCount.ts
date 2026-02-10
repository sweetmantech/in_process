import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { fetchTotalMoments } from "@/lib/moment/fetchTotalMoments";
import { IN_PROCESS_CRON_SOCKET_URL } from "@/lib/consts";

/**
 * Fetches total moments count from API.
 * Listens for socket events to refetch when new moments are indexed.
 */
export function useTotalMomentsCount() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(IN_PROCESS_CRON_SOCKET_URL);

    socket.on("moments:count-updated", () => {
      queryClient.invalidateQueries({ queryKey: ["total-moments-count"] });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["total-moments-count"],
    queryFn: fetchTotalMoments,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
