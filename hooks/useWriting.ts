import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import domtoimage from "dom-to-image-more";
import { Dispatch, SetStateAction, RefObject, useRef, useState } from "react";

interface useWritingProps {
  setDescription: Dispatch<SetStateAction<string>>;
}

const useWriting = ({ setDescription }: useWritingProps) => {
  const writingRef = useRef() as RefObject<HTMLDivElement>;
  const [writingText, setWritingText] = useState<string>("");

  const uploadWritingImage = async () => {
    if (!writingRef.current) return null;
    const blob = await domtoimage.toBlob(writingRef.current);
    const fileName = "image.png";
    const fileType = "image/png";
    const textImage = new File([blob], fileName, { type: fileType });
    const uri = await clientUploadToArweave(textImage);
    return uri;
  };

  const write = (value: string) => {
    setWritingText(value);
    setDescription(value);
  };
  return {
    writingRef,
    uploadWritingImage,
    writingText,
    setWritingText,
    write,
  };
};

export default useWriting;
