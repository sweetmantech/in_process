export interface ImageSelectionHandlers {
  setMimeType: (mimeType: string) => void;
  setImageFile: (file: File | null) => void;
  setPreviewFile: (file: File | null) => void;
}

export const handleImageSelection = async (
  file: File,
  handlers: ImageSelectionHandlers
): Promise<void> => {
  // Store blob data - no upload happens here
  handlers.setImageFile(file);
  handlers.setPreviewFile(file);
  handlers.setMimeType(file.type);
};
