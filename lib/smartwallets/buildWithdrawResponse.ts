import { Address, Hash, formatEther, formatUnits } from "viem";
import { WithdrawResult, WithdrawResponse } from "./withdraw";
import { WalletBalance } from "./getSmartWalletsBalances";

export function buildWithdrawResponse(
  currency: "eth" | "usdc",
  chainId: number,
  walletsBalances: Map<Address, WalletBalance>,
  withdrawalsMap: Map<Address, { hash: Hash; withdrawnAmount: bigint }>,
  totalEthBalance: bigint,
  totalUsdcBalance: bigint
): WithdrawResponse {
  const results: WithdrawResult[] = [];
  let remainingTotalEthBalance = totalEthBalance;
  let remainingTotalUsdcBalance = totalUsdcBalance;

  for (const [address, walletBalance] of walletsBalances.entries()) {
    const withdrawal = withdrawalsMap.get(address);
    const originalBalance =
      currency === "eth" ? walletBalance.ethBalance : walletBalance.usdcBalance;

    // Calculate remaining balance: if withdrawal happened, subtract withdrawn amount; otherwise use original balance
    const remainingBalance = withdrawal
      ? originalBalance - withdrawal.withdrawnAmount
      : originalBalance;

    const remainingAmount =
      currency === "eth" ? formatEther(remainingBalance) : formatUnits(remainingBalance, 6);

    const withdrawnAmount = withdrawal
      ? currency === "eth"
        ? formatEther(withdrawal.withdrawnAmount)
        : formatUnits(withdrawal.withdrawnAmount, 6)
      : "0";

    // Update remaining total balances
    if (withdrawal) {
      if (currency === "eth") {
        remainingTotalEthBalance -= withdrawal.withdrawnAmount;
      } else {
        remainingTotalUsdcBalance -= withdrawal.withdrawnAmount;
      }
    }

    results.push({
      hash: withdrawal?.hash ?? null,
      chainId,
      walletAddress: address,
      withdrawnAmount,
      remainingAmount,
    });
  }

  return {
    withdrawals: results,
    remainingTotalEthBalance: formatEther(remainingTotalEthBalance),
    remainingTotalUsdcBalance: formatUnits(remainingTotalUsdcBalance, 6),
  };
}
