import { supabase } from "@/lib/supabase/client";

export async function deleteApiKey(id: string, artist_address: string) {
  const { error } = await supabase
    .from("in_process_api_keys")
    .delete()
    .eq("id", id)
    .eq("artist_address", artist_address);

  if (error) return { error };

  return { error: null };
}
