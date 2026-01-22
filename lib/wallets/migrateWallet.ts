import { Address, Hash, zeroAddress } from "viem";
import { CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";
import { addPermission } from "@/lib/moment/addPermission";
import { getSmartWalleBalances } from "@/lib/smartwallets/getSmartWalleBalances";
import { withdraw } from "@/lib/smartwallets/withdraw";
import upsertAdmins from "@/lib/supabase/in_process_admins/upsertAdmins";
import selectCollections from "../supabase/in_process_collections/selectCollections";

export interface MigrateWalletInput {
  socialWallet: Address;
  artistWallet: Address;
}

export interface MigrateWalletResult {
  success: boolean;
  collectionsUpdated: number;
  permissionsGranted: number;
  fundsTransferred: {
    eth: { hash: Hash | null; amount: string };
    usdc: { hash: Hash | null; amount: string };
  };
  errors?: string[];
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
export async function migrateWallet({
  socialWallet,
  artistWallet,
}: MigrateWalletInput): Promise<MigrateWalletResult> {
  try {
    const collections = await selectCollections({ defaultAdmin: socialWallet });
  } catch (error: any) {
    throw new Error(`Migration failed: ${error?.message || "Unknown error"}`);
  }
}
