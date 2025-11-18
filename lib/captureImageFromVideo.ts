const captureImageFromVideo = async (videoUrl: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const video = document.createElement("video");

  return new Promise((resolve, reject) => {
    let timeoutId: NodeJS.Timeout | null = null;
    let isResolved = false;

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("error", handleError);
    };

    const resolveOnce = (value: string) => {
      if (!isResolved) {
        isResolved = true;
        cleanup();
        resolve(value);
      }
    };

    const rejectOnce = (reason: string) => {
      if (!isResolved) {
        isResolved = true;
        cleanup();
        reject(reason);
      }
    };

    const handleLoadedMetadata = () => {
      // Calculate safe currentTime: min(1, max(0, duration - 0.1))
      // This ensures we seek to an available frame, even for short videos
      const safeTime = Math.min(1, Math.max(0, video.duration - 0.1));
      video.currentTime = safeTime;

      // Fallback timeout: if seeked doesn't fire within 500ms, use frame at 0
      timeoutId = setTimeout(() => {
        if (!isResolved) {
          video.currentTime = 0;
        }
      }, 500);
    };

    const handleSeeked = () => {
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = canvas.toDataURL("image/jpeg");
        resolveOnce(frame);
      } else {
        rejectOnce("Error: Unable to get canvas context.");
      }
    };

    const handleError = (error: Event) => {
      rejectOnce("Error: " + error);
    };

    try {
      video.src = videoUrl;
      video.muted = true;

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("seeked", handleSeeked);
      video.addEventListener("error", handleError);

      video.load();
    } catch (err) {
      rejectOnce("Error: " + err);
    }
  });
};

export default captureImageFromVideo;
