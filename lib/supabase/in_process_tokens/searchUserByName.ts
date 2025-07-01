import { supabase } from "@/lib/supabase/client";
import { User } from "@/types/token";
import { Address } from "viem";

// Search users by username (case-insensitive, partial)
export async function searchUserByName(
  searchKey: string
): Promise<User | null> {
  const { data, error } = await supabase
    .from("in_process_artists")
    .select("address, username, bio")
    .ilike("username", `${searchKey}%`)
    .limit(1);
  if (error || !data || data.length === 0) return null;
  const row = data[0];
  return {
    address: row.address as Address,
    username: row.username || "",
    bio: row.bio,
  };
}
