import probeUrlResponseTime from "@/lib/arweave/probeUrlResponseTime";

/**
 * Races InProcess stream proxy vs another playback URL (IPFS CDN, turbo Arweave, etc.).
 * First successful probe wins; the losing request is aborted. Both fail → `streamUrl`.
 */
const racePlaybackUrls = async (streamUrl: string, peerUrl: string): Promise<string> => {
  const abortStream = new AbortController();
  const abortPeer = new AbortController();

  return new Promise<string>((resolve) => {
    let settled = false;
    let failures = 0;

    const onSuccess = (chosenUrl: string, abortOther: AbortController) => {
      if (settled) return;
      settled = true;
      abortOther.abort();
      resolve(chosenUrl);
    };

    const onFailure = () => {
      if (settled) return;
      failures += 1;
      if (failures === 2) {
        settled = true;
        resolve(streamUrl);
      }
    };

    probeUrlResponseTime(streamUrl, 8000, abortStream.signal).then((r) => {
      if (r) onSuccess(r.url, abortPeer);
      else onFailure();
    });

    probeUrlResponseTime(peerUrl, 8000, abortPeer.signal).then((r) => {
      if (r) onSuccess(r.url, abortStream);
      else onFailure();
    });
  });
};

export default racePlaybackUrls;
