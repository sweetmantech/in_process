import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export async function upsertProfile({
  address,
  smart_wallet,
}: Database["public"]["Tables"]["in_process_artists"]["Insert"]) {
  const { error } = await supabase.from("in_process_artists").upsert(
    {
      address,
      smart_wallet,
    },
    {
      onConflict: "address",
    }
  );

  if (error) return { error };

  return { error: null };
}
