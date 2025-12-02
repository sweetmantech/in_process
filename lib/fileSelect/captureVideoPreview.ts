import captureImageFromVideo from "@/lib/captureImageFromVideo";
import base64ToFile from "@/lib/base64ToFile";

export interface VideoPreviewResult {
  previewFile: File;
}

export const captureVideoPreview = async (file: File): Promise<VideoPreviewResult> => {
  const videoUrl = URL.createObjectURL(file);

  try {
    const frameBase64 = await captureImageFromVideo(videoUrl);

    if (!frameBase64) {
      throw new Error("Unable to capture preview frame from video");
    }

    const imageFile = base64ToFile(frameBase64 as string, file.name);

    return {
      previewFile: imageFile,
    };
  } finally {
    URL.revokeObjectURL(videoUrl);
  }
};
