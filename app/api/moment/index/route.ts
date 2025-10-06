import { NextRequest } from "next/server";
import { z } from "zod";
import { Address } from "viem";
import { CHAIN_ID } from "@/lib/consts";
import indexMoment from "@/lib/moment/indexMoment";

// Validation schema for the request body
const indexMomentSchema = z.object({
  address: z.string().regex(/^0x[0-9a-fA-F]{40}$/),
  tokenId: z.number().int().gte(0).optional().default(0),
  chainId: z.number().optional().default(CHAIN_ID),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const parseResult = indexMomentSchema.safeParse(body);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return Response.json(
        { status: "error", message: "Invalid input", errors: errorDetails },
        { status: 400 }
      );
    }

    const { address, tokenId, chainId } = parseResult.data;
    const contractAddress = address.toLowerCase() as Address;

    const moment = await indexMoment(contractAddress, tokenId, chainId);

    return Response.json({
      status: "success",
      message: "Moment indexed",
      moment,
    });
  } catch (e: any) {
    console.error(e);
    const message = e?.message ?? "failed to index moment";
    return Response.json({ status: "error", message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
