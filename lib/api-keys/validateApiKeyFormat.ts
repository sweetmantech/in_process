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
