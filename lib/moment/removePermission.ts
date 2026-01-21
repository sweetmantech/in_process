import { Address, Hash } from "viem";
import { z } from "zod";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { permissionSchema } from "../schema/permissionSchema";
import getRemovePermissionCall from "../viem/getRemovePermissionCall";

export type RemovePermissionInput = z.infer<typeof permissionSchema> & { artistAddress: Address };

export interface RemovePermissionResult {
  hash: Hash;
  chainId: number;
}

/**
 * Removes a permission from a Moment via the smart account flow using Coinbase CDP.
 *
 * This function removes an admin permission for a specified address on a Moment.
 * The operation is executed through a smart account (contract wallet) associated with
 * the artist address, allowing gasless transactions via user operations.
 *
 * @param {RemovePermissionInput} params - The permission details and context
 * @param {Moment} params.moment - The Moment object containing collection address and token ID
 * @param {Address} params.adminAddress - The address to remove admin permission from
 * @param {Address} params.artistAddress - The artist's address used to get or create the smart account
 * @returns {Promise<RemovePermissionResult>} The transaction hash and chain ID of the executed permission removal
 *
 * @sideEffect Removes the admin permission on the Moment's collection contract
 */
export async function removePermission({
  moment,
  adminAddress,
  artistAddress,
}: RemovePermissionInput): Promise<RemovePermissionResult> {
  // Get or create a smart account (contract wallet)
  const smartAccount = await getOrCreateSmartWallet({
    address: artistAddress,
  });

  // Get the remove permission call using the shared function
  const removePermissionCall = getRemovePermissionCall(moment, adminAddress);
  const adminSmartAccount = await getOrCreateSmartWallet({
    address: adminAddress,
  });
  const removeSmartAccountPermissionCall = getRemovePermissionCall(
    moment,
    adminSmartAccount.address
  );
  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [removePermissionCall, removeSmartAccountPermissionCall],
  });

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
