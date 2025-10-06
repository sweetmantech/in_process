import { supabase } from "@/lib/supabase/client";

export async function getProfile(address: string) {
  const query = supabase
    .from("in_process_artists")
    .select("*")
    .eq("address", address)
    .single();

  const { data, error } = await query;

  if (error || !data) return null;
  return data;
}
