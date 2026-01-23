import { supabase } from "../client";
import { Address } from "viem";
import type { Database } from "../types";
import type { PostgrestError } from "@supabase/supabase-js";

export async function selectSocialWallets({ artistAddress }: { artistAddress: Address }): Promise<{
  data: Database["public"]["Tables"]["in_process_artist_social_wallets"]["Row"][] | null;
  error: PostgrestError | null;
}> {
  const { error, data } = await supabase
    .from("in_process_artist_social_wallets")
    .select()
    .eq("artist_address", artistAddress);

  if (error) return { data: null, error };

  return { data, error: null };
}
