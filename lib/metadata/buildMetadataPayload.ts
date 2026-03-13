import { uploadJson } from "@/lib/arweave/uploadJson";
import { TokenMetadataJson } from "@/lib/protocolSdk";

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
 * Merges new values with existing metadata to preserve unchanged fields.
 *
 * For name/description: Always use new values (user is editing these fields)
 * For media fields (image/animation_url/content): Use new if non-empty (file uploaded), otherwise preserve existing
 */
export const buildMetadataPayload = async (
  name: string,
  description: string,
  externalUrl: string,
  image: string,
  animationUrl: string,
  mime: string,
  contentUri: string,
  existingMetadata?: TokenMetadataJson | null
): Promise<string> => {
  // Merge new values with existing metadata
  // Strategy:
  // - Name/description: Always use new values from form (form is initialized with existing in update flow)
  // - Media fields: Use new if non-empty (file was uploaded), otherwise preserve existing
  const mergedMetadata = {
    // Always use new name (required field, user is editing)
    name: name || existingMetadata?.name || "",
    // Always use new description (form value - form is initialized with existing values)
    description: description ?? existingMetadata?.description ?? "",
    external_url: externalUrl || existingMetadata?.external_url || "",
    // For media fields, only use new values if they're non-empty (file was uploaded)
    // Otherwise preserve existing values
    image: image || existingMetadata?.image || "",
    animation_url: animationUrl || existingMetadata?.animation_url || null,
    content: {
      mime: mime || existingMetadata?.content?.mime || "",
      uri: contentUri || existingMetadata?.content?.uri || "",
    },
    // Preserve attributes if they exist
    ...(existingMetadata?.attributes && { attributes: existingMetadata.attributes }),
  };

  return uploadJson(mergedMetadata);
};
