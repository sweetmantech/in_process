import { supabase } from "@/lib/supabase/client";
import { Address } from "viem";

export async function insertArtistSmartWallet({
  artist_address,
  smart_wallet_address,
}: {
  artist_address: Address;
  smart_wallet_address: Address;
}) {
  const { error } = await supabase.from("in_process_artist_smart_wallets").insert({
    artist_address,
    smart_wallet_address,
  });

  if (error) return { error };

  return { error: null };
}
