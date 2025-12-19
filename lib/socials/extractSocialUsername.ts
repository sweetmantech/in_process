/**
 * Extracts username from social media URLs
 * Supports Instagram, X (Twitter), Farcaster, and Telegram URLs
 *
 * @param url - The social media URL (e.g., "https://instagram.com/kahlilnewton/")
 * @returns The extracted username or the original string if no URL pattern matches
 *
 * @example
 * extractSocialUsername("https://instagram.com/kahlilnewton/") // "kahlilnewton"
 * extractSocialUsername("https://x.com/kahlilnewton/") // "kahlilnewton"
 * extractSocialUsername("kahlilnewton") // "kahlilnewton" (already a username)
 */
export const extractSocialUsername = (url: string): string => {
  if (!url || typeof url !== "string") {
    return "";
  }

  // Trim whitespace
  const trimmed = url.trim();

  // If it's already just a username (no slashes or protocol), normalize and return
  // Strip leading "@" if present (e.g., "@kahlilnewton" -> "kahlilnewton")
  if (!trimmed.includes("/") && !trimmed.includes(":")) {
    return trimmed.replace(/^@/, "");
  }

  // Patterns for different social media platforms
  const patterns = [
    // Instagram: instagram.com/username or www.instagram.com/username
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^\/\?]+)/i,
    // X (Twitter): x.com/username or twitter.com/username
    /(?:https?:\/\/)?(?:www\.)?(?:x\.com|twitter\.com)\/([^\/\?]+)/i,
    // Farcaster: farcaster.com/username or farcaster.xyz/username
    /(?:https?:\/\/)?(?:www\.)?farcaster\.(?:com|xyz)\/([^\/\?]+)/i,
    // Telegram: t.me/username or telegram.me/username
    /(?:https?:\/\/)?(?:www\.)?(?:t\.me|telegram\.me)\/([^\/\?]+)/i,
  ];

  // Try each pattern
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      // Remove leading @ and trailing slash if present
      return match[1].replace(/^@/, "").replace(/\/$/, "");
    }
  }

  // If no pattern matches, return the original string (might already be a username)
  return trimmed.replace(/^@/, "");
};
