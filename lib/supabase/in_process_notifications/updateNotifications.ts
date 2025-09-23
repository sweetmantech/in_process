import { supabase } from "@/lib/supabase/client";

export interface UpdateNotificationsQuery {
  artist?: string;
  viewed?: boolean;
}

export async function updateNotifications({
  artist,
  viewed = true,
}: UpdateNotificationsQuery) {
  let query = supabase.from("in_process_notifications").update({ viewed });

  if (artist) {
    query = query.eq("artist", artist.toLowerCase());
  }

  const { data, error } = await query.select("id");

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}
