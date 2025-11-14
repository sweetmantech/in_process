import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";

/**
 * Upserts multiple token fee recipient records into the in_process_token_fee_recipients table.
 * @param {Array<Object>} tokenFeeRecipients - Array of token fee recipient data objects to upsert.
 * Each object should have: { token: string, artist_address: string, percentAllocation?: number }
 * @returns {Promise<Array>} - The upserted records or error.
 * @throws {Error} - Throws if the database operation fails.
 */
export async function upsertTokenFeeRecipients(
  tokenFeeRecipients: Database["public"]["Tables"]["in_process_token_fee_recipients"]["Insert"][]
) {
  if (!tokenFeeRecipients || tokenFeeRecipients.length === 0) {
    return [];
  }

  // Remove duplicates based on conflict columns (token and artist_address)
  const uniqueTokenFeeRecipients = tokenFeeRecipients.filter(
    (tokenFeeRecipient, index, self) =>
      index ===
      self.findIndex(
        (ta) =>
          ta.token === tokenFeeRecipient.token &&
          ta.artist_address === tokenFeeRecipient.artist_address
      )
  );

  // Log deduplication info if there were duplicates
  if (uniqueTokenFeeRecipients.length < tokenFeeRecipients.length) {
    console.log(
      `Deduplicated token fee recipients: ${tokenFeeRecipients.length} -> ${
        uniqueTokenFeeRecipients.length
      } (removed ${tokenFeeRecipients.length - uniqueTokenFeeRecipients.length} duplicates)`
    );
  }

  const { data, error } = await supabase
    .from("in_process_token_fee_recipients")
    .upsert(uniqueTokenFeeRecipients, {
      onConflict: "token,artist_address",
    })
    .select();

  if (error) {
    throw error;
  }
  return data;
}
