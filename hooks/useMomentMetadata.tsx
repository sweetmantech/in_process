import { uploadJson } from "@/lib/arweave/uploadJson";
import useLinkPreview from "./useLinkPreview";
import useEmbedCode from "./useEmbedCode";
import useWriting from "./useWriting";
import useFileUpload from "./useFileUpload";
import { useMomentCreateFormProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";
import { generateAndUploadPreview } from "@/lib/writing/generateAndUploadPreview";
import { usePathname } from "next/navigation";

const useMomentMetadata = () => {
  const pathname = usePathname();
  const { animationUri, description, imageUri, mimeType, name, previewUri, link, writingText } =
    useMomentCreateFormProvider();
  const { uploadWriting } = useWriting();
  const { uploadEmbedCode } = useEmbedCode();
  const fileUpload = useFileUpload();
  useLinkPreview();

  const getUri = async () => {
    let mime = mimeType;
    let animation_url = animationUri || imageUri;
    let image = previewUri;

    if (pathname === "/create/writing" || pathname === "/create/usdc/writing") {
      mime = "text/plain";
      animation_url = await uploadWriting();
      image = await generateAndUploadPreview(writingText);
    }
    if (pathname === "/create/embed" || pathname === "/create/usdc/embed") {
      mime = "text/html";
      animation_url = await uploadEmbedCode();
    }

    return uploadJson({
      name,
      description,
      external_url: link.link,
      image,
      animation_url,
      content: {
        mime,
        uri: animation_url,
      },
    });
  };

  return {
    getUri,
    ...fileUpload,
  };
};

export default useMomentMetadata;
