"use client";

import { useWayfinderUrl } from "@ar.io/wayfinder-react";
import { isArweaveURL } from "@/lib/protocolSdk/ipfs/arweave";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

/**
 * Resolves an Arweave URL via Wayfinder (fastest + verified gateway).
 * Falls back to getFetchableUrl for IPFS and other URL types.
 */
const useArweaveUrl = (uri: string | null | undefined) => {
  const txId = isArweaveURL(uri ?? "") ? (uri ?? "").replace("ar://", "") : "";
  const { resolvedUrl, isLoading, error } = useWayfinderUrl({ txId });

  if (!uri) return { url: null, isLoading: false, error: null };

  if (isArweaveURL(uri)) {
    return { url: resolvedUrl, isLoading, error };
  }

  return { url: getFetchableUrl(uri), isLoading: false, error: null };
};

export default useArweaveUrl;
