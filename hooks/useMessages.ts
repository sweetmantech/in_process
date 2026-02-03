import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { fetchMessages } from "@/lib/admin/fetchMessages";

interface UseMessagesParams {
  initialPage?: number;
  limit?: number;
  enabled?: boolean;
}

export function useMessages({
  initialPage = 1,
  limit = 10,
  enabled = true,
}: UseMessagesParams = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { getAccessToken } = usePrivy();

  const query = useQuery({
    queryKey: ["admin-messages", currentPage, limit],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token");
      return fetchMessages({ page: currentPage, limit, accessToken });
    },
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
  });

  return {
    ...query,
    currentPage,
    setCurrentPage,
  };
}
