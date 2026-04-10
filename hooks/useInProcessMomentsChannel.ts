import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addIndexerListener } from "@/lib/supabase/indexer/addIndexerListener";
import { removeIndexerListener } from "@/lib/supabase/indexer/removeIndexerListener";

export function useInProcessMomentsChannel() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleMomentsCountUpdated = () => {
      queryClient.invalidateQueries({ queryKey: ["total-moments-count"] });
      queryClient.resetQueries({ queryKey: ["timeline"] });
    };

    addIndexerListener("moments:count-updated", handleMomentsCountUpdated);

    return () => {
      removeIndexerListener("moments:count-updated", handleMomentsCountUpdated);
    };
  }, [queryClient]);
}
