import { supabase } from "@/lib/supabase/client";

/**
 * Gets the maximum createdAt timestamp from the in_process_tokens table grouped by chainId.
 * @returns {Promise<Object>} - Object with chainId as keys and max timestamp as values, or empty object if no tokens exist.
 */
export async function getMaxBlockTimestamp(chainId: number) {
  const { data, error } = await supabase
    .from("in_process_tokens")
    .select()
    .eq("chainId", chainId)
    .order("createdAt", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    return new Date(0).getTime() / 1000;
  }
  return new Date(data[0].createdAt).getTime() / 1000;
}
