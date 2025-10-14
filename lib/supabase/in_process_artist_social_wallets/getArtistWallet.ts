import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export async function getArtistWallet({
  social_wallet,
}: Database["public"]["Tables"]["in_process_artist_social_wallets"]["Update"]) {
  const { error, data } = await supabase
    .from("in_process_artist_social_wallets")
    .select()
    .eq("social_wallet", social_wallet as string)
    .single();

  if (error) return { data: null, error };

  return { data, error: null };
}
