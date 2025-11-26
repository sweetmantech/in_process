import { supabase } from "../client";

const selectMoments = async ({
  chain_id,
  limit = 100,
  page = 1,
}: {
  chain_id: number;
  limit?: number;
  page?: number;
}) => {
  const cappedLimit = Math.min(limit, 100);

  let query = supabase
    .from("in_process_moments")
    .select(
      "*, collection:in_process_collections!inner(*, default_admin:in_process_artists!inner(*))"
    );

  if (chain_id) query = query.eq("collection.chain_id", chain_id);

  query = query.order("created_at", { ascending: false });

  query = query.range((page - 1) * cappedLimit, page * cappedLimit - 1);

  const { data, error } = await query;

  if (error) throw error;

  return data;
};

export default selectMoments;
