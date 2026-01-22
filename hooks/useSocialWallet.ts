import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";
import { getWalletBalances } from "@/lib/viem/getWalletBalances";
import { getSmartWalleBalances } from "@/lib/smartwallets/getSmartWalleBalances";

const useSocialWallet = () => {
  const { connectedAddress, isSocialWallet } = useUserProvider();

  const socialWalletQuery = useQuery({
    queryKey: ["social_wallet", connectedAddress],
    queryFn: () => getWalletBalances(connectedAddress as Address),
    enabled: Boolean(connectedAddress),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  const smartWalletQuery = useQuery({
    queryKey: ["social_wallet_smart_wallet", connectedAddress],
    queryFn: () => getSmartWalleBalances(connectedAddress as Address),
    enabled: Boolean(connectedAddress) && isSocialWallet,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return {
    isLoading: socialWalletQuery.isLoading || socialWalletQuery.isFetching,
    balance: socialWalletQuery.data?.usdcBalance || "0.00",
    ethBalance: socialWalletQuery.data?.ethBalance || "0.00",
    fetchSocialWallet: socialWalletQuery.refetch,
    // Smart wallet data
    smartWallet: smartWalletQuery.data?.smartWallet || "",
    smartWalletIsLoading: smartWalletQuery.isLoading || smartWalletQuery.isFetching,
    smartWalletBalance: smartWalletQuery.data?.usdcBalance || "0.00",
    smartWalletEthBalance: smartWalletQuery.data?.ethBalance || "0.00",
    fetchSmartWallet: smartWalletQuery.refetch,
  };
};

export default useSocialWallet;
