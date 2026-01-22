import { supabase } from "../client";

const selectSocial = async ({ artist_address }: { artist_address: string }) => {
  const { data, error } = await supabase
    .from("in_process_artist_social_wallets")
    .select("*")
    .eq("artist_address", artist_address)
    .single();
  if (error) return { data: null, error };
  return { data, error: null };
};

export default selectSocial;
