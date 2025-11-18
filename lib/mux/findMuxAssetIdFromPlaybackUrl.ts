import mux from "./index";

/**
 * Finds MUX asset ID from playback URL using direct playback ID lookup
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

    // Direct lookup using playbackIds.retrieve endpoint
    const playbackInfo = await mux.video.playbackIds.retrieve(playbackId);
    return playbackInfo.object?.id || null;
  } catch (error) {
    console.error("Error finding MUX asset ID:", error);
    return null;
  }
};
