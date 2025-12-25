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
 * Adds a permission to a Moment via the smart account flow using Coinbase CDP.
 *
 * This function adds or updates an admin permission for a specified address on a Moment.
 * The operation is executed through a smart account (contract wallet) associated with
 * the artist address, allowing gasless transactions via user operations.
 *
 * @param {AddPermissionInput} params - The permission details and context
 * @param {Moment} params.moment - The Moment object containing collection address and token ID
 * @param {Address} params.adminAddress - The address to grant admin permission to
 * @param {Address} params.artistAddress - The artist's address used to get or create the smart account
 * @returns {Promise<AddPermissionResult>} The transaction hash and chain ID of the executed permission update
 *
 * @sideEffect Adds or updates the admin permission on the Moment's collection contract
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

  // Get the add permission call using the shared function
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
