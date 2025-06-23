import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { generateTextPreview } from "./generateTextPreview";

export const generateAndUploadPreview = async (writingText: string): Promise<string> => {
  if (!writingText.trim()) return "";
  
  try {
    const previewFile = await generateTextPreview(writingText);
    const previewUri = await clientUploadToArweave(previewFile);
    return previewUri;
  } catch (error) {
    console.error("Failed to generate text preview:", error);
    return "";
  }
};