import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/authMiddleware";
import { insertPhone } from "@/lib/supabase/in_process_artist_phones/insertPhone";
import { sendSmsVerification } from "@/lib/phones/sendSmsVerification";
import { generateVerificationCode } from "@/lib/phones/generateVerificationCode";
import getCorsHeader from "@/lib/getCorsHeader";

const corsHeaders = getCorsHeader();

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req, { corsHeaders });
    if (authResult instanceof Response) {
      return authResult;
    }
    const { artistAddress } = authResult;

    // Get phone number from request body
    const body = await req.json();
    const { phone_number } = body;

    if (!phone_number || typeof phone_number !== "string") {
      return Response.json(
        { message: "phone_number is required and must be a string" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Insert phone number into Supabase with verified = false
    const { error: insertError } = await insertPhone({
      artist_address: artistAddress.toLowerCase(),
      phone_number: phone_number.trim(),
      verified: false,
    });

    if (insertError) {
      throw new Error(`Failed to insert phone number: ${insertError.message}`);
    }

    // Generate verification code and send SMS
    const verificationCode = generateVerificationCode();
    await sendSmsVerification(phone_number.trim(), verificationCode);

    return Response.json(
      {
        success: true,
        message: "Phone number registered and verification code sent",
      },
      { headers: corsHeaders }
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "Failed to register phone number";
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
