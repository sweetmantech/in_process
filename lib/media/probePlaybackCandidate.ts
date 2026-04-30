import probeUrlResponseTime from "@/lib/arweave/probeUrlResponseTime";
import isStreamProxyUrl from "@/lib/media/isStreamProxyUrl";
import probeStreamProxyViaGetOnly from "@/lib/media/probeStreamProxyViaGetOnly";

/** Probes a playback URL as a candidate in the gateway race (stricter checks for `/media/stream`). */
const probePlaybackCandidate = async (
  url: string,
  timeoutMs = 8000,
  raceSignal?: AbortSignal
): Promise<{ url: string; ms: number } | null> => {
  if (isStreamProxyUrl(url)) return probeStreamProxyViaGetOnly(url, timeoutMs, raceSignal);
  return probeUrlResponseTime(url, timeoutMs, raceSignal);
};

export default probePlaybackCandidate;
