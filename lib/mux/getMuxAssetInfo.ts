import mux from "./index";

export interface MuxAssetInfo {
  assetId: string;
  downloadUrl: string | null;
  playbackUrl: string | null;
}

/**
 * Retrieves MUX asset information including download URL
 */
export const getMuxAssetInfo = async (assetId: string): Promise<MuxAssetInfo> => {
  const asset = await mux.video.assets.retrieve(assetId);

  const downloadUrl = asset.master?.url || null;
  const playbackUrl = asset.playback_ids?.[0]
    ? `https://stream.mux.com/${asset.playback_ids[0].id}.m3u8`
    : null;

  return {
    assetId,
    downloadUrl,
    playbackUrl,
  };
};
