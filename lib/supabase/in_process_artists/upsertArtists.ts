import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";

type ArtistInsert = Database["public"]["Tables"]["in_process_artists"]["Insert"];
type ArtistRow = Database["public"]["Tables"]["in_process_artists"]["Row"];

/**
 * Upserts multiple artist records into the in_process_artists table.
 * @param artists - Array of artist data objects to upsert.
 * @returns The upserted records or error.
 */
export async function upsertArtists(artists: ArtistInsert[]): Promise<ArtistRow[]> {
  const { data, error } = await supabase
    .from("in_process_artists")
    .upsert(artists, { onConflict: "address" })
    .select();

  if (error) {
    throw error;
  }
  return data || [];
}
