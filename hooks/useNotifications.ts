import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getNotifications } from "@/lib/notifications/getNotifications";
import { useUserProvider } from "@/providers/UserProvider";

export function useNotifications(page = 1, limit = 20, viewed?: boolean) {
  const { artistWallet } = useUserProvider();
  const [currentPage, setCurrentPage] = useState(page);

  const query = useQuery({
    queryKey: ["notifications", currentPage, limit, artistWallet, viewed],
    queryFn: async () => {
      return getNotifications(currentPage, limit, artistWallet, viewed);
    },
    enabled: !!artistWallet,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return {
    ...query,
    setCurrentPage,
    currentPage,
  };
}
