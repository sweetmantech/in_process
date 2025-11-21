/**
 * Normalizes and compares origins, handling:
 * - null origins (mobile browsers may not send origin for same-origin requests)
 * - trailing slashes
 * - protocol differences
 */
export function isValidOrigin(origin: string | null, expectedUrl: string): boolean {
  if (!origin) {
    // For same-origin requests, mobile browsers may not send origin header
    // In this case, we'll check the referer header as fallback
    return false;
  }

  try {
    const originUrl = new URL(origin);
    const expectedUrlObj = new URL(expectedUrl);

    // Compare hostnames (handles www. variations)
    const originHost = originUrl.hostname.replace(/^www\./, "");
    const expectedHost = expectedUrlObj.hostname.replace(/^www\./, "");

    return originHost === expectedHost && originUrl.protocol === expectedUrlObj.protocol;
  } catch {
    return false;
  }
}
