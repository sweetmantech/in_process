import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";
import { getWalletBalances } from "@/lib/viem/getWalletBalances";

const useSocialWallet = () => {
  const { socialWalletAddress } = useUserProvider();

  const query = useQuery({
    queryKey: ["social_wallet", socialWalletAddress],
    queryFn: () => getWalletBalances(socialWalletAddress as Address),
    enabled: Boolean(socialWalletAddress),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return {
    isLoading: query.isLoading || query.isFetching,
    balance: query.data?.usdcBalance || "0.00",
    ethBalance: query.data?.ethBalance || "0.00",
    getSocialWalletBalances: query.refetch,
  };
};

export default useSocialWallet;
