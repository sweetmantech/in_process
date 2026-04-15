import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getNotifications } from "@/lib/notifications/getNotifications";
import { InProcessNotification } from "@/types/notification";

export interface NotificationsResponse {
  status: "success" | "error";
  notifications: InProcessNotification[];
  message?: string;
}

export function useNotifications(
  page = 1,
  limit = 20,
  enabled = true,
  artist?: string,
  viewed?: boolean
) {
  const [currentPage, setCurrentPage] = useState(page);

  const query = useQuery({
    queryKey: ["notifications", currentPage, limit, artist, viewed],
    queryFn: async () => {
      return getNotifications(currentPage, limit, artist, viewed);
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return {
    ...query,
    setCurrentPage,
    currentPage,
  };
}
