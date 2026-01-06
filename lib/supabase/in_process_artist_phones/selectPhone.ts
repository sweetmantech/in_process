import { supabase } from "../client";

const selectPhone = async (phone_number: string) => {
  const { data, error } = await supabase
    .from("in_process_artist_phones")
    .select("*, artist:in_process_artists!inner(*)")
    .eq("phone_number", phone_number)
    .single();

  return { data, error };
};

export default selectPhone;
