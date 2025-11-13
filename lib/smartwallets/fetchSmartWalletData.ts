import { Address, formatEther } from "viem";
import getSmartWallet from "./getSmartWallet";
import getUsdcBalance from "@/lib/balance/getUsdcBalance";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID } from "@/lib/consts";

export interface SmartWalletData {
  smartWallet: Address;
  usdcBalance: string;
  ethBalance: string;
}

export const fetchSmartWalletData = async (artistWallet: Address): Promise<SmartWalletData> => {
  const smartWallet = await getSmartWallet(artistWallet);

  if (!smartWallet) {
    throw new Error("Failed to fetch smart wallet address");
  }

  const publicClient = getPublicClient(CHAIN_ID);

  // Fetch balances in parallel
  const [usdcBalance, ethBalanceWei] = await Promise.all([
    getUsdcBalance(smartWallet as Address),
    publicClient.getBalance({
      address: smartWallet as Address,
    }),
  ]);

  return {
    smartWallet: smartWallet as Address,
    usdcBalance,
    ethBalance: formatEther(ethBalanceWei),
  };
};
