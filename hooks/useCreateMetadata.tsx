import { uploadJson } from "@/lib/arweave/uploadJson";
import { RefObject, useRef, useState } from "react";
import useFileUpload from "./useFileUpload";
import domtoimage from "dom-to-image-more";
import useLinkPreview from "./useLinkPreview";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { usePathname } from "next/navigation";

const useCreateMetadata = () => {
  const pathname = usePathname();
  const isUsdc = pathname.includes("/usdc");
  const [link, setLink] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [priceUnit, setPriceUnit] = useState<string>(isUsdc ? "usdc" : "eth");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState<string>("");
  const [isTimedSale, setIsTimedSale] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [animationUri, setAnimationUri] = useState<string>("");
  const writingRef = useRef() as RefObject<HTMLDivElement>;
  const [writingText, setWritingText] = useState<string>("");
  const fileUpload = useFileUpload({
    setImageUri,
    setAnimationUri,
    setMimeType,
    animationUri,
  });
  useLinkPreview({
    link,
    setImageUri,
    setMimeType,
    setName,
    setDescription,
    setFileUploading: fileUpload.setFileUploading,
  });

  const uploadTextRefAsImage = async () => {
    if (!writingRef.current) return null;
    const blob = await domtoimage.toBlob(writingRef.current);
    const fileName = "image.png";
    const fileType = "image/png";
    const textImage = new File([blob], fileName, { type: fileType });
    const uri = await clientUploadToArweave(textImage);
    return {
      uri,
      mimeType: fileType,
    };
  };

  const uploadPdfAsImage = async () => {
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
    setWritingText("");
    setName("");
    setLink("");
    setDescription("");
    setImageUri("");
    setMimeType("");
    setAnimationUri("");
  };

  const getUri = async () => {
    const pdfImageUri = await uploadPdfAsImage();
    const metadataOfWriting = await uploadTextRefAsImage();

    return uploadJson({
      name,
      description: writingText || description,
      external_url: link,
      image: pdfImageUri || metadataOfWriting?.uri || imageUri,
      animation_url: animationUri,
      content: {
        mime: metadataOfWriting?.mimeType || mimeType,
        uri: animationUri || metadataOfWriting?.uri || imageUri,
      },
    });
  };

  return {
    animationUri,
    setAnimationUri,
    getUri,
    imageUri,
    setImageUri,
    mimeType,
    setMimeType,
    name,
    isTimedSale,
    setName,
    setIsTimedSale,
    reset,
    writingRef,
    ...fileUpload,
    uploadTextRefAsImage,
    setDescription,
    description,
    link,
    setLink,
    priceUnit,
    setPriceUnit,
    price,
    setPrice,
    writingText,
    setWritingText,
  };
};

export default useCreateMetadata;
