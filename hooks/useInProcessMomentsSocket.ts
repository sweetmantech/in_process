import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { IN_PROCESS_CRON_SOCKET_URL } from "@/lib/consts";

export function useInProcessMomentsSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(IN_PROCESS_CRON_SOCKET_URL);

    socket.on("moments:count-updated", () => {
      queryClient.invalidateQueries({ queryKey: ["total-moments-count"] });
      queryClient.resetQueries({
        queryKey: ["timeline"],
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
}
