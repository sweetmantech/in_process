import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export async function connectSmartWalletToArtist({
  address: Address,
  smart_wallet_address: Address
}: Partial<Database["public"]["Tables"]["in"]>) {
  const { error } = await supabase.from("in_process_artist_").upsert({
    address,
    username,
    bio,
    twitter_username,
    farcaster_username,
    instagram_username,
    telegram_username,
  });

  if (error) return { error };

  return { error: null };
}
