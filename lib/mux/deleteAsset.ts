import mux from ".";

/**
 * Deletes a MUX asset by asset ID
 */
export const deleteMuxAsset = async (assetId: string): Promise<void> => {
  try {
    await mux.video.assets.delete(assetId);
  } catch (error: any) {
    console.error("failed to delete asset", error);
  }
};
