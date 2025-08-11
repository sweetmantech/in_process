import { supabase } from "@/lib/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

export type InProcessArtistInsert = Database["public"]["Tables"]["in_process_artists"]["Insert"];
export type InProcessArtistRow = Database["public"]["Tables"]["in_process_artists"]["Row"];

export async function upsertArtist(artistData: InProcessArtistInsert): Promise<
    | { data: InProcessArtistRow; error: null }
    | { data: null; error: PostgrestError }
> {
    const { data, error } = await supabase
    .from("in_process_artists")
    .upsert(artistData)
    .select()
    .single();

    if (error){
        return {data: null, error}
    }
    return { data: data as InProcessArtistRow, error: null };
}
