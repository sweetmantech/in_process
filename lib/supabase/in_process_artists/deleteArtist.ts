import { supabase } from "@/lib/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

export type InProcessArtistDelete = Database["public"]["Tables"]["in_process_artists"]["Row"];

export async function deleteArtist(walletAddress: string): Promise<
    | { data: InProcessArtistDelete; error: null }
    | { data: null; error: PostgrestError }
> {
    const { data, error } = await supabase
    .from("in_process_artists")
    .delete()
    .eq("address", walletAddress)
    .select()
    .single();
    if (error){
        return {data: null, error}
    }
    return { data: data as InProcessArtistDelete, error: null };
}