import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { Dispatch, SetStateAction, useState } from "react";

interface useEmbedCodeProps {
  setDescription: Dispatch<SetStateAction<string>>;
  setAnimationUri: Dispatch<SetStateAction<string>>;
}

const useEmbedCode = ({ setDescription, setAnimationUri }: useEmbedCodeProps) => {
  const [embedCode, setEmbedCode] = useState("");

  const uploadEmbedCode = async () => {
    const blob = new Blob(
      [
        `<html>
      ${embedCode}
      </html>`,
      ],
      { type: "text/html" }
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
  };

  return {
    embedCode,
    setEmbedCode,
    embed,
    uploadEmbedCode,
  };
};

export default useEmbedCode;
