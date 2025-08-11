import { supabase } from "@/lib/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { Address } from "viem";

export type InProcessArtistWithAddress = Database["public"]["Tables"]["in_process_artists"]["Row"];

export async function getArtistWithAddress(walletAddress: Address): Promise<
    | { data: InProcessArtistWithAddress | null; error: null }
    | { data: null; error: PostgrestError }
> {
    // Convert Address to lowercase string for database consistency
    const addressString = walletAddress.toLowerCase();
    
    const { data, error } = await supabase
    .from("in_process_artists")
    .select("*")
    .eq("address", addressString)
    .maybeSingle();
    if (error){
        return {data: null, error}
    }
    return { data, error: null };
}