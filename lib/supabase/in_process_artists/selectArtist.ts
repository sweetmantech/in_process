import { supabase } from "../client";

export const selectArtist = async (address: string) => {
  const { data, error } = await supabase
    .from("in_process_artists")
    .select("*")
    .eq("address", address.toLowerCase());
  if (error) throw error;
  return data[0];
};
