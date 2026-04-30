import { IN_PROCESS_API } from "@/lib/consts";

/**
 * Passthrough blob and http(s); otherwise InProcess `/media/stream` proxy.
 * Video: `resolveStreamingPlaybackUrl` races stream proxy vs IPFS CDN or Arweave turbo-gateway.
 */
const getStreamingUrl = (url: string) => {
  if (url.startsWith("blob:")) return url;
  if (/^https?:\/\//i.test(url)) return url;
  return `${IN_PROCESS_API}/media/stream?url=${encodeURIComponent(url)}`;
};

export default getStreamingUrl;
