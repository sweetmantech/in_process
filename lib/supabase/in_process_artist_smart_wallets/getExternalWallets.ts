import { supabase } from "@/lib/supabase/client";
import { Address } from "viem";

export async function getExternalWallets(smartWalletAddress: Address) {
  const { data, error } = await supabase
    .from("in_process_artist_smart_wallets")
    .select()
    .eq("smart_wallet_address", smartWalletAddress)
    .single();
  if (error || !data) return null;
  return data;
}
