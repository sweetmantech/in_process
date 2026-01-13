import { supabase } from "../client";

const selectAirdrops = async ({
  artist_address,
  offset,
}: {
  artist_address: string;
  offset: number;
}) => {
  let query = supabase
    .from("in_process_airdrops")
    .select(
      "amount, recipient:in_process_artists!inner(address, username), moment:in_process_moments!inner(token_id, collection:in_process_collections!inner(default_admin, address))"
    )
    .eq("moment.collection.default_admin", artist_address.toLowerCase())
    .order("updated_at", { ascending: false });

  query = query.range(offset, offset + 99); // Limit to 100 results per page

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export default selectAirdrops;
