import type { InboundMessageWebhookEvent } from "telnyx/resources/webhooks";
import createMomentFromMedia from "@/lib/phones/createMomentFromMedia";
import { sendSms } from "@/lib/phones/sendSms";
import { IS_TESTNET, SITE_ORIGINAL_URL } from "@/lib/consts";
import { Database } from "../supabase/types";

export const processMmsMedia = async (
  phone: Database["public"]["Tables"]["in_process_artist_phones"]["Row"] & {
    artist: Database["public"]["Tables"]["in_process_artists"]["Row"];
  },
  media: InboundMessageWebhookEvent.Data.Payload.Media,
  payload: InboundMessageWebhookEvent.Data.Payload | undefined
): Promise<{ contractAddress: string; tokenId: string } | void> => {
  if (media.content_type?.includes("video")) {
    await sendSms(
      phone.phone_number,
      "Sorry, videos are not supported because their quality is significantly degraded when sent via SMS text message. Please post your video on a platform like YouTube or TikTok and send the link to the video here to add videos to your timeline."
    );
    return;
  }
  const { contractAddress, tokenId } = await createMomentFromMedia(
    media,
    payload,
    phone.artist.address
  );
  await sendSms(
    phone.phone_number,
    `Moment created! ${SITE_ORIGINAL_URL}/collect/${IS_TESTNET ? "bsep" : "base"}:${contractAddress}/${tokenId}`
  );
  return { contractAddress, tokenId };
};
