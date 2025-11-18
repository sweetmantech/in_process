import mux from "./index";

/**
 * Finds MUX asset ID from playback URL by listing assets and matching playback IDs
 */
export const findMuxAssetIdFromPlaybackUrl = async (
  playbackUrl: string
): Promise<string | null> => {
  try {
    // Extract playback ID from URL format: https://stream.mux.com/{playback_id}.m3u8
    const playbackIdMatch = playbackUrl.match(/stream\.mux\.com\/([^/]+)\.m3u8/);
    if (!playbackIdMatch) {
      return null;
    }
    const playbackId = playbackIdMatch[1];

    // List assets and find the one with matching playback ID
    // Note: This might be slow if there are many assets, but MUX API doesn't provide
    // a direct way to find asset by playback ID
    const assets = await mux.video.assets.list({ limit: 100 });

    for (const asset of assets.data) {
      if (asset.playback_ids?.some((pid) => pid.id === playbackId)) {
        return asset.id;
      }
    }

    // If not found in first page, try pagination (but limit to reasonable number)
    let page = 1;
    while (assets.data.length === 100 && page < 10) {
      const nextPage = await mux.video.assets.list({ limit: 100, page });
      for (const asset of nextPage.data) {
        if (asset.playback_ids?.some((pid) => pid.id === playbackId)) {
          return asset.id;
        }
      }
      page++;
    }

    return null;
  } catch (error) {
    console.error("Error finding MUX asset ID:", error);
    return null;
  }
};
