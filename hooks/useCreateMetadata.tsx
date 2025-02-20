import { uploadJson } from "@/lib/arweave/uploadJson";
import { RefObject, useRef, useState } from "react";
import useFileUpload from "./useFileUpload";
import domtoimage from "dom-to-image";
import { uploadFile } from "@/lib/arweave/uploadFile";

const useCreateMetadata = () => {
  const [name, setName] = useState<string>("");
  const [isTimedSale, setIsTimedSale] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [animationUri, setAnimationUri] = useState<string>("");
  const [textInputActive, setTextInputActive] = useState(false);
  const textInputRef = useRef() as RefObject<HTMLTextAreaElement>;
  const fileUpload = useFileUpload({
    setName,
    setImageUri,
    setAnimationUri,
    setMimeType,
    animationUri,
  });

  const uploadTextRefAsImage = async () => {
    if (!textInputActive || !textInputRef.current) return "";
    fileUpload.setFileUploading(true);
    const blob = await domtoimage.toBlob(textInputRef.current);
    const fileName = "image.png";
    const fileType = "image/png";
    const textImage = new File([blob], fileName, { type: fileType });
    const uri = await uploadFile(textImage);
    setImageUri(uri);
    fileUpload.setFileUploading(false);
    return uri;
  };

  const reset = () => {
    if (textInputRef.current) textInputRef.current.value = "";
    setTextInputActive(false);
    setName("");
    setImageUri("");
    setMimeType("");
    setAnimationUri("");
  };

  const getUri = async (textRefUri: string) =>
    await uploadJson({
      name,
      description: "",
      image: textRefUri || imageUri,
      animation_url: animationUri,
      content: {
        mime: mimeType,
        uri: animationUri,
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
    setTextInputActive,
    textInputActive,
    textInputRef,
    ...fileUpload,
    uploadTextRefAsImage,
  };
};

export default useCreateMetadata;
