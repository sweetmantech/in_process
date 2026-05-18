import useLinkPreview from "./useLinkPreview";
import useEmbedCode from "./useEmbedCode";
import useWriting from "./useWriting";
import useFileSelect from "./useFileSelect";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useTypeParam from "./useTypeParam";
import { uploadVideoToMuxIfNeeded } from "@/lib/metadata/uploadVideoToMuxIfNeeded";
import { uploadFilesToArweave } from "@/lib/metadata/uploadFilesToArweave";
import { buildMetadataPayload } from "@/lib/metadata/buildMetadataPayload";
import { isModelGltfLike } from "@/lib/media/isModelGltfLike";
import { MomentMetadata } from "@/types/moment";
import { useUserProvider } from "@/providers/UserProvider";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const useMetadataUpload = () => {
  const type = useTypeParam();
  const { getAuthHeaders } = useUserProvider();
  const {
    description,
    mimeType,
    name,
    link,
    imageFile,
    animationFile,
    previewFile,
    setUploadProgress,
    setIsUploading,
  } = useMetadataFormProvider();
  const { uploadWriting } = useWriting();
  const { uploadEmbedCode } = useEmbedCode();
  const { selectFile } = useFileSelect();
  const { executeRecaptcha } = useGoogleReCaptcha();
  useLinkPreview();

  const getRecaptchaToken = async () => {
    if (!executeRecaptcha) throw new Error("Recaptcha is not initialized");
    return executeRecaptcha("upload").catch(() => undefined);
  };

  const generateMetadataUri = async (existingMetadata?: MomentMetadata | null) => {
    const authHeaders = await getAuthHeaders();

    let mime = mimeType;
    let animation_url = "";
    let contentUri = "";
    let image = "";

    const hasFilesToUpload = Boolean(previewFile || imageFile || animationFile);

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
      animation_url = videoResult.animationUrl;
      contentUri = videoResult.contentUri;
    }

    const hasNonVideoFiles = Boolean(previewFile || imageFile);
    if (hasNonVideoFiles) {
      if (!isVideo) {
        setIsUploading(true);
        setUploadProgress(0);
      }
    }

    const fileUploadResult = await uploadFilesToArweave(
      authHeaders,
      previewFile,
      imageFile,
      animationFile,
      animation_url,
      getRecaptchaToken,
      setUploadProgress,
      mimeType
    );

    image = fileUploadResult.image;

    if (isVideo) {
      // Keep Mux URLs
    } else {
      animation_url = fileUploadResult.animationUrl || animation_url;

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

    if (hasFilesToUpload) {
      setUploadProgress(100);
    }

    if (type === "writing") {
      const writingResult = await uploadWriting(authHeaders, getRecaptchaToken);
      mime = writingResult.mime;
      animation_url = writingResult.animationUrl;
      contentUri = writingResult.contentUri;
      image = writingResult.image;
    }

    if (type === "embed") {
      const embedResult = await uploadEmbedCode(authHeaders, getRecaptchaToken);
      mime = embedResult.mime;
      animation_url = embedResult.animationUrl;
      contentUri = embedResult.contentUri;
    }

    const metadataResult = await buildMetadataPayload(
      name,
      description,
      link,
      image,
      animation_url,
      mime,
      contentUri,
      authHeaders,
      getRecaptchaToken,
      existingMetadata
    );
    return metadataResult.arweave_uri;
  };

  return {
    generateMetadataUri,
    selectFile,
  };
};

export default useMetadataUpload;
