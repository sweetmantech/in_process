import { supabase } from '@/lib/supabase/client';
import { generateApiKey, hashApiKey, getApiKeyPrefix } from '@/lib/api-key/utils';
import { CreateApiKeyRequest, CreateApiKeyResponse } from '@/types/api-key';

export async function createApiKey(
  artistAddress: string,
  request: CreateApiKeyRequest
): Promise<CreateApiKeyResponse> {
  // Generate new API key
  const apiKey = generateApiKey();
  const apiKeyHash = hashApiKey(apiKey);
  const apiKeyPrefix = getApiKeyPrefix(apiKey);

  // Use upsert to replace existing API key if one exists
  const { data, error } = await supabase
    .from('in_process_artist_api_keys')
    .upsert({
      artist_address: artistAddress,
      key_name: request.keyName,
      api_key_hash: apiKeyHash,
      api_key_prefix: apiKeyPrefix,
      is_active: true,
    }, {
      onConflict: 'artist_address'
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create API key: ${error.message}`);
  }

  return {
    id: data.id,
    apiKey,
    keyName: data.key_name,
    artistAddress: data.artist_address,
    isActive: data.is_active,
    createdAt: data.created_at,
  };
}
