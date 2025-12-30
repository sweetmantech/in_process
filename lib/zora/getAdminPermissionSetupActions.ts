import { Address, encodeFunctionData, Hex } from "viem";
import { PERMISSION_BIT_ADMIN } from "@/lib/consts";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

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
  return adminAddresses.map((address) =>
    encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "addPermission",
      args: [tokenId, address, BigInt(PERMISSION_BIT_ADMIN)],
    })
  );
}
