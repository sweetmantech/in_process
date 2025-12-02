export interface EmbedModeResult {
  mime: string;
  animationUrl: string;
  contentUri: string;
}

/**
 * Handles embed mode metadata generation.
 * Uploads embed code and sets appropriate mime type.
 */
export const handleEmbedMode = async (
  uploadEmbedCode: () => Promise<string>
): Promise<EmbedModeResult> => {
  const animationUrl = await uploadEmbedCode();

  return {
    mime: "text/html",
    animationUrl,
    contentUri: animationUrl,
  };
};
