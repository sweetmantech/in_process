import useLinkPreview from "./useLinkPreview";
import useEmbedCode from "./useEmbedCode";
import useWriting from "./useWriting";
import useFileSelect from "./useFileSelect";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { usePathname } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { uploadVideoToMuxIfNeeded } from "@/lib/metadata/uploadVideoToMuxIfNeeded";
import { uploadFilesToArweave } from "@/lib/metadata/uploadFilesToArweave";
import { handleWritingMode } from "@/lib/metadata/handleWritingMode";
import { handleEmbedMode } from "@/lib/metadata/handleEmbedMode";
import { buildMetadataPayload } from "@/lib/metadata/buildMetadataPayload";

const useMomentMetadata = () => {
  const pathname = usePathname();
  const { getAccessToken } = usePrivy();
  const {
    description,
    mimeType,
    name,
    link,
    writingText,
    downloadUrl,
    imageFile,
    animationFile,
    previewFile,
    videoFile,
    setUploadProgress,
    setIsUploading,
  } = useMomentFormProvider();
  const { uploadWriting } = useWriting();
  const { uploadEmbedCode } = useEmbedCode();
  const { selectFile } = useFileSelect();
  useLinkPreview();

  const generateMetadataUri = async () => {
    let mime = mimeType;
    let animation_url = "";
    let contentUri = "";
    let image = "";

    // Upload video to Mux if video file exists (deferred upload)
    if (videoFile && mimeType.includes("video")) {
      setIsUploading(true);
      setUploadProgress(0);
    }
    const videoResult = await uploadVideoToMuxIfNeeded(
      videoFile,
      mimeType,
      getAccessToken,
      setUploadProgress
    );
    if (videoResult.animationUrl) {
      animation_url = videoResult.animationUrl;
      contentUri = videoResult.contentUri;
    }
    if (videoFile && mimeType.includes("video")) {
      setUploadProgress(100);
    }

    // Upload files to Arweave if they exist as blobs (deferred upload)
    const fileUploadResult = await uploadFilesToArweave(
      previewFile,
      imageFile,
      animationFile,
      animation_url,
      setUploadProgress
    );

    // Use file upload results for metadata (preview uses blob files, so no need to update state)
    image = fileUploadResult.image;
    animation_url = fileUploadResult.animationUrl || animation_url;

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

    // For videos uploaded to Mux: use playbackUrl for animation_url and downloadUrl for content.uri
    if (downloadUrl && mimeType.includes("video")) {
      contentUri = downloadUrl;
    }

    return buildMetadataPayload(name, description, link, image, animation_url, mime, contentUri);
  };

  return {
    generateMetadataUri,
    selectFile,
  };
};

export default useMomentMetadata;
