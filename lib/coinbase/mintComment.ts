import { Address, encodeFunctionData, Hash } from "viem";
import { z } from "zod";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { getOrCreateSmartWallet } from "./getOrCreateSmartWallet";
import { mintWithComment } from "../zora/mintWithComment";
import { mintCommentSchema } from "./mintCommentSchema";

export type MintMomentInput = z.infer<typeof mintCommentSchema>;

export interface MintMomentResult {
  hash: Hash;
  chainId: number;
}

export async function mintComment({
  account,
  to,
  token,
  comment,
  amount,
}: MintMomentInput): Promise<MintMomentResult> {
  // Create a smart account (contract wallet)
  const smartAccount = await getOrCreateSmartWallet({
    address: account as Address,
  });

  // Use the protocol SDK to generate calldata
  const { parameters } = await mintWithComment({
    account,
    to,
    token,
    comment,
    amount,
  });

  // Encode the function call data
  const mintCommentData = encodeFunctionData({
    abi: parameters.abi,
    functionName: "mint",
    args: parameters.args as any,
  });

  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [
      {
        to: token.tokenContractAddress as Address,
        data: mintCommentData,
      },
    ],
  });

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
