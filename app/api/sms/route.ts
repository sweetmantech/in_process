import { NextRequest } from "next/server";
import client from "@/lib/telnyx/client";
import getCorsHeader from "@/lib/getCorsHeader";
import type { InboundMessageWebhookEvent } from "telnyx/resources/webhooks";
import { updatePhoneVerified } from "@/lib/supabase/in_process_artist_phones/updatePhoneVerified";
import { sendSms } from "@/lib/phones/sendSms";
import selectPhone from "@/lib/supabase/in_process_artist_phones/selectPhone";
import createMomentFromPhoto from "@/lib/phones/createMomentFromPhoto";
import { IS_TESTNET, SITE_ORIGINAL_URL } from "@/lib/consts";

const corsHeaders = getCorsHeader();

export async function POST(req: NextRequest) {
  try {
    // Get the raw body as string for signature verification
    const body = await req.text();

    // Convert Next.js headers to plain object for Telnyx SDK
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // Verify webhook signature using Telnyx SDK
    let event: InboundMessageWebhookEvent;
    try {
      event = client.webhooks.unwrap<InboundMessageWebhookEvent>(body, {
        headers,
        key: process.env.TELNYX_PUBLIC_KEY,
      });
    } catch (err) {
      console.error("Signature verification failed:", err);
      return Response.json(
        { message: "Signature verification failed" },
        { status: 400, headers: corsHeaders }
      );
    }
    // Check if this is a message.received event
    if (event.data?.event_type === "message.received") {
      const messageText = event.data.payload?.text?.toLowerCase().trim();
      const fromPhoneNumber = event.data.payload?.from?.phone_number;
      const type = event.data.payload?.type;
      const media = event.data.payload?.media;

      if (fromPhoneNumber) {
        if (messageText === "yes" && type === "SMS") {
          const { error } = await updatePhoneVerified(fromPhoneNumber);
          if (error) {
            console.error("Failed to update phone verification:", error);
          }
          await sendSms(
            fromPhoneNumber,
            "Your phone number has been verified! You can now text photos and captions and we'll post them to In Process."
          );
        }
        if (type === "MMS" && media && media?.length > 0) {
          const phone = await selectPhone(fromPhoneNumber);
          if (!phone.verified) throw new Error("Phone number is not verified.");
          const photo = media[0];
          const { contractAddress, tokenId } = await createMomentFromPhoto(
            photo,
            event.data.payload,
            phone.artist.address
          );
          await sendSms(
            fromPhoneNumber,
            `Moment created! https://${SITE_ORIGINAL_URL}/collect/${IS_TESTNET ? "bsep" : "base"}:${contractAddress}/${tokenId}`
          );
        }
      }
    }

    return Response.json({ success: true }, { headers: corsHeaders });
  } catch (e: any) {
    console.error("Webhook processing error:", e);
    return Response.json(
      { message: "Failed to process webhook" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
