import { captureVideoPreview, VideoPreviewResult } from "./captureVideoPreview";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

export interface VideoUploadHandlers {
  setImageUri: (uri: string) => void;
  setPreviewSrc: (src: string) => void;
  setPreviewUri: (uri: string) => void;
  setAnimationUri: (uri: string) => void;
  setMimeType: (mimeType: string) => void;
  setLoading: (loading: boolean) => void;
  setPctComplete: (pct: number) => void;
}

export const handleVideoUpload = async (
  file: File,
  handlers: VideoUploadHandlers
): Promise<void> => {
  // Capture frame from video and upload to Arweave for preview (thumbnail)
  try {
    const preview: VideoPreviewResult = await captureVideoPreview(file);
    handlers.setImageUri(preview.imageUri);
    handlers.setPreviewSrc(preview.previewSrc);
    handlers.setPreviewUri(preview.previewUri);
  } catch (previewErr: unknown) {
    console.error("Failed to capture video preview:", previewErr);
    // Continue with video upload even if preview fails
  }

  // Upload video to Arweave
  const uri = await clientUploadToArweave(file, (pct: number) => handlers.setPctComplete(pct));

  handlers.setAnimationUri(uri);
  handlers.setMimeType(file.type);
  handlers.setLoading(false);
};
