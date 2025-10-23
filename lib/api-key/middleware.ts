import { NextRequest } from 'next/server';
import { hashApiKey } from '@/lib/api-key/utils';
import { getApiKeyByHash } from '@/lib/supabase/api-keys/getApiKeyByHash';
import { ApiKeyValidationResult } from '@/types/api-key';

export interface AuthenticatedRequest extends NextRequest {
  apiKey?: {
    id: string;
    artistAddress: string;
  };
  params?: { [key: string]: string };
}

/**
 * Extract API key from request headers
 */
function extractApiKey(request: NextRequest): string | null {
  // Check Authorization header (Bearer token)
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check X-API-Key header
  const apiKeyHeader = request.headers.get('x-api-key');
  if (apiKeyHeader) {
    return apiKeyHeader;
  }

  return null;
}

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * Validate API key and check permissions
 */
export async function validateApiKey(
  request: NextRequest
): Promise<ApiKeyValidationResult> {
  try {
    // Extract API key
    const apiKey = extractApiKey(request);
    if (!apiKey) {
      return {
        isValid: false,
        error: 'API key required',
      };
    }

    // Hash the API key
    const apiKeyHash = hashApiKey(apiKey);

    // Get API key from database
    const artistApiKey = await getApiKeyByHash(apiKeyHash);
    if (!artistApiKey) {
      return {
        isValid: false,
        error: 'Invalid API key',
      };
    }

    // Check if API key is active and not expired
    if (!artistApiKey.is_active) {
      return {
        isValid: false,
        error: 'API key is inactive',
      };
    }




    return {
      isValid: true,
      apiKey: {
        id: artistApiKey.id,
        artistAddress: artistApiKey.artist_address,
        keyName: artistApiKey.key_name,
        isActive: artistApiKey.is_active,
        createdAt: artistApiKey.created_at,
        updatedAt: artistApiKey.updated_at,
      },
    };
  } catch (error) {
    console.error('Error validating API key:', error);
    return {
      isValid: false,
      error: 'Internal server error',
    };
  }
}

/**
 * Middleware wrapper for API key authentication
 */
export function withApiKeyAuth(
  handler: (req: AuthenticatedRequest) => Promise<Response>
) {
  return async (req: NextRequest): Promise<Response> => {
    const validation = await validateApiKey(req);
    
    if (!validation.isValid) {
      return Response.json(
        { error: validation.error },
        { status: 401 }
      );
    }

    // Add API key info to request
    const authenticatedReq = req as AuthenticatedRequest;
    authenticatedReq.apiKey = {
      id: validation.apiKey!.id,
      artistAddress: validation.apiKey!.artistAddress,
    };

    // Execute the handler
    return await handler(authenticatedReq);
  };
}
