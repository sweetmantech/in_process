import { uploadJson } from "../arweave/uploadJson";
import getMediaBlob from "./getMediaBlob";
import clientUploadToArweave from "../arweave/clientUploadToArweave";
import { InboundMessageWebhookEvent } from "telnyx/resources/webhooks.mjs";

const uploadMetadata = async (
  media: InboundMessageWebhookEvent.Data.Payload.Media,
  payload: InboundMessageWebhookEvent.Data.Payload | undefined
) => {
  const blob = await getMediaBlob(media);
  const name = payload?.subject || payload?.text || `photo-${Date.now()}`;
  const file = new File([blob], name, { type: media.content_type });
  const mediaUri = await clientUploadToArweave(file);
  let image = undefined;
  let animation_url = undefined;
  if (media.content_type?.includes("image")) {
    image = mediaUri;
  } else {
    animation_url = mediaUri;
  }
  const arweaveUri = await uploadJson({
    name,
    description: payload?.text || "",
    image,
    animation_url,
    content: {
      mime: media.content_type,
      uri: mediaUri,
    },
  });

  return {
    uri: arweaveUri,
    name,
  };
};

export default uploadMetadata;
