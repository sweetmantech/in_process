import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export async function upsertProfile({
  address,
  username,
  bio,
  twitter_username,
  farcaster_username,
  instagram_username,
  telegram_username,
}: Database["public"]["Tables"]["in_process_artists"]["Row"]) {
  const { error } = await supabase.from("in_process_artists").upsert({
    address,
    username,
    bio,
    twitter_username,
    farcaster_username,
    instagram_username,
    telegram_username,
  });

  if (error) return { error };

  return { error: null };
}
