import { useState } from "react";
import { uploadWritingFile } from "@/lib/arweave/uploadWritingFile";

const useWriting = () => {
  const [writingText, setWritingText] = useState<string>("");

  const uploadWriting = async () => {
    const uri = await uploadWritingFile(writingText);
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
