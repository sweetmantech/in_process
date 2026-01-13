import mux from ".";
import { deleteMuxAsset } from "./deleteAsset";

const cleanTemporaryAssets = async () => {
  const currentEpoch = Date.now();
  try {
    for await (const asset of mux.video.assets.list()) {
      if (Number(asset.created_at) * 1000 > currentEpoch - 60 * 60 * 1000) {
        await deleteMuxAsset(asset.id);
      }
    }
  } catch (assetsError: any) {
    console.log("Error fetching assets list:", assetsError);
    // Continue with upload creation even if asset listing fails
  }
};

export default cleanTemporaryAssets;
