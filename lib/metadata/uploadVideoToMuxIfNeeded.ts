import { uploadVideoToMux } from "@/lib/mux/uploadVideoToMux";

interface VideoUploadResult {
  animationUrl: string;
  contentUri: string;
}

/**
 * Uploads video to Mux if animation file exists and mimeType indicates video.
 * Returns animation URL and content URI, or empty strings if not applicable.
 */
export const uploadVideoToMuxIfNeeded = async (
  animationFile: File | null,
  mimeType: string,
  authHeaders: HeadersInit,
  onProgress?: (progress: number) => void
): Promise<VideoUploadResult> => {
  if (!animationFile || !mimeType.includes("video")) {
    return { animationUrl: "", contentUri: "" };
  }

  const muxResult = await uploadVideoToMux(animationFile, authHeaders, onProgress);
  return {
    animationUrl: muxResult.playbackUrl,
    contentUri: muxResult.downloadUrl,
  };
};
