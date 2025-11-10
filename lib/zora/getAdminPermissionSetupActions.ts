import { Address, encodeFunctionData, Hex } from "viem";
import { PERMISSION_BIT_ADMIN } from "@/lib/consts";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

/**
 * Generates admin permission setup actions for In Process moment creation.
 * Adds admin permissions for the creator's smart wallet and all split addresses/smart wallets.
 */
export function getAdminPermissionSetupActions(adminAddresses: Address[]): Hex[] {
  return adminAddresses.map((address) =>
    encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "addPermission",
      args: [BigInt(0), address, BigInt(PERMISSION_BIT_ADMIN)],
    })
  );
}
