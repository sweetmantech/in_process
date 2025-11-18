import captureImageFromVideo from "@/lib/captureImageFromVideo";
import base64ToFile from "@/lib/base64ToFile";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

export interface VideoPreviewResult {
  imageUri: string;
  previewSrc: string;
  previewUri: string;
}

export const captureVideoPreview = async (file: File): Promise<VideoPreviewResult> => {
  const videoUrl = URL.createObjectURL(file);

  try {
    const frameBase64 = await captureImageFromVideo(videoUrl);

    if (!frameBase64) {
      throw new Error("Unable to capture preview frame from video");
    }

    const imageFile = base64ToFile(frameBase64 as string, file.name);
    const imageUri = await clientUploadToArweave(imageFile);

    return {
      imageUri,
      previewSrc: URL.createObjectURL(imageFile),
      previewUri: imageUri,
    };
  } finally {
    URL.revokeObjectURL(videoUrl);
  }
};
