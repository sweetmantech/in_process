import uploadToArweave from "@/lib/arweave/uploadToArweave";
import type { UploadFileResult } from "@/lib/arweave/uploadFile";
import { generateTextPreview } from "./generateTextPreview";

export const generateAndUploadPreview = async (
  writingText: string
): Promise<UploadFileResult | null> => {
  if (!writingText.trim()) return null;

  try {
    const previewFile = await generateTextPreview(writingText);
    return uploadToArweave(previewFile);
  } catch (error) {
    console.error("Failed to generate text preview:", error);
    return null;
  }
};
