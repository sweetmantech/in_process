import { uploadJson } from "@/lib/arweave/uploadJson";
import useFileUpload from "./useFileUpload";
import useLinkPreview from "./useLinkPreview";
import useEmbedCode from "./useEmbedCode";
import useWriting from "./useWriting";
import useMetadataValues from "./useMetadataValues";
import { usePathname } from "next/navigation";
import { generateTextPreview } from "@/lib/protocolSdk/ipfs/text-metadata";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

const useCreateMetadata = () => {
  const pathname = usePathname();
  const metadataValues = useMetadataValues();
  const {
    setDescription,
    setImageUri,
    setAnimationUri,
    setMimeType,
    animationUri,
    setName,
    description,
    imageUri,
    mimeType,
    name,
    setPreviewUri,
    previewUri,
    setPreviewSrc,
  } = metadataValues;
  const writinig = useWriting();
  const embed = useEmbedCode({
    setDescription,
    setAnimationUri,
  });
  const fileUpload = useFileUpload({
    setImageUri,
    setPreviewSrc,
    setPreviewUri,
    setAnimationUri,
    setMimeType,
    animationUri,
  });
  const link = useLinkPreview({
    setImageUri,
    setPreviewUri,
    setPreviewSrc,
    setFileUploading: fileUpload.setFileUploading,
  });

  const reset = () => {
    writinig.setWritingText("");
    setName("");
    link.setLink("");
    setDescription("");
    setImageUri("");
    setMimeType("");
    setAnimationUri("");
    setPreviewUri("");
    setPreviewSrc("");
  };

  const getUri = async () => {
    let mime = mimeType;
    let animation = animationUri || imageUri;
    let imageUri_final = previewUri;

    if (pathname === "/create/writing" || pathname === "/create/usdc/writing") {
      mime = "text/plain";
      animation = await writinig.uploadWriting();
      
      // Generate thumbnail for writing content if no preview is set
      if (!previewUri && writinig.writingText) {
        try {
          const thumbnailFile = await generateTextPreview(writinig.writingText);
          imageUri_final = await clientUploadToArweave(thumbnailFile);
        } catch (error) {
          console.error("Failed to generate thumbnail for writing content:", error);
          // Keep imageUri_final as previewUri (empty) if thumbnail generation fails
        }
      }
    }
    if (pathname === "/create/embed" || pathname === "/create/usdc/embed") {
      mime = "text/html";
      animation = await embed.uploadEmbedCode();
    }

    return uploadJson({
      name,
      description,
      external_url: link.link,
      image: imageUri_final,
      animation_url: animation,
      content: {
        mime,
        uri: animation,
      },
    });
  };

  return {
    reset,
    ...fileUpload,
    ...embed,
    ...link,
    ...writinig,
    ...metadataValues,
    getUri,
  };
};

export default useCreateMetadata;
