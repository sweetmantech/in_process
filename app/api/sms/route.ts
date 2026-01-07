import { NextRequest } from "next/server";
import client from "@/lib/telnyx/client";
import getCorsHeader from "@/lib/getCorsHeader";
import type { InboundMessageWebhookEvent } from "telnyx/resources/webhooks";
import { sendSms } from "@/lib/phones/sendSms";
import { processMmsPhoto } from "@/lib/phones/processMmsPhoto";
import selectPhone from "@/lib/supabase/in_process_artist_phones/selectPhone";
import verifyPhone from "@/lib/phones/verifyPhone";
import { TELNYX_PRIMARY_PHONE_NUMBER } from "@/lib/consts";

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
        const { data: phone, error } = await selectPhone(fromPhoneNumber);
        if (!phone || !phone.verified || error) {
          await sendSms(
            fromPhoneNumber,
            "Welcome to In Process! To get started please visit https://inprocess.world/manage and link your phone number."
          );
          throw new Error("Phone number is not linked,");
        }
        if (messageText === "yes" && type === "SMS") {
          await verifyPhone(fromPhoneNumber);
        }
        if (type === "MMS" && media && media?.length > 0) {
          await processMmsPhoto(phone, media[0], event.data.payload);
        }
      }
    }

    return Response.json({ success: true }, { headers: corsHeaders });
  } catch (e: any) {
    const message = e?.message || "Failed to process webhook";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
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
