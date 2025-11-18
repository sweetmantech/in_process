import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export type InProcessTokenAdmin = Database["public"]["Tables"]["in_process_token_admins"]["Row"];

interface GetTokenAdminParams {
  token: string;
  artistAddress: string;
}

export async function getTokenAdmin({ token, artistAddress }: GetTokenAdminParams) {
  const { data, error } = await supabase
    .from("in_process_token_admins")
    .select("*")
    .eq("token", token)
    .eq("artist_address", artistAddress)
    .single();
  return { data, error };
}
