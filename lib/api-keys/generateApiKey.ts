import { randomBytes } from 'crypto';

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
