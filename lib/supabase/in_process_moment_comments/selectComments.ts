import { supabase } from "../client";

const selectComments = async ({ momentId, offset }: { momentId: string; offset: number }) => {
  let query = supabase
    .from("in_process_moment_comments")
    .select("*, artist:in_process_artists!inner(*)");
  if (momentId) {
    query = query.eq("moment", momentId);
  }
  if (offset) {
    query = query.range(offset, offset + 20);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export default selectComments;
