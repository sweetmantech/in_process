import { uploadJson } from "@/lib/arweave/uploadJson";
import useLinkPreview from "./useLinkPreview";
import useEmbedCode from "./useEmbedCode";
import useWriting from "./useWriting";
import useFileUpload from "./useFileUpload";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { generateAndUploadPreview } from "@/lib/writing/generateAndUploadPreview";
import { usePathname } from "next/navigation";

const useMomentMetadata = () => {
  const pathname = usePathname();
  const {
    animationUri,
    description,
    imageUri,
    mimeType,
    name,
    previewUri,
    link,
    writingText,
    downloadUrl,
  } = useMomentFormProvider();
  const { uploadWriting } = useWriting();
  const { uploadEmbedCode } = useEmbedCode();
  const fileUpload = useFileUpload();
  useLinkPreview();

  const getUri = async () => {
    let mime = mimeType;
    let animation_url = animationUri || imageUri;
    let contentUri = animation_url;
    let image = previewUri;

    if (pathname === "/create/writing" || pathname === "/create/usdc/writing") {
      mime = "text/plain";
      animation_url = await uploadWriting();
      contentUri = animation_url;
      image = await generateAndUploadPreview(writingText);
    }
    if (pathname === "/create/embed" || pathname === "/create/usdc/embed") {
      mime = "text/html";
      animation_url = await uploadEmbedCode();
      contentUri = animation_url;
    }

    // For videos uploaded to Mux: use playbackUrl for animation_url and downloadUrl for content.uri
    if (downloadUrl && mimeType.includes("video")) {
      contentUri = downloadUrl;
    }

    return uploadJson({
      name,
      description,
      external_url: link.link,
      image,
      animation_url,
      content: {
        mime,
        uri: contentUri,
      },
    });
  };

  return {
    getUri,
    ...fileUpload,
  };
};

export default useMomentMetadata;
