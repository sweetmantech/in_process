import { supabase } from "../client";

const selectAdmins = async ({
  moments,
}: {
  moments?: Array<{
    collectionId: string;
    token_id: number;
    artist_address: string;
  }>;
}) => {
  let query = supabase.from("in_process_admins").select("*");

  if (moments && moments.length > 0) {
    const orConditions = moments
      .map(
        (moment) =>
          `and(collection.eq.${moment.collectionId},artist_address.eq.${moment.artist_address},token_id.eq.${Number(moment.token_id)}),and(collection.eq.${moment.collectionId},artist_address.eq.${moment.artist_address},token_id.eq.${0})`
      )
      .join(",");
    query = query.or(orConditions);
  }

  const { data, error } = await query;

  if (error) return [];

  return data || [];
};

export default selectAdmins;
