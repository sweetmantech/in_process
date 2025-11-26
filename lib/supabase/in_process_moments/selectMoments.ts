import { supabase } from "@/lib/supabase/client";

export async function selectMoments({
  chainId,
  offset,
  limit,
}: {
  chainId?: number;
  offset?: number;
  limit?: number;
} = {}) {
  let query = supabase.from("in_process_moments").select(
    `*, collection:in_process_collections!inner(id,address,chain_id,default_admin:in_process_artists!inner(*),created_at,admins:in_process_admins!inner(id,token_id,hidden,granted_at,artist:in_process_artists!inner(*)))
    `,
    { count: "exact" }
  );

  if (chainId !== undefined) {
    query = query.eq("collection.chain_id", chainId);
  }

  query = query.order("created_at", { ascending: false });

  if (offset !== undefined && limit !== undefined) {
    query = query.range(offset, offset + limit - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return { data, count };
}
