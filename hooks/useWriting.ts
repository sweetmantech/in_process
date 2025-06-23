import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { generateAndUploadPreview } from "@/lib/writing/generateAndUploadPreview";
import { useState } from "react";

const useWriting = () => {
  const [writingText, setWritingText] = useState<string>("");
  const [previewImageUri, setPreviewImageUri] = useState<string>("");

  const uploadWriting = async () => {
    const blob = new Blob([writingText], { type: "text/plain" });
    const writingFile = new File([blob], "writing.txt", { type: "text/plain" });
    const uri = await clientUploadToArweave(writingFile);
    return uri;
  };

  const generateAndUploadPreviewWrapper = async () => {
    const previewUri = await generateAndUploadPreview(writingText);
    setPreviewImageUri(previewUri);
    return previewUri;
  };

  const write = (value: string) => {
    setWritingText(value);
    // Clear preview when text changes
    setPreviewImageUri("");
  };

  return {
    writingText,
    setWritingText,
    write,
    uploadWriting,
    generateAndUploadPreview: generateAndUploadPreviewWrapper,
    previewImageUri,
  };
};

export default useWriting;
