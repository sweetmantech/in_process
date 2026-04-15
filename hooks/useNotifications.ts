import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getNotifications } from "@/lib/notifications/getNotifications";

export function useNotifications(page = 1, limit = 20, artist?: string, viewed?: boolean) {
  const [currentPage, setCurrentPage] = useState(page);

  const query = useQuery({
    queryKey: ["notifications", currentPage, limit, artist, viewed],
    queryFn: async () => {
      return getNotifications(currentPage, limit, artist, viewed);
    },
    enabled: !!artist,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return {
    ...query,
    setCurrentPage,
    currentPage,
  };
}
