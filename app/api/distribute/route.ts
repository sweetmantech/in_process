import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { distributeSchema } from "@/lib/schema/distributeSchema";
import { distribute } from "@/lib/splits/distribute";
import { CHAIN_ID } from "@/lib/consts";

const corsHeaders = getCorsHeader();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parseResult = distributeSchema.safeParse(body);
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
  const { splitAddress, chainId, tokenAddress } = parseResult.data;

  try {
    const hash = await distribute({
      splitAddress,
      tokenAddress,
      chainId: chainId ?? CHAIN_ID,
    });
    return Response.json(
      {
        status: "success",
        hash,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error in distribute API:", error);
    return Response.json(
      {
        status: "error",
        message: "An error occurred while distributing.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers: corsHeaders }
    );
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
