import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export async function insertSocialWallet({
  artist_address,
  social_wallet,
}: Database["public"]["Tables"]["in_process_artist_social_wallets"]["Insert"]) {
  const { error } = await supabase.from("in_process_artist_social_wallets").upsert(
    {
      artist_address,
      social_wallet,
    },
    {
      onConflict: "social_wallet",
    }
  );

  if (error) return { error };

  return { error: null };
}
