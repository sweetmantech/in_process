import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { Address } from "viem";
import { validate } from "@/lib/schema/validate";
import { withdrawSchema } from "@/lib/schema/withdrawSchema";
import { withdraw } from "@/lib/smartwallets/withdraw";
import { getAddressesByAuthToken } from "@/lib/privy/getAddressesByAuthToken";
import { getBearerToken } from "@/lib/api-keys/getBearerToken";

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
    const authHeader = req.headers.get("authorization");
    const authToken = getBearerToken(authHeader);
    if (!authToken) throw new Error("Authorization header with Bearer token required");

    const { socialWallet } = await getAddressesByAuthToken(authToken);

    if (!socialWallet) throw new Error("No social wallet found for this withdrawal");

    const body = await req.json();
    const validationResult = validate(withdrawSchema, body);
    if (!validationResult.success) {
      return validationResult.response;
    }

    const {
      currency: currencyAddress,
      amount,
      to: recipientAddress,
      chainId,
    } = validationResult.data;

    const result = await withdraw({
      artistAddress: socialWallet as Address,
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
