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
    const fileStartProgress = (fileIndex / totalFiles) * 100;
    const fileContribution = 100 / totalFiles;

    const fileProgressCallback = (progress: number) => {
      // Calculate overall progress: each file contributes equally
      const fileProgressContribution = (progress / 100) * fileContribution;
      const overallProgress = fileStartProgress + fileProgressContribution;
      setUploadProgress?.(Math.min(Math.round(overallProgress), 100));
    };

    // Upload file and get URI
    const uploadedUri = await clientUploadToArweave(file, fileProgressCallback);

    // Assign uploaded URI based on file type
    if (name === "preview") {
      uploadedPreviewUri = uploadedUri;
    } else if (name === "image") {
      uploadedImageUri = uploadedUri;
    } else if (name === "animation") {
      uploadedAnimationUri = uploadedUri;
    }

    // Ensure 100% progress is set when file completes
    // This handles cases where the final progress callback might not reach exactly 100%
    setUploadProgress?.(Math.min(Math.round(fileStartProgress + fileContribution), 100));
  }

  // Determine final image and animationUrl from uploaded URIs
  image = uploadedPreviewUri || "";
  animationUrl = uploadedAnimationUri || uploadedImageUri || existingAnimationUrl;

  return {
    uploadedPreviewUri,
    uploadedImageUri,
    uploadedAnimationUri,
    image,
    animationUrl,
  };
};
