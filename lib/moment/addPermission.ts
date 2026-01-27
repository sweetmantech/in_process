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
 * Adds admin permissions to a Moment via the smart account flow using Coinbase CDP.
 *
 * This function adds admin permissions for both the specified admin address and the smart account
 * address associated with that admin address. The operation is executed through a smart account
 * (contract wallet) associated with the artist address, allowing gasless transactions via user operations.
 *
 * @param {AddPermissionInput} params - The permission details and context
 * @param {Moment} params.moment - The Moment object containing collection address and token ID
 * @param {Address} params.adminAddress - The address to grant admin permission to (and its associated smart account)
 * @param {Address} params.artistAddress - The artist's address used to get or create the smart account for executing the transaction
 * @returns {Promise<AddPermissionResult>} The transaction hash and chain ID of the executed permission update
 *
 * @sideEffect Adds or updates admin permissions on the Moment's collection contract for both the admin address and the admin's smart account address
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

  // Get the add permission call for the admin address
  const addPermissionCall = getAddPermissionCall(moment, adminAddress);

  // Get or create a smart account for the admin address and add its permission
  const adminSmartAccount = await getOrCreateSmartWallet({
    address: adminAddress,
  });
  const addSmartAccountPermissionCall = getAddPermissionCall(
    moment,
    adminSmartAccount.address as Address
  );

  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [addPermissionCall, addSmartAccountPermissionCall],
  });

  return {
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
