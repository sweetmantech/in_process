import { Address } from "viem";
import { getSocialSmartWallets } from "./getSocialSmartWallets";
import getSmartWalletsBalances, { WalletBalance } from "./getSmartWalletsBalances";

export async function getSocialSmartWalletsBalances(
  artistAddress: Address,
  chainId: number
): Promise<{
  totalEthBalance: bigint;
  totalUsdcBalance: bigint;
  walletsBalances: Map<Address, WalletBalance>;
}> {
  const socialSmartWallets = await getSocialSmartWallets(artistAddress);

  const { walletsBalances, totalEthBalance, totalUsdcBalance } = await getSmartWalletsBalances(
    socialSmartWallets,
    chainId
  );

  return {
    totalEthBalance,
    totalUsdcBalance,
    walletsBalances,
  };
}
