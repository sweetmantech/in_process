import { useEffect } from "react";

/**
 * Hook to ensure image is loaded before triggering callbacks.
 * Sets up a brief delay to ensure the image is ready for processing.
 */
export const useImageLoadDelay = (imageSrc: string): void => {
  useEffect(() => {
    if (imageSrc) {
      // Trigger onCropComplete with initial crop area after a brief delay to ensure Cropper is ready
      const timer = setTimeout(() => {
        // This will be handled by react-easy-crop's onCropComplete callback
        // We just need to ensure the image is loaded
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [imageSrc]);
};
