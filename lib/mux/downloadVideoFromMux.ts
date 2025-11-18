/**
 * Downloads a video file from MUX using the asset's master download URL
 * @param downloadUrl - The MUX asset's master download URL
 * @param timeoutMs - Timeout in milliseconds (default: 10000ms / 10s)
 * @returns A File object containing the downloaded video
 * @throws Error if download fails or times out
 */
export const downloadVideoFromMux = async (
  downloadUrl: string,
  timeoutMs: number = 10000
): Promise<File> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(downloadUrl, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to download video from MUX: ${response.statusText}`);
    }

    const blob = await response.blob();
    const contentType = response.headers.get("content-type") || "video/mp4";

    // Extract filename from URL or use default
    const urlParts = downloadUrl.split("/");
    const filename = urlParts[urlParts.length - 1] || "video.mp4";

    return new File([blob], filename, { type: contentType });
  } catch (err) {
    clearTimeout(timeoutId);

    // Handle timeout-specific error
    if (err instanceof Error && (err.name === "AbortError" || err.message.includes("aborted"))) {
      throw new Error(
        `Download from MUX timed out after ${timeoutMs}ms. The video file may be too large or the connection is slow.`
      );
    }

    // Propagate other fetch errors
    throw err;
  }
};
