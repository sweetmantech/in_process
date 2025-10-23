import { createHmac, randomBytes } from 'crypto';

/**
 * Generate a secure API key using CSPRNG
 * Format: <prefix><base64url(32b)>
 * @param prefix - Key prefix (e.g., 'art_pk' or 'art_sk')
 * @returns Generated API key
 */
export function generateApiKey(prefix: string = 'art_pk'): string {
  // Generate 32 bytes (256 bits) of cryptographically secure random data
  const randomData = randomBytes(32);
  
  // Convert to base64url (URL-safe base64)
  const base64url = randomData
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  
  return `${prefix}_${base64url}`;
}

/**
 * Create HMAC-SHA256 hash of the API key using project secret
 * @param rawKey - The raw API key to hash
 * @param projectSecret - The project secret from environment
 * @returns Hex-encoded hash
 */
export function hashApiKey(rawKey: string, projectSecret: string): string {
  return createHmac('sha256', projectSecret)
    .update(rawKey)
    .digest('hex');
}

/**
 * Verify an API key against its stored hash
 * @param rawKey - The raw API key to verify
 * @param storedHash - The stored hash from database
 * @param projectSecret - The project secret from environment
 * @returns True if key matches hash
 */
export function verifyApiKey(
  rawKey: string, 
  storedHash: string, 
  projectSecret: string
): boolean {
  const computedHash = hashApiKey(rawKey, projectSecret);
  return computedHash === storedHash;
}

/**
 * Extract key prefix from API key
 * @param apiKey - The full API key
 * @returns The prefix part of the key
 */
export function extractKeyPrefix(apiKey: string): string {
  const underscoreIndex = apiKey.indexOf('_');
  return underscoreIndex > 0 ? apiKey.substring(0, underscoreIndex) : '';
}

/**
 * Validate API key format
 * @param apiKey - The API key to validate
 * @param expectedPrefix - Expected prefix (optional)
 * @returns True if format is valid
 */
export function validateApiKeyFormat(apiKey: string, expectedPrefix?: string): boolean {
  if (!apiKey || typeof apiKey !== 'string') return false;
  
  const parts = apiKey.split('_');
  if (parts.length !== 2) return false;
  
  const [prefix, keyPart] = parts;
  
  // Check prefix if specified
  if (expectedPrefix && prefix !== expectedPrefix) return false;
  
  // Check key part is base64url format (no padding, URL-safe chars only)
  const base64urlRegex = /^[A-Za-z0-9_-]+$/;
  if (!base64urlRegex.test(keyPart)) return false;
  
  // Check reasonable length (32 bytes = 43 chars in base64url)
  if (keyPart.length < 40 || keyPart.length > 50) return false;
  
  return true;
}
