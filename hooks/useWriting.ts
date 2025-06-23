import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { useState } from "react";

const useWriting = () => {
  const [writingText, setWritingText] = useState<string>("");

  const uploadWriting = async () => {
    const blob = new Blob([writingText], { type: "text/plain" });
    const writingFile = new File([blob], "writing.txt", { type: "text/plain" });
    const uri = await clientUploadToArweave(writingFile);
    return uri;
  };

  const write = (value: string) => {
    setWritingText(value);
  };
  return {
    writingText,
    setWritingText,
    write,
    uploadWriting,
  };
};

export default useWriting;
