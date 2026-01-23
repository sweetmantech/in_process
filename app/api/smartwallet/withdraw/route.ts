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

export async function GET(req: NextRequest) {
  try {
    // const authResult = await authMiddleware(req, { corsHeaders });
    // if (authResult instanceof Response) {
    //   return authResult;
    // }
    // const { artistAddress } = authResult;

    // const body = await req.json();
    // const validationResult = validate(withdrawSchema, body);
    // if (!validationResult.success) {
    //   return validationResult.response;
    // }

    const artistAddress = "0xaf1452d289e22fbd0dea9d5097353c72a90fac33";
    const body = {
      to: "0xaf1452d289e22fbd0dea9d5097353c72a90fac33" as Address,
      amount: "0.00002",
      currency: "eth" as const,
      chainId: 84532,
    };
    const results = await withdraw({
      ...body,
      artistAddress: artistAddress as Address,
    });

    return Response.json(results, { headers: corsHeaders });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "Failed to withdraw from smart wallet";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
