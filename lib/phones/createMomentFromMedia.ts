import type { InboundMessageWebhookEvent } from "telnyx/resources/webhooks";
import { maxUint64, parseUnits, Address } from "viem";
import { REFERRAL_RECIPIENT, USDC_ADDRESS } from "@/lib/consts";
import { createMoment } from "@/lib/moment/createMoment";
import { MomentType } from "@/types/moment";
import uploadMetadata from "./uploadMetadata";

const createMomentFromMedia = async (
  media: InboundMessageWebhookEvent.Data.Payload.Media,
  payload: InboundMessageWebhookEvent.Data.Payload | undefined,
  artistAddress: string
) => {
  const { uri, name } = await uploadMetadata(media, payload);
  const momentCreateParameters = {
    contract: {
      name,
      uri,
    },
    token: {
      tokenMetadataURI: uri,
      createReferral: REFERRAL_RECIPIENT as Address,
      salesConfig: {
        type: MomentType.Erc20Mint,
        pricePerToken: parseUnits("1", 6).toString(),
        saleStart: BigInt(Number(new Date().getTime() / 1000).toFixed(0)),
        saleEnd: maxUint64,
        currency: USDC_ADDRESS as Address,
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

export default createMomentFromMedia;
