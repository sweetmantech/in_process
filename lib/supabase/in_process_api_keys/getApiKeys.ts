import { supabase } from "@/lib/supabase/client";

export async function getApiKeys(artistAddress: string) {
  const { data, error } = await supabase
    .from("in_process_api_keys")
    .select("id, name, created_at")
    .eq("artist_address", artistAddress.toLowerCase())
    .order("created_at", { ascending: false });

  if (error) return { data: null, error };

  return { data, error: null };
}
