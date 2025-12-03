import { RefObject, useState, useEffect, useRef } from "react";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { MomentMetadata } from "@/types/moment";

export const useMediaReset = (
  fileInputRef: RefObject<HTMLInputElement>,
  hasSelectedFiles: boolean,
  metadata?: MomentMetadata | null
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
  const prevHasSelectedFilesRef = useRef(hasSelectedFiles);
  const prevMetadataRef = useRef<string | null>(null);

  // Track when files transition from having files to no files (indicates reset)
  useEffect(() => {
    const prevHasSelectedFiles = prevHasSelectedFilesRef.current;

    if (hasSelectedFiles) {
      // Reset the isReset flag when files are selected
      if (isReset) {
        setIsReset(false);
      }
    } else if (prevHasSelectedFiles && !hasSelectedFiles) {
      // Files were cleared (went from having files to no files) - treat as reset
      setIsReset(true);
    }

    prevHasSelectedFilesRef.current = hasSelectedFiles;
  }, [hasSelectedFiles, isReset]);

  // Reset isReset to false when metadata changes after successful save
  // This allows ContentRenderer to show the updated metadata
  useEffect(() => {
    if (!metadata) return;

    const metadataKey = metadata.animation_url || metadata.image || metadata.name || "";
    const prevMetadataKey = prevMetadataRef.current;

    // If metadata changed and there are no selected files, reset isReset to show ContentRenderer
    if (prevMetadataKey !== null && prevMetadataKey !== metadataKey && !hasSelectedFiles) {
      setIsReset(false);
    }

    prevMetadataRef.current = metadataKey;
  }, [metadata, hasSelectedFiles]);

  const handleReset = () => {
    // Store current form values BEFORE any operations (keep title and description)
    // Read directly from form to get the most current values
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

    // Mark as reset to hide ContentRenderer
    setIsReset(true);

    // CRITICAL: Never clear or change name/description in update flow
    // Only update if we have values to preserve (don't overwrite with empty strings)
    // The form values are already set, so we don't need to call setName/setDescription
    // unless we're restoring from a backup, which we're not doing here
    // Just ensure form values remain unchanged
    if (currentName !== undefined && currentName !== null) {
      form.setValue("name", currentName, { shouldValidate: false });
    }
    if (currentDescription !== undefined && currentDescription !== null) {
      form.setValue("description", currentDescription, { shouldValidate: false });
    }
  };

  return { handleReset, isReset };
};
