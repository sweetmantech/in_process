import useLinkPreview from "./useLinkPreview";
import useEmbedCode from "./useEmbedCode";
import useWriting from "./useWriting";
import useFileSelect from "./useFileSelect";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { usePathname } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { uploadVideoToMuxIfNeeded } from "@/lib/metadata/uploadVideoToMuxIfNeeded";
import { uploadFilesToArweave } from "@/lib/metadata/uploadFilesToArweave";
import { handleWritingMode } from "@/lib/metadata/handleWritingMode";
import { handleEmbedMode } from "@/lib/metadata/handleEmbedMode";
import { buildMetadataPayload } from "@/lib/metadata/buildMetadataPayload";

const useMetadataUpload = () => {
  const pathname = usePathname();
  const { getAccessToken } = usePrivy();
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

  const generateMetadataUri = async () => {
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
      getAccessToken,
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
      mimeType
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

      // For PDFs, images, and other files: content.uri should be same as animation_url
      // (Videos are handled separately above with Mux URLs)
      const isPdf = mimeType.includes("pdf");
      const isImage = mimeType.includes("image");
      if ((isPdf || isImage) && animation_url) {
        contentUri = animation_url;
      }
    }

    // Ensure progress is 100% after all uploads complete
    if (hasFilesToUpload) {
      setUploadProgress(100);
    }

    // Handle writing mode
    if (pathname === "/create/writing" || pathname === "/create/usdc/writing") {
      const writingResult = await handleWritingMode(uploadWriting, writingText);
      mime = writingResult.mime;
      animation_url = writingResult.animationUrl;
      contentUri = writingResult.contentUri;
      image = writingResult.image;
    }

    // Handle embed mode
    if (pathname === "/create/embed" || pathname === "/create/usdc/embed") {
      const embedResult = await handleEmbedMode(uploadEmbedCode);
      mime = embedResult.mime;
      animation_url = embedResult.animationUrl;
      contentUri = embedResult.contentUri;
    }

    return buildMetadataPayload(name, description, link, image, animation_url, mime, contentUri);
  };

  return {
    generateMetadataUri,
    selectFile,
  };
};

export default useMetadataUpload;
