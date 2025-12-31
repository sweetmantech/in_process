import { supabase } from "@/lib/supabase/client";

export async function getProfile(address: string) {
  const query = supabase
    .from("in_process_artists")
    .select("*, phone:in_process_artist_phones(phone_number, verified)")
    .eq("address", address)
    .single();

  const { data, error } = await query;

  if (error || !data) return null;
  return data;
}
