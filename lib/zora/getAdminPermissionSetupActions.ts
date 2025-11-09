import { Address, encodeFunctionData, Hex } from "viem";
import { PERMISSION_BIT_ADMIN } from "@/lib/consts";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

/**
 * Generates admin permission setup actions for In Process moment creation.
 * Adds admin permissions for the creator's smart wallet and all split addresses/smart wallets.
 */
export function getAdminPermissionSetupActions({
  smartAccount,
  splitAddresses,
  splitSmartWallets,
}: {
  smartAccount: Address;
  splitAddresses: Address[];
  splitSmartWallets: Address[];
}): Hex[] {
  const actions = [
    // Add admin permission for creator's smart wallet
    encodeFunctionData({
      abi: zoraCreator1155ImplABI,
      functionName: "addPermission",
      args: [BigInt(0), smartAccount, BigInt(PERMISSION_BIT_ADMIN)],
    }),
  ];

  // Add admin permissions for all split addresses
  for (const address of splitAddresses) {
    actions.push(
      encodeFunctionData({
        abi: zoraCreator1155ImplABI,
        functionName: "addPermission",
        args: [BigInt(0), address, BigInt(PERMISSION_BIT_ADMIN)],
      })
    );
  }

  // Add admin permissions for all split smart wallets
  for (const smartWallet of splitSmartWallets) {
    actions.push(
      encodeFunctionData({
        abi: zoraCreator1155ImplABI,
        functionName: "addPermission",
        args: [BigInt(0), smartWallet, BigInt(PERMISSION_BIT_ADMIN)],
      })
    );
  }

  return actions;
}
