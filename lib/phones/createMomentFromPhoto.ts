import type { InboundMessageWebhookEvent } from "telnyx/resources/webhooks";
import { maxUint64, getAddress } from "viem";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import getPhotoBlob from "@/lib/phones/getPhotoBlob";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { createMoment } from "@/lib/moment/createMoment";

const createMomentFromPhoto = async (
  photo: InboundMessageWebhookEvent.Data.Payload.Media,
  payload: InboundMessageWebhookEvent.Data.Payload | undefined,
  artistAddress: string
) => {
  const blob = await getPhotoBlob(photo);
  const name = payload?.subject || payload?.text || `photo-${Date.now()}`;
  const file = new File([blob], name, { type: photo.content_type });
  const arweaveUri = await clientUploadToArweave(file);
  const momentCreateParameters = {
    contract: {
      name,
      uri: arweaveUri,
    },
    token: {
      tokenMetadataURI: arweaveUri,
      createReferral: getAddress(REFERRAL_RECIPIENT),
      salesConfig: {
        type: "fixedPrice",
        pricePerToken: "0",
        saleStart: BigInt(Number(new Date().getTime() / 1000).toFixed(0)),
        saleEnd: maxUint64,
      },
      mintToCreatorCount: 1,
      payoutRecipient: getAddress(artistAddress),
    },
    account: getAddress(artistAddress),
  };
  const { contractAddress, tokenId } = await createMoment(momentCreateParameters);
  return {
    contractAddress,
    tokenId,
  };
};

export default createMomentFromPhoto;
