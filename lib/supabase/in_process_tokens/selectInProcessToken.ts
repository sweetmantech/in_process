import { supabase } from "@/lib/supabase/client";

/**
 * Fetches tokens from the "in_process_tokens" table.
 * @param filters Optional filters to apply (e.g. by artist address, chainId, etc).
 * @returns Array of token rows, or throws on error.
 */
export async function selectInProcessToken({
  address,
  chainId,
}: {
  chainId?: number;
  address?: string;
}) {
  let query = supabase
    .from("in_process_tokens")
    .select("*, token_admins:in_process_token_admins(*)");

  if (address) {
    query = query.eq("address", address.toLowerCase());
  }

  if (chainId !== undefined) {
    query = query.eq("chainId", chainId);
  }

  const { data, error } = await query.single();
  if (error) {
    throw error;
  }
  return data;
}
