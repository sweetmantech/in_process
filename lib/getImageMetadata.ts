import { imageMeta } from "image-meta";
import { getFetchableUrl } from "./protocolSdk/ipfs/gateway";

const getImageMetadata = async (previewBackgroundUrl: string | undefined) => {
  try {
    if (!previewBackgroundUrl) return null;
    const fetchableUrl = getFetchableUrl(previewBackgroundUrl || "") || "";
    if (!fetchableUrl) return null;
    const response = await fetch(fetchableUrl);
    if (!response.ok) throw new Error();

    const data = await response.arrayBuffer();
    const uint8Array = new Uint8Array(data);
    const meta = imageMeta(uint8Array);
    if (!meta.width || !meta.height) throw new Error();

    return {
      orientation: meta?.orientation || 1,
      originalWidth: meta.width || 1,
      originalHeight: meta.height,
      shouldRotate: meta?.orientation === 6 || meta?.orientation === 8,
      previewUrl: fetchableUrl,
    };
  } catch (error) {
    console.log("ziad here error", error);
    console.error(error);
    return null;
  }
};

export default getImageMetadata;
