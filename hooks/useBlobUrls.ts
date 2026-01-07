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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { preview: undefined, ...rest } = prev;
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { image: undefined, ...rest } = prev;
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { pdf: undefined, ...rest } = prev;
        return rest;
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { video: undefined, ...rest } = prev;
        return rest;
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { audio: undefined, ...rest } = prev;
        return rest;
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
