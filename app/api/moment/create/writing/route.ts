import { NextRequest } from "next/server";
import { createContract } from "@/lib/coinbase/createContract";
import { createWritingMomentSchema } from "@/lib/coinbase/createContractSchema";
import { convertWritingToContractSchema } from "@/lib/coinbase/convertWritingToContractSchema";
import { uploadWritingWithJson } from "@/lib/writing/uploadWritingWithJson";
import { getCORSHeaders } from "@/lib/api/getCORSHeaders";

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = getCORSHeaders(origin);

  return new Response(null, {
    status: 200,
    headers,
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = getCORSHeaders(origin);

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
        {
          status: 400,
          headers,
        }
      );
    }
    const data = parseResult.data;
    const metadataUri = await uploadWritingWithJson(
      data.contract.name,
      data.token.tokenContent
    );
    const convertedData = convertWritingToContractSchema(data, metadataUri);
    const result = await createContract(convertedData);
    return Response.json(result, {
      headers,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create writing moment";
    return Response.json(
      { message },
      {
        status: 500,
        headers,
      }
    );
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
