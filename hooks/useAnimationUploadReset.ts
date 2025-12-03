import { RefObject, useState, useEffect } from "react";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

export const useAnimationUploadReset = (
  fileInputRef: RefObject<HTMLInputElement>,
  hasSelectedFiles: boolean
) => {
  const {
    form,
    setImageFile,
    setAnimationFile,
    setPreviewFile,
    setMimeType,
    setDownloadUrl,
    setEmbedCode,
    setLink,
    setWritingText,
  } = useMomentFormProvider();
  const [isReset, setIsReset] = useState(false);

  // Reset the isReset flag when files are selected
  useEffect(() => {
    if (hasSelectedFiles && isReset) {
      setIsReset(false);
    }
  }, [hasSelectedFiles, isReset]);

  const handleReset = () => {
    // In update flow: preserve name and description, only clear files
    // Store current form values before reset
    const currentName = form.getValues("name");
    const currentDescription = form.getValues("description");

    // Clear only files, NOT name/description
    setImageFile(null);
    setAnimationFile(null);
    setPreviewFile(null);
    setMimeType("");
    setDownloadUrl("");
    setEmbedCode("");
    setLink("");
    setWritingText("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Mark as reset to show file input instead of ContentRenderer
    setIsReset(true);

    // Ensure form values remain unchanged (preserve name and description)
    if (currentName !== undefined && currentName !== null) {
      form.setValue("name", currentName, { shouldValidate: false });
    }
    if (currentDescription !== undefined && currentDescription !== null) {
      form.setValue("description", currentDescription, { shouldValidate: false });
    }
  };

  return { handleReset, isReset };
};
