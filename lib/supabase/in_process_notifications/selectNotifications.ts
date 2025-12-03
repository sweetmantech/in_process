import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";

export type InProcessNotification = {
  id: string;
  payment: InProcessPayment;
  artist: Database["public"]["Tables"]["in_process_artists"]["Row"];
  viewed: boolean;
  created_at: string | null;
};

export interface InProcessNotificationsQuery {
  limit?: number;
  page?: number;
  artist?: string;
  viewed?: boolean;
}

export async function selectNotifications({
  limit = 20,
  page = 1,
  artist,
  viewed,
}: InProcessNotificationsQuery = {}) {
  const cappedLimit = Math.min(limit, 100);

  let query = supabase
    .from("in_process_notifications")
    .select(
      `id, viewed, created_at,
       payment:in_process_payments!inner(
         id, amount, transaction_hash, transferred_at,
         moment:in_process_moments!inner(
           id, token_id, uri, collection:in_process_collections!inner(
             id, address, chain_id, default_admin, payout_recipient
           )
         ),
         buyer:in_process_artists!inner(
           address, username, bio, instagram_username, twitter_username, telegram_username
         )
       ),
       artist:in_process_artists!inner(
         address, username, bio, instagram_username, twitter_username, telegram_username
       )`,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range((page - 1) * cappedLimit, page * cappedLimit - 1);

  if (artist) query = query.eq("artist", artist.toLowerCase());
  if (viewed !== undefined) query = query.eq("viewed", viewed);

  const { data, count, error } = await query;
  if (error) return { data: null, count: null, error };

  return { data, count, error: null };
}
