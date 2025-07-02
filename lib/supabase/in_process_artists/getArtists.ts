import { supabase } from "@/lib/supabase/client";

// Fetch artists by query (case-insensitive, partial)
export async function getArtists(query: string, limit = 10) {
  const { data, error } = await supabase
    .from("in_process_artists")
    .select("*")
    .ilike("username", `${query}%`)
    .limit(limit);
  if (error || !data || data.length === 0) return null;
  return data;
}
