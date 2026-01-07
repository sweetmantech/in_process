import { useState, useEffect } from "react";

interface BlobUrls {
  preview?: string;
  image?: string;
  pdf?: string;
  video?: string;
  audio?: string;
}

interface UseBlobUrlsParams {
  previewFile: File | null;
  imageFile: File | null;
  animationFile: File | null;
  mimeType: string;
}

/**
 * Hook to create and manage blob URLs for multiple file types.
 * Automatically handles cleanup when files change or component unmounts.
 */
export const useBlobUrls = ({
  previewFile,
  imageFile,
  animationFile,
  mimeType,
}: UseBlobUrlsParams) => {
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
        return {
          ...prev,
          preview: undefined,
        };
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
        return {
          ...prev,
          image: undefined,
        };
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
        return {
          ...prev,
          pdf: undefined,
        };
      });
    }
  }, [animationFile, mimeType]);

  // Create blob URL for video file (using animationFile)
  useEffect(() => {
    if (mimeType.includes("video") && animationFile) {
      const blobUrl = URL.createObjectURL(animationFile);
      setBlobUrls((prev) => ({ ...prev, video: blobUrl }));
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setBlobUrls((prev) => {
        if (prev.video) URL.revokeObjectURL(prev.video);
        return {
          ...prev,
          video: undefined,
        };
      });
    }
  }, [animationFile, mimeType]);

  // Create blob URL for audio file (using animationFile)
  useEffect(() => {
    if (mimeType.includes("audio") && animationFile) {
      const blobUrl = URL.createObjectURL(animationFile);
      setBlobUrls((prev) => ({ ...prev, audio: blobUrl }));
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setBlobUrls((prev) => {
        if (prev.audio) URL.revokeObjectURL(prev.audio);
        return {
          ...prev,
          audio: undefined,
        };
      });
    }
  }, [animationFile, mimeType]);

  return {
    blobUrls,
    // Legacy blob URLs for backward compatibility
    previewFileUrl: blobUrls.preview || "",
    animationFileUrl: blobUrls.video || blobUrls.pdf || blobUrls.audio || "",
  };
};
