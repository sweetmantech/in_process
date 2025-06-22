import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export type InProcessToken =
  Database["public"]["Tables"]["in_process_tokens"]["Row"];

interface UpdateInProcessTokensParams {
  ids?: string[];
  update: Partial<InProcessToken>;
}

export async function updateInProcessTokens({
  ids,
  update,
}: UpdateInProcessTokensParams) {
  if (!ids || ids.length === 0) {
    throw new Error("No ids provided for update");
  }
  const { data, error } = await supabase
    .from("in_process_tokens")
    .update(update)
    .in("id", ids)
    .select();
  return { data, error };
}
