import { supabase } from "../client";

const selectAirdrops = async ({ momentId, offset }: { momentId: string; offset: number }) => {
  let query = supabase
    .from("in_process_airdrops")
    .select("amount, recipient:in_process_artists!inner(address, username)")
    .order("updated_at", { ascending: false });

  if (momentId) {
    query = query.eq("moment", momentId);
  }
  query = query.range(offset, offset + 99); // Limit to 100 results per page

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export default selectAirdrops;
