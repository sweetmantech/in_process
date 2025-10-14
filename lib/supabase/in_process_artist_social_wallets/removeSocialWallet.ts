import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export async function removeSocialWallet({
  artist_address,
  social_wallet,
}: Database["public"]["Tables"]["in_process_artist_social_wallets"]["Insert"]) {
  const { error } = await supabase
    .from("in_process_artist_social_wallets")
    .delete()
    .eq("artist_address", artist_address)
    .eq("social_wallet", social_wallet)
    .select()
    .single();

  if (error) return { error };

  return { error: null };
}
