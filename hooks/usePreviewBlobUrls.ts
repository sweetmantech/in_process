import { useState, useEffect } from "react";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

interface BlobUrls {
  preview?: string;
  image?: string;
  pdf?: string;
  video?: string;
}

/**
 * Hook to create and manage blob URLs from file objects for preview display.
 */
export const usePreviewBlobUrls = (): BlobUrls => {
  const { previewFile, imageFile, animationFile, videoFile, mimeType } = useMomentFormProvider();

  const [blobUrls, setBlobUrls] = useState<BlobUrls>({});

  // Create blob URL for preview file
  useEffect(() => {
    if (previewFile) {
      const blobUrl = URL.createObjectURL(previewFile);
      setBlobUrls((prev) => ({ ...prev, preview: blobUrl }));
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setBlobUrls((prev) => {
        if (prev.preview) URL.revokeObjectURL(prev.preview);
        const { preview, ...rest } = prev;
        return rest;
      });
    }
  }, [previewFile]);

  // Create blob URL for image file
  useEffect(() => {
    if (imageFile) {
      const blobUrl = URL.createObjectURL(imageFile);
      setBlobUrls((prev) => ({ ...prev, image: blobUrl }));
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setBlobUrls((prev) => {
        if (prev.image) URL.revokeObjectURL(prev.image);
        const { image, ...rest } = prev;
        return rest;
      });
    }
  }, [imageFile]);

  // Create blob URL for PDF file
  useEffect(() => {
    if (mimeType.includes("pdf") && animationFile) {
      const blobUrl = URL.createObjectURL(animationFile);
      setBlobUrls((prev) => ({ ...prev, pdf: blobUrl }));
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setBlobUrls((prev) => {
        if (prev.pdf) URL.revokeObjectURL(prev.pdf);
        const { pdf, ...rest } = prev;
        return rest;
      });
    }
  }, [animationFile, mimeType]);

  // Create blob URL for video file
  useEffect(() => {
    if (mimeType.includes("video") && videoFile) {
      const blobUrl = URL.createObjectURL(videoFile);
      setBlobUrls((prev) => ({ ...prev, video: blobUrl }));
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setBlobUrls((prev) => {
        if (prev.video) URL.revokeObjectURL(prev.video);
        const { video, ...rest } = prev;
        return rest;
      });
    }
  }, [videoFile, mimeType]);

  return blobUrls;
};
