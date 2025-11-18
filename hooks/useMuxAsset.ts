import { useQuery } from "@tanstack/react-query";
import { fetchAsset, MuxVideoAsset } from "@/lib/mux/fetchAsset";

export function useMuxAsset(uploadId: string | null, enabled = true) {
  return useQuery<MuxVideoAsset, Error>({
    queryKey: ["playbackUrl", uploadId],
    queryFn: async () => {
      if (!uploadId) {
        throw new Error("uploadId is required");
      }

      const data = await fetchAsset(uploadId);

      // If playbackUrl exists and status is ready, return the video info
      if (data.playbackUrl && data.status === "ready") {
        return {
          playbackUrl: data.playbackUrl,
          assetId: data.assetId,
          downloadUrl: data.downloadUrl || "",
        };
      }

      // If still processing, throw error to indicate not ready yet
      // This will be caught by retry logic and refetchInterval will continue polling
      if (data.status !== "ready" || !data.playbackUrl) {
        throw new Error(data.message || "Asset is still processing");
      }

      // Fallback (shouldn't reach here)
      throw new Error("Playback URL not available");
    },
    enabled: enabled && Boolean(uploadId),
    retry: (failureCount, error) => {
      // Retry up to 30 times for processing errors (matches original retries = 30)
      if (error.message.includes("processing") || error.message.includes("Asset is being")) {
        return failureCount < 30;
      }
      // Retry up to 3 times for other errors (network failures, etc.)
      return failureCount < 3;
    },
    retryDelay: 2000, // 2 seconds between retries (matches original setTimeout)
    refetchInterval: (query) => {
      // Stop polling if we have a successful result
      if (query.state.data) {
        return false;
      }
      // Continue polling every 2 seconds while processing
      return 2000;
    },
    staleTime: 0, // Always refetch to get latest status
  });
}
