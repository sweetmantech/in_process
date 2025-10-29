import { useQuery } from "@tanstack/react-query";
import { fetchWalletUsers } from "@/lib/admin/fetchWalletUsers";
import { usePrivy } from "@privy-io/react-auth";
import { User } from "@privy-io/node";
import { Address } from "viem";

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
      return users
        .map((user: User) => {
          const walletAccounts = user.linked_accounts.find(
            (account) =>
              "wallet_client_type" in account &&
              "address" in account &&
              account.wallet_client_type !== "privy"
          );
          const walletAddress =
            walletAccounts && "address" in walletAccounts ? walletAccounts.address : undefined;
          const lastSeen = walletAccounts?.latest_verified_at || user.created_at;

          return {
            id: user.id,
            walletAddress: walletAddress as Address | undefined,
            lastSeen,
          };
        })
        .filter((user) => user.walletAddress)
        .sort((a, b) => (b.lastSeen ?? 0) - (a.lastSeen ?? 0));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });
}
