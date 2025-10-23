import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export async function insertApiKey({
  name,
  artist_address,
  key_hash,
}: Database["public"]["Tables"]["in_process_api_keys"]["Insert"]) {
  const { data, error } = await supabase
    .from("in_process_api_keys")
    .insert({
      name,
      artist_address,
      key_hash,
    })
    .select()
    .single();

  if (error) return { data: null, error };

  return { data, error: null };
}
