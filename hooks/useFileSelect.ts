import { useCallback } from "react";
import { validateFile } from "@/lib/fileSelect/validateFile";
import { handleVideoSelection } from "@/lib/fileSelect/handleVideoSelection";
import { handleImageSelection } from "@/lib/fileSelect/handleImageSelection";
import { handleOtherFileSelection } from "@/lib/fileSelect/handleOtherFileSelection";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

/**
 * Hook for file selection only - stores files as blobs.
 * Upload logic is handled in useMomentMetadata.generateMetadataUri()
 */
const useFileSelect = () => {
  const { setMimeType, setImageFile, setPreviewFile, setAnimationFile } = useMomentFormProvider();

  const selectFile = useCallback(
    async (event: any) => {
      const file: File = event.target.files[0];
      if (!file || !validateFile(file)) {
        return;
      }

      const mimeType = file.type;
      const isImage = mimeType.includes("image");
      const isVideo = mimeType.includes("video");

      // Store files as blobs - no upload happens here
      if (isVideo) {
        await handleVideoSelection(file, {
          setAnimationFile,
          setMimeType,
          setPreviewFile,
        });
      } else if (isImage) {
        await handleImageSelection(file, {
          setMimeType,
          setImageFile,
          setPreviewFile,
        });
      } else {
        await handleOtherFileSelection(file, {
          setMimeType,
          setAnimationFile,
          setPreviewFile,
        });
      }
    },
    [setMimeType, setImageFile, setPreviewFile, setAnimationFile]
  );

  return { selectFile };
};

export default useFileSelect;
