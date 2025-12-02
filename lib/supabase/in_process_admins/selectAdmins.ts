import { supabase } from "../client";

const selectAdmins = async ({
  moments,
  artist_address
}: {
  moments?: Array<{
    collectionId: string;
    token_id: number;
  }>;
  artist_address?: string;
}) => {
  let query = supabase.from("in_process_admins").select("*");

  if (moments && moments.length > 0) {
    const orConditions = moments
      .map(
        (moment) =>
          `and(collection.eq.${moment.collectionId},token_id.eq.${Number(moment.token_id)}),and(collection.eq.${moment.collectionId},token_id.eq.${0})`
      )
      .join(",");
    query = query.or(orConditions);
  }

  if (artist_address) {
    query = query.eq("artist_address", artist_address.toLowerCase())
  }

  const { data, error } = await query;

  if (error) return [];

  return data || [];
};

export default selectAdmins;
