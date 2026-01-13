import mux from ".";
import { deleteMuxAsset } from "./deleteAsset";

const cleanTemporaryAssets = async () => {
  const temporaryAssets = [];
  const currentEpoch = Date.now();
  try {
    for await (const asset of mux.video.assets.list()) {
      // Delete temporary assets: if an asset was uploaded more than 1 hour ago and is still in Mux,
      // it indicates the artist uploaded the asset but never completed the moment creation process.
      if (Number(asset.created_at) * 1000 > currentEpoch - 60 * 60 * 1000)
        temporaryAssets.push(asset);
    }
    const promise = temporaryAssets.map(async (asset) => {
      await deleteMuxAsset(asset.id);
    });
    await Promise.all(promise);
  } catch (assetsError: any) {
    console.error("Error fetching assets list:", assetsError);
  }
};

export default cleanTemporaryAssets;
