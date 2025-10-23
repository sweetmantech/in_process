/**
 * Extract Bearer token from authorization header
 * @param authHeader - The authorization header value
 * @returns The token string or null if invalid
 */
export function getBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;

  // Check if header starts with "Bearer " or "bearer " (case insensitive)
  if (!authHeader.startsWith("Bearer ") && !authHeader.startsWith("bearer ")) {
    return null;
  }

  // Extract token (remove "Bearer " or "bearer " prefix)
  return authHeader.substring(7);
}
