import { NextRequest } from "next/server";
import { airdropMomentSchema } from "@/lib/schema/airdropMomentSchema";
import { airdropMoment } from "@/lib/moment/airdropMoment";
import getCorsHeader from "@/lib/getCorsHeader";
import { authMiddleware } from "@/middleware/authMiddleware";
import { Address } from "viem";
import { getAirdropSchema } from "@/lib/schema/getAirdropSchema";
import { getAirdrops } from "@/lib/moment/getAirdrops";

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
    const { searchParams } = new URL(req.url);
    const queryParams = {
      moment: {
        collectionAddress: searchParams.get("collectionAddress") as Address,
        tokenId: searchParams.get("tokenId") || "1",
        chainId: Number(searchParams.get("chainId")),
      },
      offset: Number(searchParams.get("offset")) || 0,
    };

    const parseResult = getAirdropSchema.safeParse(queryParams);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return Response.json(
        { message: "Invalid query parameters", errors: errorDetails },
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await getAirdrops(parseResult.data);

    return Response.json(result, { headers: corsHeaders });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get airdrops";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req, { corsHeaders });
    if (authResult instanceof Response) {
      return authResult;
    }
    const { artistAddress } = authResult;
    const body = await req.json();
    const parseResult = airdropMomentSchema.safeParse(body);
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
    const data = parseResult.data;
    const result = await airdropMoment({
      ...data,
      artistAddress: artistAddress as Address,
    });
    return Response.json(result, { headers: corsHeaders });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create moment";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
