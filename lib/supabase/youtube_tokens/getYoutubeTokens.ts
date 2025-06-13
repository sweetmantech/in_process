import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export type InProcessToken =
  Database["public"]["Tables"]["in_process_tokens"]["Row"];

export interface YoutubeTokensQuery {
  limit?: number;
  page?: number;
  latest?: boolean;
  artist?: string;
  chainId?: number;
}

export async function getYoutubeTokens({
  limit = 20,
  page = 1,
  latest = true,
  artist,
  chainId,
}: YoutubeTokensQuery = {}): Promise<{
  data: InProcessToken[] | null;
  count: number | null;
  error: Error | null;
}> {
  console.log("ARTIST", artist);
  console.log("CHAIN ID", chainId);
  const cappedLimit = Math.min(limit, 100);
  let query = supabase
    .from("in_process_tokens")
    .select("*", { count: "exact" });

  if (artist) {
    query = query.eq("defaultAdmin", artist);
  }
  if (chainId !== undefined) {
    query = query.eq("chainId", chainId);
  }
  query = query.order("createdAt", { ascending: !latest });
  query = query.range((page - 1) * cappedLimit, page * cappedLimit - 1);

  const { data, count, error } = await query;
  return { data, count, error };
}
