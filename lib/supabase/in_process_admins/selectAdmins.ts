import { Moment } from "@/types/moment";
import { supabase } from "../client";

const selectAdmins = async (moment: Moment) => {
  const { data, error } = await supabase
    .from("in_process_admins")
    .select("*")
    .eq("collection", moment.collectionAddress)
    .or(`token_id.in.(0,${moment.tokenId})`);
  if (error) return [];
  return data || [];
};

export default selectAdmins;
