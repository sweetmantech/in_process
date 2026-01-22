import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { authMiddleware } from "@/middleware/authMiddleware";
import { Address } from "viem";
import { validate } from "@/lib/schema/validate";
import { withdrawSchema } from "@/lib/schema/withdrawSchema";
import { withdraw } from "@/lib/smartwallets/withdraw";
import selectSocial from "@/lib/supabase/in_process_artist_social_wallets/selectSocial";

// CORS headers for allowing cross-origin requests
const corsHeaders = getCorsHeader();

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req, { corsHeaders });
    if (authResult instanceof Response) {
      return authResult;
    }
    const { artistAddress } = authResult;

    const body = await req.json();
    const validationResult = validate(withdrawSchema, body);
    if (!validationResult.success) {
      return validationResult.response;
    }

    const { data: social } = await selectSocial({
      artist_address: artistAddress as string,
    });

    const {
      currency: currencyAddress,
      amount,
      to: recipientAddress,
      chainId,
    } = validationResult.data;

    const result = await withdraw({
      artistAddress: (social?.social_wallet as Address) || (artistAddress as Address),
      currencyAddress,
      amount,
      recipientAddress,
      chainId,
    });

    return Response.json(result, { headers: corsHeaders });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "Failed to withdraw from smart wallet";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
