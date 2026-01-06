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
  const { data: phone, error } = await selectPhone(phoneNumber);
  if (!phone || !phone.verified || error) {
    await sendSms(
      phoneNumber,
      "Welcome to In Process! To get started please visit https://inprocess.world/manage and link your phone number."
    );
    throw new Error("Phone number is not linked,");
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
