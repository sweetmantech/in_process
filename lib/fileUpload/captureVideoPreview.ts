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

  const frameBase64 = await captureImageFromVideo(videoUrl);
  console.log("ziad here", frameBase64);
  const imageFile = base64ToFile(frameBase64 as string, file.name);

  const imageUri = await clientUploadToArweave(imageFile);

  console.log("ziad here", imageUri);
  return {
    imageUri,
    previewSrc: URL.createObjectURL(imageFile),
    previewUri: imageUri,
  };
};
