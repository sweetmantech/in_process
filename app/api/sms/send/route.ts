import getCorsHeader from "@/lib/getCorsHeader";
import { sendSms } from "@/lib/phones/sendSms";

const corsHeaders = getCorsHeader();

export async function GET() {
  try {
    const response = await sendSms("+15135971101", "test second number");

    return Response.json(
      {
        success: true,
        message: "SMS sent successfully",
        data: {
          messageId: response.data?.id,
          to: response.data?.to,
          from: response.data?.from,
        },
      },
      { headers: corsHeaders }
    );
  } catch (e: any) {
    console.error("GET request error:", e);
    return Response.json(
      {
        success: false,
        message: "Failed to send SMS",
        error: e.message || "Unknown error",
      },
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
