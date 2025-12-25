import { Address, Hash } from "viem";
import { z } from "zod";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { permissionSchema } from "../schema/permissionSchema";
import getAddPermissionCall from "../viem/getAddPermissionCall";

export type AddPermissionInput = z.infer<typeof permissionSchema> & { artistAddress: Address };

export interface AddPermissionResult {
  hash: Hash;
  chainId: number;
}

/**
 * Collect a In Process 1155 token using a smart account via Coinbase CDP.
 * Accepts the full API input shape to collect a Moment.
 */
export async function addPermission({
  moment,
  adminAddress,
  artistAddress,
}: AddPermissionInput): Promise<AddPermissionResult> {
  // Get or create a smart account (contract wallet)
  const smartAccount = await getOrCreateSmartWallet({
    address: artistAddress,
  });

  // Get the collect call using the shared function
  const addPermissionCall = getAddPermissionCall(moment, adminAddress);

  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [addPermissionCall],
  });

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
