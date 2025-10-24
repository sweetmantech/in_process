import { supabase } from "@/lib/supabase/client";
import { hashApiKey } from "./hashApiKey";
import { PRIVY_PROJECT_SECRET } from "@/lib/consts";

/**
 * Get artist address by validating API key
 * @param apiKey - The API key to validate
 * @returns The artist address if key is valid
 */
export async function getArtistAddressByApiKey(apiKey: string): Promise<string> {
  if (!apiKey) {
    throw new Error("API key is required");
  }

  // Hash the provided API key
  const keyHash = hashApiKey(apiKey, PRIVY_PROJECT_SECRET);

  // Query the database to find matching key hash
  const { data, error } = await supabase
    .from("in_process_api_keys")
    .select("artist_address")
    .eq("key_hash", keyHash)
    .single();

  if (error || !data) {
    throw new Error("Invalid API key");
  }

  if (!data.artist_address) {
    throw new Error("No artist address found for this API key");
  }

  return data.artist_address;
}
