import { Address, formatEther } from "viem";
import getUsdcBalance from "@/lib/balance/getUsdcBalance";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID } from "@/lib/consts";

export interface WalletBalances {
  usdcBalance: string;
  ethBalance: string;
}

export const getWalletBalances = async (walletAddress: Address): Promise<WalletBalances> => {
  const publicClient = getPublicClient(CHAIN_ID);

  // Fetch balances in parallel
  const [usdcBalance, ethBalanceWei] = await Promise.all([
    getUsdcBalance(walletAddress as Address),
    publicClient.getBalance({
      address: walletAddress as Address,
    }),
  ]);

  return {
    usdcBalance,
    ethBalance: formatEther(ethBalanceWei),
  };
};
