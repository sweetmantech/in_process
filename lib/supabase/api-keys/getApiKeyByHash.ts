import { supabase } from '@/lib/supabase/client';

export async function getApiKeyByHash(apiKeyHash: string) {
  const { data, error } = await supabase
    .from('in_process_artist_api_keys')
    .select('*')
    .eq('api_key_hash', apiKeyHash)
    .single();

  if (error) {
    console.error('Error fetching API key by hash:', error);
    return null;
  }

  return data;
}
