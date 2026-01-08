import { useState, useEffect } from "react";

/**
 * Hook to calculate the aspect ratio from a File object
 * Returns the aspect ratio (width/height) or null if unable to determine.
 */
export const useFileAspectRatio = (file: File | null | undefined): number | null => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    if (!file) {
      setAspectRatio(null);
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    const img = new Image();

    const handleLoad = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      } else {
        setAspectRatio(null);
      }
      URL.revokeObjectURL(blobUrl);
    };

    const handleError = () => {
      setAspectRatio(null);
      URL.revokeObjectURL(blobUrl);
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = blobUrl;

    return () => {
      URL.revokeObjectURL(blobUrl);
      img.onload = null;
      img.onerror = null;
    };
  }, [file]);

  return aspectRatio;
};
