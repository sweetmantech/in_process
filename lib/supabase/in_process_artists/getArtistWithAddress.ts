import { supabase } from "@/lib/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

export type InProcessArtistWithAddress = Database["public"]["Tables"]["in_process_artists"]["Row"];

export async function getArtistWithAddress(walletAddress: string): Promise<
    | { data: InProcessArtistWithAddress; error: null }
    | { data: null; error: PostgrestError }
> {
    const { data, error } = await supabase
    .from("in_process_artists")
    .select("*")
    .eq("address", walletAddress)
    .single();
    if (error){
        return {data: null, error}
    }
    return { data: data as InProcessArtistWithAddress, error: null };
}