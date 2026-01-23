import { Address, Hash } from "viem";
import { baseSepolia } from "viem/chains";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { WalletBalance } from "./getSmartWalletsBalances";
import { getWithdrawalCall } from "./getWithdrawalCall";

export async function executeWithdrawals(
  currency: "eth" | "usdc",
  walletAmounts: Array<{ address: Address; amount: bigint }>,
  walletsBalances: Map<Address, WalletBalance>,
  to: Address,
  chainId: number
): Promise<Map<Address, { hash: Hash; withdrawnAmount: bigint }>> {
  const network = chainId === baseSepolia.id ? "base-sepolia" : "base";
  const withdrawalsMap = new Map<Address, { hash: Hash; withdrawnAmount: bigint }>();

  for (const { address, amount } of walletAmounts) {
    const walletBalance = walletsBalances.get(address);
    if (!walletBalance) {
      throw new Error(`Wallet balance not found for address: ${address}`);
    }
    const smartAccount = walletBalance.smartAccount;

    const call = getWithdrawalCall(currency, amount, to, chainId);

    // Send user operation and wait for transaction receipt
    const transaction = await sendUserOperation({
      smartAccount,
      network,
      calls: [call],
    });

    withdrawalsMap.set(address, {
      hash: transaction.transactionHash as Hash,
      withdrawnAmount: amount,
    });
  }

  return withdrawalsMap;
}
