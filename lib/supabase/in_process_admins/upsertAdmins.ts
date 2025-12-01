import { supabase } from "../client";
import { Database } from "../types";

const upsertAdmins = async ({
  admins,
}: {
  admins: Database["public"]["Tables"]["in_process_admins"]["Insert"][];
}) => {
  const { data, error } = await supabase
    .from("in_process_admins")
    .upsert(admins, { onConflict: "collection,token_id,artist_address" })
    .select();
  if (error) throw error;
  return data;
};

export default upsertAdmins;
