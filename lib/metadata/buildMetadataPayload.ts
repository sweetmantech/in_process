import { uploadJson } from "@/lib/arweave/uploadJson";

export interface MetadataPayload {
  name: string;
  description: string;
  external_url: string;
  image: string;
  animation_url: string;
  content: {
    mime: string;
    uri: string;
  };
}

/**
 * Builds and uploads the metadata JSON to Arweave.
 */
export const buildMetadataPayload = async (
  name: string,
  description: string,
  externalUrl: string,
  image: string,
  animationUrl: string,
  mime: string,
  contentUri: string
): Promise<string> => {
  return uploadJson({
    name,
    description,
    external_url: externalUrl,
    image,
    animation_url: animationUrl,
    content: {
      mime,
      uri: contentUri,
    },
  });
};
