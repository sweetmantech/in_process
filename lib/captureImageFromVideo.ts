const captureImageFromVideo = async (videoUrl: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const video = document.createElement("video");

  return new Promise((resolve, reject) => {
    try {
      video.src = videoUrl;
      video.muted = true;

      video.addEventListener("loadeddata", () => {
        video.currentTime = 0;
      });

      video.addEventListener("seeked", function () {
        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = canvas.toDataURL("image/png");
          resolve(frame);
        } else {
          reject("Error: Unable to get canvas context.");
        }
      });

      video.addEventListener("error", (error) => {
        reject("Error: " + error);
      });

      video.load();
    } catch (err) {
      reject("Error: " + err);
    }
  });
};

export default captureImageFromVideo;
