import { captureVideoPreview, VideoPreviewResult } from "./captureVideoPreview";

export interface VideoSelectionHandlers {
  setAnimationFile: (file: File | null) => void;
  setMimeType: (mimeType: string) => void;
  setPreviewFile: (file: File | null) => void;
}

export const handleVideoSelection = async (
  file: File,
  handlers: VideoSelectionHandlers
): Promise<void> => {
  // Store video file blob for deferred upload (using animationFile for all file types)
  handlers.setAnimationFile(file);

  // Capture frame from video for preview (thumbnail) - store blob, don't upload yet
  try {
    const preview: VideoPreviewResult = await captureVideoPreview(file);
    handlers.setPreviewFile(preview.previewFile);
    handlers.setMimeType(file.type);
  } catch (previewErr: unknown) {
    console.error("Failed to capture video preview:", previewErr);
  }
};
