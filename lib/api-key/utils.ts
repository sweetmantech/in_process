import crypto from 'crypto';

/**
 * Generate a new API key
 */
export function generateApiKey(): string {
  // Generate a 32-byte random string and encode as base64
  const randomBytes = crypto.randomBytes(32);
  return `ip_${randomBytes.toString('base64url')}`;
}

/**
 * Hash an API key for secure storage
 */
export function hashApiKey(apiKey: string): string {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

/**
 * Get the prefix of an API key (first 8 characters)
 */
export function getApiKeyPrefix(apiKey: string): string {
  return apiKey.substring(0, 8);
}
