import extractArweaveTxId from "@/lib/arweave/extractArweaveTxId";
import { ipfsGatewayUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { isNormalizeableIPFSUrl, normalizeIPFSUrl } from "@/lib/protocolSdk/ipfs/ipfs";
import getStreamingUrl from "./getStreamingUrl";
import racePlaybackUrls from "./racePlaybackUrls";

const TURBO_GATEWAY_ORIGIN = "https://turbo-gateway.com";

/**
 * Extends `getStreamingUrl`: same for plain blob/https; for IPFS, races stream proxy vs
 * `magic.decentralized-content.com` (via `ipfsGatewayUrl`); for Arweave, races vs turbo-gateway.
 */
const resolveStreamingPlaybackUrl = async (url: string): Promise<string> => {
  if (isNormalizeableIPFSUrl(url)) {
    const normalized = normalizeIPFSUrl(url);
    if (normalized) {
      const directGatewayUrl = ipfsGatewayUrl(normalized);
      if (directGatewayUrl) {
        return racePlaybackUrls(getStreamingUrl(normalized), directGatewayUrl);
      }
      return getStreamingUrl(normalized);
    }
  }

  const txId = extractArweaveTxId(url);
  if (txId !== null) {
    return racePlaybackUrls(getStreamingUrl(`ar://${txId}`), `${TURBO_GATEWAY_ORIGIN}/${txId}`);
  }

  return getStreamingUrl(url);
};

export default resolveStreamingPlaybackUrl;
