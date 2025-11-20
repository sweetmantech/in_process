import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { migrateMuxToArweave } from "@/lib/mux/migrateMuxToArweave";
import { authMiddleware } from "@/middleware/authMiddleware";
import { migrateMuxSchema } from "@/lib/schema/migrateMuxSchema";
import { Address } from "viem";

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
    const parseResult = migrateMuxSchema.safeParse(body);

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

    const result = await migrateMuxToArweave({
      tokenContractAddress: data.tokenContractAddress as Address,
      tokenId: data.tokenId,
      artistAddress: artistAddress as Address,
    });

    return Response.json(result, { headers: corsHeaders });
  } catch (e: any) {
    console.error("Error migrating MUX to Arweave:", e);
    const message = e?.message ?? "Failed to migrate MUX to Arweave";
    return Response.json({ message, success: false }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
