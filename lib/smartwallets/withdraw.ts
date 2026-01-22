import {
  Address,
  encodeFunctionData,
  erc20Abi,
  Hash,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import { z } from "zod";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { Call } from "@coinbase/coinbase-sdk/dist/types/calls";
import { OneOf } from "viem";
import { withdrawSchema } from "@/lib/schema/withdrawSchema";
import { selectSocialWallets } from "@/lib/supabase/in_process_artist_social_wallets/selectSocialWallets";
import { getPublicClient } from "@/lib/viem/publicClient";

export type WithdrawInput = z.infer<typeof withdrawSchema> & {
  artistAddress: Address;
};

export interface WithdrawResult {
  hash: Hash;
  chainId: number;
  walletAddress: Address;
}

/**
 * Withdraw funds from all smart wallets linked to an artist wallet.
 * This includes:
 * - The artist's own smart wallet (created from artistAddress)
 * - All social wallets linked to the artist
 *
 * Supports both native ETH (when currency is zeroAddress) and ERC20 tokens.
 * If amount is not provided, defaults to the full balance of each smart wallet.
 */
export async function withdraw({
  artistAddress,
  currency,
  amount,
  to,
  chainId = 8453,
}: WithdrawInput): Promise<WithdrawResult[]> {
  // Get all social wallets linked to the artist
  const { data: socialWallets, error } = await selectSocialWallets({
    artistAddress: artistAddress.toLowerCase() as Address,
  });

  if (error) {
    throw new Error(`Failed to fetch social wallets: ${error.message}`);
  }

  // Store smart account objects and their addresses
  // Map: smartWalletAddress -> { smartAccount, originalAddress }
  const smartWalletMap = new Map<
    Address,
    { smartAccount: Awaited<ReturnType<typeof getOrCreateSmartWallet>>; originalAddress: Address }
  >();

  // Get artist's smart wallet
  const artistSmartAccount = await getOrCreateSmartWallet({
    address: artistAddress.toLowerCase() as Address,
  });
  if (artistSmartAccount?.address) {
    smartWalletMap.set(artistSmartAccount.address.toLowerCase() as Address, {
      smartAccount: artistSmartAccount,
      originalAddress: artistAddress.toLowerCase() as Address,
    });
  }

  // Get all social wallets' smart wallets
  if (socialWallets && socialWallets.length > 0) {
    for (const socialWallet of socialWallets) {
      const smartAccount = await getOrCreateSmartWallet({
        address: socialWallet.social_wallet.toLowerCase() as Address,
      });
      if (smartAccount?.address) {
        smartWalletMap.set(smartAccount.address.toLowerCase() as Address, {
          smartAccount,
          originalAddress: socialWallet.social_wallet.toLowerCase() as Address,
        });
      }
    }
  }

  const smartWallets = Array.from(smartWalletMap.keys());

  // Map chainId to network
  // 8453 = Base, 84532 = Base Sepolia
  const network = chainId === 84532 ? "base-sepolia" : "base";

  // If amount is not provided, fetch full balances from all smart wallets using multicall
  let balances: SmartWalletBalance[] = [];
  let erc20Decimals: number | null = null;

  if (!amount) {
    balances = await getSmartWalletBalances(smartWallets, currency, chainId);
  } else if (currency.toLowerCase() !== zeroAddress.toLowerCase()) {
    // For ERC20, we need to get decimals to parse the amount correctly
    const publicClient = getPublicClient(chainId);
    const decimalsResult = await publicClient.readContract({
      address: currency,
      abi: erc20Abi,
      functionName: "decimals",
      args: [],
    });
    erc20Decimals = decimalsResult as number;
  }

  // Withdraw from all wallets in parallel
  const withdrawPromises = smartWallets.map(async (smartWalletAddress) => {
    try {
      // Get the smart account from our map
      const walletInfo = smartWalletMap.get(smartWalletAddress);
      if (!walletInfo) {
        throw new Error(`Smart wallet info not found for ${smartWalletAddress}`);
      }

      const { smartAccount } = walletInfo;

      // Determine the amount to withdraw
      let withdrawAmount: bigint;
      if (amount) {
        // Use provided amount
        if (currency.toLowerCase() === zeroAddress.toLowerCase()) {
          withdrawAmount = parseEther(amount);
        } else {
          // For ERC20, use the decimals we fetched
          if (erc20Decimals === null) {
            throw new Error("ERC20 decimals not fetched");
          }
          withdrawAmount = parseUnits(amount, erc20Decimals);
        }
      } else {
        // Use full balance from the balances we fetched
        const walletBalance = balances.find(
          (b) => b.walletAddress.toLowerCase() === smartWalletAddress.toLowerCase()
        );
        if (!walletBalance) {
          throw new Error(`Balance not found for smart wallet ${smartWalletAddress}`);
        }
        withdrawAmount = walletBalance.balance;
      }

      // Prepare the call for withdrawal
      let call: OneOf<Call<unknown, { [key: string]: unknown }>>;

      // If currency is zeroAddress (ETH), send native ETH
      if (currency.toLowerCase() === zeroAddress.toLowerCase()) {
        call = {
          to,
          value: withdrawAmount,
        };
      } else {
        // For ERC20 tokens, encode transfer function
        call = {
          to: currency,
          data: encodeFunctionData({
            abi: erc20Abi,
            functionName: "transfer",
            args: [to, withdrawAmount],
          }),
        };
      }

      // Send the transaction
      const transaction = await sendUserOperation({
        smartAccount,
        network,
        calls: [call],
      });

      return {
        hash: transaction.transactionHash as Hash,
        chainId,
        walletAddress: smartWalletAddress,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to withdraw from wallet ${smartWalletAddress}: ${errorMessage}`);
    }
  });

  // Wait for all withdrawals to complete
  const results = await Promise.all(withdrawPromises);

  return results;
}
