import { supabase } from '@/lib/supabase/client';
import { ApiKeyInfo } from '@/types/api-key';

export async function getApiKeyByArtist(artistAddress: string): Promise<ApiKeyInfo | null> {
  const { data, error } = await supabase
    .from('in_process_artist_api_keys')
    .select('*')
    .eq('artist_address', artistAddress)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No API key found for this artist
      return null;
    }
    console.error('Error fetching API key for artist:', error);
    return null;
  }

  return {
    id: data.id,
    keyName: data.key_name,
    apiKeyPrefix: data.api_key_prefix,
    artistAddress: data.artist_address,
    isActive: data.is_active,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}
