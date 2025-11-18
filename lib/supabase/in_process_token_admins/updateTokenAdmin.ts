import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

export type InProcessTokenAdmin = Database["public"]["Tables"]["in_process_token_admins"]["Row"];

interface UpdateTokenAdminParams {
  token: string;
  artistAddress: string;
  update: Partial<InProcessTokenAdmin>;
}

export async function updateTokenAdmin({ token, artistAddress, update }: UpdateTokenAdminParams) {
  const { data, error } = await supabase
    .from("in_process_token_admins")
    .update(update)
    .eq("token", token)
    .eq("artist_address", artistAddress)
    .select();
  return { data, error };
}
