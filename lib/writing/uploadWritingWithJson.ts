import { uploadJson } from "../arweave/uploadJson";
import { uploadWritingFile } from "../arweave/uploadWritingFile";
import { generateAndUploadPreview } from "./generateAndUploadPreview";

export const uploadWritingWithJson = async (
  name: string,
  content: string,
  description = ""
): Promise<string> => {
  const contentUri = await uploadWritingFile(content);
  const previewUri = await generateAndUploadPreview(content);
  const metadataUri = await uploadJson({
    name,
    description,
    external_url: previewUri,
    image: previewUri,
    animation_url: contentUri,
    content: {
      mime: "text/plain",
      uri: contentUri,
    },
  });
  return metadataUri;
};
