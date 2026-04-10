import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { indexerChannel } from "@/lib/supabase/client";

export function useInProcessMomentsSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    indexerChannel
      .on("broadcast", { event: "moments:count-updated" }, () => {
        queryClient.invalidateQueries({ queryKey: ["total-moments-count"] });
        queryClient.resetQueries({ queryKey: ["timeline"] });
      })
      .subscribe();

    return () => {
      indexerChannel.unsubscribe();
    };
  }, [queryClient]);
}
