import * as UpChunk from "@mux/upchunk";
import createUploadUrl from "@/lib/mux/createUploadUrl";
import { fetchAsset } from "@/lib/mux/fetchAsset";

export interface MuxUploadResult {
  playbackUrl: string;
  downloadUrl: string;
  assetId?: string;
}

/**
 * Uploads a video file to Mux and waits for it to be processed.
 * Returns the playback URL and download URL once ready.
 */
export const uploadVideoToMux = async (
  file: File,
  accessToken: string,
  onProgress?: (progress: number) => void
): Promise<MuxUploadResult> => {
  if (!file) {
    throw new Error("No file provided");
  }

  // Step 1: Get access token and create upload URL
  const { uploadURL, uploadId } = await createUploadUrl(accessToken);

  if (!uploadId) {
    throw new Error("Upload ID not available");
  }

  // Step 2: Upload the file directly to Mux using UpChunk
  return new Promise((resolve, reject) => {
    const upload = UpChunk.createUpload({
      endpoint: uploadURL,
      file: file,
      chunkSize: 5120, // Uploads the file in ~5mb chunks
    });

    // Handle upload progress
    upload.on("progress", (progress: { detail: number }) => {
      onProgress?.(progress.detail);
    });

    // Handle upload success - then poll for asset readiness
    upload.on("success", async () => {
      try {
        // Poll for asset to be ready (max 30 retries, 2 seconds apart)
        let retries = 0;
        const maxRetries = 30;
        const retryDelay = 2000;

        while (retries < maxRetries) {
          try {
            const assetData = await fetchAsset(uploadId);

            // If playbackUrl exists and status is ready, return the video info
            if (assetData.playbackUrl && assetData.status === "ready") {
              resolve({
                playbackUrl: assetData.playbackUrl,
                assetId: assetData.assetId,
                downloadUrl: assetData.downloadUrl || "",
              });
              return;
            }

            // If still processing, wait and retry
            if (assetData.status !== "ready" || !assetData.playbackUrl) {
              retries++;
              if (retries < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                continue;
              } else {
                throw new Error(assetData.message || "Asset processing timeout");
              }
            }
          } catch (error: any) {
            // If it's a processing error, retry
            if (
              error.message?.includes("processing") ||
              error.message?.includes("Asset is being")
            ) {
              retries++;
              if (retries < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                continue;
              }
            }
            throw error;
          }
        }

        throw new Error("Asset processing timeout");
      } catch (error: any) {
        reject(error);
      }
    });

    // Handle upload errors
    upload.on("error", (err: any) => {
      reject(new Error(err?.message || "Upload failed"));
    });
  });
};
