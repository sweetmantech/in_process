import useLinkPreview from "./useLinkPreview";
import useEmbedCode from "./useEmbedCode";
import useWriting from "./useWriting";
import useFileSelect from "./useFileSelect";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useTypeParam from "./useTypeParam";
import { uploadVideoToMuxIfNeeded } from "@/lib/metadata/uploadVideoToMuxIfNeeded";
import { uploadFilesToArweave } from "@/lib/metadata/uploadFilesToArweave";
import { handleWritingMode } from "@/lib/metadata/handleWritingMode";
import { handleEmbedMode } from "@/lib/metadata/handleEmbedMode";
import { buildMetadataPayload } from "@/lib/metadata/buildMetadataPayload";
import { isModelGltfLike } from "@/lib/media/isModelGltfLike";
import { MomentMetadata } from "@/types/moment";
import { useUserProvider } from "@/providers/UserProvider";

const useMetadataUpload = () => {
  const type = useTypeParam();
  const { getAuthHeaders } = useUserProvider();
  const {
    description,
    mimeType,
    name,
    link,
    writingText,
    imageFile,
    animationFile,
    previewFile,
    setUploadProgress,
    setIsUploading,
  } = useMetadataFormProvider();
  const { uploadWriting } = useWriting();
  const { uploadEmbedCode } = useEmbedCode();
  const { selectFile } = useFileSelect();
  useLinkPreview();

  const generateMetadataUri = async (existingMetadata?: MomentMetadata | null) => {
    const authHeaders = await getAuthHeaders();

    let mime = mimeType;
    let animation_url = "";
    let contentUri = "";
    let image = "";

    // Check if there are files to upload
    const hasFilesToUpload = Boolean(previewFile || imageFile || animationFile);

    // Upload video to Mux if animation file exists and mimeType indicates video (deferred upload)
    const isVideo = animationFile && mimeType.includes("video");
    if (isVideo) {
      setIsUploading(true);
      setUploadProgress(0);
    }
    const videoResult = await uploadVideoToMuxIfNeeded(
      animationFile,
      mimeType,
      authHeaders,
      setUploadProgress
    );
    if (videoResult.animationUrl) {
      // For videos: animation_url = Mux playbackUrl, contentUri = Mux downloadUrl
      animation_url = videoResult.animationUrl;
      contentUri = videoResult.contentUri;
    }

    // Set uploading state for Arweave uploads (for preview images, etc.)
    // Set if there are non-video files to upload (preview images for videos, or regular files)
    const hasNonVideoFiles = Boolean(previewFile || imageFile);
    if (hasNonVideoFiles) {
      // If we already set uploading for video, don't reset progress to 0
      if (!isVideo) {
        setIsUploading(true);
        setUploadProgress(0);
      }
      // If it's a video, isUploading is already true, just continue with progress
    }

    // Upload files to Arweave if they exist as blobs (deferred upload)
    // Note: Videos are excluded from Arweave upload (they go to Mux)
    const fileUploadResult = await uploadFilesToArweave(
      previewFile,
      imageFile,
      animationFile,
      animation_url,
      setUploadProgress,
      mimeType,
      authHeaders
    );

    // Use file upload results for metadata
    // Set image from Arweave upload result (preview image for videos, main image for others)
    image = fileUploadResult.image;

    // For videos: use Mux URLs (already set above), don't overwrite with Arweave URLs
    if (isVideo) {
      // Keep Mux URLs: animation_url is playbackUrl, contentUri is downloadUrl
      // animation_url and contentUri already set from Mux above
    } else {
      // For non-videos: use Arweave URLs
      animation_url = fileUploadResult.animationUrl || animation_url;

      // For PDFs, images, and glTF/GLB: content.uri should mirror animation_url when we have a single main asset
      // (Videos are handled separately above with Mux URLs)
      const isPdf = mimeType.includes("pdf");
      const isImage = mimeType.includes("image");
      const isModel = isModelGltfLike(mimeType, animationFile?.name ?? null);
      if ((isPdf || isImage) && animation_url) {
        contentUri = animation_url;
      }
      if (isModel && animation_url) {
        contentUri = animation_url;
        if (!mime.trim()) {
          mime = /\.glb$/i.test(animationFile?.name ?? "")
            ? "model/gltf-binary"
            : "model/gltf+json";
        }
      }
    }

    // Ensure progress is 100% after all uploads complete
    if (hasFilesToUpload) {
      setUploadProgress(100);
    }

    // Handle writing mode
    if (type === "writing") {
      const writingResult = await handleWritingMode(uploadWriting, writingText);
      mime = writingResult.mime;
      animation_url = writingResult.animationUrl;
      contentUri = writingResult.contentUri;
      image = writingResult.image;
    }

    // Handle embed mode
    if (type === "embed") {
      const embedResult = await handleEmbedMode(uploadEmbedCode);
      mime = embedResult.mime;
      animation_url = embedResult.animationUrl;
      contentUri = embedResult.contentUri;
    }

    return buildMetadataPayload(
      name,
      description,
      link,
      image,
      animation_url,
      mime,
      contentUri,
      existingMetadata
    );
  };

  return {
    generateMetadataUri,
    selectFile,
  };
};

export default useMetadataUpload;
