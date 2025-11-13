import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { CHAIN_ID } from "@/lib/consts";
import { zeroAddress } from "viem";

export type InProcessPayment = {
  id: string;
  token: Database["public"]["Tables"]["in_process_tokens"]["Row"];
  buyer: Database["public"]["Tables"]["in_process_artists"]["Row"];
  amount: string;
  hash: string;
  block: string;
};

export interface InProcessPaymentsQuery {
  limit?: number;
  page?: number;
  artist?: string;
  collector?: string;
}

export async function selectPayments({
  limit = 20,
  page = 1,
  artist,
  collector,
}: InProcessPaymentsQuery = {}) {
  const cappedLimit = Math.min(limit, 100);

  let query = supabase
    .from("in_process_payments")
    .select(
      `id, amount, hash, block, 
       token:in_process_tokens!inner(*), 
       buyer:in_process_artists!inner(*)`,
      { count: "exact" }
    )
    .eq("token.chainId", CHAIN_ID)
    .neq("buyer.address", zeroAddress)
    .order("block", { ascending: false })
    .range((page - 1) * cappedLimit, page * cappedLimit - 1);

  if (artist) query = query.eq("token.defaultAdmin", artist);
  if (collector) query = query.eq("buyer.address", collector);

  const { data, count, error } = await query;
  if (error) return { data: null, count: null, error };

  return { data, count, error: null };
}
