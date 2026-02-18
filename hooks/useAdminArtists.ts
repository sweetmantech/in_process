import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { fetchArtists } from "@/lib/admin/fetchArtists";
import { useUserProvider } from "@/providers/UserProvider";

interface UseAdminArtistsParams {
  initialPage?: number;
  limit?: number;
  type?: "human" | "bot";
}

export function useAdminArtists({ initialPage = 1, type = "human" }: UseAdminArtistsParams = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { getAccessToken } = usePrivy();
  const { artistWallet } = useUserProvider();

  const query = useQuery({
    queryKey: ["admin-artists", currentPage, 10, type],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token");
      return fetchArtists({ accessToken, page: currentPage, limit: 10, type });
    },
    enabled: Boolean(artistWallet),
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    currentPage,
    setCurrentPage,
  };
}
