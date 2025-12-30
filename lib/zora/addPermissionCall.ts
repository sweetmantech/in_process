import { Address, encodeFunctionData, Hex } from "viem";
import { PERMISSION_BIT_ADMIN } from "@/lib/consts";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

/**
 * Adds admin permission for a single address at a specific tokenId level.
 * @param address - Address to grant admin permission to
 * @param tokenId - The specific tokenId to add permission for (0 for collection-level permissions)
 * @returns Encoded function data for addPermission call
 */
export function addPermissionCall(address: Address, tokenId: bigint): Hex {
  return encodeFunctionData({
    abi: zoraCreator1155ImplABI,
    functionName: "addPermission",
    args: [tokenId, address, BigInt(PERMISSION_BIT_ADMIN)],
  });
}
