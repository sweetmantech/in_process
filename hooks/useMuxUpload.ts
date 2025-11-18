import { useState, useEffect } from "react";
import * as UpChunk from "@mux/upchunk";
import { useMuxAsset } from "@/hooks/useMuxAsset";
import createUploadUrl from "@/lib/mux/createUploadUrl";

const useMuxUpload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [pctComplete, setPctComplete] = useState<number>(0);
  const [uploadId, setUploadId] = useState<string | null>(null);

  // Use the playbackUrl query hook to poll for video readiness
  const {
    data: muxAsset,
    error: playbackError,
    isFetching: isFetchingPlayback,
  } = useMuxAsset(uploadId, uploadId !== null && pctComplete === 100);

  // Update error state when playback query fails
  useEffect(() => {
    if (playbackError) {
      setError(playbackError.message || "Failed to fetch playback URL");
      setUploading(false);
    }
  }, [playbackError]);

  // Update uploading state when video is ready
  useEffect(() => {
    if (muxAsset && pctComplete === 100) {
      setUploading(false);
    }
  }, [muxAsset, pctComplete]);

  const upload = async (file: File) => {
    if (!file) {
      setError("No file selected");
      return;
    }
    setUploading(true);
    setError("");
    setPctComplete(0);
    setUploadId(null);

    try {
      // Step 1: Get the direct upload URL from our API
      const { uploadURL, uploadId: newUploadId } = await createUploadUrl();

      // Step 2: Upload the file directly to Mux using UpChunk
      const upload = UpChunk.createUpload({
        endpoint: uploadURL,
        file: file,
        chunkSize: 5120, // Uploads the file in ~5mb chunks
      });

      // Handle upload progress
      upload.on("progress", (progress: { detail: number }) => {
        setPctComplete(progress.detail);
      });

      // Handle upload success
      upload.on("success", () => {
        setPctComplete(100);
        if (newUploadId) {
          setUploadId(newUploadId);
          // Query hook will automatically start polling for playback URL
        } else {
          setError("Upload ID not available");
          setUploading(false);
        }
      });

      // Handle upload errors
      upload.on("error", (err: any) => {
        setUploading(false);
        setError(err?.message || "Upload failed");
      });
    } catch (err: any) {
      setUploading(false);
      setError(err?.message || "Failed to start upload");
    }
  };

  return {
    upload,
    uploading: uploading || isFetchingPlayback,
    error,
    pctComplete,
    playbackUrl: muxAsset?.playbackUrl || "",
    downloadUrl: muxAsset?.downloadUrl,
    assetId: muxAsset?.assetId,
  };
};

export default useMuxUpload;
