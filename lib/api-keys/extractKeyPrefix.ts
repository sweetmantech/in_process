/**
 * Extract key prefix from API key
 * @param apiKey - The full API key
 * @returns The prefix part of the key
 */
export function extractKeyPrefix(apiKey: string): string {
  const underscoreIndex = apiKey.indexOf('_');
  return underscoreIndex > 0 ? apiKey.substring(0, underscoreIndex) : '';
}
