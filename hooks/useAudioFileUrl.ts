import { useState, useEffect } from "react";

/**
 * Hook to create and manage a blob URL from an audio file object.
 * Automatically handles cleanup when the file changes or component unmounts.
 */
export const useAudioFileUrl = (file: File | null | undefined): string => {
  const [audioFileUrl, setAudioFileUrl] = useState<string>("");

  useEffect(() => {
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setAudioFileUrl(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setAudioFileUrl("");
    }
  }, [file]);

  return audioFileUrl;
};
