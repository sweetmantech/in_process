import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from "@/lib/api-keys/getBearerToken";
import { getArtistAddressByAuthToken } from "@/lib/privy/getArtistAddressByAuthToken";
import { getArtistAddressByApiKey } from "@/lib/api-keys/getArtistAddressByApiKey";
import { SITE_ORIGINAL_URL } from "@/lib/consts";
import getCorsHeader from "@/lib/getCorsHeader";
import { AuthErrorMessages, AuthErrorTypes } from "./errors";

export interface AuthResult {
  artistAddress: string;
  authMethod: "token" | "apiKey";
}

export interface AuthMiddlewareOptions {
  corsHeaders?: Record<string, string>;
}

/**
 * Normalizes and compares origins, handling:
 * - null origins (mobile browsers may not send origin for same-origin requests)
 * - trailing slashes
 * - protocol differences
 */
function isValidOrigin(origin: string | null, expectedUrl: string): boolean {
  if (!origin) {
    // For same-origin requests, mobile browsers may not send origin header
    // In this case, we'll check the referer header as fallback
    return false;
  }

  try {
    const originUrl = new URL(origin);
    const expectedUrlObj = new URL(expectedUrl);

    // Compare hostnames (handles www. variations)
    const originHost = originUrl.hostname.replace(/^www\./, "");
    const expectedHost = expectedUrlObj.hostname.replace(/^www\./, "");

    return originHost === expectedHost && originUrl.protocol === expectedUrlObj.protocol;
  } catch {
    return false;
  }
}

/**
 * Authentication middleware that validates either:
 * 1. Valid origin + auth token, OR
 * 2. Valid API key
 *
 * Returns the artist address and authentication method used.
 */
export async function authMiddleware(
  req: NextRequest,
  options: AuthMiddlewareOptions = {}
): Promise<NextResponse | AuthResult> {
  const corsHeaders = options.corsHeaders || getCorsHeader();

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const authHeader = req.headers.get("authorization");
  const authToken = getBearerToken(authHeader);
  const apiKey = req.headers.get("x-api-key");

  // Check origin or referer (for same-origin requests where origin might be null on mobile)
  // Mobile browsers may not send origin header for same-origin requests
  const hasValidOrigin =
    isValidOrigin(origin, SITE_ORIGINAL_URL) ||
    (!origin && referer && isValidOrigin(referer, SITE_ORIGINAL_URL));

  // Allow if (origin is valid AND authToken is present) OR apiKey is present
  const hasValidOriginAndAuth = hasValidOrigin && authToken;
  const hasApiKey = !!apiKey;

  if (!hasValidOriginAndAuth && !hasApiKey) {
    return NextResponse.json(
      { message: AuthErrorTypes.UNAUTHORIZED },
      { status: 401, headers: corsHeaders }
    );
  }

  // Get artist address from either auth token or API key
  let artistAddress: string;
  let authMethod: "token" | "apiKey";

  try {
    if (authToken) {
      artistAddress = await getArtistAddressByAuthToken(authToken);
      authMethod = "token";
    } else if (apiKey) {
      artistAddress = await getArtistAddressByApiKey(apiKey);
      authMethod = "apiKey";
    } else {
      throw new Error(AuthErrorMessages.NO_VALID_AUTH_METHOD);
    }
  } catch (error: any) {
    // Handle authentication errors specifically
    if (
      error?.message?.includes(AuthErrorMessages.INVALID_AUTH_TOKEN) ||
      error?.message?.includes(AuthErrorMessages.NO_SOCIAL_OR_ARTIST_WALLET) ||
      error?.message?.includes(AuthErrorMessages.INVALID_API_KEY) ||
      error?.message?.includes(AuthErrorMessages.NO_ARTIST_ADDRESS_FOR_API_KEY) ||
      error?.message?.includes(AuthErrorMessages.NO_VALID_AUTH_METHOD)
    ) {
      return NextResponse.json(
        { message: AuthErrorTypes.INVALID_AUTHENTICATION },
        { status: 401, headers: corsHeaders }
      );
    }

    // Re-throw other errors
    throw error;
  }

  return {
    artistAddress,
    authMethod,
  };
}
