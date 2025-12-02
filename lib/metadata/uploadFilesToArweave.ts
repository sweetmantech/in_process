import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

export interface FileUploadResult {
  uploadedPreviewUri: string;
  uploadedImageUri: string;
  uploadedAnimationUri: string;
  image: string;
  animationUrl: string;
}

/**
 * Uploads preview, image, and animation files to Arweave if they exist.
 * Returns uploaded URIs and determines image/animation URLs.
 */
export const uploadFilesToArweave = async (
  previewFile: File | null,
  imageFile: File | null,
  animationFile: File | null,
  existingAnimationUrl: string
): Promise<FileUploadResult> => {
  let uploadedPreviewUri = "";
  let uploadedImageUri = "";
  let uploadedAnimationUri = "";
  let image = "";
  let animationUrl = existingAnimationUrl;

  if (previewFile) {
    uploadedPreviewUri = await clientUploadToArweave(previewFile);
    image = uploadedPreviewUri;
  }

  if (imageFile) {
    uploadedImageUri = await clientUploadToArweave(imageFile);
    if (!animationUrl) {
      animationUrl = uploadedImageUri;
    }
  }

  if (animationFile) {
    uploadedAnimationUri = await clientUploadToArweave(animationFile);
    animationUrl = uploadedAnimationUri;
  }

  // Use uploaded URIs (either newly uploaded or existing)
  if (uploadedPreviewUri) {
    image = uploadedPreviewUri;
  }
  if (uploadedAnimationUri || uploadedImageUri) {
    animationUrl = uploadedAnimationUri || uploadedImageUri;
  }

  return {
    uploadedPreviewUri,
    uploadedImageUri,
    uploadedAnimationUri,
    image,
    animationUrl,
  };
};
