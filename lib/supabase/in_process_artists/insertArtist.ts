import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";

export type InProcessArtistInsert = Database["public"]["Tables"]["in_process_artists"]["Insert"];
export type InProcessArtistRow = Database["public"]["Tables"]["in_process_artists"]["Row"];

export async function insertArtist(artistData: InProcessArtistInsert): Promise<{
    data: InProcessArtistRow | null;
    error: Error | null;
}> {
    const { data, error } = await supabase
    .from("in_process_artists")
    .insert(artistData)
    .select()
    .single();

    return { data, error };
}
