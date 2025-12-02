import { uploadVideoToMux } from "@/lib/mux/uploadVideoToMux";

export interface VideoUploadResult {
  animationUrl: string;
  contentUri: string;
}

/**
 * Uploads video to Mux if video file exists and mimeType indicates video.
 * Returns animation URL and content URI, or empty strings if not applicable.
 */
export const uploadVideoToMuxIfNeeded = async (
  videoFile: File | null,
  mimeType: string,
  getAccessToken: () => Promise<string | null>,
  onProgress?: (progress: number) => void
): Promise<VideoUploadResult> => {
  if (!videoFile || !mimeType.includes("video")) {
    return { animationUrl: "", contentUri: "" };
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error("Authentication required for video upload");
  }

  const muxResult = await uploadVideoToMux(videoFile, accessToken, onProgress);
  return {
    animationUrl: muxResult.playbackUrl,
    contentUri: muxResult.downloadUrl,
  };
};
