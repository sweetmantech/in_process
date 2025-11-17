import { useState } from "react";
import * as UpChunk from "@mux/upchunk";
import fetchPlaybackUrl from "@/lib/mux/fetchPlaybackUrl";
import createUploadUrl from "@/lib/mux/createUploadUrl";

const useMuxUpload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [pctComplete, setPctComplete] = useState<number>(0);
  const [playbackUrl, setPlaybackUrl] = useState<string>("");

  const upload = async (file: File) => {
    if (!file) {
      setError("No file selected");
      return;
    }
    setUploading(true);
    setError("");
    setPctComplete(0);
    setPlaybackUrl("");

    try {
      // Step 1: Get the direct upload URL from our API
      const { uploadURL, uploadId } = await createUploadUrl();

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
      upload.on("success", async () => {
        setPctComplete(100);

        if (uploadId) {
          try {
            const playbackUrl = await fetchPlaybackUrl(uploadId);
            setPlaybackUrl(playbackUrl);
          } catch (err) {
            console.error("Error fetching playback URL:", err);
            setError("Failed to fetch playback URL");
          }
        }
      });
    } catch (err: any) {
      setUploading(false);
      setError(err?.message || "Failed to start upload");
    }
  };

  return {
    upload,
    uploading,
    error,
    pctComplete,
    playbackUrl,
  };
};

export default useMuxUpload;
