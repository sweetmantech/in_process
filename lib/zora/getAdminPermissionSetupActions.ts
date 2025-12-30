import { Address, Hex } from "viem";
import { addPermissionCall } from "./addPermissionCall";

/**
 * Generates admin permission setup actions for In Process moment creation.
 * Adds admin permissions for the creator's smart wallet and all split addresses/smart wallets.
 * @param adminAddresses - Array of addresses to grant admin permissions to
 * @param tokenId - The specific tokenId to add permissions for (defaults to 0 for collection-level permissions)
 */
export function getAdminPermissionSetupActions(
  adminAddresses: Address[],
  tokenId: bigint = BigInt(0)
): Hex[] {
  return adminAddresses.map((address) => addPermissionCall(address, tokenId));
}
