import { Moment } from "@/types/moment";
import { supabase } from "../client";
import { CHAIN_ID } from "@/lib/consts";

const selectCollections = async ({
  moments,
  artists,
  limit = 100,
  page = 1,
  chainId = CHAIN_ID,
}: {
  moments?: Moment[];
  artists?: string[];
  limit?: number;
  page?: number;
  chainId?: number;
}) => {
  const cappedLimit = Math.min(limit, 100);
  let query = supabase
    .from("in_process_collections")
    .select("*, default_admin:in_process_artists!inner(username, address)");

  if (moments) {
    const orConditions = moments
      .map((moment) => `and(address.eq.${moment.collectionAddress},chain_id.eq.${moment.chainId})`)
      .join(",");
    query = query.or(orConditions);
  }

  if (artists) {
    query = query.in("default_admin", artists);
  }

  if (chainId) {
    query = query.eq("chain_id", chainId);
  }

  query = query.order("created_at", { ascending: false });
  query = query.range((page - 1) * cappedLimit, page * cappedLimit - 1);

  const { data, error } = await query;

  if (error) return [];

  return data || [];
};

export default selectCollections;
