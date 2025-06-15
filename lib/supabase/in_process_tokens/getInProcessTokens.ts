import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { Address } from "viem";

export type InProcessToken =
  Database["public"]["Tables"]["in_process_tokens"]["Row"];

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
  console.log("addresses", addresses);
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
  if (addresses && addresses.length > 0) {
    query = query.in("address", addresses);
  }
  if (tokenIds && tokenIds.length > 0) {
    query = query.in("tokenId", tokenIds.map(Number));
  }
  if (typeof hidden === "boolean") {
    query = query.eq("hidden", hidden);
  }
  query = query.order("createdAt", { ascending: !latest });
  query = query.range((page - 1) * cappedLimit, page * cappedLimit - 1);

  const { data, count, error } = await query;
  return { data, count, error };
}
