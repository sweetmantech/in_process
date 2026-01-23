import {
  Address,
  Hash,
  parseEther,
  parseUnits,
  encodeFunctionData,
  erc20Abi,
  formatEther,
  formatUnits,
} from "viem";
import { baseSepolia } from "viem/chains";
import { z } from "zod";
import { withdrawSchema } from "@/lib/schema/withdrawSchema";
import { selectSocialWallets } from "@/lib/supabase/in_process_artist_social_wallets/selectSocialWallets";
import getSmartWalletsBalances from "./getSmartWalletsBalances";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import { Call } from "@coinbase/coinbase-sdk/dist/types/calls";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import getUsdcAddress from "@/lib/getUsdcAddress";

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
  const { data: socialWallets, error } = await selectSocialWallets({
    artistAddress,
  });

  if (error || !socialWallets) throw new Error("Failed to fetch social wallets");

  const socials = socialWallets.map((social) => social.social_wallet as Address);

  const socialSmartWallets = [];
  if (socials.length) {
    for (const social of socials) {
      const smartwallet = await getOrCreateSmartWallet({ address: social });
      socialSmartWallets.push(smartwallet);
    }
  } else {
    const artistSmartWallet = await getOrCreateSmartWallet({ address: artistAddress });
    socialSmartWallets.push(artistSmartWallet);
  }

  const { walletsBalances, totalEthBalance, totalUsdcBalance } = await getSmartWalletsBalances(
    socialSmartWallets,
    chainId
  );

  let totalAmount = currency === "eth" ? totalEthBalance : totalUsdcBalance;
  if (totalAmount === BigInt(0)) throw new Error("No balance to withdraw");
  if (amount) {
    const expectedAmount = currency === "eth" ? parseEther(amount) : parseUnits(amount, 6);
    if (expectedAmount > totalAmount) {
      throw new Error("Insufficient balance");
    }
    totalAmount = expectedAmount;
  }

  // Iterate through wallet balances sequentially until cumulative sum equals totalAmount
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

  // Determine network based on chainId
  const network = chainId === baseSepolia.id ? "base-sepolia" : "base";
  const usdcAddress = getUsdcAddress(chainId);

  // Build withdrawal calls and send user operations for each wallet
  // Track withdrawals by wallet address (store bigint amount to avoid precision issues)
  const withdrawalsMap = new Map<Address, { hash: Hash; withdrawnAmount: bigint }>();

  for (const { address, amount } of walletAmounts) {
    const walletBalance = walletsBalances.get(address);
    if (!walletBalance) {
      throw new Error(`Wallet balance not found for address: ${address}`);
    }
    const smartAccount = walletBalance.smartAccount;

    let call: Call;

    if (currency === "eth") {
      // ETH transfer - simple value transfer
      call = {
        to,
        value: amount,
      };
    } else {
      // USDC transfer - ERC20 transfer call
      call = {
        to: usdcAddress,
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: "transfer",
          args: [to, amount],
        }),
      };
    }

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

  // Include all wallets in results
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
