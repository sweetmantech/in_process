import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { CHAIN_ID } from "@/lib/consts";
import { zeroAddress } from "viem";

export type InProcessPayment = {
  id: string;
  moment: Database["public"]["Tables"]["in_process_moments"]["Row"] & {
    collection: Database["public"]["Tables"]["in_process_collections"]["Row"];
    fee_recipients: Database["public"]["Tables"]["in_process_moment_fee_recipients"]["Row"][];
  };
  buyer: Database["public"]["Tables"]["in_process_artists"]["Row"];
  amount: string;
  transaction_hash: string;
  transferred_at: string;
  currency: string;
};

export interface InProcessPaymentsQuery {
  limit?: number;
  page?: number;
  artists?: string[];
  collectors: string[];
  chainId?: number;
}

export async function selectPayments({
  limit = 20,
  page = 1,
  artists,
  collectors,
  chainId = CHAIN_ID,
}: InProcessPaymentsQuery) {
  const cappedLimit = Math.min(limit, 100);

  let query = supabase.from("in_process_payments").select(
    `id, amount, currency, transaction_hash, transferred_at, 
      moment:in_process_moments!inner(*, 
        collection:in_process_collections!inner(*),
        fee_recipients:in_process_moment_fee_recipients(*)
      ),
      buyer:in_process_artists!inner(*)`,
    { count: "exact" }
  );

  if (artists && artists.length > 0) {
    query = query.in("moment.collection.default_admin", artists);
  }

  if (collectors.length > 0) {
    query = query.in("buyer.address", collectors);
  }

  query = query.eq("moment.collection.chain_id", chainId);
  query = query.neq("buyer.address", zeroAddress);
  query = query.order("transferred_at", { ascending: false });
  query = query.range((page - 1) * cappedLimit, page * cappedLimit - 1);

  const { data, count, error } = await query;
  if (error) return { data: null, count: null, error };

  return { data, count, error: null };
}
