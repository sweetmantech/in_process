import mux from ".";

/**
 * Deletes a MUX asset by asset ID
 */
export const deleteMuxAsset = async (assetId: string): Promise<void> => {
  try {
    await mux.video.assets.delete(assetId);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("failed to delete asset", errorMessage);
  }
};
