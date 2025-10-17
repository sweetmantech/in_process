import { Address, encodeFunctionData, Hash } from "viem";
import { z } from "zod";
import { CHAIN_ID, IS_TESTNET, PERMISSION_BIT_ADMIN } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { getOrCreateSmartWallet } from "./getOrCreateSmartWallet";
import { airdropMomentSchema } from "./airdropMomentSchema";
import getPermission from "../zora/getPermission";

export type AirdropMomentInput = z.infer<typeof airdropMomentSchema>;

export interface AirdropResult {
  hash: Hash;
  chainId: number;
}

/**
 * Airdrop a Zora 1155 token  using a smart account via Coinbase CDP.
 * Accepts the full API input shape for airdrop a Moment.
 */
export async function airdropMoment({
  airdrop,
  account,
  collection,
}: AirdropMomentInput): Promise<AirdropResult> {
  // Get or create a smart account (contract wallet)
  const smartAccount = await getOrCreateSmartWallet({
    address: account as Address,
  });

  // Check admin permission of artist wallet and smart wallet
  const smartWalletPermissionBit = await getPermission(collection as Address, smartAccount.address);

  if (smartWalletPermissionBit !== BigInt(PERMISSION_BIT_ADMIN)) {
    const accountPermissionBit = await getPermission(collection as Address, account as Address);
    if (accountPermissionBit !== BigInt(PERMISSION_BIT_ADMIN))
      throw Error("The account does not have admin permission for this collection.");
    else throw Error("Admin permission are not yet granted to smart wallet.");
  }

  const calls = airdrop.map((item) =>
    encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "adminMint",
      args: [item.address as Address, BigInt(item.tokenId), BigInt(1), "0x"],
    })
  );

  // Encode the function call data
  const airdropCall = encodeFunctionData({
    abi: zoraCreator1155ImplABI,
    functionName: "multicall",
    args: [calls],
  });

  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [
      {
        to: collection as Address,
        data: airdropCall,
      },
    ],
  });
  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
