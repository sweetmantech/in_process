import getCorsHeader from "@/lib/getCorsHeader";
import client from "@/lib/telnyx/client";
import { TELNYX_PRIMARY_PHONE_NUMBER, TELNYX_SECONDARY_PHONE_NUMBER } from "@/lib/consts";

const corsHeaders = getCorsHeader();

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    const messageParams = {
      from: TELNYX_SECONDARY_PHONE_NUMBER,
      to: TELNYX_PRIMARY_PHONE_NUMBER,
      text: "Hello, World!",
      media_urls: ["https://i.imgur.com/x5tfTAY.jpeg"],
      type: "MMS" as const,
      subject: "Screenshot of Shoot-out game",
    };

    const response = await client.messages.send(messageParams);

    const result = {
      success: true,
      message_id: response.data?.id,
    };

    return Response.json(result, { headers: corsHeaders });
  } catch (e: any) {
    console.error("Error in send message API:", e);
    const message = e?.message ?? "Failed to send message";

    const result = {
      success: false,
      error: message,
    };

    return Response.json(result, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
