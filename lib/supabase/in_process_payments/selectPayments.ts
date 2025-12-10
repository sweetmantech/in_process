import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { CHAIN_ID } from "@/lib/consts";

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
  const { data, error } = await supabase.rpc("get_in_process_payments", {
    p_limit: limit,
    p_page: page,
    p_artists: artists && artists.length > 0 ? artists : undefined,
    p_collectors: collectors && collectors.length > 0 ? collectors : undefined,
    p_chainid: chainId,
  });

  if (error) return { data: null, count: null, error };

  const result = data as {
    payments: InProcessPayment[];
    count: number;
    pagination: {
      page: number;
      limit: number;
      total_pages: number;
    };
  };

  return {
    data: result.payments || [],
    count: result.count || 0,
    error: null,
  };
}
