import { createHmac } from "crypto";

/**
 * Create HMAC-SHA256 hash of the API key using project secret
 * @param rawKey - The raw API key to hash
 * @param projectSecret - The project secret from environment
 * @returns Hex-encoded hash
 */
export function hashApiKey(rawKey: string, projectSecret: string): string {
  return createHmac("sha256", projectSecret).update(rawKey).digest("hex");
}
