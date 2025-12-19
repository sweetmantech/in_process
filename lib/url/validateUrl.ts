/**
 * Validates that a URL is safe to display or link to.
 * Blocks javascript:, data:, and other dangerous protocols.
 * Allows http:// and https:// URLs.
 *
 * @param url - The URL to validate
 * @returns true if the URL is safe, false otherwise
 */
export function validateUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;

  try {
    const parsed = new URL(url);
    const protocol = parsed.protocol.toLowerCase();

    // Block dangerous protocols
    if (
      protocol === "javascript:" ||
      protocol === "data:" ||
      protocol === "vbscript:" ||
      protocol === "file:" ||
      protocol === "about:"
    ) {
      return false;
    }

    // Only allow http and https
    if (protocol !== "http:" && protocol !== "https:") {
      return false;
    }

    return true;
  } catch {
    // Invalid URL format
    return false;
  }
}
