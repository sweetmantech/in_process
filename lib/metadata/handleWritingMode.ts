import { generateAndUploadPreview } from "@/lib/writing/generateAndUploadPreview";

export interface WritingModeResult {
  mime: string;
  animationUrl: string;
  contentUri: string;
  image: string;
}

/**
 * Handles writing mode metadata generation.
 * Uploads writing content and generates preview image.
 */
export const handleWritingMode = async (
  uploadWriting: () => Promise<string>,
  writingText: string
): Promise<WritingModeResult> => {
  const animationUrl = await uploadWriting();
  const image = await generateAndUploadPreview(writingText);

  return {
    mime: "text/plain",
    animationUrl,
    contentUri: animationUrl,
    image,
  };
};
