import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";

type TokenInsert = Database["public"]["Tables"]["in_process_tokens"]["Insert"];
type TokenRow = Database["public"]["Tables"]["in_process_tokens"]["Row"];

/**
 * Upserts multiple token records into the in_process_tokens table.
 * @param tokens - Array of token data objects to upsert.
 * @returns The upserted records or error.
 */
export async function upsertTokens(tokens: TokenInsert[]): Promise<TokenRow[]> {
  // Remove duplicates based on conflict columns (address and chainId)
  const uniqueTokens = tokens.filter(
    (token: TokenInsert, index: number, self: TokenInsert[]) =>
      index ===
      self.findIndex((t: TokenInsert) => t.address === token.address && t.chainId === token.chainId)
  );

  const { data, error } = await supabase
    .from("in_process_tokens")
    .upsert(uniqueTokens, { onConflict: "address,chainId" })
    .select();

  if (error) {
    throw error;
  }
  return data || [];
}
