import { NextRequest } from "next/server";
import indexMoment from "@/lib/moment/indexMoment";
import { momentSchema } from "@/lib/schema/momentSchema";

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const parseResult = momentSchema.safeParse(body);
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

    const { collectionAddress, tokenId, chainId } = parseResult.data;

    const moment = await indexMoment({
      collectionAddress,
      tokenId,
      chainId,
    });

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
