"use client";

import { useEffect, useState } from "react";
import extractArweaveTxId from "@/lib/arweave/extractArweaveTxId";
import { isNormalizeableIPFSUrl } from "@/lib/protocolSdk/ipfs/ipfs";
import resolveStreamingPlaybackUrl from "@/lib/media/resolveStreamingPlaybackUrl";
import getStreamingUrl from "@/lib/media/getStreamingUrl";

const useVideoPlaybackUrl = (url: string) => {
  const needsGatewayRace = extractArweaveTxId(url) !== null || isNormalizeableIPFSUrl(url);
  const [resolvedPlaybackSrc, setResolvedPlaybackSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!needsGatewayRace) {
      setResolvedPlaybackSrc(null);
      return;
    }
    let cancelled = false;
    setResolvedPlaybackSrc(null);
    resolveStreamingPlaybackUrl(url).then((chosen) => {
      if (!cancelled) setResolvedPlaybackSrc(chosen);
    });
    return () => {
      cancelled = true;
    };
  }, [needsGatewayRace, url]);

  if (!needsGatewayRace) {
    return { src: getStreamingUrl(url), srcReady: true };
  }

  return {
    src: resolvedPlaybackSrc,
    srcReady: resolvedPlaybackSrc !== null,
  };
};

export default useVideoPlaybackUrl;
