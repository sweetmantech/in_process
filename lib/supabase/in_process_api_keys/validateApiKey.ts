import { supabase } from "@/lib/supabase/client";
import { verifyApiKey } from "@/lib/crypto/apiKeyGeneration";

export async function validateApiKey(rawKey: string) {
  // Get project secret from environment
  const projectSecret = process.env.API_KEY_PROJECT_SECRET;
  if (!projectSecret) {
    return { data: null, error: new Error("API key validation not configured") };
  }

  // Hash the provided key to find matching record
  const { createHmac } = await import('crypto');
  const keyHash = createHmac('sha256', projectSecret).update(rawKey).digest('hex');

  const { data, error } = await supabase
    .from("in_process_api_keys")
    .select("id, artist_address, name, last_used")
    .eq("key_hash", keyHash)
    .single();

  if (error) return { data: null, error };

  // Update last_used timestamp
  await supabase
    .from("in_process_api_keys")
    .update({ last_used: new Date().toISOString() })
    .eq("key_hash", keyHash);

  return { data, error: null };
}
