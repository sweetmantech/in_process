import { supabase } from "@/lib/supabase/client";
import { CHAIN_ID } from "@/lib/consts";

export async function getInProcessTokensCount(): Promise<{
  count: number | null;
  error: Error | null;
}> {
  const { count, error } = await supabase
    .from("in_process_tokens")
    .select("*", { count: "exact", head: true })
    .eq("chainId", CHAIN_ID);

  return { count, error };
}
