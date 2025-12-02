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
  existingAnimationUrl: string,
  setUploadProgress?: (progress: number) => void
): Promise<FileUploadResult> => {
  let uploadedPreviewUri = "";
  let uploadedImageUri = "";
  let uploadedAnimationUri = "";
  let image = "";
  let animationUrl = existingAnimationUrl;

  const filesToUpload = [
    { file: previewFile, name: "preview" },
    { file: imageFile, name: "image" },
    { file: animationFile, name: "animation" },
  ].filter((item) => item.file !== null);

  const totalFiles = filesToUpload.length;
  if (totalFiles === 0) {
    return {
      uploadedPreviewUri: "",
      uploadedImageUri: "",
      uploadedAnimationUri: "",
      image: "",
      animationUrl: existingAnimationUrl,
    };
  }

  for (let i = 0; i < filesToUpload.length; i++) {
    const { file, name } = filesToUpload[i];
    if (!file) continue;

    const fileProgressCallback = (progress: number) => {
      // Calculate overall progress: each file contributes equally
      const fileStartProgress = (i / totalFiles) * 100;
      const fileContribution = progress / totalFiles;
      const overallProgress = fileStartProgress + fileContribution;
      setUploadProgress?.(Math.min(Math.round(overallProgress), 100));
    };

    if (name === "preview") {
      uploadedPreviewUri = await clientUploadToArweave(file, fileProgressCallback);
      image = uploadedPreviewUri;
    } else if (name === "image") {
      uploadedImageUri = await clientUploadToArweave(file, fileProgressCallback);
      if (!animationUrl) {
        animationUrl = uploadedImageUri;
      }
    } else if (name === "animation") {
      uploadedAnimationUri = await clientUploadToArweave(file, fileProgressCallback);
      animationUrl = uploadedAnimationUri;
    }
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
