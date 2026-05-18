import { isInvalidArUri } from "@/lib/arweave/isInvalidArUri";
import { uploadJson } from "@/lib/arweave/uploadJson";
import type { UploadResult } from "@/lib/arweave/uploadViaApi";
import { MomentMetadata } from "@/types/moment";

export const buildMetadataPayload = async (
  name: string,
  description: string,
  externalUrl: string,
  image: string,
  animationUrl: string,
  mime: string,
  contentUri: string,
  authHeaders: HeadersInit,
  getRecaptchaToken: () => Promise<string | undefined>,
  existingMetadata?: MomentMetadata | null
): Promise<UploadResult> => {
  const safeAnimationUrl = animationUrl && !isInvalidArUri(animationUrl) ? animationUrl : "";
  const safeContentUri = contentUri && !isInvalidArUri(contentUri) ? contentUri : "";

  const mergedMetadata = {
    name: name || existingMetadata?.name || "",
    description: description ?? existingMetadata?.description ?? "",
    external_url: externalUrl || existingMetadata?.external_url || "",
    image: image || existingMetadata?.image || "",
    animation_url: safeAnimationUrl || existingMetadata?.animation_url || null,
    content: {
      mime: mime || existingMetadata?.content?.mime || "",
      uri: safeContentUri || existingMetadata?.content?.uri || "",
    },
  };

  return uploadJson(mergedMetadata, authHeaders, getRecaptchaToken);
};
