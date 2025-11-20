/**
 * Downloads a video file from MUX using the asset's master download URL
 *
 * **File Size Limits & Timeout Guidelines:**
 * - Small videos (< 50MB): 60-90 seconds recommended
 * - Medium videos (50-200MB): 90-120 seconds recommended
 * - Large videos (200-500MB): 120-180 seconds recommended
 * - Very large videos (> 500MB): 180+ seconds recommended
 *
 * The function automatically adjusts timeout based on Content-Length header when available,
 * using a conservative estimate of 1 MB/s download speed with a minimum of 60s and maximum of 300s.
 *
 * @param downloadUrl - The MUX asset's master download URL
 * @param timeoutMs - Timeout in milliseconds (default: 90000ms / 90s).
 *                    Will be dynamically adjusted based on Content-Length if available.
 * @returns A File object containing the downloaded video
 * @throws Error if download fails or times out
 */
export const downloadVideoFromMux = async (
  downloadUrl: string,
  timeoutMs: number = 90000
): Promise<File> => {
  const controller = new AbortController();

  // Start with initial timeout - will be adjusted based on Content-Length if available
  let effectiveTimeout = timeoutMs;
  let timeoutId: NodeJS.Timeout | null = null;

  try {
    // Set initial timeout for connection establishment (30s should be plenty)
    const initialTimeout = 30000;
    timeoutId = setTimeout(() => controller.abort(), initialTimeout);

    // Make GET request (establishes connection quickly, headers available immediately)
    const response = await fetch(downloadUrl, {
      signal: controller.signal,
    });

    // Clear initial timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    if (!response.ok) {
      throw new Error(`Failed to download video from MUX: ${response.statusText}`);
    }

    // Check Content-Length header for dynamic timeout adjustment
    const contentLengthHeader = response.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLengthBytes = parseInt(contentLengthHeader, 10);
      if (!isNaN(contentLengthBytes) && contentLengthBytes > 0) {
        // Estimate timeout: assume 1 MB/s download speed (conservative)
        // Add 20% buffer for network variability
        const estimatedSeconds = (contentLengthBytes / (1024 * 1024)) * 1.2;
        const estimatedTimeout = Math.ceil(estimatedSeconds * 1000);

        // Clamp between 60s (minimum) and 300s (maximum) for safety
        const calculatedTimeout = Math.max(60000, Math.min(300000, estimatedTimeout));

        // Use the larger of user-provided timeout or calculated timeout
        effectiveTimeout = Math.max(calculatedTimeout, timeoutMs);
      }
    }

    // Set timeout for the blob download (this is where most time is spent)
    timeoutId = setTimeout(() => controller.abort(), effectiveTimeout);

    const blob = await response.blob();

    // Clear timeout after successful download
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const contentType = response.headers.get("content-type") || "video/mp4";

    // Extract filename from URL or use default
    // Parse URL to handle query strings and fragments properly
    let filename = "video.mp4";
    try {
      const url = new URL(downloadUrl);
      const pathname = url.pathname;
      const lastSegment = pathname.split("/").filter(Boolean).pop();
      if (lastSegment) {
        filename = decodeURIComponent(lastSegment) || "video.mp4";
      }
    } catch {
      // Fallback: strip query/fragment manually if URL parsing fails
      const withoutQuery = downloadUrl.split("?")[0].split("#")[0];
      const lastSegment = withoutQuery.split("/").filter(Boolean).pop();
      if (lastSegment) {
        try {
          filename = decodeURIComponent(lastSegment) || "video.mp4";
        } catch {
          filename = lastSegment || "video.mp4";
        }
      }
    }

    return new File([blob], filename, { type: contentType });
  } catch (err) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Handle timeout-specific error
    if (err instanceof Error && (err.name === "AbortError" || err.message.includes("aborted"))) {
      throw new Error(
        `Download from MUX timed out after ${effectiveTimeout}ms. The video file may be too large or the connection is slow. Consider increasing the timeout parameter for large files.`
      );
    }

    // Propagate other fetch errors
    throw err;
  }
};
