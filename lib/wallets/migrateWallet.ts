import { Address, Hash } from "viem";
import selectCollections from "../supabase/in_process_collections/selectCollections";
import { getMigrateCalls } from "./getMigrateCalls";
import { CHAIN_ID, IS_TESTNET } from "../consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";

export interface MigrateWalletInput {
  socialWallet: Address;
  artistWallet: Address;
}

/**
 * Migrates wallet data from in-process wallet (social_wallet) to external wallet (artist_wallet).
 *
 * This function:
 * 1. Finds all collections where default_admin = social_wallet
 * 2. For each collection:
 *    - Grants admin permission on tokenId:0 to artist_wallet
 *    - Updates payout_recipient from social_wallet to artist_wallet
 * 3. Transfers all funds (ETH and USDC) from social_wallet smart wallet to artist_wallet
 *
 * @param {MigrateWalletInput} params - Migration parameters
 * @param {Address} params.socialWallet - The in-process wallet address
 * @param {Address} params.artistWallet - The external wallet address to migrate to
 * @returns {Promise<MigrateWalletResult>} Migration results
 */
export async function migrateWallet({ socialWallet, artistWallet }: MigrateWalletInput) {
  try {
    const { data: collections, error: collectionsError } = await selectCollections({
      defaultAdmin: socialWallet,
    });
    if (collectionsError)
      throw new Error(
        `Failed to fetch collections: ${collectionsError?.message || "Unknown error"}`
      );
    if (!collections) throw new Error("No collections found");

    const { calls, smartWallet } = await getMigrateCalls({
      collections,
      socialWallet,
      artistWallet,
    });

    const transaction = await sendUserOperation({
      smartAccount: smartWallet,
      network: IS_TESTNET ? "base-sepolia" : "base",
      calls,
    });

    return {
      hash: transaction.transactionHash as Hash,
      chainId: CHAIN_ID,
    };
  } catch (error: any) {
    throw new Error(`Migration failed: ${error?.message || "Unknown error"}`);
  }
}
