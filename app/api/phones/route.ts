import { NextRequest } from "next/server";
import { authMiddleware } from "@/middleware/authMiddleware";
import { upsertPhone } from "@/lib/supabase/in_process_artist_phones/upsertPhone";
import { deletePhone } from "@/lib/supabase/in_process_artist_phones/deletePhone";
import { selectArtist } from "@/lib/supabase/in_process_artists/selectArtist";
import getCorsHeader from "@/lib/getCorsHeader";
import truncateAddress from "@/lib/truncateAddress";
import { registerPhoneSchema } from "@/lib/schema/phoneNumberSchema";
import { sendSms } from "@/lib/phones/sendSms";

const corsHeaders = getCorsHeader();

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req, { corsHeaders });
    if (authResult instanceof Response) {
      return authResult;
    }
    const { artistAddress } = authResult;

    // Get and validate phone number from request body
    const body = await req.json();
    const validationResult = registerPhoneSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || "Invalid request body";
      return Response.json({ message: errorMessage }, { status: 400, headers: corsHeaders });
    }

    const { phone_number } = validationResult.data;

    // Upsert phone number into Supabase with verified = false
    const { error: insertError } = await upsertPhone({
      artist_address: artistAddress.toLowerCase(),
      phone_number,
      verified: false,
    });

    if (insertError) {
      throw new Error(`Failed to insert phone number: ${insertError.message}`);
    }

    // Get artist name for SMS message
    const artist = await selectArtist(artistAddress.toLowerCase());
    const artistName = artist?.username || truncateAddress(artistAddress);

    // Send SMS verification message
    await sendSms(
      phone_number,
      `Someone is trying to connect this phone number to the artist profile for ${artistName} on In Process. If this was you, please reply 'yes'. If this was not you, please ignore this message.`
    );

    return Response.json(
      {
        success: true,
        message: "Phone number registered and verification message sent",
      },
      { headers: corsHeaders }
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "Failed to register phone number";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req, { corsHeaders });
    if (authResult instanceof Response) {
      return authResult;
    }
    const { artistAddress } = authResult;

    const { error: deleteError } = await deletePhone(artistAddress.toLowerCase());

    if (deleteError) {
      throw new Error(`Failed to disconnect phone number: ${deleteError.message}`);
    }

    return Response.json(
      {
        success: true,
        message: "Phone number is disconnected successfully",
      },
      { headers: corsHeaders }
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "Failed to disconnect phone number";
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
