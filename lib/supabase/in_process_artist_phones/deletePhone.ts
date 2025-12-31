import { supabase } from "@/lib/supabase/client";

export async function deletePhone(artist_address: string) {
  const { error } = await supabase
    .from("in_process_artist_phones")
    .delete()
    .eq("artist_address", artist_address);

  if (error) return { error };

  return { error: null };
}
