import { NextRequest } from "next/server";
import client from "@/lib/telnyx/client";
import getCorsHeader from "@/lib/getCorsHeader";
import type { InboundMessageWebhookEvent } from "telnyx/resources/webhooks";
import { updatePhoneVerified } from "@/lib/supabase/in_process_artist_phones/updatePhoneVerified";
import { sendSms } from "@/lib/phones/sendSms";

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
    try {
      const event = client.webhooks.unwrap<InboundMessageWebhookEvent>(body, {
        headers,
        key: process.env.TELNYX_PUBLIC_KEY,
      });

      // Check if this is a message.received event
      if (event.data?.event_type === "message.received") {
        const messageText = event.data.payload?.text?.toLowerCase().trim();
        const fromPhoneNumber = event.data.payload?.from?.phone_number;

        // Check if message is "yes"
        if (messageText === "yes" && fromPhoneNumber) {
          // Update verified field to true for this phone number
          const { error } = await updatePhoneVerified(fromPhoneNumber);
          if (error) {
            console.error("Failed to update phone verification:", error);
          }
          await sendSms(
            fromPhoneNumber,
            "Your phone number has been verified! You can now text photos and captions and we'll post them to In Process."
          );
        }
      }

      return Response.json({ success: true }, { headers: corsHeaders });
    } catch (err) {
      console.error("Signature verification failed:", err);
      return Response.json(
        { message: "Signature verification failed" },
        { status: 400, headers: corsHeaders }
      );
    }
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
