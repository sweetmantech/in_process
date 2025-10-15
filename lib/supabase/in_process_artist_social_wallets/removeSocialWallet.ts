import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export async function removeSocialWallet({
  social_wallet,
}: Database["public"]["Tables"]["in_process_artist_social_wallets"]["Update"]) {
  const { error } = await supabase
    .from("in_process_artist_social_wallets")
    .delete()
    .eq("social_wallet", social_wallet as string)
    .select()
    .single();

  if (error) return { error };

  return { error: null };
}
