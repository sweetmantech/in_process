import { supabase } from "@/lib/supabase/client";

export interface InProcessPaymentsQuery {
    limit?: number;
    page?: number;
    artist?: string;
    collector?: string;
  }
  
export async function upsertProfile() {
  let query = supabase.from("in_process_artists").select("*");

  if (q && q.trim().length > 0) {
    query = query.ilike("username", `${q}%`);
  }

  query = query.limit(limit);

  const { data, error } = await query;

  if (error || !data || data.length === 0) return null;
  return data;
}
