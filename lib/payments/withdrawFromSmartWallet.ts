import {
  Address,
  encodeFunctionData,
  erc20Abi,
  Hash,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { Call } from "@coinbase/coinbase-sdk/dist/types/calls";
import { OneOf } from "viem";

export interface WithdrawFromSmartWalletInput {
  artistAddress: Address;
  currencyAddress: Address;
  amount: string;
  recipientAddress: Address;
}

export interface WithdrawResult {
  hash: Hash;
  chainId: number;
}

/**
 * Withdraw funds from a smart wallet.
 * Supports both native ETH (when currencyAddress is zeroAddress) and ERC20 tokens.
 */
export async function withdrawFromSmartWallet({
  artistAddress,
  currencyAddress,
  amount,
  recipientAddress,
}: WithdrawFromSmartWalletInput): Promise<WithdrawResult> {
  // Get or create smart wallet
  const smartAccount = await getOrCreateSmartWallet({
    address: artistAddress,
  });

  let call: OneOf<Call<unknown, { [key: string]: unknown }>>;

  // If currency is zeroAddress (ETH), send native ETH
  if (currencyAddress.toLowerCase() === zeroAddress.toLowerCase()) {
    call = {
      to: recipientAddress,
      value: parseEther(amount),
    };
  } else {
    // For ERC20 tokens (e.g., USDC), encode transfer function
    call = {
      to: currencyAddress,
      data: encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [recipientAddress, parseUnits(amount, 6)], // USDC uses 6 decimals
      }),
    };
  }

  // Send the transaction
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [call],
  });

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
