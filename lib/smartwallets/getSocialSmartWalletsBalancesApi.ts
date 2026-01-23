import { Address } from "viem";
import { CHAIN_ID } from "@/lib/consts";

export interface SocialSmartWalletBalance {
  social_wallet: string;
  smart_wallet: string;
  eth_balance: string;
  usdc_balance: string;
}

export interface SocialSmartWalletsBalancesResponse {
  balances: SocialSmartWalletBalance[];
  total_eth_balance: string;
  total_usdc_balance: string;
}

export const getSocialSmartWalletsBalancesApi = async (
  artistAddress: Address,
  chainId: number = CHAIN_ID
): Promise<SocialSmartWalletsBalancesResponse> => {
  const params = new URLSearchParams({
    artist_address: artistAddress,
    chainId: String(chainId),
  });

  const res = await fetch(`/api/smartwallet/balances?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch social smart wallets balances");
  }

  return res.json();
};
