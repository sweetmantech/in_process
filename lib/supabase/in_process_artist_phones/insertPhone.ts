import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export async function insertPhone({
  artist_address,
  phone_number,
  verified = false,
}: Database["public"]["Tables"]["in_process_artist_phones"]["Insert"]) {
  const { error } = await supabase.from("in_process_artist_phones").insert({
    artist_address,
    phone_number,
    verified,
  });

  if (error) return { error };

  return { error: null };
}
