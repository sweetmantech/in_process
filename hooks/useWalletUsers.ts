import { useQuery } from "@tanstack/react-query";
import { fetchWalletUsers } from "@/lib/admin/fetchWalletUsers";
import { usePrivy } from "@privy-io/react-auth";

export function useWalletUsers() {
  const { getAccessToken } = usePrivy();

  return useQuery({
    queryKey: ["wallet_users"],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("No access token found");
      }
      const users = await fetchWalletUsers(accessToken);
      return users;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });
}
