import { supabase } from "@/lib/supabase/client";

export async function updateLastUsed(key_hash: string) {
  const { error } = await supabase
    .from("in_process_api_keys")
    .update({ last_used: new Date().toISOString() })
    .eq("key_hash", key_hash);

  if (error) return { error };

  return { error: null };
}
