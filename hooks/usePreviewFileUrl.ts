import { useState, useEffect } from "react";

/**
 * Hook to create and manage a blob URL from a file object for preview display.
 * Automatically handles cleanup when the file changes or component unmounts.
 */
export const usePreviewFileUrl = (file: File | null | undefined): string => {
  const [previewFileUrl, setPreviewFileUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setPreviewFileUrl(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setPreviewFileUrl("");
    }
  }, [file]);

  return previewFileUrl;
};
