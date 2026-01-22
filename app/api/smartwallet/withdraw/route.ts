import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { authMiddleware } from "@/middleware/authMiddleware";
import { Address } from "viem";
import { withdrawSchema } from "@/lib/schema/withdrawSchema";
import { withdrawFromSmartWallet } from "@/lib/payments/withdrawFromSmartWallet";

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
    const parseResult = withdrawSchema.safeParse(body);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return Response.json(
        { message: "Invalid input", errors: errorDetails },
        { status: 400, headers: corsHeaders }
      );
    }

    const { currency: currencyAddress, amount, to: recipientAddress } = parseResult.data;

    const result = await withdrawFromSmartWallet({
      artistAddress: artistAddress as Address,
      currencyAddress,
      amount,
      recipientAddress,
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
