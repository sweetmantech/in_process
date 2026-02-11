import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import getSocket from "@/lib/socket/getSocket";

export function useInProcessMomentsSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    const handleCountUpdated = () => {
      queryClient.invalidateQueries({ queryKey: ["total-moments-count"] });
      queryClient.resetQueries({
        queryKey: ["timeline"],
      });
    };

    socket.on("moments:count-updated", handleCountUpdated);

    return () => {
      socket.off("moments:count-updated", handleCountUpdated);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
