import { NextRequest } from "next/server";
import { TELNYX_MESSAGING_PROFILE_ID, TELNYX_TOLL_FREE_PHONE_NUMBER } from "@/lib/consts";
import getCorsHeader from "@/lib/getCorsHeader";
import client from "@/lib/telnyx/client";

const corsHeaders = getCorsHeader();

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const phone_number = params.get("phone_number");
    const messageParams = {
      from: TELNYX_TOLL_FREE_PHONE_NUMBER,
      to: `+1${phone_number}` as string,
      text: "In Process is testing phone number features. no action required.",
      type: "SMS" as const,
      messaging_profile_id: TELNYX_MESSAGING_PROFILE_ID,
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
