import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { Address } from "viem";
import { validate } from "@/lib/schema/validate";
import { withdrawSchema } from "@/lib/schema/withdrawSchema";
import { withdraw } from "@/lib/smartwallets/withdraw";
import { getAddressesByAuthToken } from "@/lib/privy/getAddressesByAuthToken";
import { getBearerToken } from "@/lib/api-keys/getBearerToken";
import { authMiddleware } from "@/middleware/authMiddleware";

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

    const result = await withdraw({
      ...validationResult.data,
      artistAddress: artistAddress as Address,
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
