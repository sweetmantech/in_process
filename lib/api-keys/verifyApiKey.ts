import { hashApiKey } from './hashApiKey';

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
