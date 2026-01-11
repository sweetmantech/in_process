import type { InboundMessageWebhookEvent } from "telnyx/resources/webhooks";
import { maxUint64, parseUnits, Address } from "viem";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import getPhotoBlob from "@/lib/phones/getPhotoBlob";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { createMoment } from "@/lib/moment/createMoment";
import { uploadJson } from "../arweave/uploadJson";
import { MomentType } from "@/types/moment";

const createMomentFromPhoto = async (
  photo: InboundMessageWebhookEvent.Data.Payload.Media,
  payload: InboundMessageWebhookEvent.Data.Payload | undefined,
  artistAddress: string
) => {
  const blob = await getPhotoBlob(photo);
  const name = payload?.subject || payload?.text || `photo-${Date.now()}`;
  const file = new File([blob], name, { type: photo.content_type });
  const imageUri = await clientUploadToArweave(file);
  const arweaveUri = await uploadJson({
    name,
    description: payload?.text || "",
    image: imageUri,
    content: {
      mime: photo.content_type,
      uri: imageUri,
    },
  });
  const momentCreateParameters = {
    contract: {
      name,
      uri: arweaveUri,
    },
    token: {
      tokenMetadataURI: arweaveUri,
      createReferral: REFERRAL_RECIPIENT as Address,
      salesConfig: {
        type: MomentType.Erc20Mint,
        pricePerToken: parseUnits("1", 6).toString(),
        saleStart: BigInt(Number(new Date().getTime() / 1000).toFixed(0)),
        saleEnd: maxUint64,
      },
      mintToCreatorCount: 1,
      payoutRecipient: artistAddress as Address,
    },
    account: artistAddress as Address,
  };
  const { contractAddress, tokenId } = await createMoment(momentCreateParameters);
  return {
    contractAddress,
    tokenId,
  };
};

export default createMomentFromPhoto;
