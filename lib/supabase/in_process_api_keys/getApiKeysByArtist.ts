import { supabase } from "@/lib/supabase/client";

export async function getApiKeysByArtist(artist_address: string) {
  const { data, error } = await supabase
    .from("in_process_api_keys")
    .select("id, name, created_at, last_used")
    .eq("artist_address", artist_address)
    .order("created_at", { ascending: false });

  if (error) return { data: null, error };

  return { data, error: null };
}
