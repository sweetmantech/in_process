import { NextRequest } from "next/server";
import { getAirdropSchema } from "@/lib/schema/getAirdropSchema";
import { getAirdrops } from "@/lib/moment/getAirdrops";
import getCorsHeader from "@/lib/getCorsHeader";

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
      artist_address: searchParams.get("artist_address"),
      chainId: searchParams.get("chainId"),
      offset: searchParams.get("offset"),
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

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
