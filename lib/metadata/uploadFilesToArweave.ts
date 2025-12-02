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

    const fileIndex = i; // Capture index to avoid closure issues
    const fileProgressCallback = (progress: number) => {
      // Calculate overall progress: each file contributes equally
      const fileStartProgress = (fileIndex / totalFiles) * 100;
      const fileContribution = (progress / 100) * (100 / totalFiles);
      const overallProgress = fileStartProgress + fileContribution;
      setUploadProgress?.(Math.min(Math.round(overallProgress), 100));
    };

    // Upload file and get URI
    let uploadedUri = "";
    if (name === "preview") {
      uploadedUri = await clientUploadToArweave(file, fileProgressCallback);
      uploadedPreviewUri = uploadedUri;
      image = uploadedUri;
    } else if (name === "image") {
      uploadedUri = await clientUploadToArweave(file, fileProgressCallback);
      uploadedImageUri = uploadedUri;
      if (!animationUrl) {
        animationUrl = uploadedImageUri;
      }
    } else if (name === "animation") {
      uploadedUri = await clientUploadToArweave(file, fileProgressCallback);
      uploadedAnimationUri = uploadedUri;
      animationUrl = uploadedUri;
    }

    // Ensure 100% progress is set when file completes
    // This handles cases where the final progress callback might not reach exactly 100%
    const fileStartProgress = (fileIndex / totalFiles) * 100;
    const fileContribution = 100 / totalFiles;
    setUploadProgress?.(Math.min(Math.round(fileStartProgress + fileContribution), 100));
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
