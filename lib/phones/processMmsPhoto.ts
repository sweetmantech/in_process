import type { InboundMessageWebhookEvent } from "telnyx/resources/webhooks";
import createMomentFromPhoto from "@/lib/phones/createMomentFromPhoto";
import { sendSms } from "@/lib/phones/sendSms";
import { IS_TESTNET, SITE_ORIGINAL_URL } from "@/lib/consts";
import { Database } from "../supabase/types";

export const processMmsPhoto = async (
  phone: Database["public"]["Tables"]["in_process_artist_phones"]["Row"] & {
    artist: Database["public"]["Tables"]["in_process_artists"]["Row"];
  },
  photo: InboundMessageWebhookEvent.Data.Payload.Media,
  payload: InboundMessageWebhookEvent.Data.Payload | undefined
): Promise<{ contractAddress: string; tokenId: string }> => {
  const { contractAddress, tokenId } = await createMomentFromPhoto(
    photo,
    payload,
    phone.artist.address
  );
  await sendSms(
    phone.phone_number,
    `Moment created! ${SITE_ORIGINAL_URL}/collect/${IS_TESTNET ? "bsep" : "base"}:${contractAddress}/${tokenId}`
  );
  return { contractAddress, tokenId };
};
