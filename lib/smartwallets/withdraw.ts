import { Address, Hash } from "viem";
import { z } from "zod";
import { withdrawSchema } from "@/lib/schema/withdrawSchema";
import { getSocialSmartWalletsBalances } from "./getSocialSmartWalletsBalances";
import { calculateTotalWithdrawAmount } from "./calculateTotalWithdrawAmount";
import { calculateWalletAmounts } from "./calculateWalletAmounts";
import { executeWithdrawals } from "./executeWithdrawals";
import { buildWithdrawResponse } from "./buildWithdrawResponse";

export type WithdrawInput = z.infer<typeof withdrawSchema> & {
  artistAddress: Address;
};

export interface WithdrawResult {
  hash: Hash | null;
  chainId: number;
  walletAddress: Address;
  withdrawnAmount: string;
  remainingAmount: string;
}

export interface WithdrawResponse {
  withdrawals: WithdrawResult[];
  remainingTotalEthBalance: string;
  remainingTotalUsdcBalance: string;
}

export async function withdraw({
  artistAddress,
  currency,
  amount,
  to,
  chainId = 8453,
}: WithdrawInput): Promise<WithdrawResponse> {
  const { walletsBalances, totalEthBalance, totalUsdcBalance } =
    await getSocialSmartWalletsBalances(artistAddress, chainId);

  const totalAmount = calculateTotalWithdrawAmount(
    currency,
    amount,
    totalEthBalance,
    totalUsdcBalance
  );

  const walletAmounts = calculateWalletAmounts(currency, totalAmount, walletsBalances);

  const withdrawalsMap = await executeWithdrawals(
    currency,
    walletAmounts,
    walletsBalances,
    to,
    chainId
  );

  return buildWithdrawResponse(
    currency,
    chainId,
    walletsBalances,
    withdrawalsMap,
    totalEthBalance,
    totalUsdcBalance
  );
}
