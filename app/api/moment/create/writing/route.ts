import { NextRequest } from "next/server";
import { createMoment } from "@/lib/moment/createMoment";
import { createWritingMomentSchema } from "@/lib/schema/createMomentSchema";
import { convertWritingToContractSchema } from "@/lib/coinbase/convertWritingToContractSchema";
import { uploadWritingWithJson } from "@/lib/writing/uploadWritingWithJson";
import getCorsHeader from "@/lib/getCorsHeader";

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
    const body = await req.json();
    const parseResult = createWritingMomentSchema.safeParse(body);
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
    // Use title as the name for the metadata
    // If creating on existing collection (contract.address), use title; otherwise use contract.name (which is required for new collections)
    const collectionName = data.contract.address ? data.title : (data.contract.name ?? data.title);
    const metadataUri = await uploadWritingWithJson(collectionName, data.token.tokenContent);
    const convertedData = convertWritingToContractSchema(data, metadataUri);
    const result = await createMoment(convertedData);
    return Response.json(result, { headers: corsHeaders });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create writing moment";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
