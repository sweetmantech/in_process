import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import domtoimage from "dom-to-image-more";

interface useEmbedCodeProps {
  setDescription: Dispatch<SetStateAction<string>>;
  setAnimationUri: Dispatch<SetStateAction<string>>;
}

const useEmbedCode = ({
  setDescription,
  setAnimationUri,
}: useEmbedCodeProps) => {
  const [embedCode, setEmbedCode] = useState("");
  const embedRef = useRef() as MutableRefObject<HTMLDivElement>;

  const uploadEmbedImage = async () => {
    if (!embedRef.current) return null;
    const blob = await domtoimage.toBlob(embedRef.current);
    const fileName = "image.png";
    const fileType = "image/png";
    const textImage = new File([blob], fileName, { type: fileType });
    const uri = await clientUploadToArweave(textImage);
    return uri;
  };

  const uploadEmbedCode = async () => {
    const blob = new Blob(
      [
        `<html>
      ${embedCode}
      </html>`,
      ],
      { type: "text/html" },
    );
    const fileName = "embed";
    const fileType = "text/html";
    const textImage = new File([blob], fileName, { type: fileType });
    const uri = await clientUploadToArweave(textImage);
    setAnimationUri(uri);
    return uri;
  };

  const embed = (value: string) => {
    setEmbedCode(value);
    setDescription(value);
  };

  return {
    embedCode,
    setEmbedCode,
    embedRef,
    uploadEmbedImage,
    embed,
    uploadEmbedCode,
  };
};

export default useEmbedCode;
