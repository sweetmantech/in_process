import { isArweaveURL } from "./arweave";
import { isNormalizeableIPFSUrl } from "./ipfs";

/**
 * Checks if a URL is safe to load in an iframe.
 * Only allows IPFS and Arweave URLs (trusted decentralized sources).
 * Blocks arbitrary HTTPS URLs to prevent phishing and malicious content.
 *
 * @param uri - The URI to check
 * @returns true if the URL is safe for iframe embedding, false otherwise
 */
export function isSafeIframeUrl(uri: string | null | undefined): boolean {
  if (!uri || typeof uri !== "string") return false;

  // Only allow IPFS and Arweave URLs for iframes
  // These are trusted decentralized sources
  if (isNormalizeableIPFSUrl(uri)) return true;
  if (isArweaveURL(uri)) return true;

  // Block all other URLs (including arbitrary HTTPS URLs)
  // This prevents phishing and malicious content
  return false;
}
