import { supabase } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/types";

export type InProcessArtistWithAddress = Database["public"]["Tables"]["in_process_artists"]["Row"];

export async function getArtistWithAddress(walletAddress: string): Promise<{
    data: InProcessArtistWithAddress | null;
    error: Error | null;
}> {
    const { data, error } = await supabase
    .from("in_process_artists")
    .select("*")
    .eq("address", walletAddress)
    .single();
    return { data, error };
}