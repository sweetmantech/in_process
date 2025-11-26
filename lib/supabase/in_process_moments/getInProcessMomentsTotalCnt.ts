import { supabase } from "@/lib/supabase/client";
import { CHAIN_ID } from "@/lib/consts";

export async function getInProcessMomentsTotalCnt(): Promise<{
  count: number | null;
  error: Error | null;
}> {
  const { count, error } = await supabase
    .from("in_process_moments")
    .select("*, collection:in_process_collections!inner(*)", { count: "exact", head: true })
    .neq("uri", "")
    .eq("collection.chain_id", CHAIN_ID);

  return { count, error };
}
