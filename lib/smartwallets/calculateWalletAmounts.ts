import { Address } from "viem";
import { WalletBalance } from "./getSmartWalletsBalances";
import { Currency } from "@/types/balances";

export function calculateWalletAmounts(
  currency: Currency,
  totalAmount: bigint,
  walletsBalances: Map<Address, WalletBalance>
): Array<{ address: Address; amount: bigint }> {
  const walletAmounts: Array<{ address: Address; amount: bigint }> = [];
  let cumulativeSum = BigInt(0);

  for (const [address, balance] of walletsBalances.entries()) {
    if (cumulativeSum >= totalAmount) {
      break;
    }

    const walletBalance = currency === "eth" ? balance.ethBalance : balance.usdcBalance;
    const remainingNeeded = totalAmount - cumulativeSum;
    const amountToTake = walletBalance < remainingNeeded ? walletBalance : remainingNeeded;

    if (amountToTake > BigInt(0)) {
      walletAmounts.push({ address, amount: amountToTake });
      cumulativeSum += amountToTake;
    }
  }

  if (cumulativeSum < totalAmount) {
    throw new Error("Insufficient balance across all wallets");
  }

  return walletAmounts;
}
