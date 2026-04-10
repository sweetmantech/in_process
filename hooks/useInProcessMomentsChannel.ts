import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

export function useInProcessMomentsChannel() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("indexer")
      .on("broadcast", { event: "moments:count-updated" }, () => {
        queryClient.invalidateQueries({ queryKey: ["total-moments-count"] });
        queryClient.resetQueries({ queryKey: ["timeline"] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
