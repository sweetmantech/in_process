import { captureVideoPreview, VideoPreviewResult } from "./captureVideoPreview";

export interface VideoUploadHandlers {
  setPendingVideoFile: (file: File | null) => void;
  setImageUri: (uri: string) => void;
  setPreviewSrc: (src: string) => void;
  setPreviewUri: (uri: string) => void;
  setMimeType: (mimeType: string) => void;
  muxUpload: {
    upload: (file: File) => Promise<void>;
  };
}

export const handleVideoUpload = async (
  file: File,
  handlers: VideoUploadHandlers
): Promise<void> => {
  handlers.setPendingVideoFile(file);

  // Capture frame from video and upload to Arweave for preview (thumbnail)
  try {
    const preview: VideoPreviewResult = await captureVideoPreview(file);
    handlers.setImageUri(preview.imageUri);
    handlers.setPreviewSrc(preview.previewSrc);
    handlers.setPreviewUri(preview.previewUri);
    handlers.setMimeType(file.type);
  } catch (previewErr: unknown) {
    console.error("Failed to capture video preview:", previewErr);
    // Continue with Mux upload even if preview fails
  }

  await handlers.muxUpload.upload(file);
};
