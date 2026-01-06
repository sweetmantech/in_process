/**
 * Validates that a URL is safe to display or link to.
 * Blocks javascript:, data:, and other dangerous protocols.
 * Only allows http:// and https:// URLs with valid domain names.
 * Blocks IP addresses, localhost, and other non-domain formats.
 *
 * @param url - The URL to validate
 * @returns The normalized URL string if valid, null otherwise
 */
export function validateUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string") return null;

  try {
    // If URL doesn't have a protocol, prepend https://
    let urlToParse = url.trim();
    if (!urlToParse.includes("://")) {
      urlToParse = `https://${urlToParse}`;
    }

    const parsed = new URL(urlToParse);
    const protocol = parsed.protocol.toLowerCase();
    const hostname = parsed.hostname.toLowerCase();

    // Only allow http:// and https:// protocols
    if (protocol !== "http:" && protocol !== "https:") {
      return null;
    }

    // Block IP addresses (IPv4)
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Pattern.test(hostname)) {
      return null;
    }

    // Block IPv6 addresses
    if (hostname.includes(":")) {
      return null;
    }

    // Block localhost and local domains
    if (
      hostname === "localhost" ||
      hostname.startsWith("localhost.") ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".local")
    ) {
      return null;
    }

    // Validate domain structure: must have at least one dot and valid characters
    // Domain pattern: alphanumeric, hyphens, dots (but not starting/ending with hyphen or dot)
    const domainPattern = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
    if (!domainPattern.test(hostname)) {
      return null;
    }

    return parsed.href;
  } catch (error) {
    // Invalid URL format
    return null;
  }
}
