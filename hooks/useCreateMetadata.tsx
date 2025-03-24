import { uploadJson } from "@/lib/arweave/uploadJson";
import { RefObject, useRef, useState } from "react";
import useFileUpload from "./useFileUpload";
import domtoimage from "dom-to-image";
import { uploadFile } from "@/lib/arweave/uploadFile";
import useLinkPreview from "./useLinkPreview";

const useCreateMetadata = () => {
  const [link, setLink] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [priceUnit, setPriceUnit] = useState<"eth" | "usd" | "base" | "usdc">(
    "eth",
  );
  const [price, setPrice] = useState("0.01");
  const [description, setDescription] = useState<string>("");
  const [isTimedSale, setIsTimedSale] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [animationUri, setAnimationUri] = useState<string>("");
  const textInputRef = useRef() as RefObject<HTMLTextAreaElement>;
  const fileUpload = useFileUpload({
    setName,
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

  console.log("ziad", name)
  const uploadTextRefAsImage = async () => {
    if (!textInputRef.current) return "";
    fileUpload.setFileUploading(true);
    const blob = await domtoimage.toBlob(textInputRef.current);
    const fileName = "image.png";
    const fileType = "image/png";
    const textImage = new File([blob], fileName, { type: fileType });
    const uri = await uploadFile(textImage);
    setName(`${textInputRef.current.value.slice(0, 10)}...`)
    setImageUri(uri);
    setMimeType("image/png");
    fileUpload.setFileUploading(false);
    return uri;
  };

  const reset = () => {
    if (textInputRef.current) textInputRef.current.value = "";
    setName("");
    setLink("");
    setDescription("");
    setImageUri("");
    setMimeType("");
    setAnimationUri("");
  };

  const getUri = async (textRefUri: string) =>
    await uploadJson({
      name,
      description,
      external_url: link,
      image: textRefUri || imageUri,
      animation_url: animationUri,
      content: {
        mime: mimeType,
        uri: animationUri || textRefUri || imageUri,
      },
    });

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
    textInputRef,
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
  };
};

export default useCreateMetadata;
