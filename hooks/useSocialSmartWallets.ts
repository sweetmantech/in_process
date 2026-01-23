import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import { Address } from "viem";
import { getSocialSmartWalletsBalancesApi } from "@/lib/smartwallets/getSocialSmartWalletsBalancesApi";
import { CHAIN_ID } from "@/lib/consts";

const useSocialSmartWallets = () => {
  const { artistWallet } = useUserProvider();

  const query = useQuery({
    queryKey: ["social_smart_wallets_balances", artistWallet, CHAIN_ID],
    queryFn: () => getSocialSmartWalletsBalancesApi(artistWallet as Address, CHAIN_ID),
    enabled: Boolean(artistWallet),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return {
    isLoading: query.isLoading || query.isFetching,
    balances: query.data?.balances || [],
    totalEthBalance: query.data?.total_eth_balance || "0.00",
    totalUsdcBalance: query.data?.total_usdc_balance || "0.00",
    refetch: query.refetch,
  };
};

export default useSocialSmartWallets;
