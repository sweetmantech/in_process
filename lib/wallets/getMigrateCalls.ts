import { Address } from "viem";
import { Call } from "@coinbase/coinbase-sdk/dist/types/calls";
import { OneOf } from "viem";
import getAddPermissionCall from "../viem/getAddPermissionCall";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { EvmSmartAccount } from "@coinbase/cdp-sdk";

export interface GetMigrateCallsInput {
  collections: Array<{
    address: string;
    chain_id: number;
    admins: Array<{ artist_address: string }>;
  }>;
  socialWallet: Address;
  artistWallet: Address;
}

/**
 * Generates permission calls for migrating wallet permissions from social wallet to artist wallet.
 *
 * For each collection where the social wallet has admin permissions, this function generates calls
 * to grant admin permissions on tokenId:0 (collection level) to both the artist wallet and its
 * associated smart wallet.
 *
 * @param {GetMigrateCallsInput} params - Migration call parameters
 * @param {Array} params.collections - Collections to migrate permissions for
 * @param {Address} params.socialWallet - The in-process wallet address (source)
 * @param {Address} params.artistWallet - The external wallet address (destination)
 * @returns {Promise<OneOf<Call<unknown, { [key: string]: unknown }>>[]>} Array of permission calls
 */
export async function getMigrateCalls({
  collections,
  socialWallet,
  artistWallet,
}: GetMigrateCallsInput): Promise<{
  calls: OneOf<Call<unknown, { [key: string]: unknown }>>[];
  smartWallet: EvmSmartAccount;
}> {
  const smartWallet = await getOrCreateSmartWallet({ address: socialWallet });
  const artistSmartWallet = await getOrCreateSmartWallet({ address: artistWallet });

  const calls: OneOf<Call<unknown, { [key: string]: unknown }>>[] = [];

  for (const collection of collections) {
    const admins = collection.admins.map((admin: any) => admin.artist_address.toLowerCase());
    const artistWalletLower = artistWallet.toLowerCase();
    const artistSmartWalletLower = artistSmartWallet.address.toLowerCase();
    const smartWalletLower = smartWallet.address.toLowerCase();

    const shouldAddPermission =
      (!admins.includes(artistWalletLower) || !admins.includes(artistSmartWalletLower)) &&
      admins.includes(smartWalletLower);

    if (shouldAddPermission) {
      const addPermissionCall = getAddPermissionCall(
        {
          collectionAddress: collection.address as Address,
          tokenId: "0",
          chainId: collection.chain_id,
        },
        artistWallet
      );
      const addSmartAccountPermissionCall = getAddPermissionCall(
        {
          collectionAddress: collection.address as Address,
          tokenId: "0",
          chainId: collection.chain_id,
        },
        artistSmartWallet.address as Address
      );
      calls.push(addPermissionCall, addSmartAccountPermissionCall);
    }
  }

  return {
    calls,
    smartWallet,
  };
}
