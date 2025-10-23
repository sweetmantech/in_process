import { NextRequest } from "next/server";
import { validateApiKey } from "@/lib/supabase/in_process_api_keys/validateApiKey";

/**
 * Extract API key from request headers
 * Supports both 'Authorization: Bearer <key>' and 'X-API-Key: <key>' formats
 */
export function extractApiKeyFromRequest(req: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try X-API-Key header
  const apiKeyHeader = req.headers.get('x-api-key');
  if (apiKeyHeader) {
    return apiKeyHeader;
  }

  return null;
}

/**
 * Validate API key from request
 * @param req - NextRequest object
 * @returns Object with validation result and key data
 */
export async function validateApiKeyFromRequest(req: NextRequest) {
  const rawKey = extractApiKeyFromRequest(req);
  
  if (!rawKey) {
    return {
      isValid: false,
      error: "No API key provided",
      keyData: null,
    };
  }

  try {
    const { data, error } = await validateApiKey(rawKey);
    
    if (error || !data) {
      return {
        isValid: false,
        error: "Invalid API key",
        keyData: null,
      };
    }

    return {
      isValid: true,
      error: null,
      keyData: data,
    };
  } catch (error) {
    console.error("API key validation error:", error);
    return {
      isValid: false,
      error: "API key validation failed",
      keyData: null,
    };
  }
}

/**
 * Middleware function to protect API routes with API key authentication
 * @param req - NextRequest object
 * @returns Response with error if invalid, null if valid
 */
export async function requireApiKey(req: NextRequest) {
  const validation = await validateApiKeyFromRequest(req);
  
  if (!validation.isValid) {
    return Response.json(
      { 
        error: validation.error,
        message: "API key authentication required" 
      },
      { status: 401 }
    );
  }

  return null; // Valid key, continue processing
}
