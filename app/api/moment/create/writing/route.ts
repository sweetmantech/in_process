import { NextRequest } from "next/server";
import { createContract } from "@/lib/coinbase/createContract";
import { createWritingMomentSchema } from "@/lib/coinbase/createContractSchema";
import { convertWritingToContractSchema } from "@/lib/coinbase/convertWritingToContractSchema";
import { uploadWritingWithJson } from "@/lib/writing/uploadWritingWithJson";

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
        { status: 400 }
      );
    }
    const data = parseResult.data;
    const metadataUri = await uploadWritingWithJson(
      data.contract.name,
      data.token.tokenContent
    );
    const convertedData = convertWritingToContractSchema(data, metadataUri);
    const result = await createContract(convertedData);
    return Response.json(result);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create writing moment";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
