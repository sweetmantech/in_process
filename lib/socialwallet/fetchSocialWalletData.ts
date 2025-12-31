import { Address, formatEther } from "viem";
import getUsdcBalance from "@/lib/balance/getUsdcBalance";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID } from "@/lib/consts";

export interface SocialWalletData {
  usdcBalance: string;
  ethBalance: string;
}

export const fetchSocialWalletData = async (socialWallet: Address): Promise<SocialWalletData> => {
  const publicClient = getPublicClient(CHAIN_ID);

  // Fetch balances in parallel
  const [usdcBalance, ethBalanceWei] = await Promise.all([
    getUsdcBalance(socialWallet as Address),
    publicClient.getBalance({
      address: socialWallet as Address,
    }),
  ]);

  return {
    usdcBalance,
    ethBalance: formatEther(ethBalanceWei),
  };
};
