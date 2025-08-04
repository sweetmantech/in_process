import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export type InProcessTokenInsert =
  Database["public"]["Tables"]["in_process_tokens"]["Insert"];

export type InProcessTokenRow =
  Database["public"]["Tables"]["in_process_tokens"]["Row"];

interface InsertInProcessTokensParams {
  tokens: InProcessTokenInsert[];
}

/**
 * Simple batch insert helper for `in_process_tokens`.
 * Does NOT attempt to handle duplicates – caller must ensure uniqueness.
 */
export async function insertInProcessTokens({
  tokens,
}: InsertInProcessTokensParams): Promise<{
  data: InProcessTokenRow[] | null;
  error: Error | null;
}> {
  if (!tokens || tokens.length === 0) {
    throw new Error("No tokens provided for insert");
  }

  const { data, error } = await supabase
    .from("in_process_tokens")
    .insert(tokens)
    .select();

  return { data, error };
}
