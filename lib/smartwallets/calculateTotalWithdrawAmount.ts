import { parseEther, parseUnits } from "viem";
import { Currency } from "@/types/balances";

export function calculateTotalWithdrawAmount(
  currency: Currency,
  amount: string | undefined,
  totalEthBalance: bigint,
  totalUsdcBalance: bigint
): bigint {
  let totalAmount = currency === "eth" ? totalEthBalance : totalUsdcBalance;
  if (totalAmount === BigInt(0)) throw new Error("No balance to withdraw");

  if (amount) {
    const expectedAmount = currency === "eth" ? parseEther(amount) : parseUnits(amount, 6);
    if (expectedAmount > totalAmount) {
      throw new Error("Insufficient balance");
    }
    totalAmount = expectedAmount;
  }

  return totalAmount;
}
