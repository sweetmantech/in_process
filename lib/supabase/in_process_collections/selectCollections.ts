import { Moment } from "@/types/moment";
import { supabase } from "../client";

const selectCollections = async ({ moments }: { moments?: Moment[] }) => {
  let query = supabase.from("in_process_collections").select("*");

  if (moments) {
    const orConditions = moments
      .map((moment) => `and(address.eq.${moment.collectionAddress},chain_id.eq.${moment.chainId})`)
      .join(",");
    query = query.or(orConditions);
  }
  const { data, error } = await query;

  if (error) return [];

  return data || [];
};

export default selectCollections;
