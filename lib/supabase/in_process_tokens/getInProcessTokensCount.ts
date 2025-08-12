import { supabase } from "@/lib/supabase/client";

export async function getInProcessTokensCount(): Promise<{
  count: number | null;
  error: Error | null;
}> {
  const { count, error } = await supabase
    .from("in_process_tokens")
    .select("*", { count: "exact", head: true });

  return { count, error };
}
