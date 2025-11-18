/**
 * Downloads a video file from MUX using the asset's master download URL
 */
export const downloadVideoFromMux = async (downloadUrl: string): Promise<File> => {
  const response = await fetch(downloadUrl);

  if (!response.ok) {
    throw new Error(`Failed to download video from MUX: ${response.statusText}`);
  }

  const blob = await response.blob();
  const contentType = response.headers.get("content-type") || "video/mp4";

  // Extract filename from URL or use default
  const urlParts = downloadUrl.split("/");
  const filename = urlParts[urlParts.length - 1] || "video.mp4";

  return new File([blob], filename, { type: contentType });
};
