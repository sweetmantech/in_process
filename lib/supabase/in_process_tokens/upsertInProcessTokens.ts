import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export type InProcessTokenInsert =
  Database["public"]["Tables"]["in_process_tokens"]["Insert"];

interface UpsertInProcessTokensParams {
  tokens: InProcessTokenInsert[];
  // Supabase composite unique key: address + tokenId + chainId
  onConflict?: string;
}

/**
 * Batch upsert helper for `in_process_tokens`.
 * If a token (address, tokenId, chainId) already exists it will be updated,
 * otherwise it will be inserted.
 */
export async function upsertInProcessTokens({
  tokens,
  onConflict = "address,tokenId,chainId",
}: UpsertInProcessTokensParams) {
  if (!tokens || tokens.length === 0) {
    throw new Error("No tokens provided for upsert");
  }

  const { data, error } = await supabase
    .from("in_process_tokens")
    .upsert(tokens, {
      onConflict,
      ignoreDuplicates: false,
    })
    .select();

  return { data, error };
}
