import { uploadFile } from "@/lib/arweave/uploadFile";
import patchFetch from "@/lib/arweave/patchFetch";
import logArweaveUpload from "@/lib/arweave/logArweaveUpload";

interface FileUploadResult {
  uploadedPreviewUri: string;
  uploadedImageUri: string;
  uploadedAnimationUri: string;
  image: string;
  animationUrl: string;
}

/**
 * Uploads preview, image, and animation files to Arweave if they exist.
 * Excludes video files (they should be uploaded to Mux instead).
 * Returns uploaded URIs and determines image/animation URLs.
 */
export const uploadFilesToArweave = async (
  previewFile: File | null,
  imageFile: File | null,
  animationFile: File | null,
  existingAnimationUrl: string,
  setUploadProgress?: (progress: number) => void,
  mimeType?: string,
  authHeaders?: HeadersInit | null
): Promise<FileUploadResult> => {
  let uploadedPreviewUri = "";
  let uploadedImageUri = "";
  let uploadedAnimationUri = "";
  let image = "";
  let animationUrl = existingAnimationUrl;

  // Exclude video files from Arweave upload (videos go to Mux)
  const isVideo = mimeType?.includes("video");

  const filesToUpload = [
    { file: previewFile, name: "preview" },
    { file: imageFile, name: "image" },
    // Only include animationFile if it's not a video
    ...(isVideo ? [] : [{ file: animationFile, name: "animation" }]),
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

    const restoreFetch = patchFetch();
    const uploadResult = await uploadFile(file, fileProgressCallback).finally(restoreFetch);

    if (authHeaders) {
      logArweaveUpload(
        uploadResult,
        { file_size_bytes: file.size, content_type: file.type || "application/octet-stream" },
        authHeaders
      );
    }

    const uploadedUri = uploadResult.arweave_uri;

    if (name === "preview") {
      uploadedPreviewUri = uploadedUri;
    } else if (name === "image") {
      uploadedImageUri = uploadedUri;
    } else if (name === "animation") {
      uploadedAnimationUri = uploadedUri;
    }

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
