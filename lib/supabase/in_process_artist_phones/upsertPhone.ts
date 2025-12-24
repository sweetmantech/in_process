import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export async function upsertPhone({
  artist_address,
  phone_number,
  verified = false,
}: Database["public"]["Tables"]["in_process_artist_phones"]["Insert"]) {
  const { error, data } = await supabase.from("in_process_artist_phones").upsert({
    artist_address,
    phone_number,
    verified,
  });

  return { error, data };
}
