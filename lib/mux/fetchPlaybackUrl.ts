export const fetchPlaybackUrl = async (uploadId: string, retries = 10): Promise<string> => {
  try {
    const response = await fetch(`/api/mux/playbackUrl?uploadId=${uploadId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch playback URL");
    }

    const data = await response.json();

    if (data.playbackUrl) {
      return data.playbackUrl;
    }

    if (data.status === "processing" && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetchPlaybackUrl(uploadId, retries - 1);
    }

    throw new Error("Failed to fetch playback URL");
  } catch (err) {
    console.error("Error fetching playback URL:", err);
    throw err;
  }
};

export default fetchPlaybackUrl;
