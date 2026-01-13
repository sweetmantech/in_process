import mux from ".";

/**
 * Deletes a MUX asset by asset ID
 */
export const deleteMuxAsset = async (assetId: string): Promise<void> => {
  try {
    await mux.video.assets.delete(assetId);
  } catch (error: any) {
    // If asset is already deleted or doesn't exist, that's fine
    if (error?.status === 404) {
      return;
    }
    throw new Error(`Failed to delete MUX asset: ${error?.message || "Unknown error"}`);
  }
};
