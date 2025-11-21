import { supabase } from "@/lib/supabase/client";

interface SelectTokensOptions {
  limit?: number;
  orderBy?: { field: string; ascending?: boolean };
  chainId?: number;
  tokenContract?: string;
}

/**
 * Selects tokens from the in_process_tokens table.
 * @param {Object} options - Query options.
 * @param {string} [options.tokenContract] - Token contract address to filter by.
 * @param {number} [options.chainId] - Chain ID to filter by.
 * @param {number} [options.limit] - Maximum number of tokens to return.
 * @param {Object} [options.orderBy] - Ordering options with field and ascending properties.
 * @returns {Promise<{data: Array<Object>, error: any}>} - Object containing array of token objects and any error.
 */
export async function selectTokens({
  tokenContract,
  chainId,
  limit,
  orderBy,
}: SelectTokensOptions) {
  let query = supabase
    .from("in_process_tokens")
    .select("*, token_admins:in_process_token_admins(*)");

  if (tokenContract) {
    query = query.eq("address", tokenContract.toLowerCase());
  }
  if (chainId !== undefined) {
    query = query.eq("chainId", chainId);
  }

  if (orderBy) {
    query = query.order(orderBy.field, {
      ascending: orderBy.ascending !== false,
    });
  }

  if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  return { data: data || [], error };
}
