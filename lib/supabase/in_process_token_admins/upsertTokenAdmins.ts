import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";

export async function upsertTokenAdmins(
  tokenAdmins: Database["public"]["Tables"]["in_process_token_admins"]["Insert"][]
) {
  if (!tokenAdmins || tokenAdmins.length === 0) {
    return [];
  }

  const uniqueTokenAdmins = tokenAdmins.filter(
    (tokenAdmin, index, self) =>
      index ===
      self.findIndex(
        (ta) => ta.token === tokenAdmin.token && ta.artist_address === tokenAdmin.artist_address
      )
  );

  const { data, error } = await supabase
    .from("in_process_token_admins")
    .upsert(uniqueTokenAdmins, {
      onConflict: "token_id,artist_address",
    })
    .select();

  if (error) {
    throw error;
  }
  return data;
}
