import { useRef, useCallback, ChangeEvent } from "react";
import { toast } from "sonner";
import { useCropImageProvider } from "@/providers/CropImageProvider";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

/**
 * Hook for managing preview upload functionality
 * Handles file input ref, click handler, file selection, and done action
 */
export const useUploadPreview = () => {
  const previewRef = useRef<HTMLInputElement>(null);
  const { setPreviewFile, setIsOpenPreviewUpload } = useMomentFormProvider();
  const { saveCroppedImage } = useCropImageProvider();

  const handleClick = useCallback(() => {
    if (!previewRef.current) return;
    previewRef.current.click();
  }, []);

  const handlePreviewUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;
      const file = files[0];
      if (!file.type.includes("image")) {
        toast.error("please, select only image file.");
        return;
      }
      // Store file blob for deferred upload (upload happens later in uploadFilesToArweave)
      setPreviewFile(file);
    },
    [setPreviewFile]
  );

  const handleDoneClick = useCallback(async () => {
    try {
      await saveCroppedImage();
      setIsOpenPreviewUpload(false);
    } catch (error) {
      console.error("Failed to save cropped image:", error);
      toast.error("Failed to save cropped image. Please try again.");
      // Keep modal open on error
    }
  }, [saveCroppedImage, setIsOpenPreviewUpload]);

  return {
    previewRef,
    handleClick,
    handlePreviewUpload,
    handleDoneClick,
  };
};
