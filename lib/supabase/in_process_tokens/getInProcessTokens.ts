import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { Address } from "viem";

export type InProcessToken =
  Database["public"]["Tables"]["in_process_tokens"]["Row"] & {
    username: Database["public"]["Tables"]["in_process_artists"]["Row"]["username"];
  };

export interface InProcessTokensQuery {
  limit?: number;
  page?: number;
  latest?: boolean;
  artist?: string;
  chainId?: number;
  addresses?: Address[];
  tokenIds?: (string | number)[];
  hidden?: Database["public"]["Tables"]["in_process_tokens"]["Row"]["hidden"];
}

export async function getInProcessTokens({
  limit = 20,
  page = 1,
  latest = true,
  artist,
  chainId,
  addresses,
  tokenIds,
  hidden,
}: InProcessTokensQuery = {}): Promise<{
  data: InProcessToken[] | null;
  count: number | null;
  error: Error | null;
}> {
  const cappedLimit = Math.min(limit, 100);
  let query = supabase
    .from("in_process_tokens")
    .select(
      `*, defaultAdmin, artist:in_process_artists${artist ? "" : "!inner"}(username)`,
      {
        count: "exact",
      }
    );

  if (artist) {
    query = query.eq("defaultAdmin", artist);
  } else {
    query = query.neq("artist.username", "");
  }
  if (chainId !== undefined) {
    query = query.eq("chainId", chainId);
  }
  if (addresses && addresses.length > 0) {
    query = query.in("address", addresses);
  }
  if (tokenIds && tokenIds.length > 0) {
    query = query.in("tokenId", tokenIds.map(Number));
  }
  if (!hidden) {
    query = query.eq("hidden", false);
  }

  query = query.order("createdAt", { ascending: !latest });
  query = query.range((page - 1) * cappedLimit, page * cappedLimit - 1);

  const { data, count, error } = await query;

  const mappedData = (data || []).map((row: any) => ({
    ...row,
    username: row.artist?.username || "",
  }));

  return { data: mappedData, count, error };
}
