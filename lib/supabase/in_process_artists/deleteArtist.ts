import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";

export type InProcessArtistDelete = Database["public"]["Tables"]["in_process_artists"]["Row"];

export async function deleteArtist(walletAddress: string): Promise<{
    data: InProcessArtistDelete | null;
    error: Error | null;
}> {
    const { data, error } = await supabase
    .from("in_process_artists")
    .delete()
    .eq("address", walletAddress)
    .select()
    .single();
    return { data, error };
}