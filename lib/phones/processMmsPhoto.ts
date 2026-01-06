import type { InboundMessageWebhookEvent } from "telnyx/resources/webhooks";
import selectPhone from "@/lib/supabase/in_process_artist_phones/selectPhone";
import createMomentFromPhoto from "@/lib/phones/createMomentFromPhoto";
import { sendSms } from "@/lib/phones/sendSms";
import { IS_TESTNET, SITE_ORIGINAL_URL } from "@/lib/consts";

export const processMmsPhoto = async (
  phoneNumber: string,
  photo: InboundMessageWebhookEvent.Data.Payload.Media,
  payload: InboundMessageWebhookEvent.Data.Payload | undefined
): Promise<{ contractAddress: string; tokenId: string }> => {
  const phone = await selectPhone(phoneNumber);
  if (!phone.verified) {
    throw new Error("Phone number is not verified.");
  }
  const { contractAddress, tokenId } = await createMomentFromPhoto(
    photo,
    payload,
    phone.artist.address
  );
  await sendSms(
    phoneNumber,
    `Moment created! ${SITE_ORIGINAL_URL}/collect/${IS_TESTNET ? "bsep" : "base"}:${contractAddress}/${tokenId}`
  );
  return { contractAddress, tokenId };
};
