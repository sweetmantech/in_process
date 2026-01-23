import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";
import { getSmartWalletBalances } from "@/lib/smartwallets/getSmartWalleBalances";

const useSmartWallet = () => {
  const { artistWallet } = useUserProvider();

  const query = useQuery({
    queryKey: ["smart_wallet", artistWallet],
    queryFn: () => getSmartWalletBalances(artistWallet as Address),
    enabled: Boolean(artistWallet),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return {
    smartWallet: query.data?.smartWallet || "",
    isLoading: query.isLoading || query.isFetching,
    balance: query.data?.usdcBalance || "0.00",
    ethBalance: query.data?.ethBalance || "0.00",
    fetchSmartWallet: query.refetch,
  };
};

export default useSmartWallet;
