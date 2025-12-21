import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";
import { fetchSocialWalletData } from "@/lib/socialwallet/fetchSocialWalletData";

const useSocialWallet = () => {
  const { connectedAddress } = useUserProvider();

  const query = useQuery({
    queryKey: ["social_wallet", connectedAddress],
    queryFn: () => fetchSocialWalletData(connectedAddress as Address),
    enabled: Boolean(connectedAddress),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return {
    isLoading: query.isLoading || query.isFetching,
    balance: query.data?.usdcBalance || "0.00",
    ethBalance: query.data?.ethBalance || "0.00",
    fetchSocialWallet: query.refetch,
  };
};

export default useSocialWallet;
