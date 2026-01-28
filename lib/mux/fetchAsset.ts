import { IN_PROCESS_API } from "@/lib/consts";

export type MuxVideoAsset = {
  playbackUrl: string;
  assetId?: string;
  downloadUrl: string;
};

export type MuxVideoAssetResponse = {
  playbackUrl?: string | null;
  assetId?: string;
  downloadUrl?: string;
  status?: string;
  masterStatus?: string;
  message?: string;
};

export const fetchAsset = async (uploadId: string): Promise<MuxVideoAssetResponse> => {
  const response = await fetch(`${IN_PROCESS_API}/mux/asset?uploadId=${uploadId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch playback URL");
  }

  return response.json();
};

export default fetchAsset;
