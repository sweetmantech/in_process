import { uploadJson } from "@/lib/arweave/uploadJson";
import useFileUpload from "./useFileUpload";
import domtoimage from "dom-to-image-more";
import useLinkPreview from "./useLinkPreview";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import useEmbedCode from "./useEmbedCode";
import useWriting from "./useWriting";
import useMetadataValues from "./useMetadataValues";
import { usePathname } from "next/navigation";

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
  } = metadataValues;
  const writinig = useWriting();
  const embed = useEmbedCode({
    setDescription,
    setAnimationUri,
  });
  const fileUpload = useFileUpload({
    setImageUri,
    setAnimationUri,
    setMimeType,
    animationUri,
  });
  const link = useLinkPreview({
    setImageUri,
    setMimeType,
    setName,
    setDescription,
    setFileUploading: fileUpload.setFileUploading,
  });

  const uploadPdfImage = async () => {
    const pdfs = document.getElementsByClassName("rpv-core__canvas-layer");
    if (!pdfs.length) return null;
    const blob = await domtoimage.toBlob(pdfs[0]);
    const fileName = "image.png";
    const fileType = "image/png";
    const pdfImage = new File([blob], fileName, { type: fileType });
    const imageUri = await clientUploadToArweave(pdfImage);
    return imageUri;
  };

  const reset = () => {
    writinig.setWritingText("");
    setName("");
    link.setLink("");
    setDescription("");
    setImageUri("");
    setMimeType("");
    setAnimationUri("");
  };

  const getUri = async () => {
    let image: string | null = imageUri;
    let mime = mimeType;
    let animation = animationUri || imageUri;
    const pdfImageUri = await uploadPdfImage();
    if (pdfImageUri) image = pdfImageUri;
    if (pathname === "/create/writing") {
      mime = "text/plain";
      image = await writinig.uploadWritingImage();
      animation = await writinig.uploadWriting();
    }
    if (pathname === "/create/embed") {
      mime = "text/html";
      image = await embed.uploadEmbedImage();
      animation = await embed.uploadEmbedCode();
    }

    return uploadJson({
      name,
      description,
      external_url: link.link,
      image,
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
